import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store, persistedStore } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <App />
          <Toaster/>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)