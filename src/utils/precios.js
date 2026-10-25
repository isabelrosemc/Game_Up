// Cálculos de precios compartidos por el Carrito y el Checkout.

export const PORCENTAJE_DESCUENTO_DUOC = 20

// ¿El correo es de Duoc? (alumnos o profesores)
export function esCorreoDuoc(correo = '') {
  const texto = correo.toLowerCase()
  return texto.endsWith('@duoc.cl') || texto.endsWith('@profesor.duoc.cl')
}

// Descuento en pesos: 20 % del subtotal si el correo es de Duoc, si no 0
export function calcularDescuento(subtotal, correo) {
  return esCorreoDuoc(correo) ? Math.round((subtotal * PORCENTAJE_DESCUENTO_DUOC) / 100) : 0
}

// Total a pagar = subtotal - descuento + envío
export function calcularTotal(subtotal, descuento, envio = 0) {
  return subtotal - descuento + envio
}