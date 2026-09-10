/* ==========================================================================
   VALIDACIONES DEL FORMULARIO DE CONTACTO
   Level-Up Gamer
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");
  if (!form) return; // esta página no tiene el formulario de contacto

  const mensajeExito = document.getElementById("form-success");

  // Reglas de validación: id del campo -> función que retorna el mensaje de error (o "" si es válido)
  const reglas = {
    nombre: function (valor) {
      if (valor.trim() === "") return "Por favor, ingresa tu nombre.";
      if (valor.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
      return "";
    },
    correo: function (valor) {
      if (valor.trim() === "") return "Por favor, ingresa tu correo electrónico.";
      const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formatoCorreo.test(valor.trim())) return "Ingresa un correo electrónico válido.";
      return "";
    },
    asunto: function (valor) {
      if (valor.trim() === "") return "Por favor, ingresa el asunto.";
      if (valor.trim().length < 5) return "El asunto debe tener al menos 5 caracteres.";
      return "";
    },
    mensaje: function (valor) {
      if (valor.trim() === "") return "Por favor, escribe tu mensaje.";
      if (valor.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    }
  };

  // Muestra u oculta el mensaje de error de un campo puntual
  function marcarCampo(idCampo, error) {
    const input = document.getElementById(idCampo);
    const spanError = document.getElementById("error-" + idCampo);
    if (spanError) spanError.textContent = error;
    if (input) input.classList.toggle("campo-invalido", error !== "");
  }

  // Valida todos los campos con reglas definidas. Retorna true si todo es válido.
  function validarFormulario() {
    let esValido = true;

    Object.keys(reglas).forEach(function (idCampo) {
      const input = document.getElementById(idCampo);
      const error = reglas[idCampo](input.value);
      marcarCampo(idCampo, error);
      if (error !== "") esValido = false;
    });

    return esValido;
  }

  // Quita el error de un campo apenas el usuario empieza a corregirlo
  Object.keys(reglas).forEach(function (idCampo) {
    const input = document.getElementById(idCampo);
    if (input) {
      input.addEventListener("input", function () {
        marcarCampo(idCampo, reglas[idCampo](input.value));
      });
    }
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (mensajeExito) mensajeExito.style.display = "none";

    if (!validarFormulario()) {
      return;
    }

    // Formulario válido: guardamos el mensaje en LocalStorage
    const mensajeContacto = {
      fecha: new Date().toISOString(),
      nombre: document.getElementById("nombre").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      asunto: document.getElementById("asunto").value.trim(),
      mensaje: document.getElementById("mensaje").value.trim()
    };

    // Se guardan todos los mensajes en una lista dentro de LocalStorage
    const mensajesPrevios = JSON.parse(localStorage.getItem("levelup_mensajes_contacto") || "[]");
    mensajesPrevios.push(mensajeContacto);
    localStorage.setItem("levelup_mensajes_contacto", JSON.stringify(mensajesPrevios));

    // Mostramos el mensaje de éxito y limpiamos los campos
    if (mensajeExito) {
      mensajeExito.textContent = "Mensaje enviado correctamente. Te responderemos a la brevedad.";
      mensajeExito.style.display = "block";
      mensajeExito.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.reset();
  });

});