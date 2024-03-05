import React from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl'

import App from 'App'
import 'bootstrap/scss/bootstrap.scss'
import 'assets/scss/main.scss'
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css'

import en from './lang/en.json'
import { ToastContainer } from 'react-toastify'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
  <React.StrictMode>
    <IntlProvider messages={en} locale='en' defaultLocale='en'>
      <App />
    </IntlProvider>
    <ToastContainer stacked />
   </React.StrictMode>
  </>
)