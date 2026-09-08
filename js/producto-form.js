/* ==========================================================================
   PRODUCTO-FORM.JS
   Validaciones en tiempo real (R.22) y almacenamiento temporal en
   localStorage (R.16). No conecta aún con un backend ni con el listado.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const CLAVE_LOCALSTORAGE = "levelup_productos_creados";

    const form = document.getElementById("form-producto");
    const selectCategoria = document.getElementById("categoria");
    const toast = document.getElementById("toast-exito");

    const campos = {
        codigo: document.getElementById("codigo"),
        nombre: document.getElementById("nombre"),
        categoria: selectCategoria,
        precio: document.getElementById("precio"),
        stock: document.getElementById("stock"),
        stockCritico: document.getElementById("stockCritico"),
        descripcion: document.getElementById("descripcion")
    };

    /* --------------------------------------------------------------
       Poblar el select de categorías desde productos.js
       -------------------------------------------------------------- */
    if (typeof obtenerCategorias === "function") {
        obtenerCategorias().forEach(function (categoria) {
            const opcion = document.createElement("option");
            opcion.value = categoria;
            opcion.textContent = categoria;
            selectCategoria.appendChild(opcion);
        });
    }

    /* --------------------------------------------------------------
       Reglas de validación (R.16)
       -------------------------------------------------------------- */
    const validadores = {
        codigo: function (valor) {
            valor = valor.trim();
            if (!valor) return "El código es obligatorio.";
            if (valor.length < 3) return "Debe tener al menos 3 caracteres.";
            return "";
        },
        nombre: function (valor) {
            valor = valor.trim();
            if (!valor) return "El nombre es obligatorio.";
            if (valor.length > 100) return "Máximo 100 caracteres.";
            return "";
        },
        categoria: function (valor) {
            if (!valor) return "Selecciona una categoría.";
            return "";
        },
        precio: function (valor) {
            if (valor === "") return "El precio es obligatorio.";
            const numero = Number(valor);
            if (Number.isNaN(numero)) return "Ingresa un número válido.";
            if (numero < 0) return "El precio no puede ser negativo.";
            return "";
        },
        stock: function (valor) {
            if (valor === "") return "El stock es obligatorio.";
            const numero = Number(valor);
            if (!Number.isInteger(numero)) return "El stock debe ser un número entero.";
            if (numero < 0) return "El stock no puede ser negativo.";
            return "";
        },
        stockCritico: function (valor) {
            if (valor === "") return "";
            const numero = Number(valor);
            if (!Number.isInteger(numero)) return "Debe ser un número entero.";
            if (numero < 0) return "No puede ser negativo.";
            return "";
        },
        descripcion: function (valor) {
            if (valor.length > 500) return "Máximo 500 caracteres.";
            return "";
        }
    };

    /* --------------------------------------------------------------
       Mostrar / limpiar errores por campo
       -------------------------------------------------------------- */
    function validarCampo(nombreCampo) {
        const input = campos[nombreCampo];
        const mensaje = validadores[nombreCampo](input.value);
        const spanError = document.getElementById("error-" + nombreCampo);

        if (mensaje) {
            input.classList.add("campo--error");
            spanError.textContent = mensaje;
        } else {
            input.classList.remove("campo--error");
            spanError.textContent = "";
        }

        return mensaje === "";
    }

    Object.keys(campos).forEach(function (nombreCampo) {
        const input = campos[nombreCampo];
        input.addEventListener("input", function () { validarCampo(nombreCampo); });
        input.addEventListener("blur", function () { validarCampo(nombreCampo); });
    });

    /* --------------------------------------------------------------
       Envío del formulario
       -------------------------------------------------------------- */
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombresCampos = Object.keys(campos);
        const resultados = nombresCampos.map(validarCampo);
        const esValido = resultados.every(Boolean);

        if (!esValido) {
            const primerCampoInvalido = nombresCampos[resultados.indexOf(false)];
            campos[primerCampoInvalido].focus();
            return;
        }

        const producto = {
            codigo: campos.codigo.value.trim(),
            nombre: campos.nombre.value.trim(),
            categoria: campos.categoria.value,
            precio: Number(campos.precio.value),
            stock: Number(campos.stock.value),
            stockCritico: campos.stockCritico.value === "" ? null : Number(campos.stockCritico.value),
            descripcion: campos.descripcion.value.trim(),
            imagen: null
        };

        const productosGuardados = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE) || "[]");
        productosGuardados.push(producto);
        localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(productosGuardados));

        mostrarToast();
        form.reset();
        nombresCampos.forEach(function (nombreCampo) {
            document.getElementById("error-" + nombreCampo).textContent = "";
            campos[nombreCampo].classList.remove("campo--error");
        });
        campos.codigo.focus();
    });

    function mostrarToast() {
        toast.classList.add("visible");
        window.setTimeout(function () {
            toast.classList.remove("visible");
        }, 3000);
    }
});
