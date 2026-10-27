import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Login from '../pages/tienda/Login'

function montarLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Inicio de la tienda</h1>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('Área 1: Inicio de sesión', () => {
  beforeEach(() => localStorage.clear())

  it('1.1 Inicia sesión con las credenciales válidas del administrador', async () => {
    montarLogin()
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'camila.reyes@duoc.cl' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'admin1234' } })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByRole('heading', { name: 'Inicio de la tienda' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('levelup_sesion')).tipoUsuario).toBe('Administrador')
  })

  it('1.2 Rechaza una contraseña incorrecta sin crear sesión', async () => {
    montarLogin()
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'camila.reyes@duoc.cl' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrecta' } })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos')
    expect(localStorage.getItem('levelup_sesion')).toBeNull()
  })
})
