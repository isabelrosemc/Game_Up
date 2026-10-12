import { createContext, useContext, useEffect, useState } from 'react'

const CLAVE_CARRITO = 'levelup_carrito'

// El "contexto" es una caja compartida: cualquier componente puede leer el carrito sin pasarlo por props.
const CarritoContext = createContext(null)

// Lee el carrito guardado en el navegador (si no hay nada, empieza vacío)
function leerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  // El carrito es una lista de productos; cada uno trae su "cantidad"
  const [carrito, setCarrito] = useState(leerCarrito)

  // Cada vez que el carrito cambia, se guarda en el navegador
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  // Agregar un producto. Si ya estaba, se suma a su cantidad (sin pasar del stock)
  const agregar = (producto, cantidad = 1) => {
    if (producto.stock <= 0) return
    setCarrito((actual) => {
      const existe = actual.some((item) => item.codigo === producto.codigo)
      if (existe) {
        return actual.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: Math.min(item.cantidad + cantidad, item.stock) }
            : item,
        )
      }
      return [...actual, { ...producto, cantidad: Math.min(cantidad, producto.stock) }]
    })
  }

  // Cambiar la cantidad de un producto (mínimo 1, máximo el stock)
  const cambiarCantidad = (codigo, cantidad) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.codigo === codigo
          ? { ...item, cantidad: Math.min(Math.max(cantidad, 1), item.stock) }
          : item,
      ),
    )
  }

  // Quitar un producto del carrito
  const quitar = (codigo) => {
    setCarrito((actual) => actual.filter((item) => item.codigo !== codigo))
  }

  // Vaciar todo el carrito (se usará al terminar una compra)
  const vaciar = () => setCarrito([])

  // Valores calculados a partir de la lista
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)

  const valor = { carrito, agregar, cambiarCantidad, quitar, vaciar, cantidadTotal, subtotal }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// Hook para usar el carrito desde cualquier componente: const { carrito, agregar } = useCarrito()
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  }
  return contexto
}