import { createContext } from "react";
import { RetryContextType } from "../utils/types"


const RetryContext = createContext<RetryContextType>({
    retry: true,
    setRetry: () => { },
    resetRetry: () => { }
})

export default RetryContext
