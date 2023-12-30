import { Dispatch, createContext } from "react"
import { IotDataObjectType } from "./../utils/types"


export const IOTDataContext = createContext<IotDataObjectType>({
    iotData: {},
    error: null,
    isLoading: true,
})
