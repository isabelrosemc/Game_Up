/* ==========================================================================
   USUARIOS.JS
   Arreglo de usuarios de ejemplo para Level-Up Gamer (R.17)
   Todos los datos son inventados, pero cumplen las reglas de validación:
   - RUN sin puntos ni guion, con dígito verificador correcto (7-9 caracteres).
   - Correo con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com.
   - Contraseña de 4 a 10 caracteres.
   - Mayores de 18 años a la fecha.
   ========================================================================== */

/**
 * Cada usuario sigue la estructura definida para el mantenedor (R.17)
 * y la que genera el formulario admin/usuario-form.html:
 * run, nombre, apellidos, correo, contrasena, fechaNacimiento,
 * tipoUsuario, region, comuna, direccion, descuentoDuoc
 */
const USUARIOS = [
    {
        run: "111111111",
        nombre: "Camila",
        apellidos: "Reyes Muñoz",
        correo: "camila.reyes@duoc.cl",
        contrasena: "admin123",
        fechaNacimiento: "1990-05-12",
        tipoUsuario: "Administrador",
        region: "Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "Av. Providencia 1234",
        descuentoDuoc: true
    },
    {
        run: "222222222",
        nombre: "Diego",
        apellidos: "Fernández Soto",
        correo: "diego.fernandez@gmail.com",
        contrasena: "vende1",
        fechaNacimiento: "1995-08-23",
        tipoUsuario: "Vendedor",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Calle Alemania 456",
        descuentoDuoc: false
    },
    {
        run: "156782343",
        nombre: "Javiera",
        apellidos: "Muñoz Rojas",
        correo: "javiera.munoz@profesor.duoc.cl",
        contrasena: "prof2024",
        fechaNacimiento: "1988-02-10",
        tipoUsuario: "Vendedor",
        region: "Biobío",
        comuna: "Concepción",
        direccion: "Los Carrera 789",
        descuentoDuoc: true
    },
    {
        run: "203014562",
        nombre: "Matías",
        apellidos: "López Contreras",
        correo: "matias.lopez@gmail.com",
        contrasena: "gamer1",
        fechaNacimiento: "2000-11-05",
        tipoUsuario: "Cliente",
        region: "Metropolitana de Santiago",
        comuna: "Maipú",
        direccion: "Pasaje Los Aromos 321",
        descuentoDuoc: false
    },
    {
        run: "98765433",
        nombre: "Fernanda",
        apellidos: "Torres Vidal",
        correo: "fernanda.torres@duoc.cl",
        contrasena: "duoc456",
        fechaNacimiento: "2003-01-30",
        tipoUsuario: "Cliente",
        region: "Valparaíso",
        comuna: "Quilpué",
        direccion: "Av. O'Higgins 2200",
        descuentoDuoc: true
    },
    {
        run: "8765432K",
        nombre: "Benjamín",
        apellidos: "Castro Araya",
        correo: "benjamin.castro@gmail.com",
        contrasena: "level99",
        fechaNacimiento: "1999-07-18",
        tipoUsuario: "Cliente",
        region: "La Araucanía",
        comuna: "Temuco",
        direccion: "Manuel Montt 100",
        descuentoDuoc: false
    },
    {
        run: "172345670",
        nombre: "Antonia",
        apellidos: "Fuentes Silva",
        correo: "antonia.fuentes@gmail.com",
        contrasena: "coqui23",
        fechaNacimiento: "2001-09-09",
        tipoUsuario: "Cliente",
        region: "Coquimbo",
        comuna: "La Serena",
        direccion: "Av. Francisco de Aguirre 55",
        descuentoDuoc: false
    },
    {
        run: "65432102",
        nombre: "Ignacio",
        apellidos: "Pérez Vega",
        correo: "ignacio.perez@duoc.cl",
        contrasena: "vendor1",
        fechaNacimiento: "1992-03-15",
        tipoUsuario: "Vendedor",
        region: "Los Lagos",
        comuna: "Puerto Montt",
        direccion: "Av. Costanera 900",
        descuentoDuoc: true
    }
];

/**
 * Devuelve el nombre completo de un usuario.
 */
function obtenerNombreCompleto(usuario) {
    return usuario.nombre + " " + usuario.apellidos;
}

/**
 * Calcula la edad actual a partir de una fecha de nacimiento "YYYY-MM-DD".
 */
function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return null;
    const nacimiento = new Date(fechaNacimiento + "T00:00:00");
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const aunNoCumple = (hoy.getMonth() < nacimiento.getMonth()) ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
    if (aunNoCumple) edad--;
    return edad;
}

/**
 * Formatea un RUN sin puntos ni guion a su forma legible, ej:
 * "111111111" -> "11.111.111-1"
 */
function formatearRun(run) {
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return cuerpoFormateado + "-" + dv;
}