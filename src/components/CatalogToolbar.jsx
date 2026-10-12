import { categorias } from '../data/categorias'

// Barra de búsqueda + filtro por categoría. No guarda estado propio:
// recibe los valores y las funciones desde la página (props).
export default function CatalogToolbar({ busqueda, categoria, onBusqueda, onCategoria }) {
  return (
    <form className="catalog-toolbar" onSubmit={(evento) => evento.preventDefault()}>
      <div className="search-group">
        <label htmlFor="buscador-productos" className="visually-hidden">Buscar productos</label>
        <input
          type="search"
          id="buscador-productos"
          name="buscar"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(evento) => onBusqueda(evento.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filtro-categoria">Categoría</label>
        <select
          id="filtro-categoria"
          name="categoria"
          value={categoria}
          onChange={(evento) => onCategoria(evento.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((nombre) => (
            <option key={nombre} value={nombre}>{nombre}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-add">Buscar</button>
    </form>
  )
}