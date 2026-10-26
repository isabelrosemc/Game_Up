import PageHeader from '../../components/PageHeader'
import EditorialBlock from '../../components/EditorialBlock'
import ImpactBanner from '../../components/ImpactBanner'

const valores = [
  { img: 'comunidad.png', titulo: 'Comunidad Gamer', texto: 'Impulsamos el talento de los jugadores locales y crecemos junto a nuestra comunidad.' },
  { img: 'calidad.png', titulo: 'Calidad Garantizada', texto: 'Trabajamos con fabricantes y distribuidores que aseguran autenticidad en cada producto.' },
  { img: 'innovacion.png', titulo: 'Innovación Constante', texto: 'Buscamos siempre nuevas formas de mejorar la experiencia de compra gamer en Chile.' },
]

const cifras = [
  { numero: '2+', etiqueta: 'Años de trayectoria' },
  { numero: '100%', etiqueta: 'Despacho a Chile' },
  { numero: '2%', etiqueta: 'De cada venta a causas sociales' },
  { numero: '9', etiqueta: 'Categorías de productos' },
]

const equipo = [
  { img: 'mario.jpg', nombre: 'Mario', rol: 'Desarrollador/a Frontend', texto: 'Encargado/a de la estructura, estilos e interfaz de la tienda.' },
  { img: 'isa.png', nombre: 'Isa', rol: 'Desarrollador/a Backend', texto: 'Responsable de la lógica, validaciones y funcionamiento del sistema.' },
  { img: 'cris.png', nombre: 'Cris', rol: 'Diseñador/a UX/UI', texto: 'A cargo de la experiencia de usuario y la identidad visual gamer.' },
]

export default function Nosotros() {
  return (
    <main className="main-container">
      <PageHeader
        etiqueta="CONÓCENOS"
        titulo="SOMOS LEVEL-UP GAMER"
        descripcion="Una tienda online chilena creada por y para la comunidad gamer. Te contamos quiénes somos, qué nos mueve y quiénes están detrás del código."
      />

      <EditorialBlock
        media={<img className="img-box img-xl" src="/img/img-nosotros/nosotros1.jpg" alt="Historia de Level-Up Gamer, nuestros inicios como tienda online" />}
      >
        <span className="section-tag">NUESTRA HISTORIA</span>
        <h2>DOS AÑOS NIVELANDO EL JUEGO</h2>
        <p>Level-Up Gamer nació hace dos años como respuesta a la creciente demanda de equipamiento gamer durante la pandemia. Desde entonces, nos hemos dedicado a satisfacer las necesidades de los entusiastas de los videojuegos en todo Chile.</p>
        <p>Aunque no contamos con una ubicación física, realizamos despachos a lo largo de todo el país, ofreciendo consolas, accesorios, computadores y sillas especializadas para que cada gamer arme su setup ideal.</p>
      </EditorialBlock>

      <EditorialBlock
        invertido
        media={<img className="img-box img-xxxl" src="/img/img-nosotros/nosotros2.jpg" alt="Misión y visión de Level-Up Gamer" />}
      >
        <span className="section-tag">HACIA DÓNDE VAMOS</span>
        <h2>MISIÓN Y VISIÓN</h2>
        <h3>Misión</h3>
        <p>Proporcionar productos de alta calidad para gamers en todo Chile, ofreciendo una experiencia de compra única y personalizada, con un enfoque en la satisfacción del cliente y el crecimiento de la comunidad gamer.</p>
        <h3>Visión</h3>
        <p>Ser la tienda online líder en productos para gamers en Chile, reconocida por su innovación, servicio al cliente excepcional y un programa de fidelización basado en gamificación que recompense a nuestros clientes más fieles.</p>
      </EditorialBlock>

      <section className="values-section">
        <span className="section-tag">LO QUE NOS DEFINE</span>
        <h2 className="main-section-title">NUESTROS VALORES</h2>
                <div className="values-grid">
          {valores.map((v) => (
            <div className="value-card" key={v.titulo}>
              <img className="img-box" src={`/img/img-nosotros/${v.img}`} alt={`Ícono valor ${v.titulo}`} />
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-row">
        {cifras.map((c) => (
          <div className="stat-item" key={c.etiqueta}>
            <span className="stat-number">{c.numero}</span>
            <span className="stat-label">{c.etiqueta}</span>
          </div>
        ))}
      </section>

      <ImpactBanner imagen="/img/img-nosotros/nosotros3.jpg" alt="Impacto comunitario, donación de computadores a escuelas">
        <p>A través de nuestro programa solidario, destinamos el 2% de cada venta al acondicionamiento y donación de computadores para laboratorios en escuelas públicas. Cada partida y cada compra construyen un futuro digital más justo, transformando el gaming en oportunidades reales de aprendizaje tecnológico.</p>
      </ImpactBanner>

      <section className="team-section">
        <span className="section-tag">DETRÁS DEL CÓDIGO</span>
        <h2 className="main-section-title">NUESTRO EQUIPO DE DESARROLLO</h2>
                <div className="team-grid">
          {equipo.map((p) => (
            <div className="team-card" key={p.nombre}>
              <img className="img-box" src={`/img/img-nosotros/${p.img}`} alt={`Foto de ${p.nombre}, integrante del equipo`} />
              <h3>{p.nombre}</h3>
              <span className="team-role">{p.rol}</span>
              <p>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}