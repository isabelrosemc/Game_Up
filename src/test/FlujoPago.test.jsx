import { procesarPago, confirmarPedido, obtenerUltimoPedido, TARJETA_RECHAZADA } from '../utils/pedidos'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'
import Checkout from '../pages/tienda/Checkout'
import { obtenerProductos } from '../utils/productos'

const cliente = { nombre: 'Ana', apellidos: 'Rojas', correo: 'alumna@duoc.cl' }
const datos = { id: 'LU-TEST', cliente, envio: 3990, metodoPago: 'tarjeta' }
const carrito = [{ codigo: 'AC001', nombre: 'Controlador', cantidad: 1 }]

describe('Pago y persistencia del pedido', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('actualiza el resumen Duoc al cambiar el correo del formulario', () => {
    const producto = obtenerProductos().find(p => p.codigo === 'AC001')
    localStorage.setItem('levelup_carrito', JSON.stringify([{ ...producto, cantidad: 1 }]))
    render(<MemoryRouter><AuthProvider><CarritoProvider><Checkout /></CarritoProvider></AuthProvider></MemoryRouter>)
    const correo = screen.getByRole('textbox', { name: /correo electrónico/i })
    fireEvent.change(correo, { target: { value: 'estudiante@duoc.cl' } })
    expect(screen.getByText(/descuento duoc \(20%\)/i)).toBeInTheDocument()
    fireEvent.change(correo, { target: { value: 'cliente@gmail.com' } })
    expect(screen.queryByText(/descuento duoc \(20%\)/i)).not.toBeInTheDocument()
  })

  it('rechaza la tarjeta de simulación sin descontar stock ni registrar pedido', async () => {
    const stockAntes = obtenerProductos().find(p => p.codigo === 'AC001').stock
    const respuesta = await procesarPago({ metodoPago: 'tarjeta', tarjeta: { numero: TARJETA_RECHAZADA } })
    expect(respuesta.exito).toBe(false)
    expect(respuesta.motivo).toMatch(/rechaz/i)
    expect(obtenerUltimoPedido()).toBeNull()
    expect(obtenerProductos().find(p => p.codigo === 'AC001').stock).toBe(stockAntes)
  })

  it('guarda un pago aprobado y aplica el descuento del correo del pedido', async () => {
    const stockAntes = obtenerProductos().find(p => p.codigo === 'AC001').stock
    const resultado = await confirmarPedido(carrito, datos)
    expect(resultado.error).toBeUndefined()
    expect(obtenerProductos().find(p => p.codigo === 'AC001').stock).toBe(stockAntes - 1)
    expect(resultado.pedido.descuento).toBe(11998)
    expect(resultado.pedido.total).toBe(51982)
    expect(obtenerUltimoPedido().cliente.correo).toBe('alumna@duoc.cl')
  })

  it('restaura el stock si no se puede guardar el pedido', async () => {
    const stockAntes = obtenerProductos().find(p => p.codigo === 'AC001').stock
    const escribirOriginal = Storage.prototype.setItem
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function(clave, valor) {
      if (clave === 'levelup_pedidos') throw new Error('Guardado falló')
      return escribirOriginal.call(this, clave, valor)
    })
    const resultado = await confirmarPedido(carrito, datos)
    expect(resultado.error).toMatch(/no pudimos guardar/i)
    expect(obtenerProductos().find(p => p.codigo === 'AC001').stock).toBe(stockAntes)
    expect(obtenerUltimoPedido()).toBeNull()
  })
})
