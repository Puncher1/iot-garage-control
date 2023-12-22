import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

import "./App.css"
import Card from "./components/Card/Card"

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
