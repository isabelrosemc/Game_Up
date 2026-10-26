import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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
import Registro from './pages/tienda/Registro'
import Checkout from './pages/tienda/Checkout'
import CompraExitosa from './pages/tienda/CompraExitosa'
import CompraFallida from './pages/tienda/CompraFallida'

import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductos from './pages/admin/AdminProductos'
import AdminProductoForm from './pages/admin/AdminProductoForm'
import AdminUsuarios from './pages/admin/AdminUsuarios'
import AdminUsuarioForm from './pages/admin/AdminUsuarioForm'

function NoEncontrada() {
  return <main className="main-container"><h1>Página no encontrada</h1></main>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/1" element={<BlogDetalle1 />} />
        <Route path="blog/2" element={<BlogDetalle2 />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="productos" element={<Catalogo />} />
        <Route path="productos/:codigo" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="compra/exitosa" element={<CompraExitosa />} />
        <Route path="compra/fallida" element={<CompraFallida />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<AdminProductoForm />} />
        <Route path="productos/editar/:codigo" element={<AdminProductoForm />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<AdminUsuarioForm />} />
        <Route path="usuarios/editar/:run" element={<AdminUsuarioForm />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}
