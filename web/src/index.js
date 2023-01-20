import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/es'
import '@formatjs/intl-pluralrules/locale-data/en'

import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import PaletteProvider from './context/themeContext'
import { AuthProvider } from './context/authContext'
import { HelmetProvider } from 'react-helmet-async'
import { IntlProvider } from 'react-intl'
import messagesEs from './translations/es'

const messages = {
  es: messagesEs
}

const language = navigator.language.split(/[-_]/)[0]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messages[language]}>
      <BrowserRouter>
        <PaletteProvider>
          <HelmetProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </HelmetProvider>
        </PaletteProvider>
      </BrowserRouter >
    </IntlProvider>
  </React.StrictMode >
)
