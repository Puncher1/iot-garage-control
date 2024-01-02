import { createContext } from "react"
import { IOTDataObjectType } from "./../utils/types"


const IOTDataContext = createContext<IOTDataObjectType>({
    data: {},
    isLoading: true
})

export default IOTDataContext
