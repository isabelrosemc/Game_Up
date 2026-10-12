import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'


export default function ProductCard({ producto }) {
  const estrellas = '★'.repeat(producto.rating) + '☆'.repeat(5 - producto.rating)

  return (
    <article className="product-card">
      {producto.imagen ? (
        <img className="img-box img-l" src={producto.imagen} alt={producto.nombre} />
      ) : (
        <div className="img-box img-l img-placeholder">Sin imagen</div>
      )}
      <span className="product-category">{producto.categoria}</span>
      <h3 className="product-title">{producto.nombre}</h3>
      <p className="product-rating">{estrellas}</p>
      <p className={producto.stock > 0 ? 'product-stock' : 'product-stock sin-stock'}>
        {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
      </p>
      <div className="product-footer">
        <span className="product-price">{formatearPrecio(producto.precio)}</span>
        <Link to={`/productos/${producto.codigo}`} className="btn-add btn-agregar">Ver más</Link>
      </div>
    </article>
  )
}