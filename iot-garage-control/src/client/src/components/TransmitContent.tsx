import { transmitData } from "../models/dataModels"
import "../styles/TransmitContent.css"


interface TransmitContentType {
  title: string
}

function TransmitContent({ title }: TransmitContentType) {
  let model = transmitData[title]
  const rows = model["rows"].map((row, i) => {
    const options = model["options"][i]
    return (
      <tr key={title}>
        <th key={`${title}_h`}>{row}</th>
        <td key={`${title}_d`}>
          <select className="select select-bordered w-full max-w-xs">
            {
              options.map((optionText) => (
                <option>{optionText}</option>
              ))
            }
          </select>
        </td>
        <td key={`${title}_btn`}>
          <button className="btn-send">
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
