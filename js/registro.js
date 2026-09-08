document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".form-card");

    const runInput = document.getElementById("run");
    const nombreInput = document.getElementById("nombre");
    const apellidosInput = document.getElementById("apellidos");
    const correoInput = document.getElementById("correo");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const direccionInput = document.getElementById("direccion");

    const regiones = {
        "metropolitana": [
            "Santiago",
            "Providencia",
            "Las Condes",
            "Maipú",
            "Puente Alto"
        ],
        "valparaiso": [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué",
            "Villa Alemana"
        ],
        "biobio": [
            "Concepción",
            "Talcahuano",
            "San Pedro de la Paz",
            "Los Ángeles"
        ]
    };

    // Cargar regiones en el select
    for (const region in regiones) {

        const opcion = document.createElement("option");

        opcion.value = region;

        if (region === "metropolitana") {
            opcion.textContent = "Región Metropolitana";
        }

        if (region === "valparaiso") {
            opcion.textContent = "Región de Valparaíso";
        }

        if (region === "biobio") {
            opcion.textContent = "Región del Biobío";
        }

        regionSelect.appendChild(opcion);
    }

    // Cambiar comunas cuando cambia la región
    regionSelect.addEventListener("change", function () {

        const regionSeleccionada = regionSelect.value;

        comunaSelect.innerHTML =
            '<option value="">Seleccione una comuna</option>';

        if (regionSeleccionada === "") {
            comunaSelect.disabled = true;
            return;
        }

        const comunas = regiones[regionSeleccionada];

        comunas.forEach(function (comuna) {

            const opcion = document.createElement("option");

            opcion.value = comuna;
            opcion.textContent = comuna;

            comunaSelect.appendChild(opcion);
        });

        comunaSelect.disabled = false;
    });

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const run = runInput.value.trim().toUpperCase();
        const nombre = nombreInput.value.trim();
        const apellidos = apellidosInput.value.trim();
        const correo = correoInput.value.trim().toLowerCase();
        const region = regionSelect.value;
        const comuna = comunaSelect.value;
        const direccion = direccionInput.value.trim();

        // VALIDACIÓN RUN
        if (run === "") {
            alert("Por favor, ingresa tu RUN.");
            return;
        }

        const formatoRun = /^\d{7,8}[0-9K]$/;

        if (!formatoRun.test(run)) {
            alert("Ingresa el RUN sin puntos ni guion. Ejemplo: 19011022K");
            return;
        }

        // VALIDACIÓN NOMBRE
        if (nombre === "") {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (nombre.length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
            return;
        }

        // VALIDACIÓN APELLIDOS
        if (apellidos === "") {
            alert("Por favor, ingresa tus apellidos.");
            return;
        }

        if (apellidos.length > 100) {
            alert("Los apellidos no pueden superar los 100 caracteres.");
            return;
        }

        // VALIDACIÓN CORREO
        if (correo === "") {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        const correoPermitido =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (!correoPermitido.test(correo)) {
            alert(
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );
            return;
        }

        // VALIDACIÓN REGIÓN
        if (region === "") {
            alert("Selecciona una región.");
            return;
        }

        // VALIDACIÓN COMUNA
        if (comuna === "") {
            alert("Selecciona una comuna.");
            return;
        }

        // VALIDACIÓN DIRECCIÓN
        if (direccion === "") {
            alert("Por favor, ingresa tu dirección.");
            return;
        }

        if (direccion.length > 300) {
            alert("La dirección no puede superar los 300 caracteres.");
            return;
        }

        alert("Registro realizado correctamente.");

        formulario.reset();

        comunaSelect.innerHTML =
            '<option value="">Seleccione una comuna</option>';

        comunaSelect.disabled = true;
    });

});