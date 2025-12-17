import api from '../axios'

/**
 * Obtener lista de ejercicios con filtros opcionales
 * @param {Object} params - Parámetros de filtrado
 * @param {string} params.grupoMuscular - Filtrar por grupo muscular
 * @param {string} params.equipamiento - Filtrar por equipamiento
 * @param {string} params.busqueda - Búsqueda por nombre/descripción
 */
export const obtenerEjercicios = (params = {}) => {
  return api.get('/api/ejercicios', { params })
}

/**
 * Obtener grupos musculares disponibles
 */
export const obtenerGruposMusculares = () => {
  return api.get('/api/ejercicios/grupos-musculares')
}

/**
 * Obtener detalle de un ejercicio
 * @param {string} id - ID del ejercicio
 */
export const obtenerEjercicio = (id) => {
  return api.get(`/api/ejercicios/${id}`)
}

/**
 * Crear nuevo ejercicio
 * @param {Object} data - Datos del ejercicio
 * @param {string} data.nombre - Nombre del ejercicio (requerido)
 * @param {string} data.grupoMuscular - Grupo muscular (requerido)
 * @param {string} data.descripcion - Descripción (opcional)
 * @param {string} data.equipamiento - Equipamiento (opcional)
 * @param {string} data.videoUrl - URL del video (opcional)
 * @param {string} data.imagenUrl - URL de la imagen (opcional)
 */
export const crearEjercicio = (data) => {
  return api.post('/api/ejercicios', data)
}

/**
 * Actualizar ejercicio existente
 * @param {string} id - ID del ejercicio
 * @param {Object} data - Datos a actualizar
 */
export const actualizarEjercicio = (id, data) => {
  return api.put(`/api/ejercicios/${id}`, data)
}

/**
 * Eliminar ejercicio
 * @param {string} id - ID del ejercicio
 */
export const eliminarEjercicio = (id) => {
  return api.delete(`/api/ejercicios/${id}`)
}
