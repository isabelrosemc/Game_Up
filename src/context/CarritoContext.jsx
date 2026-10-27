import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { obtenerProductos, precioConOferta } from '../utils/productos'

const CLAVE_CARRITO = 'levelup_carrito'
const CarritoContext = createContext(null)

function leerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

// Vuelve a comprobar precio y stock por si administración los modificó.
function actualizarConInventario(carrito) {
  const inventario = obtenerProductos()
  return carrito.flatMap((item) => {
    const producto = inventario.find((actual) => actual.codigo === item.codigo)
    if (!producto || producto.stock <= 0) return []
    return [{
      ...producto,
      precio: precioConOferta(producto),
      cantidad: Math.min(Math.max(item.cantidad, 1), producto.stock),
    }]
  })
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarrito)

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  const sincronizar = useCallback(() => {
    setCarrito((actual) => {
      const actualizado = actualizarConInventario(actual)
      return JSON.stringify(actualizado) === JSON.stringify(actual) ? actual : actualizado
    })
  }, [])

  const agregar = (producto, cantidad = 1) => {
    setCarrito((actual) => {
      const actualizado = actualizarConInventario(actual)
      const vigente = obtenerProductos().find((item) => item.codigo === producto.codigo)
      if (!vigente || vigente.stock <= 0) return actualizado
      const existe = actualizado.some((item) => item.codigo === vigente.codigo)
      if (existe) {
        return actualizado.map((item) => item.codigo === vigente.codigo
          ? { ...item, cantidad: Math.min(item.cantidad + cantidad, vigente.stock) }
          : item)
      }
      return [...actualizado, {
        ...vigente,
        precio: precioConOferta(vigente),
        cantidad: Math.min(cantidad, vigente.stock),
      }]
    })
  }

  const cambiarCantidad = (codigo, cantidad) => {
    setCarrito((actual) => actualizarConInventario(actual).map((item) =>
      item.codigo === codigo
        ? { ...item, cantidad: Math.min(Math.max(cantidad, 1), item.stock) }
        : item,
    ))
  }

  const quitar = (codigo) => setCarrito((actual) => actual.filter((item) => item.codigo !== codigo))
  const vaciar = () => setCarrito([])
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ carrito, agregar, cambiarCantidad, quitar, vaciar, sincronizar, cantidadTotal, subtotal }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return contexto
}
