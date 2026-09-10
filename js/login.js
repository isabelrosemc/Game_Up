/* ==========================================================================
   VALIDACIONES DEL FORMULARIO DE LOGIN
   Level-Up Gamer
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".form-card");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const botonMostrar = document.querySelector(".input-toggle-visibility");

    // Mostrar / ocultar contraseña
    botonMostrar.addEventListener("click", function () {

        if (password.type === "password") {
            password.type = "text";
            
        } else {
            password.type = "password";
            
        }

    });

    // Muestra u oculta el mensaje de error de un campo puntual
    function marcarError(input, idError, mensaje) {
        const spanError = document.getElementById(idError);
        if (spanError) spanError.textContent = mensaje;
        input.classList.toggle("campo-invalido", mensaje !== "");
    }

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const correo = email.value.trim();
        const clave = password.value.trim();
        let esValido = true;

        // Validar correo
        if (correo === "") {
            marcarError(email, "error-email", "Por favor, ingresa tu correo electrónico.");
            esValido = false;
        } else {
            const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formatoCorreo.test(correo)) {
                marcarError(email, "error-email", "Ingresa un correo electrónico válido.");
                esValido = false;
            } else {
                marcarError(email, "error-email", "");
            }
        }

        // Validar contraseña
        if (clave === "") {
            marcarError(password, "error-password", "Por favor, ingresa tu contraseña.");
            esValido = false;
        } else if (clave.length < 6) {
            marcarError(password, "error-password", "La contraseña debe tener al menos 6 caracteres.");
            esValido = false;
        } else {
            marcarError(password, "error-password", "");
        }

        if (!esValido) return;

        // Login válido: guardamos la sesión en LocalStorage
        const sesion = {
            correo: correo,
            clave: clave
        };
        localStorage.setItem("levelup_sesion", JSON.stringify(sesion));

        window.location.href = "index.html";
    });

});