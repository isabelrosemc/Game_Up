import { Link } from 'react-router-dom'

const textoSecundario = { color: 'var(--color-texto-secundario)', fontSize: '0.8rem' }

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo">
            <span className="logo-text">LEVEL-UP GAMER</span>
            <span className="logo-subtext">TIENDA GAMER</span>
          </div>
          <p style={{ ...textoSecundario, marginTop: '0.8rem' }}>
            La plataforma definitiva para el gamer competitivo y casual. Equipamiento de alto rendimiento,
            torneos comunitarios y apoyo a causas sociales a través del gaming.
          </p>
          <div className="social-tags">
            {['TWITCH', 'DISCORD', 'YOUTUBE', 'INSTAGRAM', 'TIKTOK'].map((red) => (
              <span className="social-tag" key={red}>{red}</span>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>ENLACES RÁPIDOS</h4>
          <ul>
            <li><Link to="/productos">Catálogo de Productos</Link></li>
            <li><Link to="/blog">Blog y Guías Gamer</Link></li>
            <li><Link to="/eventos">Eventos y Torneos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>CONTACTO</h4>
          <p style={{ ...textoSecundario, marginBottom: '0.5rem' }}>Av. Providencia 1234, Oficina 601, Santiago, Chile</p>
          <p style={{ ...textoSecundario, marginBottom: '0.5rem' }}>+56 9 8765 4321 (Atención Gamer)</p>
          <p style={textoSecundario}>contacto@levelupgamer.cl</p>
        </div>

        <div className="footer-col">
          <h4>PUNTOS LEVEL-UP</h4>
          <p style={textoSecundario}>
            Acumula <strong>Puntos LevelUp</strong> con cada compra, registro a torneos y participación en la causa solidaria.
          </p>
          <div className="points-info-box">
            Recompensa actual: <span>100 CLP = 1 PTS</span><br />
            Canjea por descuentos directos en tienda o donaciones.
          </div>
        </div>
      </div>
    </footer>
  )
}