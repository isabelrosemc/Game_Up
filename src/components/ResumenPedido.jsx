import { formatearPrecio } from '../utils/formato'
import { calcularTotal } from '../utils/precios'

// Líneas del resumen: subtotal, envío, descuento y total. Lo usan el Carrito, el Checkout y la compra exitosa.
// Si `envio` es null, el envío aún no se conoce (se calcula en el pago).
export default function ResumenPedido({ cantidad, subtotal, descuento = 0, envio = null }) {
  const total = calcularTotal(subtotal, descuento, envio ?? 0)

  return (
    <>
      <div className="resumen-linea">
        <span>Subtotal ({cantidad} {cantidad === 1 ? 'producto' : 'productos'})</span>
        <span>{formatearPrecio(subtotal)}</span>
      </div>
      <div className="resumen-linea">
        <span>Envío</span>
        <span>{envio === null ? 'Calculado en el pago' : formatearPrecio(envio)}</span>
      </div>
      {descuento > 0 && (
        <div className="resumen-linea descuento">
          <span>Descuento Duoc (20%)</span>
          <span>− {formatearPrecio(descuento)}</span>
        </div>
      )}

      <hr className="resumen-divisor" />

      <div className="resumen-total">
        <span>Total</span>
        <span className="monto-total">{formatearPrecio(total)}</span>
      </div>
    </>
  )
}