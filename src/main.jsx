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

// --- REPARACIÓN AUTOMÁTICA DE DATOS ---
// Importa tus datos originales con todas las imágenes y propiedades
import { productosIniciales } from './data/productos'
import { obtenerUsuarios } from './utils/usuarios'

// Si se limpió localStorage, restaura los productos completos con sus imágenes
if (!localStorage.getItem('levelupgamer_productos') && !localStorage.getItem('levelup_productos')) {
  localStorage.setItem('levelupgamer_productos', JSON.stringify(productosIniciales))
  localStorage.setItem('levelup_productos', JSON.stringify(productosIniciales))
}

// Ejecuta la lectura de usuarios: si no existen, los genera en localStorage
if (typeof obtenerUsuarios === 'function') {
  obtenerUsuarios()
}
// --------------------------------------

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