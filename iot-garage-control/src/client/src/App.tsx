/// <reference types="vite-plugin-svgr/client" />

import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"

import "./styles/App.css"


function App() {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <div className="flex flex-row justify-evenly">
            <Card title="Authentifizierung" />
            <Card title="Torsteuerung" />
            <Card title="CO2-Messung" />
          </div>
          <div className="flex flex-row justify-evenly">
            <Card title="Luftqualitätsmessung" />
            <Card title="Lüftungssteuerung" />
          </div>
        </div>
      </div >
      <ErrorBanner />
    </div>
  )
}

export default App
