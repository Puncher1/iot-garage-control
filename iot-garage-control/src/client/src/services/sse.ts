import { useEffect, useState } from "react"

import { IOTDataObjectType } from "../utils/types"
import { Server as ServerConst } from "../utils/constants"
import useErrorContext from "../hooks/useErrorContext"
import { ErrorMessages } from "../utils/constants"
import { ErrorType } from "../utils/enums"
import useRetryContext from "../hooks/useRetryContext"


export function useIotData(): IOTDataObjectType {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { retry, resetRetry } = useRetryContext()
    const [localError, setLocalError] = useState(false)
    const { setError, removeError } = useErrorContext()

    let keepAliveTimer: number | undefined;
    let eventSource: EventSource

    const reconnect = () => {
        console.log("reconnect")
        setLocalError(false)
        connect()
    }

    const eventReceived = () => {
        setLocalError(false)
        setIsLoading(false)

        clearTimeout(keepAliveTimer)
        keepAliveTimer = setTimeout(connect, 3 * 1000)
    }

    const close = () => {
        console.log("close")
        setIsLoading(true)
        eventSource.close()
    }

    const connect = () => {
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
            console.log(err)
            setLocalError(true)
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

    useEffect(() => {
        if (localError) {
            setError(ErrorMessages.connection, ErrorType.connection)
        }
        else {
            removeError()
        }
    }, [localError])

    return { data, isLoading }
}
