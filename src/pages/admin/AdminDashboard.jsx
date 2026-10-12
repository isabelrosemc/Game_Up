export default function AdminDashboard() {
  return (
    <>
      <header className="admin-topbar">
        <h1>¡Hola, Administrador!</h1>
      </header>

      <section className="admin-paneles">
        <div className="admin-panel">
          <h2>Resumen general</h2>

          <div className="admin-resumen">
            <div className="admin-resumen__item">
              <span className="admin-resumen__valor">12</span>
              <span className="admin-resumen__etiqueta">
                Productos
              </span>
            </div>

            <div className="admin-resumen__item">
              <span className="admin-resumen__valor">8</span>
              <span className="admin-resumen__etiqueta">
                Usuarios
              </span>
            </div>

            <div className="admin-resumen__item">
              <span className="admin-resumen__valor">2</span>
              <span className="admin-resumen__etiqueta">
                Stock crítico
              </span>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <h2>Alertas de stock</h2>

          <ul className="admin-alertas__lista">
            <li className="admin-alertas__item">
              <span className="admin-alertas__nombre">
                PC Gamer ASUS ROG Strix (CG001)
              </span>
              <span className="admin-alertas__stock">
                2 unidades
              </span>
            </li>

            <li className="admin-alertas__item">
              <span className="admin-alertas__nombre">
                PlayStation 5 (CO001)
              </span>
              <span className="admin-alertas__stock">
                3 unidades
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}