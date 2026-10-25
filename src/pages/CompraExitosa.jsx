import { Link } from 'react-router-dom'
import PasosCompra from '../components/PasosCompra'
import ResumenPedido from '../components/ResumenPedido'
import { formatearPrecio } from '../utils/formato'
import { obtenerUltimoPedido } from '../utils/pedidos'

export default function CompraExitosa() {
  const pedido = obtenerUltimoPedido()

  if (!pedido) {
    return (
      <main className="main-container">
        <span className="section-tag">COMPRAS</span>
        <h1 className="main-section-title">No hay una compra reciente</h1>
        <Link to="/productos" className="btn-primario">Ver productos</Link>
      </main>
    )
  }

  const cantidad = pedido.productos.reduce((total, item) => total + item.cantidad, 0)

  return (
    <main className="main-container">
      <span className="section-tag">COMPRAS</span>
      <h1 className="main-section-title">¡Compra exitosa!</h1>

      <PasosCompra actual={4} />

      <div className="checkout-card">
        <p className="form-mensaje exito" role="status">
          Gracias por tu compra, {pedido.cliente.nombre}. Guardamos tu pedido correctamente.
        </p>

        <p style={{ margin: '1.5rem 0 1rem' }}>
          N° de pedido: <strong>{pedido.id}</strong>
        </p>

        <div className="mini-lista-productos">
          {pedido.productos.map((item) => (
            <div className="resumen-linea" key={item.codigo}>
              <span>{item.nombre} × {item.cantidad}</span>
              <span>{formatearPrecio(item.precio * item.cantidad)}</span>
            </div>
          ))}
        </div>

        <hr className="resumen-divisor" />

        <ResumenPedido
          cantidad={cantidad}
          subtotal={pedido.subtotal}
          descuento={pedido.descuento}
          envio={pedido.envio}
        />

        <p style={{ color: 'var(--color-texto-secundario)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          {pedido.entrega.nombre} a {pedido.cliente.direccion}, {pedido.cliente.comuna}.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/productos" className="btn-primario">Seguir comprando</Link>
          <Link to="/" className="btn-secundario" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.8rem 1.5rem' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}