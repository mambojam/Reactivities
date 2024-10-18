import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './App/Layout/styles.css'
import App from './App/Layout/App'
import { store, StoreContext } from './App/stores/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}><App /></StoreContext.Provider>
  </StrictMode>,
)
