import { ErrorType } from "../utils/enums"

import "./../styles/ErrorBanner.css"


interface ErrorBannerPropsType {
  children: string,
  onRetry: Function,
  errorType: ErrorType | null
}

export default function ErrorBanner({ children, onRetry, errorType }: ErrorBannerPropsType) {
  return (
    <div role="alert" className="error-banner">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-7 w-7" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span className="error-message">{children}</span>
      {errorType == ErrorType.unexpected &&
        <button className="btn btn-xs sm:btn-sm" onClick={() => onRetry(true)}>Retry</button>
      }
    </div>
  )
}
