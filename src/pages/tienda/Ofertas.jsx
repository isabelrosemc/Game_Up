import ProductCard from '../../components/ProductCard'
import { obtenerProductos } from '../../utils/productos'

export default function Ofertas() {
  const ofertas = obtenerProductos().filter((producto) => Number(producto.descuentoOferta) > 0)

  return (
    <main className="main-container">
      <span className="section-tag">TIENDA / PROMOCIONES</span>
      <h1 className="main-section-title">Ofertas</h1>
      <p>Productos con precio especial por tiempo limitado.</p>
      <div className="catalog-grid">
        {ofertas.map((producto) => <ProductCard key={producto.codigo} producto={producto} />)}
      </div>
      {ofertas.length === 0 && <p>Por ahora no hay productos en oferta.</p>}
    </main>
  )
}
