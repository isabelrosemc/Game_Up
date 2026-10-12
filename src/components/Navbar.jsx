import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

const ENLACES = [
  { to: '/', texto: 'Home', end: true },
  { to: '/productos', texto: 'Catálogo' },
  { to: '/blog', texto: 'Blog' },
  { to: '/eventos', texto: 'Eventos' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/contacto', texto: 'Contacto' },
]

export default function Navbar() {
  // Estado: ¿está abierto el menú en pantallas pequeñas?
  const [abierto, setAbierto] = useState(false)
  const { cantidadTotal } = useCarrito()
  const { usuario, cerrarSesion } = useAuth()
  const navegar = useNavigate()
  const cerrarMenu = () => setAbierto(false)
  const salir = () => {
    cerrarSesion()
    cerrarMenu()
    navegar('/')
  }

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={cerrarMenu}>
            <img className="img-box img-s" src="/img/img-index/logo.png" alt="Level-Up Gamer Logo" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Mostrar u ocultar menú"
          onClick={() => setAbierto(!abierto)}
        >
          ☰
        </button>

        <div id="menu-principal" className={`menu-colapsable${abierto ? ' abierto' : ''}`}>
          <nav className="main-nav" aria-label="Navegación principal">
            <ul className="main-nav-list">
              {ENLACES.map((enlace) => (
                <li key={enlace.to}>
                  <NavLink to={enlace.to} end={enlace.end} onClick={cerrarMenu}>
                    {enlace.texto}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link
              to="/carrito"
              className="cart-icon"
              aria-label={cantidadTotal > 0 ? `Carrito (${cantidadTotal})` : 'Carrito'}
              onClick={cerrarMenu}
            >
              🛒
              {cantidadTotal > 0 && <span className="cart-count">{cantidadTotal}</span>}
            </Link>
            {usuario ? (
              <>
                <span className="user-name">Hola, {usuario.nombre}</span>
                <button type="button" className="btn-add" onClick={salir}>Salir</button>
              </>
            ) : (
              <Link to="/login" className="user-icon" aria-label="Mi cuenta" onClick={cerrarMenu}>👤</Link>
            )}
            <div className="points-badge">0 PTS - Mi Cuenta</div>
          </div>
        </div>
      </div>
    </header>
  )
}