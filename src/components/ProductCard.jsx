import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import { precioConOferta } from '../utils/productos'

export default function ProductCard({ producto }) {
  const { agregar } = useCarrito()
  const estrellas = '★'.repeat(producto.rating) + '☆'.repeat(5 - producto.rating)
  const oferta = Number(producto.descuentoOferta) > 0

  return (
    <article className="product-card">
      {producto.imagen ? (
        <img className="img-box img-l" src={producto.imagen} alt={producto.nombre} />
      ) : (
        <div className="img-box img-l img-placeholder">Sin imagen</div>
      )}
      <span className="product-category">{producto.categoria}</span>
      {oferta && <span className="etiqueta-oferta">-{producto.descuentoOferta}% OFERTA</span>}
      <h3 className="product-title">{producto.nombre}</h3>
      <p className="product-rating">{estrellas}</p>
      <p className={producto.stock > 0 ? 'product-stock' : 'product-stock sin-stock'}>
        {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
      </p>
      <div className="product-footer">
        <div>
          {oferta && <span className="precio-anterior">{formatearPrecio(producto.precio)}</span>}
          <span className="product-price">{formatearPrecio(precioConOferta(producto))}</span>
        </div>
      </div>
      <div className="acciones-producto">
        <Link to={`/productos/${producto.codigo}`} className="btn-add btn-agregar">Ver más</Link>
        <button type="button" className="btn-add btn-agregar" disabled={producto.stock <= 0}
          onClick={() => agregar(producto)}>
          {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
        </button>
      </div>
    </article>
  )
}
