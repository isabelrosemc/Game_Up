
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import { obtenerUsuarios, guardarUsuarios } from '../../utils/usuarios'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')

  useEffect(() => {
    setUsuarios(obtenerUsuarios())
  }, [])

  function eliminarUsuario(run) {
    const confirmar = window.confirm(
      '¿Estás segura de que deseas eliminar este usuario?'
    )

    if (!confirmar) return

    const actualizados = usuarios.filter(
      (usuario) => usuario.run !== run
    )

    guardarUsuarios(actualizados)
    setUsuarios(actualizados)
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.trim().toLowerCase()

    const coincideBusqueda = [
      usuario.run,
      usuario.nombre,
      usuario.apellidos,
      usuario.correo,
    ].some((dato) => String(dato ?? '').toLowerCase().includes(texto))

    const coincideTipo =
      tipoFiltro === 'Todos' || usuario.tipoUsuario === tipoFiltro

    return coincideBusqueda && coincideTipo
  })

  return (
    <section className="admin-content">
      <AdminPageHeader
        titulo="Usuarios"
        descripcion="Administra los usuarios de Level-Up Gamer."
        textoBoton="+ Nuevo usuario"
        rutaBoton="/admin/usuarios/nuevo"
      />

      <div className="admin-toolbar">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar por RUN, nombre o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar usuarios"
        />

        <select
          className="form-select"
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
          aria-label="Filtrar por tipo de usuario"
        >
          <option value="Todos">Todos los tipos</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Cliente">Cliente</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.run}>
                  <td>{usuario.run}</td>
                  <td>{usuario.nombre} {usuario.apellidos}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.tipoUsuario}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/admin/usuarios/editar/${encodeURIComponent(usuario.run)}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarUsuario(usuario.run)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-muted">
        Usuarios registrados: {usuarios.length}
      </p>
    </section>
  )
}
