/* ==========================================================================
   PRODUCTOS.JS
   Arreglo de productos de Level-Up Gamer (R.5, R.6, R.16)
   Fuente: Detalle de productos - Anexo "Forma B tienda Level-Up Gamer"
   ========================================================================== */

/**
 * Cada producto sigue la estructura definida para el mantenedor (R.16):
 * codigo, categoria, nombre, descripcion, precio, stock, stockCritico, imagen
 */
const PRODUCTOS = [
    {
        codigo: "JM001",
        categoria: "Juegos de Mesa",
        nombre: "Catan",
        descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
        precio: 29990,
        stock: 25,
        stockCritico: 5,
        fabricante: "Catan Studio",
        imagen: "../img/img-productos/catan.jpg"
    },
    {
        codigo: "JM002",
        categoria: "Juegos de Mesa",
        nombre: "Carcassonne",
        descripcion: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
        precio: 24990,
        stock: 18,
        stockCritico: 5,
        fabricante: "Hans im Glück",
        imagen: "../img/img-productos/carcassonne.jpg"
    },
    {
        codigo: "AC001",
        categoria: "Accesorios",
        nombre: "Controlador Inalámbrico Xbox Series X",
        descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
        precio: 59990,
        stock: 40,
        stockCritico: 8,
        fabricante: "Microsoft",
        imagen: "../img/img-productos/control-xbox.jpg"
    },
    {
        codigo: "AC002",
        categoria: "Accesorios",
        nombre: "Auriculares Gamer HyperX Cloud II",
        descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
        precio: 79990,
        stock: 30,
        stockCritico: 6,
        fabricante: "HyperX",
        imagen: "../img/img-productos/auris-hyperx.jpg"
    },
    {
        codigo: "CO001",
        categoria: "Consolas",
        nombre: "PlayStation 5",
        descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
        precio: 549990,
        stock: 10,
        stockCritico: 3,
        fabricante: "Sony",
        imagen: "../img/img-productos/play5.jpg"
    },
    {
        codigo: "CG001",
        categoria: "Computadores Gamers",
        nombre: "PC Gamer ASUS ROG Strix",
        descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
        precio: 1299990,
        stock: 6,
        stockCritico: 2,
        fabricante: "ASUS",
        imagen: "../img/img-productos/pc-asus.jpg"
    },
    {
        codigo: "SG001",
        categoria: "Sillas Gamers",
        nombre: "Silla Gamer Secretlab Titan",
        descripcion: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
        precio: 349990,
        stock: 12,
        stockCritico: 3,
        fabricante: "Secretlab",
        imagen: "../img/img-productos/silla.jpg"
    },
    {
        codigo: "MS001",
        categoria: "Mouse",
        nombre: "Mouse Gamer Logitech G502 HERO",
        descripcion: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
        precio: 49990,
        stock: 35,
        stockCritico: 8,
        fabricante: "Logitech",
        imagen: "../img/img-productos/mouse.jpg"
    },
    {
        codigo: "MP001",
        categoria: "Mousepad",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
        precio: 29990,
        stock: 22,
        stockCritico: 5,
        fabricante: "Razer",
        imagen: "../img/img-productos/mousepad.jpg"
    },
    {
        codigo: "PP001",
        categoria: "Poleras Personalizadas",
        nombre: "Polera Gamer Personalizada 'Level-Up'",
        descripcion: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
        precio: 14990,
        stock: 50,
        stockCritico: 10,
        fabricante: "Level-Up Gamer",
        imagen: "../img/img-productos/polera.jpg"
    },
    {
        codigo: "PG001",
        categoria: "Polerones Gamers Personalizados",
        nombre: "Polerón Gamer Personalizado 'Level-Up'",
        descripcion: "Polerón cómodo y abrigado, ideal para sesiones largas de juego, personalizable con tu gamer tag o diseño favorito.",
        precio: 24990,
        stock: 28,
        stockCritico: 6,
        fabricante: "Level-Up Gamer",
        imagen: "../img/img-productos/poleron.jpg"
    },
    {
        codigo: "ST001",
        categoria: "Servicio Técnico",
        nombre: "Mantención y Limpieza de PC Gamer",
        descripcion: "Servicio técnico especializado de limpieza, mantención y optimización de equipos gamers para un rendimiento óptimo.",
        precio: 19990,
        stock: 999,
        stockCritico: 0,
        fabricante: "Level-Up Gamer",
        imagen: "../img/img-productos/mantencion.jpg"
    }
];

/**
 * Devuelve la lista de categorías únicas presentes en el catálogo,
 * en el orden definido por el enunciado.
 */
function obtenerCategorias() {
    const orden = [
        "Juegos de Mesa",
        "Accesorios",
        "Consolas",
        "Computadores Gamers",
        "Sillas Gamers",
        "Mouse",
        "Mousepad",
        "Poleras Personalizadas",
        "Polerones Gamers Personalizados",
        "Servicio Técnico"
    ];
    const presentes = new Set(PRODUCTOS.map(function (p) { return p.categoria; }));
    return orden.filter(function (c) { return presentes.has(c); });
}

/**
 * Formatea un número como precio en pesos chilenos, ej: 29990 -> "$29.990"
 */
function formatearPrecio(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}