import { Link } from 'react-router-dom'
import { productosIniciales } from '../../data/productos'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
style: 'currency',
currency: 'CLP',
maximumFractionDigits: 0,
})

export default function AdminProductos() {
return (
<> <header className="admin-topbar"> <h1>Productos</h1>

```
    <div className="lista-admin__topbar-acciones">
      <Link
        to="/admin/productos/nuevo"
        className="boton boton-primario"
      >
        + Nuevo producto
      </Link>
    </div>
  </header>

  <section className="lista-admin__contenedor">
    <table className="tabla-admin">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Stock crítico</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {productosIniciales.map((producto) => {
          const stockCritico =
            producto.stockCritico > 0 &&
            producto.stock <= producto.stockCritico

          return (
            <tr key={producto.codigo}>
              <td>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="tabla-admin__imagen"
                />
              </td>

              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{formatoPrecio.format(producto.precio)}</td>
              <td>
                <span className={stockCritico ? 'stock-critico' : ''}>
                  {producto.stock}
                </span>
              </td>
              <td>{producto.stockCritico}</td>

              <td className="tabla-admin__acciones">
                <Link
                  to={`/admin/productos/editar/${producto.codigo}`}
                  className="boton"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  className="boton boton-peligro"
                  disabled
                  title="La eliminación se implementará más adelante"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </section>
</>
)
}
