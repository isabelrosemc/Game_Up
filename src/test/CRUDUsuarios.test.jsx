import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminUsuarios from '../pages/admin/AdminUsuarios'
import AdminUsuarioForm from '../pages/admin/AdminUsuarioForm'
import { obtenerUsuarios } from '../utils/usuarios'

function montar(ruta = '/admin/usuarios/nuevo') {
  render(<MemoryRouter initialEntries={[ruta]}><Routes>
    <Route path="/admin/usuarios" element={<AdminUsuarios />} />
    <Route path="/admin/usuarios/nuevo" element={<AdminUsuarioForm />} />
    <Route path="/admin/usuarios/editar/:run" element={<AdminUsuarioForm />} />
  </Routes></MemoryRouter>)
}

function completarUsuario(run = '123456785') {
  fireEvent.change(screen.getByLabelText('RUN'), { target: { value: run } })
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Daniela' } })
  fireEvent.change(screen.getByLabelText('Apellidos'), { target: { value: 'Rivas' } })
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'daniela@gmail.com' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave123' } })
  fireEvent.change(screen.getByLabelText('Fecha de nacimiento'), { target: { value: '1995-01-01' } })
  fireEvent.change(screen.getByLabelText('Región'), { target: { value: 'Metropolitana de Santiago' } })
  fireEvent.change(screen.getByLabelText('Comuna'), { target: { value: 'Providencia' } })
  fireEvent.change(screen.getByLabelText('Dirección'), { target: { value: 'Calle 123' } })
}

describe('CRUD administrativo de usuarios', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('crea, edita y elimina un usuario', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    montar()
    completarUsuario()
    fireEvent.click(screen.getByRole('button', { name: /crear usuario|guardar cambios/i }))
    expect(obtenerUsuarios().some(u => u.run === '123456785')).toBe(true)

    const fila = (await screen.findByText('123456785')).closest('tr')
    fireEvent.click(within(fila).getByRole('link', { name: 'Editar' }))
    expect(await screen.findByLabelText('Nueva contraseña (opcional)')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Daniela Editada' } })
    fireEvent.click(screen.getByRole('button', { name: /crear usuario|guardar cambios/i }))
    expect(obtenerUsuarios().find(u => u.run === '123456785')?.nombre).toBe('Daniela Editada')

    const filaEditada = (await screen.findByText('123456785')).closest('tr')
    fireEvent.click(within(filaEditada).getByRole('button', { name: 'Eliminar' }))
    expect(obtenerUsuarios().some(u => u.run === '123456785')).toBe(false)
  })

  it('rechaza crear un usuario con correo ya registrado', () => {
    montar()
    completarUsuario()
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'camila.reyes@duoc.cl' } })
    fireEvent.click(screen.getByRole('button', { name: /crear usuario|guardar cambios/i }))
    expect(screen.getByText(/ya existe un usuario con ese correo/i)).toBeInTheDocument()
    expect(obtenerUsuarios().some(u => u.run === '123456785')).toBe(false)
  })
})
