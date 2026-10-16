import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormField from '../FormField'
import { obtenerUsuarios, guardarUsuarios } from '../../utils/usuarios'

export default function AdminUsuarioForm() {
  const { run } = useParams()
  const navigate = useNavigate()
  const editando = Boolean(run)

  const [formulario, setFormulario] = useState({
    run: '',
    tipoUsuario: 'Cliente',
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (!editando) return

    const usuario = obtenerUsuarios().find((item) => item.run === run)

    if (!usuario) {
      setError('No se encontró el usuario.')
      return
    }

    setFormulario({ ...usuario, contrasena: '' })
  }, [editando, run])

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
    setError('')
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const usuarios = obtenerUsuarios()

    if (
      !formulario.run.trim() ||
      !formulario.nombre.trim() ||
      !formulario.apellidos.trim() ||
      !formulario.correo.trim() ||
      !formulario.fechaNacimiento ||
      !formulario.region.trim() ||
      !formulario.comuna.trim() ||
      !formulario.direccion.trim()
    ) {
      setError('Completa todos los campos obligatorios.')
      return
    }

    if (!editando && !formulario.contrasena) {
      setError('Ingresa una contraseña.')
      return
    }

    const existe = usuarios.some(
      (usuario) => usuario.run === formulario.run.trim() && usuario.run !== run
    )

    if (existe) {
      setError('Ya existe un usuario con ese RUN.')
      return
    }

    const usuarioGuardado = {
      ...formulario,
      run: formulario.run.trim(),
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      correo: formulario.correo.trim().toLowerCase(),
      direccion: formulario.direccion.trim(),
    }

    if (editando) {
      const original = usuarios.find((usuario) => usuario.run === run)

      if (!original) {
        setError('No se encontró el usuario.')
        return
      }

      if (!usuarioGuardado.contrasena) {
        usuarioGuardado.contrasena = original.contrasena
      }

      guardarUsuarios(
        usuarios.map((usuario) =>
          usuario.run === run ? usuarioGuardado : usuario
        )
      )
    } else {
      guardarUsuarios([...usuarios, usuarioGuardado])
    }

    navigate('/admin/usuarios')
  }

  return (
    <section className="admin-content">
      <h1>{editando ? 'Editar usuario' : 'Nuevo usuario'}</h1>

      {error && <p className="alert alert-danger">{error}</p>}

      <form onSubmit={manejarEnvio}>
        <div className="row g-3">
          <div className="col-md-6">
            <FormField
              id="run"
              label="RUN"
              value={formulario.run}
              onChange={manejarCambio}
              required
              disabled={editando}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="tipoUsuario">
              Tipo de usuario
            </label>
            <select
              id="tipoUsuario"
              name="tipoUsuario"
              className="form-select"
              value={formulario.tipoUsuario}
              onChange={manejarCambio}
            >
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div className="col-md-6">
            <FormField
              id="nombre"
              label="Nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="apellidos"
              label="Apellidos"
              value={formulario.apellidos}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="correo"
              label="Correo electrónico"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="contrasena"
              label={editando ? 'Nueva contraseña (opcional)' : 'Contraseña'}
              type="password"
              value={formulario.contrasena}
              onChange={manejarCambio}
              required={!editando}
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="fechaNacimiento"
              label="Fecha de nacimiento"
              type="date"
              value={formulario.fechaNacimiento}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="region"
              label="Región"
              value={formulario.region}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="comuna"
              label="Comuna"
              value={formulario.comuna}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="col-12">
            <FormField
              id="direccion"
              label="Dirección"
              as="textarea"
              rows={3}
              value={formulario.direccion}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            {editando ? 'Guardar cambios' : 'Crear usuario'}
          </button>

          <Link to="/admin/usuarios" className="btn btn-outline-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )