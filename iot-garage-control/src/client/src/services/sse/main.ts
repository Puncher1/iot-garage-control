import { useEffect, useState } from "react"

import { IotDataObjectType } from "./../../utils/types"
import { Server as ServerConst } from "../../utils/constants"


export function useIotData(): IotDataObjectType {
    const [iotData, setIotData] = useState({})
    const [error, setError] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        let keepAliveTimer: number | undefined;

        function eventReceived() {
            setError(null)
            setIsLoading(false)

            clearTimeout(keepAliveTimer)
            keepAliveTimer = setTimeout(connect, 3 * 1000)
        }

        let eventSource: EventSource
        function connect() {
            if (eventSource) {
                console.log("close")
                setIsLoading(true)
                eventSource.close()
            }
            eventSource = new EventSource(`${ServerConst.sseBaseURL}/data`)

            eventSource.addEventListener("message", (event) => {
                eventReceived()
            }, false)

            eventSource.addEventListener("data", (event) => {
                eventReceived()
                setIotData(JSON.parse(event.data))
            }, false)

            eventSource.onerror = (err) => {
                setError(err)
                console.log(err)
            }
        }
        connect()

        return () => eventSource.close()
    }, [])

    return { iotData, error, isLoading }
}
