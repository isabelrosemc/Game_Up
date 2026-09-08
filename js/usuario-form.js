/* ==========================================================================
   USUARIO-FORM.JS
   Validaciones en tiempo real (R.22) y almacenamiento temporal en
   localStorage (R.17). No conecta aún con un backend ni con el listado.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const CLAVE_LOCALSTORAGE = "levelup_usuarios_creados";
    const DOMINIOS_VALIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

    const form = document.getElementById("form-usuario");
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");
    const toast = document.getElementById("toast-exito");

    const campos = {
        run: document.getElementById("run"),
        nombre: document.getElementById("nombre"),
        apellidos: document.getElementById("apellidos"),
        correo: document.getElementById("correo"),
        contrasena: document.getElementById("contrasena"),
        fechaNacimiento: document.getElementById("fechaNacimiento"),
        tipoUsuario: document.getElementById("tipoUsuario"),
        region: selectRegion,
        comuna: selectComuna,
        direccion: document.getElementById("direccion")
    };

    /* --------------------------------------------------------------
       Poblar el select de Región y encadenar con Comuna
       -------------------------------------------------------------- */
    REGIONES.forEach(function (item) {
        const opcion = document.createElement("option");
        opcion.value = item.region;
        opcion.textContent = item.region;
        selectRegion.appendChild(opcion);
    });

    selectRegion.addEventListener("change", function () {
        selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

        if (!selectRegion.value) {
            selectComuna.disabled = true;
            validarCampo("comuna");
            return;
        }

        obtenerComunasPorRegion(selectRegion.value).forEach(function (comuna) {
            const opcion = document.createElement("option");
            opcion.value = comuna;
            opcion.textContent = comuna;
            selectComuna.appendChild(opcion);
        });
        selectComuna.disabled = false;
        validarCampo("region");
        validarCampo("comuna");
    });

    /* --------------------------------------------------------------
       Utilidades RUN chileno
       -------------------------------------------------------------- */
    function limpiarRun(valor) {
        return valor.replace(/[.\-\s]/g, "").toUpperCase();
    }

    function calcularDigitoVerificador(cuerpo) {
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i], 10) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        const resto = 11 - (suma % 11);
        if (resto === 11) return "0";
        if (resto === 10) return "K";
        return String(resto);
    }

    /* --------------------------------------------------------------
       Reglas de validación (R.2, R.17, R.24)
       -------------------------------------------------------------- */
    const validadores = {
        run: function (valor) {
            const limpio = limpiarRun(valor);
            if (!limpio) return "El RUN es obligatorio.";
            if (limpio.length < 7 || limpio.length > 9) return "Debe tener entre 7 y 9 caracteres.";
            const cuerpo = limpio.slice(0, -1);
            const dv = limpio.slice(-1);
            if (!/^\d+$/.test(cuerpo) || !/^[0-9K]$/.test(dv)) return "Formato de RUN inválido.";
            if (calcularDigitoVerificador(cuerpo) !== dv) return "El RUN ingresado no es válido.";
            return "";
        },
        nombre: function (valor) {
            valor = valor.trim();
            if (!valor) return "El nombre es obligatorio.";
            if (valor.length > 50) return "Máximo 50 caracteres.";
            return "";
        },
        apellidos: function (valor) {
            valor = valor.trim();
            if (!valor) return "Los apellidos son obligatorios.";
            if (valor.length > 100) return "Máximo 100 caracteres.";
            return "";
        },
        correo: function (valor) {
            valor = valor.trim();
            if (!valor) return "El correo es obligatorio.";
            if (valor.length > 100) return "Máximo 100 caracteres.";
            const partes = valor.split("@");
            if (partes.length !== 2 || !partes[0] || !partes[1]) return "Ingresa un correo válido.";
            if (!DOMINIOS_VALIDOS.includes(partes[1].toLowerCase())) {
                return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            }
            return "";
        },
        contrasena: function (valor) {
            if (!valor) return "La contraseña es obligatoria.";
            if (valor.length < 4 || valor.length > 10) return "Debe tener entre 4 y 10 caracteres.";
            return "";
        },
        fechaNacimiento: function (valor) {
            if (!valor) return "";
            const fecha = new Date(valor + "T00:00:00");
            if (Number.isNaN(fecha.getTime())) return "Fecha inválida.";
            if (fecha > new Date()) return "La fecha no puede ser futura.";

            const hoy = new Date();
            let edad = hoy.getFullYear() - fecha.getFullYear();
            const aunNoCumple = (hoy.getMonth() < fecha.getMonth()) ||
                (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate());
            if (aunNoCumple) edad--;

            if (edad < 18) return "El usuario debe ser mayor de 18 años.";
            return "";
        },
        tipoUsuario: function (valor) {
            if (!valor) return "Selecciona un tipo de usuario.";
            return "";
        },
        region: function (valor) {
            if (!valor) return "Selecciona una región.";
            return "";
        },
        comuna: function (valor) {
            if (!valor) return "Selecciona una comuna.";
            return "";
        },
        direccion: function (valor) {
            valor = valor.trim();
            if (!valor) return "La dirección es obligatoria.";
            if (valor.length > 300) return "Máximo 300 caracteres.";
            return "";
        }
    };

    /* --------------------------------------------------------------
       Mostrar / limpiar errores por campo
       -------------------------------------------------------------- */
    function validarCampo(nombreCampo) {
        const input = campos[nombreCampo];
        const mensaje = validadores[nombreCampo](input.value);
        const spanError = document.getElementById("error-" + nombreCampo);

        if (mensaje) {
            input.classList.add("campo--error");
            spanError.textContent = mensaje;
        } else {
            input.classList.remove("campo--error");
            spanError.textContent = "";
        }

        return mensaje === "";
    }

    Object.keys(campos).forEach(function (nombreCampo) {
        const input = campos[nombreCampo];
        input.addEventListener("input", function () { validarCampo(nombreCampo); });
        input.addEventListener("blur", function () { validarCampo(nombreCampo); });
    });

    /* --------------------------------------------------------------
       Envío del formulario
       -------------------------------------------------------------- */
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombresCampos = Object.keys(campos);
        const resultados = nombresCampos.map(validarCampo);
        const esValido = resultados.every(Boolean);

        if (!esValido) {
            const primerCampoInvalido = nombresCampos[resultados.indexOf(false)];
            campos[primerCampoInvalido].focus();
            return;
        }

        const dominioCorreo = campos.correo.value.trim().split("@")[1].toLowerCase();
        const tieneDescuentoDuoc = dominioCorreo === "duoc.cl" || dominioCorreo === "profesor.duoc.cl";

        const usuario = {
            run: limpiarRun(campos.run.value),
            nombre: campos.nombre.value.trim(),
            apellidos: campos.apellidos.value.trim(),
            correo: campos.correo.value.trim(),
            contrasena: campos.contrasena.value,
            fechaNacimiento: campos.fechaNacimiento.value || null,
            tipoUsuario: campos.tipoUsuario.value,
            region: campos.region.value,
            comuna: campos.comuna.value,
            direccion: campos.direccion.value.trim(),
            descuentoDuoc: tieneDescuentoDuoc
        };

        const usuariosGuardados = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE) || "[]");
        usuariosGuardados.push(usuario);
        localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(usuariosGuardados));

        mostrarToast();
        form.reset();
        selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
        selectComuna.disabled = true;
        nombresCampos.forEach(function (nombreCampo) {
            document.getElementById("error-" + nombreCampo).textContent = "";
            campos[nombreCampo].classList.remove("campo--error");
        });
        campos.run.focus();
    });

    function mostrarToast() {
        toast.classList.add("visible");
        window.setTimeout(function () {
            toast.classList.remove("visible");
        }, 3000);
    }
});
