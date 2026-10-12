import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Estructura común a todas las páginas de la tienda: menú + contenido + pie.
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}