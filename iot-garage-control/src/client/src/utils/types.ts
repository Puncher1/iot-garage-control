export interface IotDataObjectType {
    iotData: Record<string, Record<string, any>>,
    error: Event | null,
    isLoading: boolean
}
