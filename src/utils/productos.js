import { productosIniciales } from '../data/productos'

const CLAVE_PRODUCTOS = 'levelupgamer_productos'

// Una sola fuente para catálogo, detalle, destacados y administración.
export function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS)
    if (guardados === null) return productosIniciales
    const lista = JSON.parse(guardados)
    return Array.isArray(lista) ? lista : productosIniciales
  } catch {
    return productosIniciales
  }
}

export function guardarProductos(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
}
