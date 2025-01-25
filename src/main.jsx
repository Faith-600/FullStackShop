import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import CartReducer from './Redux/CartReducer.jsx'
import { ErrorBoundary } from 'react-error-boundary'

const store = configureStore({
    reducer:{
        cart:CartReducer
    }
})


createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
  <StrictMode>
  <ErrorBoundary>
   <App />
   </ErrorBoundary>
    </StrictMode>
    </Provider>
)
