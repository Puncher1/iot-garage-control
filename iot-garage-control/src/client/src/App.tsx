import { useIotData } from "./services/sse/main"
import { IOTDataContext, IOTDatatIsErrorContext } from "./contexts/iotDataContext"
import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"

import "./styles/App.css"


function App() {
  const IOTDataObject = useIotData()
  const isError = IOTDataObject.error ? true : false
  console.log(`isError: ${isError}, error: ${IOTDataObject.error}`)

  return (
    <>
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
      {isError && <ErrorBanner></ErrorBanner>}
    </>
  )
}

export default App
