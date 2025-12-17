import api from '../axios'

/**
 * Obtener lista de rutinas con filtros opcionales
 * @param {Object} params - Parámetros de filtrado
 * @param {string} params.entrenadorId - Filtrar por entrenador
 */
export const obtenerRutinas = (params = {}) => {
  return api.get('/api/rutinas', { params })
}

/**
 * Obtener rutina activa del cliente autenticado
 */
export const obtenerMiRutina = () => {
  return api.get('/api/rutinas/mi-rutina')
}

/**
 * Obtener detalle de una rutina
 * @param {string} id - ID de la rutina
 */
export const obtenerRutina = (id) => {
  return api.get(`/api/rutinas/${id}`)
}

/**
 * Crear nueva rutina
 * @param {Object} data - Datos de la rutina
 * @param {string} data.nombre - Nombre de la rutina (requerido)
 * @param {string} data.entrenadorId - ID del entrenador (requerido)
 * @param {string} data.descripcion - Descripción (opcional)
 * @param {string} data.objetivo - Objetivo (opcional)
 * @param {number} data.duracionSemanas - Duración en semanas (opcional)
 * @param {Array} data.ejercicios - Array de ejercicios (opcional)
 */
export const crearRutina = (data) => {
  return api.post('/api/rutinas', data)
}

/**
 * Actualizar rutina existente
 * @param {string} id - ID de la rutina
 * @param {Object} data - Datos a actualizar
 */
export const actualizarRutina = (id, data) => {
  return api.put(`/api/rutinas/${id}`, data)
}

/**
 * Eliminar rutina
 * @param {string} id - ID de la rutina
 */
export const eliminarRutina = (id) => {
  return api.delete(`/api/rutinas/${id}`)
}

/**
 * Agregar ejercicio a una rutina
 * @param {string} rutinaId - ID de la rutina
 * @param {Object} ejercicioData - Datos del ejercicio
 * @param {string} ejercicioData.ejercicioId - ID del ejercicio
 * @param {number} ejercicioData.dia - Día de la semana (1-7)
 * @param {number} ejercicioData.orden - Orden dentro del día
 * @param {number} ejercicioData.series - Número de series
 * @param {string} ejercicioData.repeticiones - Repeticiones (ej: "10-12", "al fallo")
 * @param {number} ejercicioData.descansoSeg - Descanso en segundos (opcional)
 * @param {string} ejercicioData.notas - Notas adicionales (opcional)
 */
export const agregarEjercicioARutina = (rutinaId, ejercicioData) => {
  return api.post(`/api/rutinas/${rutinaId}/ejercicios`, ejercicioData)
}

/**
 * Actualizar ejercicio en rutina
 * @param {string} ejercicioRutinaId - ID del RutinaEjercicio
 * @param {Object} data - Datos a actualizar
 */
export const actualizarEjercicioEnRutina = (ejercicioRutinaId, data) => {
  return api.put(`/api/rutinas/ejercicios/${ejercicioRutinaId}`, data)
}

/**
 * Eliminar ejercicio de rutina
 * @param {string} ejercicioRutinaId - ID del RutinaEjercicio
 */
export const eliminarEjercicioDeRutina = (ejercicioRutinaId) => {
  return api.delete(`/api/rutinas/ejercicios/${ejercicioRutinaId}`)
}

/**
 * Asignar rutina a un cliente
 * @param {string} rutinaId - ID de la rutina
 * @param {Object} data - Datos de asignación
 * @param {string} data.clienteId - ID del cliente
 */
export const asignarRutinaACliente = (rutinaId, data) => {
  return api.post(`/api/rutinas/${rutinaId}/asignar`, data)
}

/**
 * Desactivar asignación de rutina
 * @param {string} asignacionId - ID de la asignación
 */
export const desactivarAsignacion = (asignacionId) => {
  return api.delete(`/api/rutinas/asignaciones/${asignacionId}`)
}
