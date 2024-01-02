import { ErrorType } from "./enums"


export interface IOTDataObjectType {
    data: Record<string, Record<string, any>>,
    isLoading: boolean,
}

export interface ErrorObjType {
    message: string,
    type: ErrorType
}

export interface ErrorContextType {
    error: ErrorObjType | null,
    setError: Function,
    removeError: Function
}
