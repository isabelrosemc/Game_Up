/* ==========================================================================
   LISTA-PRODUCTOS.JS
   Renderiza el arreglo PRODUCTOS (productos.js) en la tabla del mantenedor.
   Solo lectura por ahora: Editar/Eliminar no tienen funcionalidad todavía.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const cuerpoTabla = document.getElementById("cuerpo-tabla-productos");

    PRODUCTOS.forEach(function (producto) {
        const fila = document.createElement("tr");
        
        const enStockCritico = producto.stockCritico !== null &&
            producto.stockCritico !== undefined &&
            producto.stock <= producto.stockCritico;

        fila.innerHTML =
            '<td>' +
                '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" class="tabla-admin__imagen" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">' +
            '</td>' +
            '<td>' + producto.codigo + '</td>' +
            '<td class="tabla-admin__nombre">' + producto.nombre + '</td>' +
            '<td>' + producto.categoria + '</td>' +
            '<td>' + formatearPrecio(producto.precio) + '</td>' +
            '<td>' +
                '<span class="tabla-admin__stock">' +
                    (enStockCritico ? '<span class="tabla-admin__alerta" title="Stock bajo"></span>' : '') +
                    producto.stock +
                '</span>' +
            '</td>' +
            '<td>' + (producto.stockCritico === null || producto.stockCritico === undefined ? '—' : producto.stockCritico) + '</td>' +
            '<td>' +
                '<div class="tabla-admin__acciones">' +
                    '<button type="button" class="boton-icono" onclick="alert(\'El botón Editar aún no se ha implementado\')">Editar</button>' +
                    '<button type="button" class="boton-icono boton-icono--peligro" onclick="alert(\'El botón Eliminar aún no se ha implementado\')">Eliminar</button>' +
                '</div>' +
            '</td>';

        cuerpoTabla.appendChild(fila);
    });
});