import PageHeader from '../../components/PageHeader'
import EditorialBlock from '../../components/EditorialBlock'

const ranking = [
  { juego: 'Fortnite', participacion: '24,88%' },
  { juego: 'Valorant', participacion: '21,95%' },
  { juego: 'Roblox', participacion: '14,31%' },
  { juego: 'League of Legends', participacion: '12,18%' },
  { juego: 'Call of Duty Warzone', participacion: '8,11%' },
  { juego: 'Counter Strike 2', participacion: '6,85%' },
  { juego: 'Fall Guys', participacion: '3,53%' },
  { juego: 'Marvel Rivals', participacion: '2,63%' },
  { juego: 'Rocket League', participacion: '2,29%' },
  { juego: 'Overwatch 2', participacion: '1,88%' },
]

export default function BlogDetalle1() {
  return (
    <main className="main-container">
      <PageHeader
        etiqueta="BLOG · NOTICIAS DEL MUNDO GAMER"
        titulo="Los 10 videojuegos más populares en Chile durante 2025"
        descripcion="Movistar GameClub, el centro especializado en gaming de Movistar Chile, entregó el ranking de los favoritos entre sus más de 1,2 millones de visitantes a lo largo del país."
      />

      <EditorialBlock
        media={<img className="img-box img-xxl" src="/img/img-blog/movistar.jpg" alt="Movistar GameClub" />}
      >
        <h2>La industria gamer sigue en ascenso</h2>
        <p>El gaming continúa consolidándose como una de las principales industrias de entretenimiento digital en Chile y el mundo, impulsado por el avance de una mejor conectividad, comunidades online, propuesta gaming y la variedad y crecimiento en los perfiles de jugadores. En este escenario, Movistar GameClub, el principal espacio gaming del país, dio a conocer el ranking de los videojuegos más populares de sus usuarios, entre los que destacan los shooters (FPS), battle royale, deportivos y de pelea.</p>
        <p>Durante 2025 Movistar GameClub registró un crecimiento anual del 22%, con un total de 1.258.000 visitas presenciales, revelando un creciente interés no sólo en videojuegos sino en el ecosistema integral para gamers propuesto por Movistar Chile, que combina espacios físicos, "clubes", ubicados en centros comerciales con servicios digitales, eventos, torneos, equipamiento gamer, servicio técnico especializado Doctor GameClub, entre otros contenidos.</p>
        <p>El ranking fue elaborado a partir del análisis de la actividad registrada en los diversos centros presentes a lo largo de Chile durante 2025, considerando variables como cantidad de partidas y horas de cada juego.</p>
      </EditorialBlock>

      <section>
        <h2 style={{ marginBottom: '1rem' }}>Ranking de videojuegos más populares en Movistar GameClub</h2>
        <ol className="ranking-list">
          {ranking.map((item) => (
            <li key={item.juego}>
              {item.juego} <span className="porcentaje">{item.participacion} participación</span>
            </li>
          ))}
        </ol>
      </section>

      <EditorialBlock
        invertido
        claseMedia="map-frame"
        media={
          <iframe
            title="Mapa de Movistar GameClub Mallplaza Norte"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d208.26148679680446!2d-70.67825836760203!3d-33.366267520853576!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c70051e1745d%3A0xc40b91bd4d41710a!2sGameClub%20%E2%80%94%20Mallplaza%20Norte!5e0!3m2!1ses-419!2scl!4v1788860995922!5m2!1ses-419!2scl"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        }
      >
        <h2>Cómo llegar a Movistar GameClub Mallplaza Norte</h2>
        <p className="direccion-info">📍 <span><strong>Dirección:</strong> Mallplaza Norte, Av. Américo Vespucio 1737, Huechuraba, Región Metropolitana.</span></p>
        <p className="direccion-info">🕒 <span><strong>Horario:</strong> Todos los días de 10:00 a 22:00 hrs.</span></p>
        <p>Movistar GameClub se encuentra en el nivel de tiendas de Mallplaza Norte, cerca del patio de comidas. Puedes llegar en Transantiago (múltiples recorridos con parada frente al mall), en auto por Américo Vespucio con estacionamiento propio del centro comercial, o en bicicleta gracias a los bicicleteros disponibles en el acceso principal.</p>
      </EditorialBlock>
    </main>
  )
}