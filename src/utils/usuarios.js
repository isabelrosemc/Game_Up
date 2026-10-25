
import { usuariosIniciales } from '../data/usuarios'

const CLAVE_USUARIOS = 'levelupgamer_usuarios'

// Devuelve la lista de usuarios. La primera vez guarda los usuarios de ejemplo.
// Hoy localStorage hace de "base de datos"; en la Evaluación 3 esto vendrá del backend.
export function obtenerUsuarios() {
  const guardado = localStorage.getItem(CLAVE_USUARIOS)

  if (guardado === null) {
    guardarUsuarios(usuariosIniciales)
    return usuariosIniciales
  }

  try {
    const lista = JSON.parse(guardado)
    return Array.isArray(lista) ? lista : usuariosIniciales
  } catch {
    return usuariosIniciales
  }
}

// Guarda la lista completa de usuarios
export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista))
}
