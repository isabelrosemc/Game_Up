import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos, guardarProductos } from '../../utils/productos'
import { formatearPrecio } from '../../utils/formato'

export default function AdminProductos() {
  const [productos, setProductos] = useState(obtenerProductos)

  function eliminarProducto(codigo) {
    if (!window.confirm('¿Eliminar este producto?')) return
    const actualizados = productos.filter((producto) => producto.codigo !== codigo)
    guardarProductos(actualizados)
    setProductos(actualizados)
  }

  return (
    <>
      <header className="admin-topbar">
        <h1>Productos</h1>
        <Link to="/admin/productos/nuevo" className="boton boton-primario">+ Nuevo producto</Link>
      </header>
      <section className="lista-admin__contenedor">
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Imagen</th><th>Código</th><th>Nombre</th><th>Categoría</th>
              <th>Precio</th><th>Stock</th><th>Stock crítico</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td><img src={producto.imagen} alt={producto.nombre} className="tabla-admin__imagen" /></td>
                <td>{producto.codigo}</td><td>{producto.nombre}</td>
                <td>{producto.categoria}</td><td>{formatearPrecio(producto.precio)}</td>
                <td>{producto.stock}</td><td>{producto.stockCritico}</td>
                <td className="tabla-admin__acciones">
                  <Link className="boton" to={`/admin/productos/editar/${producto.codigo}`}>Editar</Link>
                  <button type="button" className="boton boton-peligro" onClick={() => eliminarProducto(producto.codigo)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && <tr><td colSpan="8">No hay productos registrados.</td></tr>}
          </tbody>
        </table>
      </section>
    </>
  )
}
