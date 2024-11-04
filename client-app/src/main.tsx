import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './App/Layout/styles.css'
import { store, StoreContext } from './App/stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/router/Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router}/>
    </StoreContext.Provider>
  </StrictMode>,
)
