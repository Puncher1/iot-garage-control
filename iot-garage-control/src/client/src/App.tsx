import { useState } from "react"

import { useIotData } from "./services/sse/main"
import { IOTDataContext } from "./contexts/iotDataContext"
import useOnlineStatus from "./hooks/useOnlineStatus"
import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"
import { ErrorType } from "./utils/enums"

import "./styles/App.css"


interface errorBannerReturnType {
  isErrorBanner: boolean,
  errorType: ErrorType | null,
  errorMessage: string
}

function errorBanner(isError: boolean, isOnline: boolean): errorBannerReturnType {
  let isErrorBanner = false
  let errorMessage = ""
  let errorType = null

  if (!isOnline || isError) {
    isErrorBanner = true
    if (!isOnline) {
      errorType = ErrorType.offline
      errorMessage = "You're offline! Make sure you have an internet connection."
    }
    else if (isError) {
      errorType = ErrorType.unexpected
      errorMessage = "Something went wrong while receiving data, please try again."
    }
  }

  return { isErrorBanner, errorType, errorMessage }
}


function App() {
  const isOnline = useOnlineStatus()
  const [retry, setRetry] = useState(true)

  const IOTDataObject = useIotData(retry, handleRetryState)
  const isError = IOTDataObject.error ? true : false
  const { isErrorBanner, errorType, errorMessage } = errorBanner(isError, isOnline)

  function handleRetryState(r: boolean) {
    setRetry(r)
  }

  return (
    <div>
      <div className="flex flex-col">
        <IOTDataContext.Provider value={IOTDataObject}>
          <div className="flex flex-row justify-evenly">
            <Card title="Authentifizierung"></Card>
            <Card title="Torsteuerung"></Card>
            <Card title="CO2-Messung"></Card>
          </div>
          <div className="flex flex-row justify-evenly">
            <Card title="Luftqualitätsmessung"></Card>
            <Card title="Lüftungssteuerung"></Card>
          </div>
        </IOTDataContext.Provider>
      </div >
      {isErrorBanner && <ErrorBanner onRetry={handleRetryState} errorType={errorType}>{errorMessage}</ErrorBanner>}
    </div>
  )
}

export default App
