import { ReactElement, useState } from "react"


interface CardPropsType {
  title: string
  recContent?: ReactElement | null,
  transContent?: ReactElement | null,
}

function Card({ title, recContent, transContent }: CardPropsType) {
  const [state, setState] = useState(1);

  function handleTabs(value: number) {
    setState(value)
  }

  return (
    <div className="card w-96 bg-neutral text-neutral-content my-10">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <div role="tablist" className="tabs tabs-boxed">
          {/* Receive */}
          <a role="tab" className={`tab ${state === 1 ? "tab-active" : ""}`} onClick={() => { handleTabs(1) }}>Empfangen</a>
          <div role="tabpanel" className="tab-content rounded-box p-6 mt-3">
            {recContent}
          </div>

          {/* Transmit */}
          <a role="tab" className={`tab ${state === 2 ? "tab-active" : ""}`} onClick={() => { handleTabs(2) }}>Senden</a>
          <div role="tabpanel" className="tab-content rounded-box p-6 mt-3">
            {transContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card
