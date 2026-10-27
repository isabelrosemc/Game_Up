import { productosIniciales } from '../data/productos'

const CLAVE_PRODUCTOS = 'levelupgamer_productos'

// Obtiene los productos de tienda y administrador desde el mismo lugar.
export function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS)
    if (guardados === null) return productosIniciales
    const lista = JSON.parse(guardados)
    if (!Array.isArray(lista)) return productosIniciales

    // Compatibilidad con productos guardados antes de agregar la sección de ofertas.
    return lista.map((producto) => ({
      ...producto,
      descuentoOferta: producto.descuentoOferta ??
        productosIniciales.find((inicial) => inicial.codigo === producto.codigo)?.descuentoOferta ?? 0,
    }))
  } catch {
    return productosIniciales
  }
}

export function guardarProductos(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
}

// Precio de venta. El porcentaje de oferta se define por producto en el administrador.
export function precioConOferta(producto) {
  const descuento = Number(producto.descuentoOferta) || 0
  return Math.round(Number(producto.precio) * (1 - descuento / 100))
}

// Antes de pagar se consultan los precios y las existencias actuales, no copias viejas del carrito.
export function revisarCompra(carrito) {
  const inventario = obtenerProductos()
  const productos = []

  for (const item of carrito) {
    const actual = inventario.find((producto) => producto.codigo === item.codigo)
    if (!actual) return { error: `El producto ${item.nombre} ya no está disponible.` }
    if (!Number.isInteger(item.cantidad) || item.cantidad < 1 || actual.stock < item.cantidad) {
      return { error: `Stock insuficiente para ${actual.nombre}. Disponible: ${actual.stock}.` }
    }
    productos.push({
      codigo: actual.codigo,
      nombre: actual.nombre,
      precio: precioConOferta(actual),
      cantidad: item.cantidad,
    })
  }

  return {
    productos,
    subtotal: productos.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
  }
}

// Descuenta las unidades de una compra confirmada. Devuelve error si cambió el stock.
export function descontarStock(carrito) {
  const revision = revisarCompra(carrito)
  if (revision.error) return { error: revision.error }

  const productos = obtenerProductos().map((producto) => {
    const comprado = revision.productos.find((item) => item.codigo === producto.codigo)
    return comprado ? { ...producto, stock: producto.stock - comprado.cantidad } : producto
  })
  guardarProductos(productos)
  return revision
}
