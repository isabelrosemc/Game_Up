import { normalizarRun, runValido } from '../utils/validacionesUsuario'

describe('Área 2: Validación de RUN', () => {
  it('2.1 Acepta un RUN cuyo dígito verificador es correcto', () => {
    expect(normalizarRun('12.345.678-5')).toBe('123456785')
    expect(runValido('12.345.678-5')).toBe(true)
  })

  it('2.2 Rechaza un dígito verificador incorrecto', () => {
    expect(runValido('12.345.678-4')).toBe(false)
  })
})
