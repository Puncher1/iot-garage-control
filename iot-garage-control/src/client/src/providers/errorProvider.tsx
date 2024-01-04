import { useState } from "react"

import { ErrorObjType } from "../utils/types"
import ErrorContext from "../contexts/errorContext"
import { ErrorType } from "../utils/enums"
import { ErrorMessages } from "../utils/constants"


interface ErrorProvParamsType {
  children: React.ReactElement
}

export default function ErrorProvider({ children }: ErrorProvParamsType) {
  const [_error, _setError] = useState<ErrorObjType | null>(null)

  const removeError = (type: ErrorType) => {
    if (!type) {
      _setError(null)
    }
    else if (_error && type == _error.type) {
      _setError(null)
    }
  }
  const setError = (message: string, type: ErrorType) => {
    _setError({ message, type })
  }

  const contextValue = {
    error: _error,
    setError,
    removeError
  }

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  )
}