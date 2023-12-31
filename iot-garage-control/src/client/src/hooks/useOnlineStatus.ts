import { useEffect, useState } from "react"


const useOnlineStatus = () => {
    const [online, setOnline] = useState(navigator !== undefined ? navigator.onLine : true)

    useEffect(() => {
        function handleOnlineStatusChange() {
            setOnline(navigator.onLine)
        }

        window.addEventListener("online", handleOnlineStatusChange)
        window.addEventListener("offline", handleOnlineStatusChange)

        return () => {
            window.removeEventListener("online", handleOnlineStatusChange)
            window.removeEventListener("online", handleOnlineStatusChange)
        }
    }, [])

    return online
}

export default useOnlineStatus
