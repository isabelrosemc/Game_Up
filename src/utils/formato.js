// Convierte 29990 en "$29.990" chilean po loko.
export function formatearPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CL')
}