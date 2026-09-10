/* ==========================================================================
   VALIDACIONES DEL FORMULARIO DE CHECKOUT
   Level-Up Gamer
   ========================================================================== */

// Comunas disponibles según la región seleccionada (mismo listado que usuario-form.js).
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

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("checkout-form");
  if (!form) return; // esta página no tiene el formulario de checkout

  const mensaje = document.getElementById("form-mensaje");
  const campoRegion = document.getElementById("region");
  const campoComuna = document.getElementById("comuna");

  // Al elegir una región, se llena y habilita el select de comuna (mismo patrón que usuario-form.js)
  campoRegion.addEventListener("change", function () {
    const comunas = COMUNAS_POR_REGION[campoRegion.value] || [];

    campoComuna.innerHTML = '<option value="" selected disabled>Selecciona una comuna</option>';

    comunas.forEach(function (comuna) {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      campoComuna.appendChild(opcion);
    });

    campoComuna.disabled = comunas.length === 0;

    // Al cambiar la región se limpia cualquier error previo de comuna
    marcarCampo("comuna", "");
  });

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
      if (valor === "") return "Selecciona una comuna.";
      const region = document.getElementById("region").value;
      const comunasDeLaRegion = COMUNAS_POR_REGION[region] || [];
      if (!comunasDeLaRegion.includes(valor)) return "Selecciona una comuna válida para la región elegida.";
      return "";
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