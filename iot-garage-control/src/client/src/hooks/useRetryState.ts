import { useState } from "react"


export default function useRetryState() {
    const [retry, setRetry] = useState(true)
    return { retry, setRetry }
}
