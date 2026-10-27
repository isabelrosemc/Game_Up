import { calcularDescuento, calcularTotal } from '../utils/precios'

describe('Área 5: Descuento Duoc del 20 %', () => {
  it('5.1 Descuenta el 20 % del subtotal al usar correo Duoc', () => {
    const descuento = calcularDescuento(100000, 'alumno@duoc.cl')
    expect(descuento).toBe(20000)
    expect(calcularTotal(100000, descuento, 3990)).toBe(83990)
  })

  it('5.2 No aplica el descuento con correo Gmail', () => {
    expect(calcularDescuento(100000, 'cliente@gmail.com')).toBe(0)
    expect(calcularTotal(100000, 0, 3990)).toBe(103990)
  })
})
