import { useState } from "react"

import { recRows } from "./rowsData"

function RecContent({ title }: { title: string }) {
  const rows = recRows[title].map((row) =>
    <tr>
      <th>{row}:</th>
      <td>DATA_HERE</td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>

  );
}

function Card({ title }: { title: string }) {
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
            <RecContent title={title}></RecContent>
          </div>

          {/* Transmit */}
          <a role="tab" className={`tab ${state === 2 ? "tab-active" : ""}`} onClick={() => { handleTabs(2) }}>Senden</a>
          <div role="tabpanel" className="tab-content rounded-box p-6 mt-3">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Card
