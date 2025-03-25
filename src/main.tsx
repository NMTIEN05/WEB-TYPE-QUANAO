import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ShoppingContextProvider } from './competdents/layout/contexts.tsx/ShoppingContext.tsx'
import Cart from './competdents/layout/clinet/Cart.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
<ShoppingContextProvider>
<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
</ShoppingContextProvider>




  
)
