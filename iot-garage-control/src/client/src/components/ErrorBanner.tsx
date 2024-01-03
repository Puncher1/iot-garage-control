import { useEffect } from "react"

import { ErrorType } from "../utils/enums"
import useErrorContext from "../hooks/useErrorContext"
import useRetryContext from "../hooks/useRetryContext"
import useOnlineStatus from "../hooks/useOnlineStatus"
import { ErrorMessages } from "../utils/constants"
import SvgExclamationCircle from "../assets/exclamation-circle.svg?react"

import "./../styles/ErrorBanner.css"


export default function ErrorBanner() {
  const { error, setError, removeError } = useErrorContext()
  const { setRetry } = useRetryContext()
  const isOnline = useOnlineStatus()

  useEffect(() => {
    if (error) {
      if (!isOnline && error.type != ErrorType.offline) {
        setError(ErrorMessages.offline, ErrorType.offline)
      }
    }
    else {
      if (!isOnline) {
        setError(ErrorMessages.offline, ErrorType.offline)
      }
    }
  }, [])

  if (error) {
    let btnExtra = null
    if (error.type == ErrorType.connection) {
      btnExtra = <button className="btn btn-xs sm:btn-sm" onClick={() => { console.log("onClick"); setRetry() }}>Retry</button>
    }

    let bannerSizeClass   // TODO

    return (
      <div role="alert" className={`error-banner`}>
        <SvgExclamationCircle className="w-8 h-8" />
        <span className="error-message">{error.message}</span>
        {btnExtra}
      </div>
    )
  }
}
