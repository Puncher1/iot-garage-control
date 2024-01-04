import { useEffect, useState } from "react"

import { ErrorType } from "../utils/enums"
import useErrorContext from "../hooks/useErrorContext"
import useRetryContext from "../hooks/useRetryContext"
import useOnlineStatus from "../hooks/useOnlineStatus"
import { ErrorMessages } from "../utils/constants"
import SvgExclamationCircle from "../assets/exclamation-circle.svg?react"
import SvgXMark from "../assets/x-mark.svg?react"

import "./../styles/ErrorBanner.css"


export default function ErrorBanner() {
  const { error, removeError } = useErrorContext()
  const { setRetry } = useRetryContext()
  const isOnline = useOnlineStatus()

  const [isDisplay, setIsDisplay] = useState(false)
  const [commonError, setCommonError] = useState({ message: ErrorMessages.unexpected, type: ErrorType.unexpected })

  useEffect(() => {
    if (error || !isOnline) {
      if (!isOnline) {
        setCommonError({ message: ErrorMessages.offline, type: ErrorType.offline })
      }
      else if (error) {
        setCommonError({ message: error.message, type: error.type })
      }
      setIsDisplay(true)
    }
    else {
      setIsDisplay(false)
    }
  }, [error, isOnline])

  const handleCloseBtn = () => {
    removeError(ErrorType.sending)
  }

  let btnExtra = null
  if (commonError.type == ErrorType.connection) {
    btnExtra = <button className="btn btn-xs sm:btn-sm" onClick={() => setRetry()}>Retry</button>
  }
  else if (commonError.type == ErrorType.sending) {
    btnExtra = (
      <button className="btn-close" onClick={handleCloseBtn}>
        <SvgXMark className="w-6 h-6" />
      </button>
    )
    setTimeout(handleCloseBtn, 4 * 1000)
  }

  return (
    <div role="alert"
      className={`error-banner transition-all duration-200 ${isDisplay ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <SvgExclamationCircle className="w-8 h-8" />
      <span className="error-message">{commonError.message}</span>
      {btnExtra}
    </div>
  )
}
