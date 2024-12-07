import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'sweetalert2/src/sweetalert2.scss'
import 'core-js'

import App from './App'
import store from './store'
import { ContextProvider } from './context/Context'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>,
)
