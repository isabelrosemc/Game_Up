/* ==========================================================================
   PRODUCTO-FORM.JS
   Validación del formulario "Nuevo Producto" y guardado en localStorage.
   ========================================================================== */

const PRODUCTOS_ADMIN_STORAGE_KEY = "levelupgamer_productos_admin";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-producto");
    const toast = document.getElementById("toast-exito");

    const campoCodigo = document.getElementById("codigo");
    const campoCategoria = document.getElementById("categoria");
    const campoNombre = document.getElementById("nombre");
    const campoPrecio = document.getElementById("precio");
    const campoStock = document.getElementById("stock");
    const campoStockCritico = document.getElementById("stockCritico");
    const campoDescripcion = document.getElementById("descripcion");

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        limpiarErrores();

        const datos = {
            codigo: campoCodigo.value.trim(),
            categoria: campoCategoria.value,
            nombre: campoNombre.value.trim(),
            precio: campoPrecio.value,
            stock: campoStock.value,
            stockCritico: campoStockCritico.value,
            descripcion: campoDescripcion.value.trim()
        };

        const esValido = validarFormulario(datos);

        if (!esValido) {
            return;
        }

        guardarProducto({
            codigo: datos.codigo,
            categoria: datos.categoria,
            nombre: datos.nombre,
            precio: Number(datos.precio),
            stock: Number(datos.stock),
            stockCritico: datos.stockCritico === "" ? 0 : Number(datos.stockCritico),
            descripcion: datos.descripcion,
            imagen: null
        });

        form.reset();
        mostrarToast();
    });

    /**
     * Valida cada campo del formulario y muestra el mensaje de error
     * correspondiente. Devuelve true si todo el formulario es válido.
     */
    function validarFormulario(datos) {
        let esValido = true;

        // Código: obligatorio, mínimo 3 caracteres, único
        if (datos.codigo === "") {
            mostrarError("codigo", "El código es obligatorio.");
            esValido = false;
        } else if (datos.codigo.length < 3) {
            mostrarError("codigo", "El código debe tener al menos 3 caracteres.");
            esValido = false;
        } else if (existeCodigo(datos.codigo)) {
            mostrarError("codigo", "Ya existe un producto con ese código.");
            esValido = false;
        }

        // Categoría: obligatoria
        if (datos.categoria === "") {
            mostrarError("categoria", "Debes seleccionar una categoría.");
            esValido = false;
        }

        // Nombre: obligatorio
        if (datos.nombre === "") {
            mostrarError("nombre", "El nombre es obligatorio.");
            esValido = false;
        }

        // Precio: obligatorio, número, mayor o igual a 0
        if (datos.precio === "") {
            mostrarError("precio", "El precio es obligatorio.");
            esValido = false;
        } else if (isNaN(datos.precio) || Number(datos.precio) < 0) {
            mostrarError("precio", "Ingresa un precio válido (0 o mayor).");
            esValido = false;
        }

        // Stock: obligatorio, número entero, mayor o igual a 0
        if (datos.stock === "") {
            mostrarError("stock", "El stock es obligatorio.");
            esValido = false;
        } else if (isNaN(datos.stock) || Number(datos.stock) < 0 || !Number.isInteger(Number(datos.stock))) {
            mostrarError("stock", "Ingresa un número entero (0 o mayor).");
            esValido = false;
        }

        // Stock crítico: opcional, pero si se ingresa debe ser un entero válido
        if (datos.stockCritico !== "" && (isNaN(datos.stockCritico) || Number(datos.stockCritico) < 0 || !Number.isInteger(Number(datos.stockCritico)))) {
            mostrarError("stockCritico", "Ingresa un número entero (0 o mayor).");
            esValido = false;
        }

        return esValido;
    }

    /**
     * Verifica si un código ya existe entre los productos base
     * y los productos guardados por el administrador.
     */
    function existeCodigo(codigo) {
        const enBase = PRODUCTOS.some(function (p) { return p.codigo.toLowerCase() === codigo.toLowerCase(); });
        const enGuardados = obtenerProductosGuardados().some(function (p) { return p.codigo.toLowerCase() === codigo.toLowerCase(); });
        return enBase || enGuardados;
    }

    function mostrarError(idCampo, mensaje) {
        const spanError = document.getElementById("error-" + idCampo);
        const input = document.getElementById(idCampo);
        if (spanError) {
            spanError.textContent = mensaje;
        }
        if (input) {
            input.classList.add("campo--invalido");
        }
    }

    function limpiarErrores() {
        const errores = form.querySelectorAll(".campo__error");
        errores.forEach(function (span) { span.textContent = ""; });

        const invalidos = form.querySelectorAll(".campo--invalido");
        invalidos.forEach(function (input) { input.classList.remove("campo--invalido"); });
    }

    function mostrarToast() {
        toast.classList.add("show");
        setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }
});

/**
 * Recupera los productos guardados por el administrador desde localStorage.
 */
function obtenerProductosGuardados() {
    try {
        const data = localStorage.getItem(PRODUCTOS_ADMIN_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("No se pudo leer los productos guardados:", error);
        return [];
    }
}

/**
 * Añade un nuevo producto a la lista guardada en localStorage.
 */
function guardarProducto(producto) {
    const productos = obtenerProductosGuardados();
    productos.push(producto);
    try {
        localStorage.setItem(PRODUCTOS_ADMIN_STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
        console.error("No se pudo guardar el producto:", error);
    }
}