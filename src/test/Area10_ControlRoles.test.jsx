import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import AdminLayout from '../components/admin/AdminLayout'

function montarPanel(tipoUsuario) {
  localStorage.setItem('levelup_sesion', JSON.stringify({ tipoUsuario, nombre: 'Usuario de prueba' }))
  render(<MemoryRouter><AuthProvider><AdminLayout /></AuthProvider></MemoryRouter>)
}

describe('Área 10: Acceso según rol', () => {
  beforeEach(() => localStorage.clear())

  it('10.1 Permite ver el menú administrativo a un administrador', () => {
    montarPanel('Administrador')
    expect(screen.getByRole('link', { name: 'Productos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Usuarios' })).toBeInTheDocument()
  })

  it('10.2 Impide acceder a un cliente', () => {
    montarPanel('Cliente')
    expect(screen.getByText(/acceso reservado a administradores/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Productos' })).not.toBeInTheDocument()
  })
})
