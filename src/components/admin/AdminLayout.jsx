import { NavLink, Outlet, Link } from 'react-router-dom'

import '../../styles/panel-admin.css'
import '../../styles/lista-admin.css'
import '../../styles/producto-usuario.css'

export default function AdminLayout() {
  return (
    <div className="admin-layout">
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
          <Link to="/admin/perfil">Perfil</Link>
          <Link to="/login">Cerrar sesión</Link>
        </div>
      </aside>

      <main className="admin-contenido">
        <Outlet />
      </main>
    </div>
  )
}