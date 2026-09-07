document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "") {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        if (correo === "") {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(correo)) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        if (asunto === "") {
            alert("Por favor, ingresa el asunto.");
            return;
        }

        if (asunto.length < 5) {
            alert("El asunto debe tener al menos 5 caracteres.");
            return;
        }

        if (mensaje === "") {
            alert("Por favor, escribe tu mensaje.");
            return;
        }

        if (mensaje.length < 10) {
            alert("El mensaje debe tener al menos 10 caracteres.");
            return;
        }

        alert("Mensaje enviado correctamente.");

        formulario.reset();
    });

});