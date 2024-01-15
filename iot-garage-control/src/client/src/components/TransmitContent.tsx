import { useState } from "react"

import { transmitData } from "../models/dataModels"
import useErrorContext from "../hooks/useErrorContext"
import { ErrorMessages } from "../utils/constants"
import { ErrorType } from "../utils/enums"
import { stringFormat } from "../utils/helper.ts"
import SvgPaperAirplane from "../assets/paper-airline.svg?react"
import LoadingSpinner from "./LoadingSpinner.tsx"
import useIOTContext from "../hooks/useIOTContext.ts"
import SvgCheckCircle from "../assets/check-circle.svg?react"

import "../styles/TransmitContent.css"


interface TransmitContentType {
  title: string
}

function TransmitContent({ title }: TransmitContentType) {
  const model = transmitData[title]
  const requestFunc = model["requestFunc"]

  const [option, setOption] = useState(0)
  const [spinner, setSpinner] = useState(false)
  const [success, setSuccess] = useState(false)

  const { isLoading: isReceivingLoading } = useIOTContext()
  const { error, setError } = useErrorContext()

  const handleRequest = async (o: number, i: number) => {
    const optionStr = model.options[i][o]
    const dataNum = model.dataMap.status[optionStr]

    setSpinner(true)
    await requestFunc(dataNum)
      .then((isError: boolean) => {
        setSpinner(false)

        if (isError) {
          setError(stringFormat(ErrorMessages.sending, `'${title}'`), ErrorType.sending)
        }
        else {
          setSuccess(true)
          setTimeout(() => setSuccess(false), 1 * 2000)
        }
      })
  }

  const disabled = spinner || (!!error && error.type != ErrorType.sending) || isReceivingLoading || success
  let btnIcon: React.ReactElement
  if (spinner) {
    btnIcon = <LoadingSpinner />
  }
  else if (success) {
    btnIcon = <SvgCheckCircle className="text-success w-6 h-6" />
  }
  else {
    btnIcon = <SvgPaperAirplane className={`svg-paper-airline ${disabled && "text-neutral"}`} />
  }

  const rows = model["rows"].map((row, i) => {
    const options = model.options[i]
    const uniqueKeyPrefix = `${title}-${i}`
    return (
      <tr key={uniqueKeyPrefix}>
        <th key={`${uniqueKeyPrefix}-h`}>{row}</th>
        <td key={`${uniqueKeyPrefix}-d`}>
          <select
            className="select select-bordered w-full max-w-xs"
            value={option}
            onChange={(e) => { setOption(+e.target.value) }}
          >
            {
              options.map((optionText, i) => (
                <option key={`${uniqueKeyPrefix}-d-${i}`} value={i}>{optionText}</option>
              ))
            }
          </select>
        </td>
        <td key={`${uniqueKeyPrefix}-d-btn`} className="btn-send-td">
          <button
            className="btn-send"
            onClick={() => handleRequest(option, i)}
            disabled={disabled}>
            {btnIcon}
          </button>
        </td>
      </tr >
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
