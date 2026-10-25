import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/FormField'
import RegionComuna from '../components/RegionComuna'
import Aviso from '../components/Aviso'
import { guardarUsuarios, obtenerUsuarios } from '../utils/usuarios'

const VALORES_INICIALES = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  contrasena: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
}

export default function Registro() {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [mensaje, setMensaje] = useState('')

  // Actualiza un campo del formulario (formulario controlado)
  const cambiarCampo = (campo, valor) => {
    setValores((previos) => ({ ...previos, [campo]: valor }))
  }
  const manejarCambio = (evento) => cambiarCampo(evento.target.name, evento.target.value)

  // Función que guarda el usuario nuevo. Hoy usa localStorage (datos simulados).
  const guardarUsuario = async (usuario) => {
    // EVALUACIÓN 3: reemplazar por la llamada al backend (confirmar la ruta con el equipo de backend)
    // await axios.post('URL_DEL_BACKEND/usuarios', usuario)
    guardarUsuarios([...obtenerUsuarios(), usuario])
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    await guardarUsuario({
      run: valores.run.trim().toUpperCase(),
      tipoUsuario: 'Cliente', // quien se registra desde la tienda siempre es Cliente
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim().toLowerCase(),
      contrasena: valores.contrasena,
      fechaNacimiento: valores.fechaNacimiento,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    })
    setValores(VALORES_INICIALES)
    setMensaje('Cuenta creada con éxito')
  }

  return (
    <main className="auth-section">
      <div className="auth-header">
        <span className="auth-tag">[ LEVEL-UP GAMER · REGISTRO ]</span>
        <h1>Crear cuenta</h1>
        <p>Regístrate para realizar compras y acceder a nuestros productos.</p>
      </div>

      <form className="form-card" onSubmit={manejarEnvio}>
        <FormField
          id="run"
          label="RUN"
          obligatorio
          ayuda="Sin puntos ni guion. Entre 7 y 9 caracteres."
          type="text"
          placeholder="19011022K"
          minLength={7}
          maxLength={9}
          value={valores.run}
          onChange={manejarCambio}
        />
        <FormField
          id="nombre"
          label="Nombre"
          obligatorio
          type="text"
          placeholder="Ingresa tu nombre"
          maxLength={50}
          value={valores.nombre}
          onChange={manejarCambio}
        />
        <FormField
          id="apellidos"
          label="Apellidos"
          obligatorio
          type="text"
          placeholder="Ingresa tus apellidos"
          maxLength={100}
          value={valores.apellidos}
          onChange={manejarCambio}
        />
        <FormField
          id="correo"
          label="Correo electrónico"
          obligatorio
          ayuda="Solo @duoc.cl, @profesor.duoc.cl o @gmail.com."
          type="email"
          placeholder="correo@duoc.cl"
          maxLength={100}
          value={valores.correo}
          onChange={manejarCambio}
        />
        <FormField
          id="contrasena"
          label="Contraseña"
          obligatorio
          ayuda="Entre 4 y 10 caracteres."
          type="password"
          placeholder="Crea una contraseña"
          minLength={4}
          maxLength={10}
          value={valores.contrasena}
          onChange={manejarCambio}
        />
        <FormField
          id="fechaNacimiento"
          label="Fecha de nacimiento"
          obligatorio
          ayuda="Debes ser mayor de 18 años."
          type="date"
          value={valores.fechaNacimiento}
          onChange={manejarCambio}
        />

        <RegionComuna region={valores.region} comuna={valores.comuna} onChange={cambiarCampo} />

        <FormField
          id="direccion"
          label="Dirección"
          obligatorio
          type="text"
          placeholder="Ingresa tu dirección"
          maxLength={300}
          value={valores.direccion}
          onChange={manejarCambio}
        />

        <button type="submit" className="btn-form-primary">Registrarse</button>

        <hr className="form-divider" />

        <p className="form-footer-text">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </form>

      <Aviso mensaje={mensaje} onCerrar={() => setMensaje('')} />
    </main>
  )
}