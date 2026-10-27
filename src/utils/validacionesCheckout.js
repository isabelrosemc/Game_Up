import { COMUNAS_POR_REGION } from '../data/regiones'

// Los dominios de correo que acepta la tienda.
export function correoPermitido(correo = '') {
  return /^[^\s@]+@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo.trim())
}

export function validarDatosCheckout(valores) {
  if (!valores.nombre.trim() || !valores.apellidos.trim() || !valores.direccion.trim()) {
    return 'Completa nombre, apellidos y dirección.'
  }
  if (!correoPermitido(valores.correo)) {
    return 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }
  if (valores.telefono && !/^\+?[\d\s-]{8,16}$/.test(valores.telefono.trim())) {
    return 'Ingresa un teléfono válido o déjalo vacío.'
  }
  if (!COMUNAS_POR_REGION[valores.region]?.includes(valores.comuna)) {
    return 'Selecciona una región y una comuna válidas.'
  }
  return ''
}

export function validarTarjeta(tarjeta, hoy = new Date()) {
  if (!/^\d{16}$/.test(tarjeta.numero.replace(/\s/g, ''))) {
    return 'El número de tarjeta debe tener 16 dígitos.'
  }
  const coincidencia = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(tarjeta.vencimiento.trim())
  if (!coincidencia) return 'El vencimiento debe tener formato MM/AA.'
  const mes = Number(coincidencia[1])
  const anio = 2000 + Number(coincidencia[2])
  if (anio < hoy.getFullYear() || (anio === hoy.getFullYear() && mes < hoy.getMonth() + 1)) {
    return 'La tarjeta está vencida.'
  }
  if (!/^\d{3,4}$/.test(tarjeta.cvv)) return 'El CVV debe tener 3 o 4 dígitos.'
  return ''
}
