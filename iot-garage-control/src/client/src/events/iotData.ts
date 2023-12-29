import { useEffect, useState } from "react"


export function useIotData(): Record<string, Record<string, any>> {
    const [iotData, setIotData] = useState({})
    const [error, setError] = useState<Event | null>(null)

    useEffect(() => {
        let keepAliveTimer: number | undefined;

        function eventTimeoutClear() {
            clearTimeout(keepAliveTimer)
            keepAliveTimer = setTimeout(connect, 3 * 1000)
        }

        let eventSource: EventSource
        function connect() {
            if (eventSource) {
                eventSource.close()
            }
            eventSource = new EventSource("http://172.20.10.2/sse/data")

            eventSource.addEventListener("message", (event) => {
                eventTimeoutClear()
                console.log(`Message: ${event.data}`)
            }, false)

            eventSource.addEventListener("data", (event) => {
                eventTimeoutClear()
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

    return iotData
}
