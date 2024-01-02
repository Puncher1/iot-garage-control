import { createContext } from "react"
import { ErrorContextType } from "../utils/types"


const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => { },
    removeError: () => { }
})

export default ErrorContext
