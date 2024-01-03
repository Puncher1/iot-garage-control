import { useState } from "react"
import RetryContext from "../contexts/retryContext"


interface RetryProvParamsType {
  children: React.ReactElement
}


export default function RetryProvider({ children }: RetryProvParamsType) {
  const [_retry, _setRetry] = useState<boolean>(true)

  const resetRetry = () => { _setRetry(false) }
  const setRetry = () => { _setRetry(true) }

  const contextValue = {
    retry: _retry,
    setRetry,
    resetRetry
  }

  return (
    <RetryContext.Provider value={contextValue}>
      {children}
    </RetryContext.Provider>
  )
}
