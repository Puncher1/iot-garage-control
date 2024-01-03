import { useCallback, useState } from "react"

import { transmitData } from "../models/dataModels"
import useErrorContext from "../hooks/useErrorContext"
import { ErrorMessages } from "../utils/constants"
import { ErrorType } from "../utils/enums"
import { stringFormat } from "../utils/helper.ts"
import SvgPaperAirplane from "../assets/paper-airline.svg?react"
import LoadingSpinner from "./LoadingSpinner.tsx"
import useIOTContext from "../hooks/useIOTContext.ts"

import "../styles/TransmitContent.css"


interface TransmitContentType {
  title: string
}

function TransmitContent({ title }: TransmitContentType) {
  const model = transmitData[title]
  const enumType = model["enum"]
  const requestFunc = model["requestFunc"]

  const [option, setOption] = useState(enumType[0])
  const [spinner, setSpinner] = useState(false)
  console.log(`option: ${option}`)
  const { isLoading: isReceivingLoading } = useIOTContext()
  const { error, setError } = useErrorContext()

  const handleRequest = useCallback(async (o: string) => {
    setSpinner(true)
    await requestFunc(o)
      .then((isError: boolean) => {
        setSpinner(false)
        if (isError) {
          setError(stringFormat(ErrorMessages.sending, `'${title}'`), ErrorType.sending)
        }
      })
  }, [])

  const disabled = spinner || !!error || isReceivingLoading
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
            onChange={(e) => { /*console.log(e.target.value, typeof (e.target.value));*/ setOption(e.target.value) }}
          >
            {
              options.map((optionText, i) => (
                <option key={`${uniqueKeyPrefix}-d-${i}`} value={enumType[i]}>{optionText}</option>
              ))
            }
          </select>
        </td>
        <td key={`${uniqueKeyPrefix}-d-btn`} className="btn-send-td">
          <button className="btn-send" onClick={() => handleRequest(option)} disabled={disabled}>
            {spinner ?
              <LoadingSpinner />
              :
              <SvgPaperAirplane
                className={`svg-paper-airline ${disabled && "text-neutral"}`}
              />
            }
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
