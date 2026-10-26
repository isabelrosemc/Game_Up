import { Link } from 'react-router-dom';
// Importación exacta según tu línea 4 de productos.js:
import { obtenerProductos } from '../../utils/productos';
import { obtenerUsuarios } from '../../utils/usuarios';

export default function AdminDashboard() {
  const productos = obtenerProductos()
  const usuarios = obtenerUsuarios()

  // Regla de negocio oficial: productos en o por debajo de su stock crítico
  const productosEnAlerta = productos.filter(
    (p) => Number(p.stockCritico) > 0 && Number(p.stock) <= Number(p.stockCritico)
  );

  return (
    <div className="container-fluid py-4 px-md-4 text-light">
      {/* 1. Encabezado principal */}
      <header className="pb-3 mb-4">
        <h1 className="h3 fw-bold text-uppercase m-0 tracking-wide">
          ¡HOLA, ADMINISTRADOR!
        </h1>
        <small className="text-secondary">
          Panel de control general de LevelUp Gamer
        </small>
      </header>

      {/* 2. Sección: RESUMEN GENERAL */}
      <section className="mb-5">
        <h2 className="h5 fw-bold text-uppercase text-secondary mb-3">
          RESUMEN GENERAL
        </h2>
        <div className="row g-3">
          {/* Card: Inventario */}
          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light border border-secondary border-opacity-50 shadow-sm h-100">
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="text-secondary small text-uppercase fw-semibold">
                    INVENTARIO
                  </span>
                  <span className="display-4 fw-bold text-info d-block my-2">
                    {productos.length}
                  </span>
                  <p className="card-text text-secondary small mb-3">
                    Productos activos en la tienda
                  </p>
                </div>
                <Link
                  to="/admin/productos"
                  className="btn btn-sm btn-outline-info align-self-start"
                >
                  Ver catálogo &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card: Comunidad */}
          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light border border-secondary border-opacity-50 shadow-sm h-100">
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="text-secondary small text-uppercase fw-semibold">
                    COMUNIDAD
                  </span>
                  <span className="display-4 fw-bold text-primary d-block my-2">
                    {usuarios.length}
                  </span>
                  <p className="card-text text-secondary small mb-3">
                    Usuarios registrados en la plataforma
                  </p>
                </div>
                <Link
                  to="/admin/usuarios"
                  className="btn btn-sm btn-outline-primary align-self-start"
                >
                  Ver usuarios &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card: Atención */}
          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light border border-danger shadow-sm h-100">
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-danger small text-uppercase fw-semibold">
                      ATENCIÓN
                    </span>
                    {productosEnAlerta.length > 0 && (
                      <span className="badge bg-danger">Urgente</span>
                    )}
                  </div>
                  <span className="display-4 fw-bold text-danger d-block my-2">
                    {productosEnAlerta.length}
                  </span>
                  <p className="card-text text-secondary small mb-0">
                    Artículos con inventario mínimo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sección: ALERTAS DE STOCK */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 fw-bold text-uppercase text-secondary m-0">
            ALERTAS DE STOCK
          </h2>
          <span className="badge bg-danger-subtle text-danger border border-danger">
            {productosEnAlerta.length} producto{productosEnAlerta.length === 1 ? '' : 's'} en riesgo
          </span>
        </div>

        <div className="list-group list-group-flush rounded border border-secondary border-opacity-50 shadow-sm overflow-hidden">
          {productosEnAlerta.length > 0 ? (
            productosEnAlerta.map((prod) => (
              <div
                key={prod.codigo}
                className="list-group-item bg-dark text-light border-secondary border-opacity-25 d-flex justify-content-between align-items-center py-3 px-4"
              >
                <div>
                  <p className="mb-0 fw-semibold">{prod.nombre} ({prod.codigo})</p>
                  <small className="text-secondary">Categoría: {prod.categoria}</small>
                </div>
                <span className="badge bg-danger-subtle text-danger border border-danger px-3 py-2 fs-6">
                  {prod.stock} {prod.stock === 1 ? 'unidad' : 'unidades'}
                </span>
              </div>
            ))
          ) : (
            <div className="list-group-item bg-dark text-secondary py-3 px-4">
              No hay productos con nivel de stock crítico en este momento.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}