import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminProductos from '../pages/admin/AdminProductos'
import AdminProductoForm from '../pages/admin/AdminProductoForm'
import { obtenerProductos } from '../utils/productos'

function montar(ruta = '/admin/productos/nuevo') {
  render(<MemoryRouter initialEntries={[ruta]}><Routes>
    <Route path="/admin/productos" element={<AdminProductos />} />
    <Route path="/admin/productos/nuevo" element={<AdminProductoForm />} />
    <Route path="/admin/productos/editar/:codigo" element={<AdminProductoForm />} />
  </Routes></MemoryRouter>)
}

function completarProducto(codigo) {
  fireEvent.change(screen.getByLabelText('Código'), { target: { value: codigo } })
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Teclado de prueba' } })
  fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Accesorios' } })
  fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '32000' } })
  fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '8' } })
  fireEvent.change(screen.getByLabelText('Stock crítico'), { target: { value: '2' } })
}

describe('CRUD administrativo de productos', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('permite crear, editar y eliminar un producto en el inventario compartido', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    montar()
    completarProducto('TP009')
    fireEvent.click(screen.getByRole('button', { name: /guardar/i }))
    expect(obtenerProductos().find(p => p.codigo === 'TP009')?.stock).toBe(8)

    const fila = screen.getByText('TP009').closest('tr')
    fireEvent.click(within(fila).getByRole('link', { name: 'Editar' }))
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '28000' } })
    fireEvent.click(screen.getByRole('button', { name: /guardar/i }))
    expect(obtenerProductos().find(p => p.codigo === 'TP009')?.precio).toBe(28000)

    const filaEditada = screen.getByText('TP009').closest('tr')
    fireEvent.click(within(filaEditada).getByRole('button', { name: 'Eliminar' }))
    expect(obtenerProductos().some(p => p.codigo === 'TP009')).toBe(false)
  })

  it('impide guardar un producto cuyo código ya existe', () => {
    montar()
    completarProducto('AC001')
    fireEvent.click(screen.getByRole('button', { name: /guardar/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/ya existe un producto/i)
    expect(obtenerProductos().filter(p => p.codigo === 'AC001')).toHaveLength(1)
  })
})
