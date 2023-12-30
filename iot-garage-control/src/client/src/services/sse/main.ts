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

            clearTimeout(keepAliveTimer)
            keepAliveTimer = setTimeout(connect, 3 * 1000)
            setIsLoading(false)
        }

        let eventSource: EventSource
        function connect() {
            if (eventSource) {
                console.log("close")
                eventSource.close()
                setIsLoading(true)
            }
            eventSource = new EventSource(`${ServerConst.sseBaseURL}/data`)

            eventSource.addEventListener("message", (event) => {
                eventReceived()
                console.log(`Message: ${event.data}`)
            }, false)

            eventSource.addEventListener("data", (event) => {
                eventReceived()
                console.log(`data: ${event.data}`)
                setIotData(JSON.parse(event.data))
            }, false)

            eventSource.onerror = (err) => {
                console.log(err)
                setError(err)
            }
        }
        connect()

        return () => eventSource.close()
    }, [])

    return { iotData, error, isLoading }
}
