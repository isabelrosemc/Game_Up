import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categorias } from '../../data/categorias'
import { obtenerProductos, guardarProductos } from '../../utils/productos'

const VACIO = {
  codigo: '', nombre: '', categoria: '', precio: '', stock: '',
  stockCritico: '', descuentoOferta: 0, rating: 5, imagen: '', descripcion: '',
}

export default function AdminProductoForm() {
  const { codigo } = useParams()
  const navegar = useNavigate()
  const editando = Boolean(codigo)
  const original = obtenerProductos().find((producto) => producto.codigo === codigo)
  const [valores, setValores] = useState(original || VACIO)
  const [error, setError] = useState('')

  function cambiar(evento) {
    setValores({ ...valores, [evento.target.name]: evento.target.value })
    setError('')
  }

  function guardar(evento) {
    evento.preventDefault()
    const productos = obtenerProductos()
    const nuevo = {
      ...valores,
      codigo: valores.codigo.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      stockCritico: Number(valores.stockCritico),
      rating: Number(valores.rating),
      descuentoOferta: Number(valores.descuentoOferta),
      imagen: valores.imagen.trim(),
    }

    if (!nuevo.codigo || !nuevo.nombre || !categorias.includes(nuevo.categoria)) {
      setError('Completa código, nombre y categoría correctamente.')
      return
    }
    if (!Number.isFinite(nuevo.precio) || nuevo.precio <= 0 || !Number.isInteger(nuevo.stock) || nuevo.stock < 0 ||
        !Number.isInteger(nuevo.stockCritico) || nuevo.stockCritico < 0) {
      setError('Precio debe ser mayor a cero y los stocks deben ser números enteros no negativos.')
      return
    }
    if (!Number.isInteger(nuevo.descuentoOferta) || nuevo.descuentoOferta < 0 || nuevo.descuentoOferta > 90) {
      setError('La oferta debe ser un porcentaje entre 0 y 90. Usa 0 si no tiene oferta.')
      return
    }
    if (productos.some((item) => item.codigo === nuevo.codigo && !editando)) {
      setError('Ya existe un producto con ese código.')
      return
    }
    guardarProductos(editando
      ? productos.map((item) => item.codigo === codigo ? nuevo : item)
      : [...productos, nuevo])
    navegar('/admin/productos')
  }

  if (editando && !original) return <p>Producto no encontrado. <Link to="/admin/productos">Volver</Link></p>

  return (
    <section className="admin-content">
      <h1>{editando ? 'Editar producto' : 'Nuevo producto'}</h1>
      {error && <p role="alert" className="alert alert-danger">{error}</p>}
      <form onSubmit={guardar} className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label" htmlFor="codigo">Código</label>
          <input className="form-control" id="codigo" name="codigo" value={valores.codigo}
            onChange={cambiar} maxLength={20} disabled={editando} required />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" name="nombre" value={valores.nombre}
            onChange={cambiar} maxLength={100} required />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="categoria">Categoría</label>
          <select className="form-select" id="categoria" name="categoria" value={valores.categoria}
            onChange={cambiar} required>
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="precio">Precio (CLP)</label>
          <input className="form-control" type="number" min="1" id="precio" name="precio"
            value={valores.precio} onChange={cambiar} required />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="stock">Stock</label>
          <input className="form-control" type="number" min="0" step="1" id="stock" name="stock"
            value={valores.stock} onChange={cambiar} required />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="stockCritico">Stock crítico</label>
          <input className="form-control" type="number" min="0" step="1" id="stockCritico" name="stockCritico"
            value={valores.stockCritico} onChange={cambiar} required />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="descuentoOferta">Oferta (%)</label>
          <input className="form-control" type="number" min="0" max="90" step="1"
            id="descuentoOferta" name="descuentoOferta" value={valores.descuentoOferta ?? 0}
            onChange={cambiar} required />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="rating">Valoración</label>
          <select className="form-select" id="rating" name="rating" value={valores.rating} onChange={cambiar}>
            {[1, 2, 3, 4, 5].map((num) => <option key={num} value={num}>{num} estrellas</option>)}
          </select>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="imagen">Ruta de imagen (opcional)</label>
          <input className="form-control" id="imagen" name="imagen" value={valores.imagen}
            onChange={cambiar} placeholder="/img/img-productos/ejemplo.jpg" />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="descripcion">Descripción</label>
          <textarea className="form-control" id="descripcion" name="descripcion" rows="3"
            value={valores.descripcion} onChange={cambiar} />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" type="submit">Guardar producto</button>
          <Link className="btn btn-outline-secondary" to="/admin/productos">Cancelar</Link>
        </div>
      </form>
    </section>
  )
}
