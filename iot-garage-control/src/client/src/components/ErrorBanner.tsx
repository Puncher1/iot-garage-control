import { ErrorType } from "../utils/enums"

import "./../styles/ErrorBanner.css"


interface ErrorBannerPropsType {
  children: string,
  onRetry: Function,
  errorType: ErrorType | null,
  bannerSizeClass: string
}

export default function ErrorBanner({ children, onRetry, errorType, bannerSizeClass }: ErrorBannerPropsType) {
  return (
    <div role="alert" className={`error-banner ${bannerSizeClass}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <span className="error-message">{children}</span>
      {errorType == ErrorType.receiving &&
        <button className="btn btn-xs sm:btn-sm" onClick={() => onRetry(true)}>Retry</button>
      }
    </div>
  )
}
