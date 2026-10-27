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

// Comprueba el dígito verificador de un RUN chileno (módulo 11).
export function runValido(run) {
  const limpio = normalizarRun(run)
  if (!/^[0-9]{7,8}[0-9K]$/.test(limpio)) return false
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const resto = 11 - (suma % 11)
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return dv === esperado
}
