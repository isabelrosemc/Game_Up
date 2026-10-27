import { calcularEdad } from '../utils/validacionesUsuario'

describe('Área 3: Mayoría de edad para el registro', () => {
  const cumpleanos = (edad) => {
    const hoy = new Date()
    return `${hoy.getFullYear() - edad}-01-01`
  }

  it('3.1 Calcula edad de una persona mayor de 18 años', () => {
    expect(calcularEdad(cumpleanos(25))).toBeGreaterThanOrEqual(18)
  })

  it('3.2 Detecta a una persona menor de 18 años', () => {
    expect(calcularEdad(cumpleanos(15))).toBeLessThan(18)
  })
})
