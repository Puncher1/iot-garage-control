import { useEffect, useState } from "react"

import { ErrorContextType, IOTDataObjectType } from "../utils/types"
import { Server as ServerConst, WarningMessages, ErrorMessages } from "../utils/constants"
import useErrorContext from "../hooks/useErrorContext"
import { ErrorType } from "../utils/enums"
import useRetryContext from "../hooks/useRetryContext"


interface LocalErrorType {
    type: ErrorType,
    message: ErrorMessages,
}

export function useIotData(): IOTDataObjectType {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { retry, resetRetry } = useRetryContext()
    const [localError, setLocalError] = useState<LocalErrorType | null>(null)
    const { setError, removeError }: ErrorContextType = useErrorContext()

    let keepAliveTimer: number | undefined;
    let eventSource: EventSource

    const reconnect = () => {
        console.log("reconnect")
        setLocalError(null)
        connect()
    }

    const eventReceived = () => {
        setLocalError(null)
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
        if (eventSource && eventSource.OPEN) {
            close()
        }
        eventSource = new EventSource(`${ServerConst.sseBaseURL}/data`)

        eventSource.addEventListener("message", (message) => {
            console.log(message.data)
        }, false)

        eventSource.addEventListener("data", (event) => {
            eventReceived()
            setData(JSON.parse(event.data))
        }, false)

        eventSource.onerror = (err) => {
            console.log(err)
            if (err.data === "notReady") {
                setLocalError({ type: ErrorType.dataNotReady, message: ErrorMessages.dataNotReady })
            }
            else {
                setLocalError({ type: ErrorType.connection, message: ErrorMessages.connection })
            }
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
            setError(localError.message, localError.type)
        }
        else {
            removeError()
        }
    }, [localError])

    return { data, isLoading }
}
