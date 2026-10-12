import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// 1) Bootstrap para Admin
import 'bootstrap/dist/css/bootstrap.min.css'

// 2) Estilos globales para Tienda
import './styles/base.css'
import './styles/header-footer.css'
import './styles/tarjetas.css'
import './styles/editorial.css'
import './styles/home.css'
import './styles/formulario-simple.css'
import './styles/catalogo.css'
import './styles/detalle-producto.css'
import './styles/carrito-checkout.css'  

import { CarritoProvider } from './context/CarritoContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)