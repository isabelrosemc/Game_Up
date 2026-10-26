import { usuariosIniciales } from '../data/usuarios';

const CLAVE_USUARIOS = 'levelupgamer_usuarios';

// Devuelve la lista de usuarios. La primera vez guarda los usuarios de ejemplo.
export function obtenerUsuarios() {
  const guardado = localStorage.getItem(CLAVE_USUARIOS);

  if (guardado === null) {
    guardarUsuarios(usuariosIniciales);
    return usuariosIniciales;
  }

  try {
    const lista = JSON.parse(guardado);
    return Array.isArray(lista) ? lista : usuariosIniciales;
  } catch {
    return usuariosIniciales;
  }
}

// Guarda la lista completa de usuarios
export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

// Elimina un usuario por su RUN y actualiza localStorage
export function eliminarUsuario(run) {
  const lista = obtenerUsuarios();
  const nuevaLista = lista.filter((u) => u.run !== run);
  guardarUsuarios(nuevaLista);
  return nuevaLista;
}

// Agrega un nuevo usuario a localStorage
export function agregarUsuario(nuevoUsuario) {
  const lista = obtenerUsuarios();
  const nuevaLista = [...lista, nuevoUsuario];
  guardarUsuarios(nuevaLista);
  return nuevaLista;
}

// Actualiza un usuario existente por su RUN
export function actualizarUsuario(usuarioActualizado) {
  const lista = obtenerUsuarios();
  const nuevaLista = lista.map((u) =>
    u.run === usuarioActualizado.run ? usuarioActualizado : u
  );
  guardarUsuarios(nuevaLista);
  return nuevaLista;
}