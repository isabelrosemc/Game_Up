import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Catalogo from '../pages/tienda/Catalogo'
import { CarritoProvider } from '../context/CarritoContext'

function montarCatalogo() {
  render(<MemoryRouter><CarritoProvider><Catalogo /></CarritoProvider></MemoryRouter>)
}

describe('Área 6: Filtros del catálogo', () => {
  beforeEach(() => localStorage.clear())

  it('6.1 Busca por nombre y muestra solo el producto coincidente', () => {
    montarCatalogo()
    fireEvent.change(screen.getByLabelText('Buscar productos'), { target: { value: 'Carcassonne' } })
    expect(screen.getByRole('heading', { name: 'Carcassonne' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Catan' })).not.toBeInTheDocument()
  })

  it('6.2 Muestra aviso al buscar un producto inexistente', () => {
    montarCatalogo()
    fireEvent.change(screen.getByLabelText('Buscar productos'), { target: { value: 'Producto inexistente XYZ' } })
    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Catan' })).not.toBeInTheDocument()
  })
})
