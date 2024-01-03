import { ChangeEventHandler, useState } from "react"

import { transmitData } from "../models/dataModels"
import { editGateControl } from "../services/api/client"

import "../styles/TransmitContent.css"


interface TransmitContentType {
  title: string
}

function TransmitContent({ title }: TransmitContentType) {
  const model = transmitData[title]
  const enumType = model["enum"]
  const requestFunc = model["requestFunc"]

  const [option, setOption] = useState(enumType[0])

  async function handleRequest(o: any) {
    let isError: boolean = await requestFunc(option)

  }

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
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
