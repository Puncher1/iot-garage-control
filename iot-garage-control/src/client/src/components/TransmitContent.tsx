import { useCallback, useState } from "react"

import { transmitData } from "../models/dataModels"
import useErrorContext from "../hooks/useErrorContext"
import { ErrorMessages } from "../utils/constants"
import { ErrorType } from "../utils/enums"
import { stringFormat } from "../utils/helper.ts"
import SvgPaperAirplane from "../assets/paper-airline.svg?react"

import "../styles/TransmitContent.css"


interface TransmitContentType {
  title: string
}

function TransmitContent({ title }: TransmitContentType) {
  const model = transmitData[title]
  const enumType = model["enum"]
  const requestFunc = model["requestFunc"]

  const [option, setOption] = useState(enumType[0])
  const { setError } = useErrorContext()

  const handleRequest = useCallback(async (o: any) => {
    let isError: boolean = await requestFunc(option)
    if (isError) {
      setError(stringFormat(ErrorMessages.sending, `'${title}'`), ErrorType.sending)
    }
  }, [])

  const rows = model["rows"].map((row, i) => {
    const options = model["options"][i]
    const uniqueKeyPrefix = `${title}-${i}`
    return (
      <tr key={uniqueKeyPrefix}>
        <th key={`${uniqueKeyPrefix}-h`}>{row}</th>
        <td key={`${uniqueKeyPrefix}-d`}>
          <select
            className="select select-bordered w-full max-w-xs"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            {
              options.map((optionText, i) => (
                <option key={`${uniqueKeyPrefix}-d-${i}`} value={enumType[i]}>{optionText}</option>
              ))
            }
          </select>
        </td>
        <td key={`${title}-btn`}>
          <button className="btn-send" onClick={() => handleRequest(option)}>
            <SvgPaperAirplane className="text-primary w-6 h-6" />
          </button>
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

export default TransmitContent
