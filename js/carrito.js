/* ==========================================================================
   CARRITO.JS
   Gestión del carrito de compras con persistencia en localStorage
   (R.7 - Gestionar Carrito de Compras, R.23 - Persistir datos del carrito)
   ========================================================================== */

const CARRITO_STORAGE_KEY = "levelupgamer_carrito";

/**
 * Recupera el carrito guardado en localStorage.
 * Estructura: [{ codigo, nombre, precio, cantidad, imagen }, ...]
 */
function obtenerCarrito() {
    try {
        const data = localStorage.getItem(CARRITO_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("No se pudo leer el carrito guardado:", error);
        return [];
    }
}

/**
 * Guarda el carrito completo en localStorage.
 */
function guardarCarrito(carrito) {
    try {
        localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
    } catch (error) {
        console.error("No se pudo guardar el carrito:", error);
    }
}

/**
 * Añade un producto al carrito. Si ya existe, suma la cantidad.
 */
function agregarAlCarrito(producto, cantidad) {
    cantidad = cantidad || 1;
    const carrito = obtenerCarrito();
    const existente = carrito.find(function (item) { return item.codigo === producto.codigo; });

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            imagen: producto.imagen || null
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    return carrito;
}

/**
 * Devuelve la cantidad total de unidades en el carrito (para el badge del header).
 */
function contarUnidadesCarrito() {
    return obtenerCarrito().reduce(function (total, item) { return total + item.cantidad; }, 0);
}

/**
 * Actualiza el contador visual del carrito en el header, si existe en la página.
 */
function actualizarContadorCarrito() {
    const badge = document.querySelectorAll("[data-cart-count]");
    const total = contarUnidadesCarrito();
    badge.forEach(function (el) {
        el.textContent = total;
    });
}

// Al cargar cualquier página que incluya este script, sincroniza el contador visual.
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
