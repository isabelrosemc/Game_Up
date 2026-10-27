import { render, screen, fireEvent } from '@testing-library/react'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'
import { obtenerProductos } from '../utils/productos'

function ProbarCarrito() {
  const { agregar, cambiarCantidad, quitar, subtotal, cantidadTotal } = useCarrito()
  const producto = obtenerProductos().find(p => p.codigo === 'AC001')
  return <div>
    <button onClick={() => agregar(producto)}>Agregar</button>
    <button onClick={() => cambiarCantidad(producto.codigo, 2)}>Dos unidades</button>
    <button onClick={() => quitar(producto.codigo)}>Quitar</button>
    <output aria-label="Total unidades">{cantidadTotal}</output>
    <output aria-label="Subtotal">{subtotal}</output>
  </div>
}

describe('Área 9: Totales del carrito', () => {
  beforeEach(() => localStorage.clear())

  it('9.1 Al aumentar la cantidad se recalcula el subtotal', () => {
    render(<CarritoProvider><ProbarCarrito /></CarritoProvider>)
    fireEvent.click(screen.getByText('Agregar'))
    fireEvent.click(screen.getByText('Dos unidades'))
    expect(screen.getByLabelText('Total unidades')).toHaveTextContent('2')
    expect(screen.getByLabelText('Subtotal')).toHaveTextContent('119980')
  })

  it('9.2 Al quitar el producto el subtotal vuelve a cero', () => {
    render(<CarritoProvider><ProbarCarrito /></CarritoProvider>)
    fireEvent.click(screen.getByText('Agregar'))
    fireEvent.click(screen.getByText('Quitar'))
    expect(screen.getByLabelText('Total unidades')).toHaveTextContent('0')
    expect(screen.getByLabelText('Subtotal')).toHaveTextContent('0')
  })
})
