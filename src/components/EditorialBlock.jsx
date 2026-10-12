// Bloque con un medio (imagen, mapa o video) al lado de un texto.
// `invertido` pone el medio a la derecha. El texto entra como `children`.
export default function EditorialBlock({ media, invertido = false, claseMedia = '', children }) {
  return (
    <section className={`editorial-block${invertido ? ' reverse' : ''}`}>
      <div className={`editorial-media ${claseMedia}`.trim()}>{media}</div>
      <div className="editorial-content">{children}</div>
    </section>
  )
}