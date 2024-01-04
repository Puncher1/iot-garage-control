import { useEffect } from "react"

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

  const handleCloseBtn = () => {
    removeError(ErrorType.sending)
  }

  if (error || !isOnline) {
    let errorType: ErrorType = ErrorType.unexpected
    let errorMessage: string = ErrorMessages.unexpected

    if (!isOnline) {
      errorType = ErrorType.offline
      errorMessage = ErrorMessages.offline
    }
    else if (error) {
      errorType = error.type
      errorMessage = error.message
    }

    let btnExtra = null
    if (errorType == ErrorType.connection) {
      btnExtra = <button className="btn btn-xs sm:btn-sm" onClick={() => setRetry()}>Retry</button>
    }
    else if (errorType == ErrorType.sending) {
      btnExtra = (
        <button className="btn-close" onClick={handleCloseBtn}>
          <SvgXMark className="w-6 h-6" />
        </button>
      )
    }

    let bannerSizeClass   // TODO

    return (
      <div role="alert" className={`error-banner`}>
        <SvgExclamationCircle className="w-8 h-8" />
        <span className="error-message">{errorMessage}</span>
        {btnExtra}
      </div>
    )
  }

}
