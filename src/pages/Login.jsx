import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { obtenerUsuarios } from '../utils/usuarios'

export default function Login() {
  const navegar = useNavigate()
  const { iniciarSesion } = useAuth()

  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [verClave, setVerClave] = useState(false)
  const [recordar, setRecordar] = useState(true)
  const [error, setError] = useState('')

  // Función que busca un usuario con ese correo y esa contraseña
  const autenticar = async (correoIngresado, claveIngresada) => {
    // EVALUACIÓN 3: reemplazar por la llamada al backend (confirmar la ruta con el equipo de backend)
    // const respuesta = await axios.post('URL_DEL_BACKEND/login', { correo: correoIngresado, clave: claveIngresada })
    // return respuesta.data
    const usuarios = obtenerUsuarios()
    return usuarios.find((u) => u.correo === correoIngresado && u.contrasena === claveIngresada) ?? null
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    const usuario = await autenticar(correo.trim().toLowerCase(), clave)
    if (!usuario) {
      setError('Correo o contraseña incorrectos.')
      return
    }
    iniciarSesion(usuario, recordar)
    navegar('/')
  }

  return (
    <main className="auth-section">
      <div className="auth-header">
        <span className="auth-tag">[ LEVEL-UP GAMER · AUTENTICACIÓN ]</span>
        <h1>INICIAR SESIÓN</h1>
        <p>Ingresa con tus credenciales para acceder a tu cuenta gamer.</p>
      </div>

      <form className="form-card" onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <div className="input-with-icon">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tucorreo@duoc.cl"
              required
              value={correo}
              onChange={(evento) => {
                setCorreo(evento.target.value)
                setError('')
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="input-with-icon">
            <input
              type={verClave ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="••••••••••••"
              required
              value={clave}
              onChange={(evento) => {
                setClave(evento.target.value)
                setError('')
              }}
            />
            <button
              type="button"
              className="input-toggle-visibility"
              aria-label={verClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setVerClave(!verClave)}
            >
              {verClave ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <div className="form-checkbox-row">
          <input
            type="checkbox"
            id="recordar"
            name="recordar"
            checked={recordar}
            onChange={(evento) => setRecordar(evento.target.checked)}
          />
          <label htmlFor="recordar">Recordar mi sesión en este dispositivo</label>
        </div>

        {error && (
          <div className="form-group">
            <span className="error-message" role="alert">{error}</span>
          </div>
        )}

        <button type="submit" className="btn-form-primary">Iniciar sesión →</button>

        <hr className="form-divider" />

        <p className="form-footer-text">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </main>
  )
}