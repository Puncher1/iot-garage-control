import { useEffect, useState } from "react"

import { IOTDataObjectType } from "./../../utils/types"
import { Server as ServerConst } from "../../utils/constants"
import useError from "../../hooks/useError"
import { ErrorMessages } from "../../utils/constants"
import { ErrorType } from "../../utils/enums"
import useRetryState from "../../hooks/useRetryState"


const errorMsg = ErrorMessages.connection

export function useIotData(): IOTDataObjectType {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { retry, setRetry } = useRetryState()
    const { setError, removeError } = useError()

    let keepAliveTimer: number | undefined;
    let eventSource: EventSource

    function reconnect() {
        console.log("reconnect")
        removeError()
        connect()
    }

    function eventReceived() {
        removeError()
        setIsLoading(false)

        clearTimeout(keepAliveTimer)
        keepAliveTimer = setTimeout(connect, 3 * 1000)
    }

    function close() {
        console.log("close")
        setIsLoading(true)
        eventSource.close()
    }

    function connect() {
        if (eventSource) {
            close()
        }
        eventSource = new EventSource(`${ServerConst.sseBaseURL}/data`)

        eventSource.addEventListener("message", (_) => {
            eventReceived()
        }, false)

        eventSource.addEventListener("data", (event) => {
            eventReceived()
            setData(JSON.parse(event.data))
        }, false)

        eventSource.onerror = (err) => {
            setError(errorMsg, ErrorType.receiving)
            console.log(err)
            close()
        }
    }

    useEffect(() => {
        if (retry) {
            setRetry(false)
            window.addEventListener("online", reconnect)
            reconnect()
        }
        return () => { window.removeEventListener }
    }, [retry])

    return { data, isLoading }
}
