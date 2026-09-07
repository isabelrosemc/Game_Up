document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".form-card");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const run = document.getElementById("run").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value.trim();
        const direccion = document.getElementById("direccion").value.trim();

        if (run === "") {
            alert("Por favor, ingresa tu RUN.");
            return;
        }
        const formatoRun = /^\d{7,8}-[\dkK]$/;

        if (!formatoRun.test(run)) {
            alert("Ingresa un RUN válido. Ejemplo: 12345678-9");
            return;
        }
        
        if (nombre === "") {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (apellidos === "") {
            alert("Por favor, ingresa tus apellidos.");
            return;
        }

        if (correo === "") {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        if (!correo.includes("@")) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        if (fechaNacimiento === "") {
            alert("Selecciona tu fecha de nacimiento.");
            return;
        }

        if (region === "") {
            alert("Selecciona una región.");
            return;
        }

        if (comuna === "") {
            alert("Por favor, ingresa tu comuna.");
            return;
        }

        if (direccion === "") {
            alert("Por favor, ingresa tu dirección.");
            return;
        }

        alert("Registro realizado correctamente.");

        formulario.reset();
    });

});