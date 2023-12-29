import { useState } from "react"
import ReceiveContent from "./CardContent"


interface CardPropsType {
  title: string
}

function Card({ title }: CardPropsType) {
  const [tab, setTab] = useState(1)

  function handleTabs(value: number) {
    setTab(value)
  }

  return (
    <div className="card w-96 bg-neutral text-neutral-content my-10">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <div role="tablist" className="tabs tabs-boxed">
          {/* Receive */}
          <a role="tab" className={`tab ${tab === 1 ? "tab-active" : ""}`} onClick={() => { handleTabs(1) }}>Empfangen</a>
          <div role="tabpanel" className="tab-content rounded-box p-6 mt-3">
            <ReceiveContent title={title}></ReceiveContent>
          </div>

          {/* Transmit */}
          <a role="tab" className={`tab ${tab === 2 ? "tab-active" : ""}`} onClick={() => { handleTabs(2) }}>Senden</a>
          <div role="tabpanel" className="tab-content rounded-box p-6 mt-3">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
