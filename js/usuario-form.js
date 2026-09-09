/* ==========================================================================
   USUARIO-FORM.JS
   Validación del formulario "Nuevo Usuario" y guardado en localStorage.
   ========================================================================== */

const USUARIOS_STORAGE_KEY = "levelupgamer_usuarios";

// Comunas disponibles según la región seleccionada.
const COMUNAS_POR_REGION = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "La Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Til Til", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa"],
    "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

// Dominios de correo permitidos.
const CORREOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-usuario");
    const toast = document.getElementById("toast-exito");

    const campoRun = document.getElementById("run");
    const campoTipoUsuario = document.getElementById("tipoUsuario");
    const campoNombre = document.getElementById("nombre");
    const campoApellidos = document.getElementById("apellidos");
    const campoCorreo = document.getElementById("correo");
    const campoContrasena = document.getElementById("contrasena");
    const campoFechaNacimiento = document.getElementById("fechaNacimiento");
    const campoRegion = document.getElementById("region");
    const campoComuna = document.getElementById("comuna");
    const campoDireccion = document.getElementById("direccion");

    // --- Al elegir una región, se llena y habilita el select de comuna ---
    campoRegion.addEventListener("change", function () {
        const comunas = COMUNAS_POR_REGION[campoRegion.value] || [];

        campoComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

        comunas.forEach(function (comuna) {
            const opcion = document.createElement("option");
            opcion.value = comuna;
            opcion.textContent = comuna;
            campoComuna.appendChild(opcion);
        });

        campoComuna.disabled = comunas.length === 0;
    });

    // --- Envío del formulario ---
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        limpiarErrores();

        const datos = {
            run: campoRun.value.trim(),
            tipoUsuario: campoTipoUsuario.value,
            nombre: campoNombre.value.trim(),
            apellidos: campoApellidos.value.trim(),
            correo: campoCorreo.value.trim(),
            contrasena: campoContrasena.value,
            fechaNacimiento: campoFechaNacimiento.value,
            region: campoRegion.value,
            comuna: campoComuna.value,
            direccion: campoDireccion.value.trim()
        };

        const esValido = validarFormulario(datos);

        if (!esValido) {
            return;
        }

        guardarUsuario(datos);

        form.reset();
        campoComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
        campoComuna.disabled = true;
        mostrarToast();
    });

    /**
     * Valida cada campo del formulario y muestra el mensaje de error
     * correspondiente. Devuelve true si todo el formulario es válido.
     */
    function validarFormulario(datos) {
        let esValido = true;

        // RUN: obligatorio, entre 7 y 9 caracteres, único
        if (datos.run === "") {
            mostrarError("run", "El RUN es obligatorio.");
            esValido = false;
        } else if (datos.run.length < 7 || datos.run.length > 9) {
            mostrarError("run", "El RUN debe tener entre 7 y 9 caracteres.");
            esValido = false;
        } else if (existeRun(datos.run)) {
            mostrarError("run", "Ya existe un usuario con ese RUN.");
            esValido = false;
        }

        // Tipo de usuario: obligatorio
        if (datos.tipoUsuario === "") {
            mostrarError("tipoUsuario", "Debes seleccionar un tipo de usuario.");
            esValido = false;
        }

        // Nombre: obligatorio
        if (datos.nombre === "") {
            mostrarError("nombre", "El nombre es obligatorio.");
            esValido = false;
        }

        // Apellidos: obligatorio
        if (datos.apellidos === "") {
            mostrarError("apellidos", "Los apellidos son obligatorios.");
            esValido = false;
        }

        // Correo: obligatorio, formato válido y dominio permitido
        if (datos.correo === "") {
            mostrarError("correo", "El correo es obligatorio.");
            esValido = false;
        } else if (!tieneFormatoDeCorreo(datos.correo)) {
            mostrarError("correo", "Ingresa un correo con formato válido.");
            esValido = false;
        } else if (!tieneDominioPermitido(datos.correo)) {
            mostrarError("correo", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            esValido = false;
        }

        // Contraseña: obligatoria, entre 4 y 10 caracteres
        if (datos.contrasena === "") {
            mostrarError("contrasena", "La contraseña es obligatoria.");
            esValido = false;
        } else if (datos.contrasena.length < 4 || datos.contrasena.length > 10) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        }

        // Fecha de nacimiento: obligatoria y debe indicar mayoría de edad
        if (datos.fechaNacimiento === "") {
            mostrarError("fechaNacimiento", "La fecha de nacimiento es obligatoria.");
            esValido = false;
        } else if (!esMayorDeEdad(datos.fechaNacimiento)) {
            mostrarError("fechaNacimiento", "El usuario debe ser mayor de 18 años.");
            esValido = false;
        }

        // Región: obligatoria
        if (datos.region === "") {
            mostrarError("region", "Debes seleccionar una región.");
            esValido = false;
        }

        // Comuna: obligatoria
        if (datos.comuna === "") {
            mostrarError("comuna", "Debes seleccionar una comuna.");
            esValido = false;
        }

        // Dirección: obligatoria
        if (datos.direccion === "") {
            mostrarError("direccion", "La dirección es obligatoria.");
            esValido = false;
        }

        return esValido;
    }

    /**
     * Revisa si el correo tiene la forma básica "algo@algo.algo".
     */
    function tieneFormatoDeCorreo(correo) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    }

    /**
     * Revisa si el correo termina en uno de los dominios permitidos.
     */
    function tieneDominioPermitido(correo) {
        return CORREOS_PERMITIDOS.some(function (dominio) {
            return correo.toLowerCase().endsWith(dominio);
        });
    }

    /**
     * Calcula si la fecha de nacimiento corresponde a una persona mayor de 18 años.
     */
    function esMayorDeEdad(fechaNacimiento) {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();

        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const noHaCumplidoAnosEsteAno =
            hoy.getMonth() < nacimiento.getMonth() ||
            (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());

        if (noHaCumplidoAnosEsteAno) {
            edad = edad - 1;
        }

        return edad >= 18;
    }

    /**
     * Revisa si el RUN ya existe entre los usuarios guardados.
     */
    function existeRun(run) {
        return obtenerUsuarios().some(function (usuario) {
            return usuario.run.toLowerCase() === run.toLowerCase();
        });
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
 * Recupera los usuarios guardados desde localStorage.
 */
function obtenerUsuarios() {
    try {
        const data = localStorage.getItem(USUARIOS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("No se pudo leer los usuarios guardados:", error);
        return [];
    }
}

/**
 * Añade un nuevo usuario a la lista guardada en localStorage.
 */
function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    try {
        localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuarios));
    } catch (error) {
        console.error("No se pudo guardar el usuario:", error);
    }
}