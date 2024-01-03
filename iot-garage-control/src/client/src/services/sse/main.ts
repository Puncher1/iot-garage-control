import { useEffect, useState } from "react"

import { IOTDataObjectType } from "./../../utils/types"
import { Server as ServerConst } from "../../utils/constants"
import useError from "../../hooks/useErrorContext"
import { ErrorMessages } from "../../utils/constants"
import { ErrorType } from "../../utils/enums"
import useRetryContext from "../../hooks/useRetryContext"


const errorMsg = ErrorMessages.connection

export function useIotData(): IOTDataObjectType {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { retry, resetRetry } = useRetryContext()
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
            resetRetry()
            window.addEventListener("online", reconnect)
            reconnect()
        }
        return () => { window.removeEventListener }
    }, [retry])

    return { data, isLoading }
}
