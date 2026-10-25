import { useEffect } from 'react'

// Aviso breve (esquina inferior derecha) que se oculta solo a los 2,5 segundos.
// Usado por Registro y por los formularios del admin.
export default function Aviso({ mensaje, onCerrar }) {
  useEffect(() => {
    if (!mensaje) return undefined
    const temporizador = setTimeout(onCerrar, 2500)
    return () => clearTimeout(temporizador)
  }, [mensaje, onCerrar])

  return (
    <div className={`aviso${mensaje ? ' show' : ''}`} role="status" aria-live="polite">
      {mensaje}
    </div>
  )
}