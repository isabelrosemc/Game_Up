import PageHeader from '../components/PageHeader'
import EditorialBlock from '../components/EditorialBlock'

// Elemento de la lista de exponentes. Lo que es distinto en cada persona entra como `children`.
function Exponente({ foto, alt, nombre, rol, fuentes = [], children }) {
  return (
    <li className="persona-item">
      <img className="img-box img-l persona-foto" src={foto} alt={alt} />
      <div className="persona-info">
        <h3>{nombre}</h3>
        <span className="persona-rol">{rol}</span>
        {children}
        {fuentes.length > 0 && (
          <p className="persona-fuente">
            {fuentes.length > 1 ? 'Fuentes' : 'Fuente'}:{' '}
            {fuentes.map((fuente, indice) => (
              <span key={fuente.url}>
                {indice > 0 && ' · '}
                <a href={fuente.url} target="_blank" rel="noopener noreferrer">{fuente.nombre}</a>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  )
}

export default function BlogDetalle2() {
  return (
    <main className="main-container">
      <PageHeader
        etiqueta="BLOG · NOTICIAS DEL MUNDO GAMER"
        titulo="Los principales representantes del gaming chileno actual"
        descripcion="Los exponentes más destacados del gaming y los deportes electrónicos (esports) en Chile incluyen a campeones mundiales y referentes históricos en torneos internacionales de juegos de pelea y estrategia."
      />

      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>Principales exponentes <strong>Chilenos</strong> en Esports y Competencias</h2>

        <ul className="personas-list">
          <Exponente
            foto="/img/img-blog/craime.jpg"
            alt="imagen de Craime"
            nombre='Jaime "Craime" Díaz Bustos'
            rol="Street Fighter 6"
            fuentes={[{ nombre: 'Instagram', url: 'https://www.instagram.com/p/Dbgj8VpvN_N/' }]}
          >
            <p>Con solo 15 años, se consagró campeón mundial de Street Fighter 6 en la Esports World Cup 2026 en París, convirtiéndose en el ganador más joven de la historia de este torneo.</p>
          </Exponente>

          <Exponente
            foto="/img/img-blog/gamez.jpg"
            alt="imagen de GamezKing"
            nombre='Benjamín "GamezKing" Pérez'
            rol="Free Fire"
            fuentes={[
              { nombre: 'Instagram', url: 'https://www.instagram.com/p/DbJT_H9mbUt/' },
              { nombre: 'CHV Noticias', url: 'https://www.facebook.com/chvnoticias/posts/-chile-tiene-un-nuevo-campe%C3%B3n-mundial-de-esports-el-equipo-lyon-se-coron%C3%B3-en-la-/1440825234747104/' },
            ]}
          >
            <p>El máximo referente y campeón mundial chileno de Free Fire, oriundo de Ovalle.</p>
            <h4>Logros destacados</h4>
            <ul>
              <li><strong>Campeón Mundial:</strong> ganó la Esports World Cup 2026 en París junto al equipo LYON.</li>
              <li><strong>MVP del Torneo:</strong> fue elegido como el mejor jugador de todo el campeonato mundial.</li>
              <li><strong>Premio:</strong> obtuvo un reconocimiento histórico y un galardón económico adicional por su rendimiento.</li>
            </ul>
          </Exponente>

          <Exponente
            foto="/img/img-blog/gemelos.png"
            alt="imagen de gemelos"
            nombre="Matías y Nicolás Martínez"
            rol="Mortal Kombat"
            fuentes={[
              { nombre: 'YouTube', url: 'https://www.youtube.com/shorts/foafVivFXMk' },
              { nombre: 'BioBioChile', url: 'https://www.biobiochile.cl/noticias/ciencia-y-tecnologia/videojuegos/2022/08/08/gemelos-chilenos-logran-primer-y-tercer-lugar-en-mundial-de-mortal-kombat-leo-rey-los-felicito.shtml' },
            ]}
          >
            <p>Los hermanos chilenos son los reconocidos prodigios de Mortal Kombat a nivel mundial.</p>
            <h4>Quiénes son y su historia</h4>
            <ul>
              <li>Matías Martínez es conocido en la escena competitiva como <strong>Scorpionprocs</strong>, y su hermano gemelo Nicolás Martínez compite como <strong>Nicolas</strong>.</li>
              <li>Son originarios de Coquimbo, Chile.</li>
              <li>Comenzaron a dominar la escena internacional de los videojuegos de lucha desde el año 2021.</li>
            </ul>
          </Exponente>

          <Exponente foto="/img/img-blog/faker1.png" alt="imagen de Faker" nombre='Lee Sang-Hyeok "Faker"' rol="League of Legends">
            <p>Es un jugador profesional chileno de League of Legends. Conocido anteriormente como GoJeonPa en el servidor coreano y como Hide on Bush actualmente, fue contratado por SK Telecom para competir en la LCK en 2013, desde entonces ha jugado como "midlaner" para el equipo.</p>
          </Exponente>
        </ul>
      </section>

      <EditorialBlock
        claseMedia="video-frame"
        media={
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0lqL0Nu43u8?si=cviFg9sIScIztyTf"
            title="Final de Street Fighter 6 en la EWC 26"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        }
      >
        <h2>Revive la final de Street Fighter 6 en la EWC 26</h2>
        <p>En esta emocionante final de la FF6, el chileno Craime se enfrenta a Hibiki en una batalla donde cada movimiento puede marcar la diferencia. Dos grandes jugadores se disputan el título de campeón en un enfrentamiento lleno de tensión, estrategia y momentos inolvidables.</p>
      </EditorialBlock>
    </main>
  )
}