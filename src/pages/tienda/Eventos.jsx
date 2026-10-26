import PageHeader from '../../components/PageHeader'

const eventos = [
  { id: 1, dia: '18', mes: 'SEP', tipo: 'TORNEO', titulo: 'Torneo de Valorant',
    descripcion: 'Compite junto a tu equipo y demuestra tus habilidades en una jornada llena de acción.',
    horario: '18:00 hrs', lugar: 'Level-Up Gamer Santiago' },
  { id: 2, dia: '25', mes: 'SEP', tipo: 'LANZAMIENTO', titulo: 'Noche de lanzamiento',
    descripcion: 'Ven a conocer nuevos videojuegos, accesorios y productos junto a otros jugadores.',
    horario: '20:00 hrs', lugar: 'Level-Up Gamer Providencia' },
  { id: 3, dia: '05', mes: 'OCT', tipo: 'COMUNIDAD', titulo: 'Encuentro Gamer',
    descripcion: 'Una jornada para compartir, jugar y conocer a otros integrantes de la comunidad.',
    horario: '16:00 hrs', lugar: 'Level-Up Gamer Viña del Mar' },
]

export default function Eventos() {
  return (
    <main className="main-container">
      <PageHeader
        etiqueta="COMUNIDAD GAMER"
        titulo="PRÓXIMOS EVENTOS"
        descripcion="Participa en torneos, lanzamientos y actividades pensadas para la comunidad gamer."
      />

                  <section className="events-grid">
        {eventos.map((evento) => (
          <article className="event-card" key={evento.id}>
            <div className="event-date">
              <span className="event-day">{evento.dia}</span>
              <span className="event-month">{evento.mes}</span>
            </div>
            <div className="event-body">
              <span className="event-type">{evento.tipo}</span>
              <h3>{evento.titulo}</h3>
              <p>{evento.descripcion}</p>
              <p><strong>Horario:</strong> {evento.horario}</p>
              <p><strong>Lugar:</strong> {evento.lugar}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}