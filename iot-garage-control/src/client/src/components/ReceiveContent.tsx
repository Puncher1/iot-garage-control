import { IOTDataObjectType } from "../utils/types"
import { receiveData } from "../models/dataModels"
import useOnlineStatus from "../hooks/useOnlineStatus"
import useIOTContext from "../hooks/useIOTContext"
import useError from "../hooks/useError"


interface ReceiveContentType {
  title: string
}

function ReceiveContent({ title }: ReceiveContentType) {
  const isOnline = useOnlineStatus()
  const iotDataObj: IOTDataObjectType = useIOTContext()
  const iotData = iotDataObj.data
  const isLoading = iotDataObj.isLoading
  const { error } = useError()

  let isEmpty = false
  if (iotData === null || Object.keys(iotData).length == 0) {
    isEmpty = true
  }

  let dataHeadKey = receiveData[title]["dataHeadKey"]
  let model = receiveData[title]
  const rows = model["rows"].map((row, i) => {
    const dataKey = model["dataKeys"][i]

    let tdData: any
    if (error || !isOnline) {
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
