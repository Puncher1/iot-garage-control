import { receiveData } from "../models/dataModels"
import useIOTContext from "../hooks/useIOTContext"
import useError from "../hooks/useErrorContext"
import SvgExclamationCircle from "../assets/exclamation-circle.svg?react"
import LoadingSpinner from "../components/LoadingSpinner"
import { ErrorType } from "../utils/enums"


interface ReceiveContentType {
  title: string
}

function ReceiveContent({ title }: ReceiveContentType) {
  const { data: iotData, isLoading } = useIOTContext()
  const { error } = useError()

  let isEmpty = false
  if (iotData === null || Object.keys(iotData).length == 0) {
    isEmpty = true
  }

  let dataHeadKey = receiveData[title]["dataHeadKey"]
  let model = receiveData[title]
  const rows = model["rows"].map((row, i) => {
    const dataKey = model["dataKeys"][i]
    let dataMap = null
    if (dataKey in model["dataMap"]) {
      dataMap = model["dataMap"][dataKey]
    }

    let tdData: any
    if (error && error.type != ErrorType.sending) {
      tdData = (
        <SvgExclamationCircle className="text-error w-6 h-6" />
      )
    }
    else if (isLoading || isEmpty) {
      tdData = <LoadingSpinner />
    }
    else {
      if (dataMap) {
        tdData = dataMap[iotData[dataHeadKey][dataKey]]
      }
      else {
        tdData = iotData[dataHeadKey][dataKey]
      }
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
