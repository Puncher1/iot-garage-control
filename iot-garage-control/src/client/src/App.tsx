import { useState } from "react"

import { useIotData } from "./services/sse/main"
import { IOTDataContext } from "./contexts/iotDataContext"
import useOnlineStatus from "./hooks/useOnlineStatus"
import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"
import { errorBanner } from "./utils/helper"
import ErrorProvider from "./providers/errorProvider"
import IOTDataProvider from "./providers/iotDataProvider"

import "./styles/App.css"


function App() {


  // const isError = !!IOTDataObject.error



  return (
    <ErrorProvider>
      <div>
        <IOTDataProvider>
          <div className="flex flex-col">
            <div>
              <div className="flex flex-row justify-evenly">
                <Card title="Authentifizierung"></Card>
                <Card title="Torsteuerung"></Card>
                <Card title="CO2-Messung"></Card>
              </div>
              <div className="flex flex-row justify-evenly">
                <Card title="Luftqualitätsmessung"></Card>
                <Card title="Lüftungssteuerung"></Card>
              </div>
            </div>
          </div >
        </IOTDataProvider>
        <ErrorBanner></ErrorBanner>
      </div >
    </ErrorProvider >
    /* {isErrorBanner &&
        <ErrorBanner
          onRetry={handleRetryState}
          errorType={errorType}
          bannerSizeClass={bannerSizeClass}>
          {errorMessage}
        </ErrorBanner>} */
  )
}

export default App
