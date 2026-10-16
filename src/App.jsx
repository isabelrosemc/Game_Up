import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Importaciones desde la subcarpeta ./pages/tienda/
import Home from './pages/tienda/Home'
import Nosotros from './pages/tienda/Nosotros'
import Eventos from './pages/tienda/Eventos'
import Blog from './pages/tienda/Blog'
import BlogDetalle1 from './pages/tienda/BlogDetalle1'
import BlogDetalle2 from './pages/tienda/BlogDetalle2'
import Contacto from './pages/tienda/Contacto'
import Catalogo from './pages/tienda/Catalogo'
import DetalleProducto from './pages/tienda/DetalleProducto'
import Carrito from './pages/tienda/Carrito'
import Login from './pages/tienda/Login'

import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductos from './pages/admin/AdminProductos'

function EnConstruccion() {
  return (
    <main className="main-container">
      <span className="section-tag">EN CONSTRUCCIÓN</span>
      <h1 className="main-section-title">Esta página aún no está migrada</h1>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Páginas públicas: conservan el layout de la tienda */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/1" element={<BlogDetalle1 />} />
        <Route path="/blog/2" element={<BlogDetalle2 />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Admin: independiente del layout de la tienda */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="productos">
          <Route index element={<AdminProductos />} />
          <Route path="nuevo" element={<EnConstruccion />} />
          <Route path="editar/:codigo" element={<EnConstruccion />} />
        </Route>

        <Route path="usuarios" element={<EnConstruccion />} />
      </Route>
      
      {/* Cualquier otra URL */}
      <Route path="*" element={<EnConstruccion />} />
    </Routes>
  )
}