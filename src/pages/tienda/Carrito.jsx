import { Link } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'
import { formatearPrecio } from '../../utils/formato'

export default function Carrito() {
  const { carrito, cambiarCantidad, quitar, cantidadTotal, subtotal } = useCarrito()

  return (
    <main className="main-container">
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Home</Link>
        <span style={{ margin: '0 0.4rem' }}>/</span>
        <span className="actual">Mi carrito de compras</span>
      </nav>

      <span className="section-tag">COMPRAS</span>
      <h1 className="main-section-title">Mi carrito de compras</h1>

      <div className="carrito-layout">
        {/* Lista de productos */}
        <section className="carrito-lista" aria-label="Productos en el carrito">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <p>Tu carrito está vacío. ¡Explora nuestros productos y súmate a la comunidad Level-Up!</p>
              <Link to="/productos" className="btn-primario">Ver productos</Link>
            </div>
          ) : (
            carrito.map((item) => (
              <article className="carrito-item" key={item.codigo}>
                <img
                  className="carrito-item-img"
                  style={{ objectFit: 'cover' }}
                  src={item.imagen}
                  alt={item.nombre}
                />
                <div className="carrito-item-info">
                  <h3>{item.nombre}</h3>
                  {item.descripcion && <p>{item.descripcion}</p>}
                  <span className="item-categoria">{item.categoria}</span>
                </div>
                <div className="cantidad-selector">
                  <button
                    className="cantidad-btn"
                    type="button"
                    aria-label="Disminuir cantidad"
                    disabled={item.cantidad <= 1}
                    onClick={() => cambiarCantidad(item.codigo, item.cantidad - 1)}
                  >
                    −
                  </button>
                  <span className="cantidad-valor">{item.cantidad}</span>
                  <button
                    className="cantidad-btn"
                    type="button"
                    aria-label="Aumentar cantidad"
                    disabled={item.cantidad >= item.stock}
                    onClick={() => cambiarCantidad(item.codigo, item.cantidad + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="carrito-item-precio">
                  {formatearPrecio(item.precio * item.cantidad)}
                  <span className="precio-unitario">Unitario: {formatearPrecio(item.precio)}</span>
                </div>
                <button className="btn-eliminar" type="button" onClick={() => quitar(item.codigo)}>
                  Eliminar
                </button>
              </article>
            ))
          )}
        </section>

        {/* Resumen */}
        <aside className="resumen-panel" aria-label="Resumen de compra">
          <h2>Resumen del pedido</h2>

          <div className="resumen-linea">
            <span>Subtotal ({cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'})</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>
          <div className="resumen-linea">
            <span>Envío</span>
            <span>Calculado en el pago</span>
          </div>

          <hr className="resumen-divisor" />

          <div className="resumen-total">
            <span>Total</span>
            <span className="monto-total">{formatearPrecio(subtotal)}</span>
          </div>

          {carrito.length > 0 && (
            <Link to="/checkout" className="btn-primario btn-pagar">Ir a pagar</Link>
          )}

          <div className="metodos-pago">
            <span className="metodo-pago-tag">WEBPAY</span>
            <span className="metodo-pago-tag">VISA</span>
            <span className="metodo-pago-tag">MASTERCARD</span>
            <span className="metodo-pago-tag">PUNTOS LEVELUP</span>
          </div>
        </aside>
      </div>
    </main>
  )
}