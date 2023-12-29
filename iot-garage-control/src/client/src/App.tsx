import { useIotData } from "./services/sse/main"
import IOTDataContext from "./contexts/iotDataContext"
import "./styles/App.css"
import Card from "./components/Card"


function App() {
  const iotData: Record<string, any> = useIotData()

  return (
    <>
      <div className="flex flex-col">
        <IOTDataContext.Provider value={iotData}>
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
      </div>
    </>
  )
}

export default App
