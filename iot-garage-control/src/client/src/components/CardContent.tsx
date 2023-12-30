import { useContext, useEffect } from "react"

import { IOTDataContext, IOTDatatIsErrorContext } from "./../contexts/iotDataContext"
import { IotDataObjectType } from "../utils/types"
import { recData } from "../models/dataModels"

import "../styles/CardContent.css"


interface ReceiveContentType {
  title: string
}

function ReceiveContent({ title }: ReceiveContentType) {
  const iotDataObj: IotDataObjectType = useContext(IOTDataContext)
  const iotData = iotDataObj.iotData
  const error = iotDataObj.error
  const isLoading = iotData.isLoading

  let isEmpty = false
  if (iotData === null || Object.keys(iotData).length == 0) {
    isEmpty = true
  }

  let dataHeadKey = recData[title]["dataHeadKey"]
  let model = recData[title]
  const rows = model["rows"].map((row, i) => {
    const dataKey = model["dataKeys"][i]

    let tdData: any
    if (error) {
      tdData = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      )
    }
    else if (isLoading || isEmpty) {
      tdData = <span className="loading loading-spinner loading-md"></span>
    }
    else {
      tdData = iotData[dataHeadKey][dataKey]
    }

    return (
      <tr key={dataKey}>
        <th key={`${dataKey}_h`}>{row}</th>
        <td key={`${dataKey}_d`}>{tdData}</td>
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
