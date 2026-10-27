// Cabecera de página: etiqueta + título + descripción (Nosotros, Eventos, detalles del blog).
export default function PageHeader({ etiqueta, titulo, descripcion }) {
  return (
    <section className="page-header">
      <span className="section-tag">{etiqueta}</span>
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
    </section>
  )
}