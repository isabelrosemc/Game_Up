/* ==========================================================================
   VALIDACIONES DEL FORMULARIO DE CHECKOUT
   Level-Up Gamer
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("checkout-form");
  if (!form) return; // esta página no tiene el formulario de checkout

  const mensaje = document.getElementById("form-mensaje");

  // Correos permitidos según el anexo del proyecto
  const correoValido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  // Reglas de validación: id del campo -> función que retorna el mensaje de error (o "" si es válido)
  const reglas = {
    nombre: function (valor) {
      if (valor.trim() === "") return "El nombre es obligatorio.";
      if (valor.length > 50) return "Máximo 50 caracteres.";
      return "";
    },
    apellidos: function (valor) {
      if (valor.trim() === "") return "Los apellidos son obligatorios.";
      if (valor.length > 100) return "Máximo 100 caracteres.";
      return "";
    },
    correo: function (valor) {
      if (valor.trim() === "") return "El correo es obligatorio.";
      if (valor.length > 100) return "Máximo 100 caracteres.";
      if (!correoValido.test(valor)) return "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      return "";
    },
    region: function (valor) {
      return valor === "" ? "Selecciona una región." : "";
    },
    comuna: function (valor) {
      return valor === "" ? "Selecciona una comuna." : "";
    },
    direccion: function (valor) {
      if (valor.trim() === "") return "La dirección es obligatoria.";
      if (valor.length > 300) return "Máximo 300 caracteres.";
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

    // Checkbox de términos y condiciones
    const terminos = document.getElementById("terminos");
    const errorTerminos = document.getElementById("error-terminos");
    if (!terminos.checked) {
      errorTerminos.textContent = "Debes aceptar los términos y condiciones.";
      esValido = false;
    } else {
      errorTerminos.textContent = "";
    }

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

    if (!validarFormulario()) {
      mensaje.textContent = "Revisa los campos marcados en rojo antes de continuar.";
      mensaje.className = "form-mensaje error";
      mensaje.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Método de pago seleccionado
    const metodoPago = form.querySelector('input[name="metodo-pago"]:checked');

    // Datos del pedido a guardar en LocalStorage
    const pedido = {
      fecha: new Date().toISOString(),
      cliente: {
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        region: document.getElementById("region").value,
        comuna: document.getElementById("comuna").value,
        direccion: document.getElementById("direccion").value.trim()
      },
      metodoPago: metodoPago ? metodoPago.id : "",
      total: 115966
    };

    // Guardado en LocalStorage
    localStorage.setItem("levelup_ultimo_pedido", JSON.stringify(pedido));

    const pedidosPrevios = JSON.parse(localStorage.getItem("levelup_pedidos") || "[]");
    pedidosPrevios.push(pedido);
    localStorage.setItem("levelup_pedidos", JSON.stringify(pedidosPrevios));

    // Una vez pagado, el carrito queda vacío
    localStorage.removeItem("levelup_carrito");

    mensaje.textContent = "¡Compra exitosa! Guardamos tu pedido correctamente.";
    mensaje.className = "form-mensaje exito";

    alert("¡Compra exitosa!");
    window.location.href = "index.html";
  });

});