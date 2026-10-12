import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ImpactBanner from '../components/ImpactBanner'
import { productosIniciales } from '../data/productos'

// Tarjetas de categoría. `categoria` es el nombre exacto que usa el catálogo para filtrar.
const categoriasHome = [
  { nombre: 'Juegos de Mesa', categoria: 'Juegos de Mesa', detalle: 'Estrategia y rol', img: '/img/img-index1/mesa.jpg', alt: 'Caja de juego de mesa' },
  { nombre: 'Accesorios', categoria: 'Accesorios', detalle: 'Headsets y micrófonos', img: '/img/img-index1/mic.jpg', alt: 'imagen de micrófono gamer' },
  { nombre: 'Consolas', categoria: 'Consolas', detalle: 'PlayStation, Xbox, Switch', img: '/img/img-index1/consola.jpg', alt: 'imagen de consolas de videojuegos' },
  { nombre: 'Computadoras Gamers', categoria: 'Computadores Gamers', detalle: 'Rigs armados y Laptops', img: '/img/img-index1/pc.jpg', alt: 'imagen de computadora gamer' },
  { nombre: 'Sillas Gamers', categoria: 'Sillas Gamers', detalle: 'Ergonomía profesional', img: '/img/img-productos/silla.jpg', alt: 'imagen de silla gamer' },
  { nombre: 'Mouse', categoria: 'Mouse', detalle: 'Sensores ópticos top tier', img: '/img/img-productos/mouse.jpg', alt: 'imagen de mouse gamer' },
  { nombre: 'Mousepad', categoria: 'Mousepad', detalle: 'Superficies speed & control', img: '/img/img-productos/mousepad.jpg', alt: 'imagen de mousepad gamer' },
  { nombre: 'Poleras y Polerones Personalizados', categoria: 'Poleras Personalizadas', detalle: 'Merch oficial de escuadras', img: '/img/img-productos/polera.jpg', alt: 'imagen de polera gamer' },
]

export default function Home() {
  // Arreglo con los productos destacados
  const [destacados, setDestacados] = useState([])

  // Función para cargar los productos destacados
  const cargarDestacados = async () => {
    const data = productosIniciales
    // EVALUACIÓN 3: reemplazar la línea anterior por la llamada al backend
    // const data = (await axios.get('URL_DEL_BACKEND/productos')).data

    // Destacados = los primeros 3 productos con la máxima valoración
    setDestacados(data.filter((producto) => producto.rating === 5).slice(0, 3))
  }

  // Llamar a la función cuando se carga la página
  useEffect(() => {
    cargarDestacados()
  }, [])

  return (
    <main className="main-container">
      {/* BANNER PRINCIPAL */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="section-tag">EQUIPAMIENTO & HARDWARE GAMER CHILE</span>
          <h1 className="hero-title">ELEVA TU JUEGO AL <span>SIGUIENTE NIVEL</span></h1>
          <p className="hero-description">
            Encuentra periféricos profesionales, computadores de alto rendimiento y equipamiento gaming
            con despacho a todo Chile y acumulación de Puntos LevelUp en cada pedido.
          </p>
          <Link to="/productos" className="btn-primary">COMPRA AHORA →</Link>
        </div>
        <div className="hero-media">
          <img
            className="img-box img-xl"
            src="/img/img-index1/index1.jpg"
            alt="imagen de banner principal con jugadores y periféricos"
          />
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="categories-section">
        <span className="section-tag">EXPLORA POR CATEGORÍA</span>
        <div className="section-header-flex">
          <h2 className="main-section-title">CATEGORÍAS GAMER</h2>
          <Link to="/productos" className="view-all-link">Ver todas →</Link>
        </div>

        <div className="categories-grid">
          {categoriasHome.map((item) => (
            <Link
              key={item.nombre}
              to={`/productos?categoria=${encodeURIComponent(item.categoria)}`}
              className="category-card"
            >
              <img className="img-box img-xl" src={item.img} alt={item.alt} />
              <h3>{item.nombre}</h3>
              <p>{item.detalle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* IMPACTO COMUNITARIO */}
      <ImpactBanner imagen="/img/img-index1/comunidad.jpg" alt="imagen de comunidad gamer">
        <p>
          A través de nuestro programa solidario, destinamos el 2% de cada venta al acondicionamiento y donación
          de computadores para laboratorios en escuelas públicas. Cada partida y cada compra construyen un futuro
          digital más justo.
        </p>
        <Link to="/nosotros" className="btn-primary" style={{ marginTop: '1rem' }}>CONOCER MÁS →</Link>
      </ImpactBanner>

      {/* PRODUCTOS DESTACADOS */}
      <section className="featured-section">
        <span className="section-tag">SELECCIÓN ESPECIAL</span>
        <div className="section-header-flex">
          <h2 className="main-section-title">PRODUCTOS DESTACADOS</h2>
          <Link to="/productos" className="view-all-link">Ver catálogo completo →</Link>
        </div>

        <div className="products-grid">
          {destacados.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} />
          ))}
        </div>
      </section>
    </main>
  )
}