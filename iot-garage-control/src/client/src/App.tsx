import { useState } from "react"

import { useIotData } from "./services/sse/main"
import { IOTDataContext } from "./contexts/iotDataContext"
import useOnlineStatus from "./hooks/useOnlineStatus"
import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"
import { errorBanner } from "./utils/helper"

import "./styles/App.css"


function App() {
  const isOnline = useOnlineStatus()
  const [retry, setRetry] = useState(true)

  const IOTDataObject = useIotData(retry, handleRetryState)
  const isError = IOTDataObject.error ? true : false
  const { isErrorBanner, errorType, errorMessage, bannerSizeClass } = errorBanner(isError, isOnline)

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
      {isErrorBanner &&
        <ErrorBanner
          onRetry={handleRetryState}
          errorType={errorType}
          bannerSizeClass={bannerSizeClass}>
          {errorMessage}
        </ErrorBanner>}
    </div>
  )
}

export default App
