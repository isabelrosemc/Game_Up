/* ==========================================================================
   LISTA-USUARIOS.JS
   Renderiza el arreglo USUARIOS (usuarios.js) en la tabla del mantenedor.
   Solo lectura por ahora: Editar/Eliminar no tienen funcionalidad todavía.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const cuerpoTabla = document.getElementById("cuerpo-tabla-usuarios");

    USUARIOS.forEach(function (usuario) {
        const fila = document.createElement("tr");
        const edad = calcularEdad(usuario.fechaNacimiento);

        fila.innerHTML =
            '<td>' + formatearRun(usuario.run) + '</td>' +
            '<td class="tabla-admin__nombre">' + obtenerNombreCompleto(usuario) + '</td>' +
            '<td>' + usuario.correo + '</td>' +
            '<td>' + usuario.tipoUsuario + '</td>' +
            '<td>' + usuario.comuna + ', ' + usuario.region + '</td>' +
            '<td>' + (edad === null ? '—' : edad + ' años') + '</td>' +
            '<td>' +
                '<div class="tabla-admin__acciones">' +
                    '<button type="button" class="boton-icono" onclick="alert(\'El botón Editar aún no se ha implementado\')">Editar</button>' +
                    '<button type="button" class="boton-icono boton-icono--peligro" onclick="alert(\'El botón Eliminar aún no se ha implementado\')">Eliminar</button>' +
                '</div>' +
            '</td>';

        cuerpoTabla.appendChild(fila);
    });
});