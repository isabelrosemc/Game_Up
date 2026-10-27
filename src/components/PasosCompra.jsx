const PASOS = ['Carrito', 'Datos y pago', 'Confirmación']

// Indicador de pasos de la compra. `actual` es el paso en curso (1, 2 o 3);
// con 4 todos los pasos aparecen completados.
export default function PasosCompra({ actual }) {
  return (
    <div className="checkout-pasos">
      {PASOS.map((nombre, indice) => {
        const numero = indice + 1
        let estado = ''
        if (numero < actual) estado = ' completado'
        else if (numero === actual) estado = ' activo'
        return (
          <div className={`checkout-paso${estado}`} key={nombre}>
            <span className="paso-numero">{numero < actual ? '✓' : numero}</span>
            <span>{nombre}</span>
          </div>
        )
      })}
    </div>
  )
}