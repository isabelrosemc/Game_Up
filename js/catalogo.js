/* ==========================================================================
   CATALOGO.JS
   Lógica de la vista Catálogo de Productos (tienda/catalogo-productos.html)
   Requerimiento R.5: filtrar por categoría y buscar por nombre.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("catalog-grid");
    const inputBusqueda = document.getElementById("buscador-productos");
    const selectCategoria = document.getElementById("filtro-categoria");
    const selectOrden = document.getElementById("filtro-orden");
    const btnLimpiar = document.getElementById("btn-limpiar-filtros");
    const chipsContainer = document.getElementById("category-chips");
    const contadorResultados = document.getElementById("contador-resultados");
    const paginacionContainer = document.getElementById("paginacion");
    const toast = document.getElementById("toast-carrito");

    const PRODUCTOS_POR_PAGINA = 8;
    let paginaActual = 1;

    // --- Poblar el select y los chips de categorías a partir del arreglo de productos ---
    function poblarCategorias() {
        const categorias = obtenerCategorias();

        categorias.forEach(function (categoria) {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria;
            selectCategoria.appendChild(option);
        });

        const chipTodos = crearChip("Todos", "");
        chipTodos.classList.add("active");
        chipsContainer.appendChild(chipTodos);

        categorias.forEach(function (categoria) {
            chipsContainer.appendChild(crearChip(categoria, categoria));
        });
    }

    function crearChip(etiqueta, valor) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip";
        chip.textContent = etiqueta;
        chip.dataset.categoria = valor;
        chip.addEventListener("click", function () {
            selectCategoria.value = valor;
            marcarChipActivo(valor);
            paginaActual = 1;
            renderizar();
        });
        return chip;
    }

    function marcarChipActivo(valor) {
        const chips = chipsContainer.querySelectorAll(".chip");
        chips.forEach(function (chip) {
            chip.classList.toggle("active", chip.dataset.categoria === valor);
        });
    }

    // --- Filtrado, orden y paginación ---
    function obtenerProductosFiltrados() {
        const termino = inputBusqueda.value.trim().toLowerCase();
        const categoria = selectCategoria.value;
        const orden = selectOrden.value;

        let resultado = PRODUCTOS.filter(function (producto) {
            const coincideNombre = producto.nombre.toLowerCase().includes(termino);
            const coincideCategoria = categoria === "" || producto.categoria === categoria;
            return coincideNombre && coincideCategoria;
        });

        if (orden === "precio-asc") {
            resultado = resultado.slice().sort(function (a, b) { return a.precio - b.precio; });
        } else if (orden === "precio-desc") {
            resultado = resultado.slice().sort(function (a, b) { return b.precio - a.precio; });
        } else if (orden === "nombre-az") {
            resultado = resultado.slice().sort(function (a, b) { return a.nombre.localeCompare(b.nombre); });
        }

        return resultado;
    }

    function crearTarjetaProducto(producto) {
        const link = document.createElement("a");
        link.className = "product-card-link";
        link.href = "detalle-producto.html?codigo=" + encodeURIComponent(producto.codigo);

        const agotado = producto.stock <= 0;
        const stockBajo = !agotado && producto.stockCritico && producto.stock <= producto.stockCritico;

        let badgeHtml = "";
        if (agotado) {
            badgeHtml = '<span class="stock-badge out">Agotado</span>';
        } else if (stockBajo) {
            badgeHtml = '<span class="stock-badge low">¡Últimas unidades!</span>';
        }

        link.innerHTML =
            '<article class="product-card">' +
                '<div class="placeholder-img product-img">IMG</div>' +
                badgeHtml +
                '<span class="product-category">' + producto.categoria + '</span>' +
                '<h3 class="product-title">' + producto.nombre + '</h3>' +
                '<div class="product-footer">' +
                    '<span class="product-price">' + formatearPrecio(producto.precio) + '</span>' +
                    '<button type="button" class="btn-add" data-codigo="' + producto.codigo + '"' + (agotado ? " disabled" : "") + '>' +
                        (agotado ? "Agotado" : "Añadir") +
                    '</button>' +
                '</div>' +
            '</article>';

        // Evita que el clic en "Añadir" dispare la navegación del <a>
        const boton = link.querySelector(".btn-add");
        boton.addEventListener("click", function (evento) {
            evento.preventDefault();
            evento.stopPropagation();
            if (!agotado) {
                agregarAlCarrito(producto, 1);
                mostrarToast(producto.nombre);
            }
        });

        return link;
    }

    function mostrarToast(nombreProducto) {
        toast.innerHTML = '<strong>' + nombreProducto + '</strong> se añadió al carrito';
        toast.classList.add("show");
        clearTimeout(mostrarToast._timeout);
        mostrarToast._timeout = setTimeout(function () {
            toast.classList.remove("show");
        }, 2200);
    }

    function renderizarPaginacion(totalProductos) {
        paginacionContainer.innerHTML = "";
        const totalPaginas = Math.ceil(totalProductos / PRODUCTOS_POR_PAGINA);

        if (totalPaginas <= 1) {
            return;
        }

        const btnAnterior = document.createElement("button");
        btnAnterior.type = "button";
        btnAnterior.textContent = "‹";
        btnAnterior.disabled = paginaActual === 1;
        btnAnterior.addEventListener("click", function () {
            paginaActual = Math.max(1, paginaActual - 1);
            renderizar();
        });
        paginacionContainer.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const btnPagina = document.createElement("button");
            btnPagina.type = "button";
            btnPagina.textContent = String(i);
            btnPagina.className = i === paginaActual ? "active" : "";
            btnPagina.addEventListener("click", function () {
                paginaActual = i;
                renderizar();
            });
            paginacionContainer.appendChild(btnPagina);
        }

        const btnSiguiente = document.createElement("button");
        btnSiguiente.type = "button";
        btnSiguiente.textContent = "›";
        btnSiguiente.disabled = paginaActual === totalPaginas;
        btnSiguiente.addEventListener("click", function () {
            paginaActual = Math.min(totalPaginas, paginaActual + 1);
            renderizar();
        });
        paginacionContainer.appendChild(btnSiguiente);
    }

    function renderizar() {
        const filtrados = obtenerProductosFiltrados();

        contadorResultados.innerHTML = "<strong>" + filtrados.length + "</strong> producto" + (filtrados.length === 1 ? "" : "s") + " encontrado" + (filtrados.length === 1 ? "" : "s");

        grid.innerHTML = "";

        if (filtrados.length === 0) {
            const mensaje = document.createElement("div");
            mensaje.className = "no-results";
            mensaje.innerHTML = "<p>No encontramos productos</p><p>Prueba con otro nombre o categoría.</p>";
            grid.appendChild(mensaje);
            paginacionContainer.innerHTML = "";
            return;
        }

        const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
        const paginaProductos = filtrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

        paginaProductos.forEach(function (producto) {
            grid.appendChild(crearTarjetaProducto(producto));
        });

        renderizarPaginacion(filtrados.length);
    }

    // --- Eventos de filtros ---
    inputBusqueda.addEventListener("input", function () {
        paginaActual = 1;
        renderizar();
    });

    selectCategoria.addEventListener("change", function () {
        marcarChipActivo(selectCategoria.value);
        paginaActual = 1;
        renderizar();
    });

    selectOrden.addEventListener("change", function () {
        paginaActual = 1;
        renderizar();
    });

    btnLimpiar.addEventListener("click", function () {
        inputBusqueda.value = "";
        selectCategoria.value = "";
        selectOrden.value = "";
        marcarChipActivo("");
        paginaActual = 1;
        renderizar();
    });

    // --- Soporta enlazar directo con categoría vía querystring: catalogo-productos.html?categoria=Mouse ---
    function aplicarCategoriaDesdeURL() {
        const params = new URLSearchParams(window.location.search);
        const categoria = params.get("categoria");
        if (categoria) {
            selectCategoria.value = categoria;
            marcarChipActivo(categoria);
        }
    }

    // --- Inicialización ---
    poblarCategorias();
    aplicarCategoriaDesdeURL();
    renderizar();
});
