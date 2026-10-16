
import { usuariosIniciales } from '../data/usuarios'

const CLAVE_USUARIOS = 'levelupgamer_usuarios'

// Obtiene los usuarios guardados.
// Si es la primera vez, carga los usuarios de ejemplo.
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

// Guarda la lista completa de usuarios.
export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista))
}
