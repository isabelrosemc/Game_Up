import { Link } from 'react-router-dom'

const noticias = [
  {
    id: 1,
    titulo: 'Los 10 videojuegos más populares en Chile durante 2025',
    resumen: 'Movistar GameClub, el centro especializado en gaming de Movistar Chile, entregó el ranking de los favoritos entre sus más de 1,2 millones de visitantes a lo largo del país.',
    imagen: '/img/img-blog/blog1.webp',
    alt: 'imagen de gaming chileno',
  },
  {
    id: 2,
    titulo: 'Los Principales representantes del gaming chileno actual',
    resumen: 'Los exponentes más destacados del gaming y los deportes electrónicos (esports) en Chile incluyen a campeones mundiales y referentes históricos en torneos internacionales de juegos de pelea y estrategia.',
    imagen: '/img/img-blog/blog2.png',
    alt: 'imagen de gaming chileno',
  },
]

export default function Blog() {
  return (
    <main className="main-container">
      <div className="blog-header">
        <h1><b>NOTICIAS </b> <i>DEL MUNDO</i> <b>GAMER</b></h1>
      </div>

      {noticias.map((noticia) => (
        <article className="news-card" key={noticia.id}>
          <div className="news-content">
            <h2>{noticia.titulo}</h2>
            <p>{noticia.resumen}</p>
            <Link to={`/blog/${noticia.id}`} className="btn-news">VER CASO</Link>
          </div>
          <div className="news-media">
            <img className="img-box img-xxl" src={noticia.imagen} alt={noticia.alt} />
          </div>
        </article>
      ))}
    </main>
  )
}