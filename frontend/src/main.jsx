import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { EmailProvider } from './context/EmailContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EmailProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </EmailProvider>
    </BrowserRouter>
  </StrictMode>,
)
