import { useContext } from "react"

import IOTDataContext from "./../contexts/iotDataContext"
import { recData } from "../models/dataModels"


interface ReceiveContentType {
  title: string
}

function ReceiveContent({ title }: ReceiveContentType) {
  // const { data: authData, isLoading: isLoadingAuth, error: errorAuth } = Auth.useData()

  // if (isLoadingAuth) return "Loading ..."
  // if (errorAuth) return `Error occurred: ${errorAuth.message}`

  const iotData = useContext(IOTDataContext)

  let isLoading = false
  if (iotData === null || Object.keys(iotData).length == 0) {
    isLoading = true
  }

  let dataHeadKey = recData[title]["dataHeadKey"]
  let data: Record<string, any>
  if (!isLoading) {
    data = iotData[dataHeadKey]
  }

  let model = recData[title]
  const rows = model["rows"].map((row, i) => {
    const dataKey = model["dataKeys"][i];
    return (
      <tr key={dataKey}>
        <th key={`${dataKey}_h`}>{row}</th>
        <td key={`${dataKey}_d`}>
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            data[dataKey]
          )}
        </td>
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

export default ReceiveContent
