import { useIotData } from "../services/sse"
import IOTDataContext from "../contexts/iotDataContext"


interface IOTDataProvParamsType {
  children: React.ReactElement
}

export default function IOTDataProvider({ children }: IOTDataProvParamsType) {
  const iotDataRaw = useIotData()

  const contextValue = {
    data: iotDataRaw.data,
    isLoading: iotDataRaw.isLoading
  }

  return (
    <IOTDataContext.Provider value={contextValue}>
      {children}
    </ IOTDataContext.Provider>
  )
}
