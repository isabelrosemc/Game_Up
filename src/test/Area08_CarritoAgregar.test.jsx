import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'
import { obtenerProductos, guardarProductos } from '../utils/productos'

function Cantidad() {
  const { cantidadTotal } = useCarrito()
  return <output aria-label="Cantidad en carrito">{cantidadTotal}</output>
}

function montarProducto(producto) {
  render(<MemoryRouter><CarritoProvider><ProductCard producto={producto} /><Cantidad /></CarritoProvider></MemoryRouter>)
}

describe('Área 8: Agregar productos al carrito', () => {
  beforeEach(() => localStorage.clear())

  it('8.1 Al pulsar Agregar al carrito aumenta la cantidad', () => {
    montarProducto(obtenerProductos().find(p => p.codigo === 'AC001'))
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
    expect(screen.getByLabelText('Cantidad en carrito')).toHaveTextContent('1')
  })

  it('8.2 No permite agregar un producto agotado', () => {
    const agotado = { ...obtenerProductos().find(p => p.codigo === 'AC001'), stock: 0 }
    guardarProductos(obtenerProductos().map(p => p.codigo === 'AC001' ? agotado : p))
    montarProducto(agotado)
    expect(screen.getByRole('button', { name: 'Agotado' })).toBeDisabled()
    expect(screen.getByLabelText('Cantidad en carrito')).toHaveTextContent('0')
  })
})
