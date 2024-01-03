import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ErrorProvider from "./providers/ErrorProvider"
import IOTDataProvider from "./providers/IOTDataProvider"
import RetryProvider from "./providers/RetryProvider"
import Composer from "./providers/Composer"

import App from "./App.tsx"
import "./styles/main.css"


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Composer components={[ErrorProvider, RetryProvider, IOTDataProvider]}>
        <App />
      </Composer>
    </QueryClientProvider>
  </React.StrictMode>
)
