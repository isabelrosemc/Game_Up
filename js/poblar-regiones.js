/* ==========================================================================
   POBLAR-REGIONES.JS
   Llena el select de Región con REGIONES y actualiza el select de Comuna
   cada vez que cambia la región elegida. Depende de regiones-comunas.js.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  if (!selectRegion || !selectComuna || typeof REGIONES === "undefined") return;

  // Llena el select de región con las 16 regiones del arreglo
  REGIONES.forEach(function (r) {
    const opcion = document.createElement("option");
    opcion.value = r.region;
    opcion.textContent = r.region;
    selectRegion.appendChild(opcion);
  });

  // Deja el select de comuna vacío y deshabilitado hasta elegir región
  function reiniciarComunas(mensaje) {
    selectComuna.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = mensaje;
    selectComuna.appendChild(placeholder);
  }

  reiniciarComunas("Primero selecciona una región");
  selectComuna.disabled = true;

  // Al cambiar la región, se rellena la comuna con obtenerComunasPorRegion()
  selectRegion.addEventListener("change", function () {
    const comunas = obtenerComunasPorRegion(selectRegion.value);

    reiniciarComunas("Selecciona tu comuna");
    selectComuna.disabled = comunas.length === 0;

    comunas.forEach(function (nombreComuna) {
      const opcion = document.createElement("option");
      opcion.value = nombreComuna;
      opcion.textContent = nombreComuna;
      selectComuna.appendChild(opcion);
    });
  });

});
