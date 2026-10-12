import { usuariosIniciales } from '../data/usuarios'

const CLAVE_USUARIOS = 'levelupgamer_usuarios'

// Devuelve la lista de usuarios. La primera vez guarda los usuarios de ejemplo.
// localStorage hace de "base de datos".
export function obtenerUsuarios() {
  const guardado = localStorage.getItem(CLAVE_USUARIOS)
  if (guardado === null) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales))
    return usuariosIniciales
  }
  try {
    const lista = JSON.parse(guardado)
    return Array.isArray(lista) ? lista : usuariosIniciales
  } catch {
    return usuariosIniciales
  }
}