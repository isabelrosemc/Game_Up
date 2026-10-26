import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import '../../styles/panel-admin.css'
import '../../styles/lista-admin.css'
import '../../styles/producto-usuario.css'

export default function AdminLayout() {
  const { esAdmin, cerrarSesion } = useAuth()

  if (!esAdmin) {
    return (
      <main className="main-container">
        <h1>Acceso reservado a administradores</h1>
        <p>Inicia sesión con una cuenta de administrador para entrar al panel.</p>
        <Link to="/login">Iniciar sesión</Link>
      </main>
    )
  }

  return (
    <div className="admin-layout" data-bs-theme="dark">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__marca">
          <Link to="/admin" aria-label="Inicio del panel de administración">
            <img
              src="/img/img-index/logo1.png"
              alt="Level-Up Gamer"
            />
          </Link>
        </div>

        <nav className="admin-nav">
          <ul>
            <li>
              <NavLink to="/admin" end>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/productos">
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/usuarios">
                Usuarios
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar__pie">
          <Link to="/">Volver a la tienda</Link>
          <Link to="/login" onClick={cerrarSesion}>Cerrar sesión</Link>
        </div>
      </aside>

      <main className="admin-contenido">
        <Outlet />
      </main>
    </div>
  )
}