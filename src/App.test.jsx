import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CarritoContext'
import App from './App'

it('muestra el catálogo desde la ruta de productos', () => {
  render(
    <MemoryRouter initialEntries={['/productos']}>
      <AuthProvider><CarritoProvider><App /></CarritoProvider></AuthProvider>
    </MemoryRouter>
  )
  expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument()
})
