// Validaciones que usan el registro de clientes y el formulario administrativo.
export function normalizarRun(run = '') {
  return run.replace(/[.\-\s]/g, '').toUpperCase()
}

export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return 0
  const hoy = new Date()
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  if (hoy.getMonth() < nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) edad--
  return edad
}
