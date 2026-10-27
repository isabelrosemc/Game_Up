import { revisarCompra, guardarProductos, obtenerProductos } from '../utils/productos'

describe('Área 7: Control de inventario', () => {
  beforeEach(() => localStorage.clear())

  it('7.1 Permite comprar la cantidad disponible', () => {
    expect(revisarCompra([{ codigo: 'AC001', nombre: 'Control', cantidad: 2 }]).error).toBeUndefined()
    expect(revisarCompra([{ codigo: 'AC001', cantidad: 2 }]).productos[0].cantidad).toBe(2)
  })

  it('7.2 Rechaza comprar más unidades que el stock vigente', () => {
    guardarProductos(obtenerProductos().map(p => p.codigo === 'AC001' ? { ...p, stock: 1 } : p))
    expect(revisarCompra([{ codigo: 'AC001', nombre: 'Control', cantidad: 2 }]).error).toMatch(/stock insuficiente/i)
  })
})
