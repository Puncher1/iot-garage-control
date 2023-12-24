import "./styles/App.css"
import Card from "./components/card/Card"

function App() {

  return (
    <>
      <div className="flex flex-col">
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
    </>
  )
}

export default App
