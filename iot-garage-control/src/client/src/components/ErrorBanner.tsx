import { ErrorType } from "../utils/enums"
import useError from "../hooks/useError"
import useRetryState from "../hooks/useRetryState"
import useOnlineStatus from "../hooks/useOnlineStatus"
import { ErrorMessages } from "../utils/constants"

import "./../styles/ErrorBanner.css"


export default function ErrorBanner() {
  const { error, setError, removeError } = useError()
  const { setRetry } = useRetryState()
  const isOnline = useOnlineStatus()

  if (!isOnline) {
    setError(ErrorMessages.offline, ErrorType.offline)
  }

  if (!error) {
    return
  }

  let btnExtra = null
  if (error.type == ErrorType.receiving) {
    btnExtra = <button className="btn btn-xs sm:btn-sm" onClick={() => setRetry(true)}>Retry</button>
  }

  let bannerSizeClass   // TODO

  return (
    <div role="alert" className={`error-banner`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <span className="error-message">{error.message}</span>
      {btnExtra}
    </div>
  )
}
