
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormField from '../../components/FormField'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import { obtenerUsuarios, guardarUsuarios } from '../../utils/usuarios'
import { COMUNAS_POR_REGION } from '../../data/regiones'
import { normalizarRun, calcularEdad, runValido } from '../../utils/validacionesUsuario'

const VALORES_INICIALES = {
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
}

export default function AdminUsuarioForm() {
  const { run } = useParams()
  const navigate = useNavigate()
  const editando = Boolean(run)

  const [formulario, setFormulario] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  useEffect(() => {
    if (!editando) return

    const usuario = obtenerUsuarios().find(
      (item) => normalizarRun(item.run) === normalizarRun(decodeURIComponent(run))
    )

    if (!usuario) {
      setErrorGeneral('No se encontró el usuario que quieres editar.')
      return
    }

    setFormulario({
      ...VALORES_INICIALES,
      ...usuario,
      run: usuario.run,
      contrasena: '',
    })
  }, [editando, run])

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario((actual) => ({
      ...actual,
      [name]: name === 'run' ? normalizarRun(value) : value,
      ...(name === 'region' ? { comuna: '' } : {}),
    }))

    setErrores((actuales) => ({
      ...actuales,
      [name]: '',
    }))
    setErrorGeneral('')
  }

  function validar() {
    const nuevosErrores = {}
    const runNormalizado = normalizarRun(formulario.run)
    const correo = formulario.correo.trim().toLowerCase()
    const regiones = Object.keys(COMUNAS_POR_REGION)

    if (!runValido(runNormalizado)) {
      nuevosErrores.run = 'Ingresa un RUN válido, incluido su dígito verificador.'
    }

    const usuarios = obtenerUsuarios()
    const duplicado = usuarios.some(
      (usuario) =>
        normalizarRun(usuario.run) === runNormalizado &&
        normalizarRun(usuario.run) !== normalizarRun(run || '')
    )

    if (duplicado) {
      nuevosErrores.run = 'Ya existe un usuario registrado con ese RUN.'
    }

    if (!formulario.nombre.trim() || formulario.nombre.trim().length > 50) {
      nuevosErrores.nombre = 'El nombre es obligatorio y debe tener hasta 50 caracteres.'
    }

    if (!formulario.apellidos.trim() || formulario.apellidos.trim().length > 100) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios y deben tener hasta 100 caracteres.'
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) ||
      !['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'].some((dominio) =>
        correo.endsWith(dominio)
      ) ||
      correo.length > 100
    ) {
      nuevosErrores.correo = 'Ingresa un correo válido de Duoc, profesor Duoc o Gmail.'
    }

    if (usuarios.some((usuario) =>
      usuario.correo?.toLowerCase() === correo &&
      normalizarRun(usuario.run) !== normalizarRun(run || '')
    )) {
      nuevosErrores.correo = 'Ya existe un usuario con ese correo.'
    }

    if (!editando && (formulario.contrasena.length < 4 || formulario.contrasena.length > 10)) {
      nuevosErrores.contrasena = 'La contraseña debe tener entre 4 y 10 caracteres.'
    }

    if (editando && formulario.contrasena &&
      (formulario.contrasena.length < 4 || formulario.contrasena.length > 10)) {
      nuevosErrores.contrasena = 'La contraseña debe tener entre 4 y 10 caracteres.'
    }

    if (
      !formulario.fechaNacimiento ||
      calcularEdad(formulario.fechaNacimiento) < 18
    ) {
      nuevosErrores.fechaNacimiento = 'El usuario debe tener al menos 18 años.'
    }

    if (!regiones.includes(formulario.region)) {
      nuevosErrores.region = 'Selecciona una región.'
    }

    if (
      !formulario.comuna ||
      !COMUNAS_POR_REGION[formulario.region]?.includes(formulario.comuna)
    ) {
      nuevosErrores.comuna = 'Selecciona una comuna válida para la región.'
    }

    if (!formulario.direccion.trim() || formulario.direccion.trim().length > 300) {
      nuevosErrores.direccion = 'La dirección es obligatoria y debe tener hasta 300 caracteres.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    if (!validar()) return

    const usuarios = obtenerUsuarios()
    const runNormalizado = normalizarRun(formulario.run)

    const usuarioGuardado = {
      ...formulario,
      run: runNormalizado,
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      correo: formulario.correo.trim().toLowerCase(),
      contrasena: formulario.contrasena,
      direccion: formulario.direccion.trim(),
    }

    if (editando) {
      const original = usuarios.find(
        (usuario) =>
          normalizarRun(usuario.run) === normalizarRun(decodeURIComponent(run))
      )

      if (!original) {
        setErrorGeneral('No se encontró el usuario que quieres editar.')
        return
      }

      if (!usuarioGuardado.contrasena) {
        usuarioGuardado.contrasena = original.contrasena
      }

      guardarUsuarios(
        usuarios.map((usuario) =>
          normalizarRun(usuario.run) === normalizarRun(original.run)
            ? usuarioGuardado
            : usuario
        )
      )
    } else {
      guardarUsuarios([...usuarios, usuarioGuardado])
    }

    navigate('/admin/usuarios')
  }

  const regiones = Object.keys(COMUNAS_POR_REGION)
  const comunas = COMUNAS_POR_REGION[formulario.region] || []

  return (
    <section className="admin-content">
      <AdminPageHeader
        titulo={editando ? 'Editar usuario' : 'Nuevo usuario'}
        descripcion={
          editando
            ? 'Modifica los datos del usuario seleccionado.'
            : 'Completa los datos para registrar un usuario.'
        }
      />

      {errorGeneral && (
        <p className="alert alert-danger" role="alert">
          {errorGeneral}
        </p>
      )}

      <form onSubmit={manejarEnvio} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <FormField
              id="run"
              label="RUN"
              value={formulario.run}
              onChange={manejarCambio}
              maxLength={12}
              required
              error={errores.run}
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
              required
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
              maxLength={50}
              required
              error={errores.nombre}
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="apellidos"
              label="Apellidos"
              value={formulario.apellidos}
              onChange={manejarCambio}
              maxLength={100}
              required
              error={errores.apellidos}
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="correo"
              label="Correo electrónico"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              maxLength={100}
              required
              error={errores.correo}
            />
          </div>

          <div className="col-md-6">
            <FormField
              id="contrasena"
              label={editando ? 'Nueva contraseña (opcional)' : 'Contraseña'}
              type="password"
              value={formulario.contrasena}
              onChange={manejarCambio}
              minLength={4}
              maxLength={10}
              required={!editando}
              error={errores.contrasena}
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
              error={errores.fechaNacimiento}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="region">
              Región
            </label>
            <select
              id="region"
              name="region"
              className={`form-select ${errores.region ? 'is-invalid' : ''}`}
              value={formulario.region}
              onChange={manejarCambio}
              required
              aria-invalid={Boolean(errores.region)}
            >
              <option value="">Selecciona una región</option>
              {regiones.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errores.region && (
              <div className="invalid-feedback">{errores.region}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="comuna">
              Comuna
            </label>
            <select
              id="comuna"
              name="comuna"
              className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
              value={formulario.comuna}
              onChange={manejarCambio}
              required
              disabled={!formulario.region}
              aria-invalid={Boolean(errores.comuna)}
            >
              <option value="">Selecciona una comuna</option>
              {comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
            {errores.comuna && (
              <div className="invalid-feedback">{errores.comuna}</div>
            )}
          </div>

          <div className="col-12">
            <FormField
              id="direccion"
              label="Dirección"
              as="textarea"
              rows={3}
              value={formulario.direccion}
              onChange={manejarCambio}
              maxLength={300}
              required
              error={errores.direccion}
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
}
