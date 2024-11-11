import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import RootLayout from './RootLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootLayout>
      {/* <App /> */}
      
    </RootLayout>
  </StrictMode>,
)
