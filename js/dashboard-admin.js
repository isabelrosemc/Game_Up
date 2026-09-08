/* ==========================================================================
   DASHBOARD-ADMIN.JS
   Renderiza los paneles de Home del administrador (admin/index.html):
   1) Resumen rápido: totales de productos y usuarios.
   2) Alertas de stock crítico: productos en o bajo su stock crítico.
   Solo lectura: no modifica PRODUCTOS ni USUARIOS.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    renderizarResumen();
    renderizarAlertasStock();
});

function renderizarResumen() {
    const contenedor = document.getElementById("admin-resumen");
    if (!contenedor) return;

    const totalProductos = PRODUCTOS.length;
    const totalUsuarios = USUARIOS.length;
    const totalStockCritico = PRODUCTOS.filter(estaEnStockCritico).length;

    const items = [
        { valor: totalProductos, etiqueta: "Productos en catálogo" },
        { valor: totalUsuarios, etiqueta: "Usuarios registrados" },
        { valor: totalStockCritico, etiqueta: "Productos con stock crítico" }
    ];

    contenedor.innerHTML = items.map(function (item) {
        return (
            '<div class="admin-resumen__item">' +
                '<span class="admin-resumen__valor">' + item.valor + '</span>' +
                '<span class="admin-resumen__etiqueta">' + item.etiqueta + '</span>' +
            '</div>'
        );
    }).join("");
}

function renderizarAlertasStock() {
    const lista = document.getElementById("admin-alertas-lista");
    if (!lista) return;

    const productosCriticos = PRODUCTOS.filter(estaEnStockCritico);

    if (productosCriticos.length === 0) {
        lista.innerHTML = '<li class="admin-alertas__vacio">No hay productos con stock crítico por el momento.</li>';
        return;
    }

    lista.innerHTML = productosCriticos.map(function (producto) {
        return (
            '<li class="admin-alertas__item">' +
                '<span class="admin-alertas__nombre">' + producto.nombre + ' <span>(' + producto.codigo + ')</span></span>' +
                '<span class="admin-alertas__stock"><span></span>' + producto.stock + ' / ' + producto.stockCritico + ' unidades</span>' +
            '</li>'
        );
    }).join("");
}

function estaEnStockCritico(producto) {
    return producto.stockCritico !== null &&
        producto.stockCritico !== undefined &&
        producto.stock <= producto.stockCritico;
}
