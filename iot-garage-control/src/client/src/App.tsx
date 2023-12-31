import { useIotData } from "./services/sse/main"
import { IOTDataContext } from "./contexts/iotDataContext"
import useOnlineStatus from "./hooks/useOnlineStatus"
import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"

import "./styles/App.css"


interface errorBannerReturnType {
  isErrorBanner: boolean,
  errorMessage: string
}

function errorBanner(isError: boolean, isOnline: boolean): errorBannerReturnType {
  let isErrorBanner = false
  let errorMessage = ""
  if (!isOnline || isError) {
    isErrorBanner = true
    if (!isOnline) {
      errorMessage = "You're offline! Make sure you have an internet connection."
    }
    else if (isError) {
      errorMessage = "Error! Something went wrong, please try again."
    }
  }

  return { isErrorBanner, errorMessage }
}


function App() {
  const isOnline = useOnlineStatus()
  const IOTDataObject = useIotData()
  const isError = IOTDataObject.error ? true : false
  const { isErrorBanner, errorMessage } = errorBanner(isError, isOnline)

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
      {isErrorBanner && <ErrorBanner>{errorMessage}</ErrorBanner>}
    </div>
  )
}

export default App
