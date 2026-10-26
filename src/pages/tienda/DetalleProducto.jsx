import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { productosIniciales } from '../../data/productos'
import { formatearPrecio } from '../../utils/formato'

const MAX_CANTIDAD = 5

export default function DetalleProducto() {
  // Código que viene en la URL: /productos/:codigo
  const { codigo } = useParams()

  const [producto, setProducto] = useState(null)
  const [relacionados, setRelacionados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [cantidad, setCantidad] = useState(1)

  // Función para cargar el producto y los relacionados
  const cargarProducto = async () => {
    const todos = productosIniciales
    // EVALUACIÓN 3: reemplazar por las llamadas al backend
    // const todos = (await axios.get('URL_DEL_BACKEND/productos')).data
    // (o pedir solo el producto: await axios.get(`URL_DEL_BACKEND/productos/${codigo}`))
    const actual = todos.find((p) => p.codigo === codigo) ?? null

    // Relacionados: primero los de la misma categoría, luego el resto (máximo 5)
    const otros = todos.filter((p) => p.codigo !== codigo)
    const mismaCategoria = otros.filter((p) => actual && p.categoria === actual.categoria)
    const demas = otros.filter((p) => !actual || p.categoria !== actual.categoria)

    setProducto(actual)
    setRelacionados([...mismaCategoria, ...demas].slice(0, 5))
    setCantidad(1)
    setCargando(false)
  }

  // Se ejecuta al abrir la página y cada vez que cambia el código de la URL
  useEffect(() => {
    cargarProducto()
  }, [codigo])

  if (cargando) {
    return (
      <main className="main-container">
        <p>Cargando producto...</p>
      </main>
    )
  }

  if (!producto) {
    return (
      <main className="main-container">
        <span className="section-tag">ERROR 404</span>
        <h1 className="main-section-title">Producto no encontrado</h1>
        <p style={{ color: 'var(--color-texto-secundario)', marginBottom: '1.5rem' }}>
          No existe ningún producto con el código {codigo}.
        </p>
        <Link to="/productos" className="btn-add">Volver al catálogo</Link>
      </main>
    )
  }

  // Opciones del selector: de 1 hasta el stock disponible (máximo 5)
  const opcionesCantidad = Array.from(
    { length: Math.min(producto.stock, MAX_CANTIDAD) },
    (_, indice) => indice + 1,
  )

  return (
    <main className="main-container">
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separador">&gt;</span>
        <Link to="/productos">{producto.categoria}</Link>
        <span className="breadcrumb-separador">&gt;</span>
        <span className="breadcrumb-actual">{producto.nombre}</span>
      </nav>

      <section className="detalle-producto">
        <div className="detalle-producto__galeria">
          {producto.imagen ? (
            <img className="img-box img-xxxl" src={producto.imagen} alt={producto.nombre} />
          ) : (
            <div className="img-box img-placeholder detalle-producto__imagen-principal">Sin imagen</div>
          )}
        </div>

        <div className="detalle-producto__info">
          <span className="section-tag">{producto.categoria.toUpperCase()} / {producto.codigo}</span>
          <div className="detalle-producto__encabezado">
            <h1 className="detalle-producto__titulo">{producto.nombre}</h1>
            <span className="detalle-producto__precio">{formatearPrecio(producto.precio)}</span>
          </div>

          {producto.descripcion && (
            <p className="detalle-producto__descripcion">{producto.descripcion}</p>
          )}

          <p className={producto.stock > 0 ? 'product-stock' : 'product-stock sin-stock'}>
            {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}
          </p>

          <div className="detalle-producto__cantidad">
            <label htmlFor="cantidad">Cantidad</label>
            <select
              id="cantidad"
              name="cantidad"
              value={cantidad}
              onChange={(evento) => setCantidad(Number(evento.target.value))}
              disabled={producto.stock === 0}
            >
              {opcionesCantidad.map((numero) => (
                <option key={numero} value={numero}>{numero}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn-add detalle-producto__boton-agregar"
            disabled={producto.stock === 0}
          >
            {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
          </button>
        </div>
      </section>

      <section className="relacionados">
        <h2 className="relacionados__titulo">Productos relacionados</h2>
        <div className="relacionados__grid">
          {relacionados.map((relacionado) => (
            <ProductCard key={relacionado.codigo} producto={relacionado} />
          ))}
        </div>
      </section>
    </main>
  )
}