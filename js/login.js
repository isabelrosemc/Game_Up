document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".form-card");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const botonMostrar = document.querySelector(".input-toggle-visibility");

    botonMostrar.addEventListener("click", function () {

        if (password.type === "password") {
            password.type = "text";
            botonMostrar.textContent = "🙈";
        } else {
            password.type = "password";
            botonMostrar.textContent = "👁️";
        }

    });

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const correo = email.value.trim();
        const clave = password.value.trim();

        if (correo === "") {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(correo)) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        if (clave === "") {
            alert("Por favor, ingresa tu contraseña.");
            return;
        }

        if (clave.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        alert("Inicio de sesión realizado correctamente.");
    });

});