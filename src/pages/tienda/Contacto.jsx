import { useState } from 'react'
import FormField from '../../components/FormField'

const CLAVE_MENSAJES = 'levelup_mensajes_contacto'
const VALORES_INICIALES = { nombre: '', correo: '', asunto: '', mensaje: '' }

export default function Contacto() {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [enviado, setEnviado] = useState(false)

  // Cada vez que se escribe en un campo, se actualiza el estado (formulario controlado)
  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setValores((previos) => ({ ...previos, [name]: value }))
    setEnviado(false)
  }

  // Función que guarda el mensaje. Hoy usa localStorage (datos simulados).
  const guardarMensaje = async (mensaje) => {
    // EVALUACIÓN 3: reemplazar por la llamada al backend (confirmar la ruta con el equipo de backend)
    // await axios.post('URL_DEL_BACKEND/mensajes', mensaje)
    let previos = []
    try {
      previos = JSON.parse(localStorage.getItem(CLAVE_MENSAJES)) || []
    } catch {
      previos = []
    }
    previos.push({ fecha: new Date().toISOString(), ...mensaje })
    localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(previos))
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    await guardarMensaje({
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim(),
      asunto: valores.asunto.trim(),
      mensaje: valores.mensaje.trim(),
    })
    setValores(VALORES_INICIALES)
    setEnviado(true)
  }

  return (
    <main>
      <section className="auth-section">
        <div className="auth-header">
          <span className="auth-tag">[ LEVEL-UP GAMER · SOPORTE ]</span>
          <h1>Contáctanos</h1>
          <p>
            ¿Tienes alguna duda o necesitas ayuda?
            Completa el formulario y nos pondremos en contacto contigo.
          </p>
        </div>

        <div className="form-card">
          {enviado && (
            <div className="success-message" role="status">
              Mensaje enviado correctamente. Te responderemos a la brevedad.
            </div>
          )}

          <form onSubmit={manejarEnvio}>
            <FormField
              id="nombre"
              label="Nombre"
              type="text"
              placeholder="Tu nombre completo"
              maxLength={100}
              required
              value={valores.nombre}
              onChange={manejarCambio}
            />
            <FormField
              id="correo"
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@dominio.cl"
              maxLength={100}
              required
              value={valores.correo}
              onChange={manejarCambio}
            />
            <FormField
              id="asunto"
              label="Asunto"
              type="text"
              placeholder="¿Sobre qué quieres escribirnos?"
              maxLength={100}
              required
              value={valores.asunto}
              onChange={manejarCambio}
            />
            <FormField
              id="mensaje"
              label="Mensaje"
              as="textarea"
              rows={6}
              placeholder="Cuéntanos en qué podemos ayudarte"
              maxLength={500}
              required
              value={valores.mensaje}
              onChange={manejarCambio}
            />

            <button type="submit" className="btn-form-primary">Enviar mensaje</button>
          </form>
        </div>
      </section>
    </main>
  )
}