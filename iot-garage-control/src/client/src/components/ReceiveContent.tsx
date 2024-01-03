import { IOTDataObjectType } from "../utils/types"
import { receiveData } from "../models/dataModels"
import useOnlineStatus from "../hooks/useOnlineStatus"
import useIOTContext from "../hooks/useIOTContext"
import useError from "../hooks/useErrorContext"
import SvgExclamationCircle from "../assets/exclamation-circle.svg?react"
import LoadingSpinner from "../components/LoadingSpinner"


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
        <SvgExclamationCircle className="text-error w-6 h-6" />
      )
    }
    else if (isLoading || isEmpty) {
      tdData = <LoadingSpinner />
    }
    else {
      tdData = iotData[dataHeadKey][dataKey]
    }

    return (
      <tr key={dataKey}>
        <th key={`${dataKey}-h`}>{row}</th>
        <td key={`${dataKey}-d`}>{tdData}</td>
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
