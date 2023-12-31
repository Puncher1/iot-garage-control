import { useEffect, useState } from "react"

import { IotDataObjectType } from "./../../utils/types"
import { Server as ServerConst } from "../../utils/constants"


export function useIotData(isRetry: boolean, setRetryState: Function): IotDataObjectType {
    const [iotData, setIotData] = useState({})
    const [error, setError] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    let keepAliveTimer: number | undefined;
    let eventSource: EventSource

    function reconnect() {
        console.log("reconnect")
        setError(null)
        connect()
    }

    function eventReceived() {
        setError(null)
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
            setIotData(JSON.parse(event.data))
        }, false)

        eventSource.onerror = (err) => {
            setError(err)
            console.log(err)
            close()
        }
    }

    useEffect(() => {
        if (isRetry) {
            setRetryState(false)
            window.addEventListener("online", reconnect)
            reconnect()
        }
        return () => { window.removeEventListener }
    }, [isRetry])

    return { iotData, error, isLoading }
}
