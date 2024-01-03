import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"

import ErrorProvider from "./providers/ErrorProvider"
import IOTDataProvider from "./providers/IOTDataProvider"
import RetryProvider from "./providers/RetryProvider"
import Composer from "./providers/Composer"

import App from "./App.tsx"
import "./styles/main.css"


interface FallbackParamsType {
  error: any,
}

function Fallback({ error }: FallbackParamsType) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  )
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <QueryClientProvider client={queryClient}>
        <Composer components={[ErrorProvider, RetryProvider, IOTDataProvider]}>
          <App />
        </Composer>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
