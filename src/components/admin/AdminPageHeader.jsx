
import { Link } from 'react-router-dom'

export default function AdminPageHeader({
  titulo,
  descripcion,
  textoBoton,
  rutaBoton,
}) {
  return (
    <header className="admin-topbar">
      <div>
        <h1>{titulo}</h1>

        {descripcion && <p>{descripcion}</p>}
      </div>

      {textoBoton && rutaBoton && (
        <Link to={rutaBoton} className="boton boton-primario">
          {textoBoton}
        </Link>
      )}
    </header>
  )
}
