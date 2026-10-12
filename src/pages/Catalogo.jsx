import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import CatalogToolbar from '../components/CatalogToolbar'
import { productosIniciales } from '../data/productos'

export default function Catalogo() {
  // Arreglo con los productos
  const [productos, setProductos] = useState([])
  // Valores de la barra de búsqueda (el filtrado se agrega en la segunda pasada)
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  // Función para cargar los productos
  const cargarProductos = async () => {
    const data = productosIniciales
    // EVALUACIÓN 3: reemplazar la línea anterior por la llamada al backend
    // const data = (await axios.get('URL_DEL_BACKEND/productos')).data
    setProductos(data)
  }

  // Llamar a la función cuando se carga la página
  useEffect(() => {
    cargarProductos()
  }, [])

  return (
    <main className="main-container">
      <section aria-labelledby="titulo-catalogo">
        <span className="section-tag">TIENDA / CATÁLOGO</span>
        <h1 id="titulo-catalogo" className="main-section-title">Productos</h1>

        <CatalogToolbar
          busqueda={busqueda}
          categoria={categoria}
          onBusqueda={setBusqueda}
          onCategoria={setCategoria}
        />

        <div className="catalog-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} />
          ))}
        </div>
      </section>
    </main>
  )
}