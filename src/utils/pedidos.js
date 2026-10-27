import { descontarStock, guardarProductos, obtenerProductos } from './productos'
import { calcularDescuento, calcularTotal } from './precios'

const CLAVE_PEDIDOS = 'levelup_pedidos'
const CLAVE_ULTIMO_PEDIDO = 'levelup_ultimo_pedido'

// Tarjeta de prueba que la pasarela simulada rechaza
export const TARJETA_RECHAZADA = '4000000000000002'

// Simula la pasarela de pago. Hoy acepta todo, salvo la tarjeta de prueba rechazada.
// Los datos de la tarjeta se usan solo aquí: nunca se guardan en el pedido.
export async function procesarPago({ metodoPago, tarjeta }) {
  // EVALUACIÓN 3: reemplazar por la llamada al backend (confirmar la ruta con el equipo de backend)
  // const respuesta = await axios.post('URL_DEL_BACKEND/pagos', { metodoPago, tarjeta })
  // return respuesta.data
  const numero = (tarjeta?.numero ?? '').replace(/\s/g, '')
  if (metodoPago === 'tarjeta' && numero === TARJETA_RECHAZADA) {
    return { exito: false, motivo: 'Tu banco rechazó la tarjeta. Prueba con otro medio de pago.' }
  }
  return { exito: true }
}

// Guarda el pedido en la lista de pedidos y como "último pedido"
export async function guardarPedido(pedido) {
  // EVALUACIÓN 3: await axios.post('URL_DEL_BACKEND/pedidos', pedido)
  let pedidos = []
  try {
    pedidos = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS)) || []
  } catch {
    pedidos = []
  }
  const pedidosAntes = localStorage.getItem(CLAVE_PEDIDOS)
  const ultimoAntes = localStorage.getItem(CLAVE_ULTIMO_PEDIDO)
  try {
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify([...pedidos, pedido]))
    localStorage.setItem(CLAVE_ULTIMO_PEDIDO, JSON.stringify(pedido))
  } catch (error) {
    // Si falla la segunda escritura, evitamos dejar el pedido a medias.
    if (pedidosAntes === null) localStorage.removeItem(CLAVE_PEDIDOS)
    else localStorage.setItem(CLAVE_PEDIDOS, pedidosAntes)
    if (ultimoAntes === null) localStorage.removeItem(CLAVE_ULTIMO_PEDIDO)
    else localStorage.setItem(CLAVE_ULTIMO_PEDIDO, ultimoAntes)
    throw error
  }
}

// Confirma stock y pedido juntos. Si falla guardar el pedido, devuelve el stock.
// Es una simulación con localStorage; un backend real necesitaría una transacción.
export async function confirmarPedido(carrito, datosPedido) {
  const inventarioAnterior = obtenerProductos()
  let compra
  try {
    compra = descontarStock(carrito)
    if (compra.error) return { error: compra.error }

    const descuento = calcularDescuento(compra.subtotal, datosPedido.cliente.correo)
    const pedido = {
      ...datosPedido,
      productos: compra.productos,
      subtotal: compra.subtotal,
      descuento,
      total: calcularTotal(compra.subtotal, descuento, datosPedido.envio),
    }
    await guardarPedido(pedido)
    return { pedido }
  } catch {
    if (compra && !compra.error) {
      try { guardarProductos(inventarioAnterior) } catch { /* almacenamiento bloqueado */ }
    }
    return { error: 'No pudimos guardar el pedido. No se confirmó la compra.' }
  }
}

// Último pedido realizado (o null si no hay)
export function obtenerUltimoPedido() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_ULTIMO_PEDIDO))
  } catch {
    return null
  }
}