import { useContext } from "react"

import RetryContext from "../contexts/retryContext"
import { RetryContextType } from "../utils/types"


export default function useRetryContext(): RetryContextType {
    return useContext(RetryContext)
}
