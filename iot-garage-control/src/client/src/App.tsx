import { useState } from "react"

import useOnlineStatus from "./hooks/useOnlineStatus"
import Card from "./components/Card"
import ErrorBanner from "./components/ErrorBanner"

import "./styles/App.css"


function App() {
  return (
    <div>
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
      <ErrorBanner></ErrorBanner>
    </div>
  )
}

export default App
