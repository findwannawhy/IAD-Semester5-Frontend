import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP.tsx'
import { Provider } from "react-redux"
import store from "./store"
import {registerSW} from "virtual:pwa-register"

if ("serviceWorker" in navigator) {
  registerSW()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)