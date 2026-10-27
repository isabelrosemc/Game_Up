import { correoPermitido } from '../utils/validacionesCheckout'

describe('Área 4: Dominios de correo autorizados', () => {
  it('4.1 Acepta correos de Duoc y Gmail', () => {
    expect(correoPermitido('alumno@duoc.cl')).toBe(true)
    expect(correoPermitido('docente@profesor.duoc.cl')).toBe(true)
    expect(correoPermitido('cliente@gmail.com')).toBe(true)
  })

  it('4.2 Rechaza dominios no permitidos o direcciones mal formadas', () => {
    expect(correoPermitido('cliente@hotmail.com')).toBe(false)
    expect(correoPermitido('cliente@gmail.com.ejemplo.cl')).toBe(false)
  })
})
