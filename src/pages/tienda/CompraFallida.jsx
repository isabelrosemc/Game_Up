import { Link, useLocation } from 'react-router-dom'
import PasosCompra from '../../components/PasosCompra'

export default function CompraFallida() {
  const location = useLocation()
  const motivo = location.state?.motivo ?? 'No pudimos procesar tu pago.'

  return (
    <main className="main-container">
      <span className="section-tag">COMPRAS</span>
      <h1 className="main-section-title">No pudimos procesar tu pago</h1>

      <PasosCompra actual={2} />

      <div className="checkout-card">
        <p className="form-mensaje error" role="alert">{motivo}</p>

        <p style={{ margin: '1.5rem 0', color: 'var(--color-texto-secundario)', fontSize: '0.9rem' }}>
          No se realizó ningún cobro y tu carrito sigue intacto. Puedes intentarlo de nuevo.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/checkout" className="btn-primario">Reintentar el pago</Link>
          <Link to="/carrito" className="btn-secundario" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.8rem 1.5rem' }}>
            Volver al carrito
          </Link>
        </div>
      </div>
    </main>
  )
}