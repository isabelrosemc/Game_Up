import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Nosotros from './pages/Nosotros'
import Eventos from './pages/Eventos'
import Blog from './pages/Blog'
import BlogDetalle1 from './pages/BlogDetalle1'
import BlogDetalle2 from './pages/BlogDetalle2'
import Contacto from './pages/Contacto'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Login from './pages/Login'

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