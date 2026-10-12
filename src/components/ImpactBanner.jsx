// Banner de "Impacto comunitario" (Home y Nosotros). El texto y botones entran como `children`.
export default function ImpactBanner({ imagen, alt, children }) {
  return (
    <section className="banner-card impact-banner">
      <img className="img-box img-xl" src={imagen} alt={alt} />
      <div>
        <span className="section-tag">CAUSA SOCIAL</span>
        <h2>IMPACTO COMUNITARIO</h2>
        {children}
      </div>
    </section>
  )
}