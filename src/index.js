import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import PaletteProvider from './context/themeContext'
import { AuthProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PaletteProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PaletteProvider>
    </BrowserRouter >

  </React.StrictMode >
)
