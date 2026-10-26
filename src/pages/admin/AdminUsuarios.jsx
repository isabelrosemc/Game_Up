import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const USUARIOS_STORAGE_KEY = 'levelupgamer_usuarios'

const USUARIOS_INICIALES = [
  {
    run: '11.111.111-1',
    nombre: 'Camila',
    apellidos: 'Reyes Muñoz',
    correo: 'camila.reyes@duoc.cl',
    tipoUsuario: 'Administrador',
    region: 'Metropolitana de Santiago',
    comuna: 'Providencia',
    descuentoDuoc: true,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '22.222.222-2',
    nombre: 'Diego',
    apellidos: 'Fernández Soto',
    correo: 'diego.fernandez@gmail.com',
    tipoUsuario: 'Vendedor',
    region: 'Valparaíso',
    comuna: 'Viña del Mar',
    descuentoDuoc: false,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '15.678.234-3',
    nombre: 'Javiera',
    apellidos: 'Muñoz Rojas',
    correo: 'javiera.munoz@profesor.duoc.cl',
    tipoUsuario: 'Vendedor',
    region: 'Biobío',
    comuna: 'Concepción',
    descuentoDuoc: true,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '20.301.456-2',
    nombre: 'Matías',
    apellidos: 'López Contreras',
    correo: 'matias.lopez@gmail.com',
    tipoUsuario: 'Cliente',
    region: 'Metropolitana de Santiago',
    comuna: 'Maipú',
    descuentoDuoc: false,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '9.876.543-3',
    nombre: 'Fernanda',
    apellidos: 'Torres Vidal',
    correo: 'fernanda.torres@duoc.cl',
    tipoUsuario: 'Cliente',
    region: 'Valparaíso',
    comuna: 'Quilpué',
    descuentoDuoc: true,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '8.765.432-K',
    nombre: 'Benjamín',
    apellidos: 'Castro Araya',
    correo: 'benjamin.castro@gmail.com',
    tipoUsuario: 'Cliente',
    region: 'La Araucanía',
    comuna: 'Temuco',
    descuentoDuoc: false,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '17.234.567-0',
    nombre: 'Antonia',
    apellidos: 'Fuentes Silva',
    correo: 'antonia.fuentes@gmail.com',
    tipoUsuario: 'Cliente',
    region: 'Coquimbo',
    comuna: 'La Serena',
    descuentoDuoc: false,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
  {
    run: '6.543.210-2',
    nombre: 'Ignacio',
    apellidos: 'Pérez Vega',
    correo: 'ignacio.perez@duoc.cl',
    tipoUsuario: 'Vendedor',
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    descuentoDuoc: true,
    contrasena: '',
    fechaNacimiento: '',
    direccion: '',
  },
]

function obtenerUsuariosIniciales() {
  try {
    const guardados = localStorage.getItem(USUARIOS_STORAGE_KEY)

    if (guardados !== null) {
      const usuarios = JSON.parse(guardados)
      return Array.isArray(usuarios) ? usuarios : USUARIOS_INICIALES
    }

    localStorage.setItem(
      USUARIOS_STORAGE_KEY,
      JSON.stringify(USUARIOS_INICIALES),
    )
  } catch (error) {
    console.error('No se pudieron cargar los usuarios:', error)
  }

  return USUARIOS_INICIALES
}

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(obtenerUsuariosIniciales)

  useEffect(() => {
    try {
      localStorage.setItem(
        USUARIOS_STORAGE_KEY,
        JSON.stringify(usuarios),
      )
    } catch (error) {
      console.error('No se pudieron guardar los usuarios:', error)
    }
  }, [usuarios])

  function eliminarUsuario(run) {
    const confirmado = window.confirm(
      '¿Estás segura de que deseas eliminar este usuario?',
    )

    if (!confirmado) return

    setUsuarios((actuales) =>
      actuales.filter((usuario) => usuario.run !== run),
    )
  }

  return (
    <>
      <header className="admin-topbar">
        <h1>Usuarios</h1>

        <div className="lista-admin__topbar-acciones">
          <Link
            to="/admin/usuarios/nuevo"
            className="boton boton-primario"
          >
            + Nuevo usuario
          </Link>
        </div>
      </header>

      <section className="lista-admin__contenedor">
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre completo</th>
              <th>Correo</th>
              <th>Tipo de usuario</th>
              <th>Región</th>
              <th>Comuna</th>
              <th>Descuento DUOC</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>
                  {[usuario.nombre, usuario.apellidos]
                    .filter(Boolean)
                    .join(' ')}
                </td>
                <td>{usuario.correo}</td>
                <td>{usuario.tipoUsuario}</td>
                <td>{usuario.region}</td>
                <td>{usuario.comuna}</td>
                <td>
                  {usuario.descuentoDuoc === true ||
                  usuario.descuentoDuoc === 'Sí'
                    ? 'Sí'
                    : 'No'}
                </td>
                <td className="tabla-admin__acciones">
                  <Link
                    to={`/admin/usuarios/editar/${encodeURIComponent(usuario.run)}`}
                    className="boton"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    className="boton boton-peligro"
                    onClick={() => eliminarUsuario(usuario.run)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {usuarios.length === 0 && (
              <tr>
                <td colSpan="8">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}