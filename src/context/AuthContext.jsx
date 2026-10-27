import { createContext, useContext, useState } from 'react'

const CLAVE_SESION = 'levelup_sesion'

// Igual que el carrito: una "caja compartida" para saber qué usuario inició sesión.
const AuthContext = createContext(null)

// Lee la sesión guardada (si no hay, nadie ha iniciado sesión)
function leerSesion() {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION) ?? sessionStorage.getItem(CLAVE_SESION)
    return guardada ? JSON.parse(guardada) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  // Inicia sesión. Si "recordar" es true se guarda en localStorage (dura aunque cierres el navegador);
  // si es false, en sessionStorage (se borra al cerrar la pestaña).
  const iniciarSesion = (datosUsuario, recordar = true) => {
    const sesion = { ...datosUsuario }
    delete sesion.contrasena // la contraseña nunca se guarda en la sesión
    localStorage.removeItem(CLAVE_SESION)
    sessionStorage.removeItem(CLAVE_SESION)
    const almacen = recordar ? localStorage : sessionStorage
    almacen.setItem(CLAVE_SESION, JSON.stringify(sesion))
    setUsuario(sesion)
  }

  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_SESION)
    sessionStorage.removeItem(CLAVE_SESION)
    setUsuario(null)
  }

  const esAdmin = usuario?.tipoUsuario === 'Administrador'

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar la sesión desde cualquier componente: const { usuario } = useAuth()
export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return contexto
}