import { useState } from "react"

import { useIotData } from "./../../events/iotData"
import { recData } from "./../../datamodel"


interface RecContentType {
  title: string,
}

function RecContent({ title }: RecContentType) {
  // const { data: authData, isLoading: isLoadingAuth, error: errorAuth } = Auth.useData()

  // if (isLoadingAuth) return "Loading ..."
  // if (errorAuth) return `Error occurred: ${errorAuth.message}`

  const iotData = useIotData()

  if (iotData === null || Object.keys(iotData).length == 0) {
    return "Error: No data available"
  }

  let dataHeadKey = recData[title]["dataHeadKey"]
  let data: any | undefined
  if (title === "Authentifizierung") {
    data = iotData[dataHeadKey]
  }

  let model = recData[title]
  const rows = model["rows"].map((row, i) => {
    const dataKey = model["dataKeys"][i];
    return (
      <tr key={dataKey}>
        <th key={`${dataKey}_h`}>{row}</th>
        <td key={`${dataKey}_d`}>{data[dataKey]}</td>
      </tr>
    )
  })

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

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
            <RecContent title={title}></RecContent>
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
