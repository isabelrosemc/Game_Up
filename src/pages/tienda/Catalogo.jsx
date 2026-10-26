import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import CatalogToolbar from '../../components/CatalogToolbar'
import { obtenerProductos } from '../../utils/productos'

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('')
  const [parametros, setParametros] = useSearchParams()
  const categoria = parametros.get('categoria') || ''

  const productos = obtenerProductos().filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
    const coincideCategoria = !categoria || producto.categoria === categoria
    return coincideNombre && coincideCategoria
  })

  return (
    <main className="main-container">
      <section aria-labelledby="titulo-catalogo">
        <span className="section-tag">TIENDA / CATÁLOGO</span>
        <h1 id="titulo-catalogo" className="main-section-title">Productos</h1>
        <CatalogToolbar
          busqueda={busqueda}
          categoria={categoria}
          onBusqueda={setBusqueda}
          onCategoria={(valor) => setParametros(valor ? { categoria: valor } : {})}
        />
        <div className="catalog-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} />
          ))}
        </div>
        {productos.length === 0 && <p>No se encontraron productos con estos filtros.</p>}
      </section>
    </main>
  )
}
