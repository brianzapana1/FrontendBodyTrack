import api from '../axios'

/**
 * API de Progreso
 * Maneja el registro de progreso del cliente (peso, medidas, fotos)
 */
const progresoAPI = {
  /**
   * Listar historial de progreso de un cliente
   */
  listarPorCliente: async (clienteId) => {
    const { data } = await api.get(`/api/progreso/cliente/${clienteId}`)
    return data
  },

  /**
   * Obtener estadísticas de progreso de un cliente
   */
  obtenerEstadisticas: async (clienteId) => {
    const { data } = await api.get(`/api/progreso/cliente/${clienteId}/estadisticas`)
    return data
  },

  /**
   * Obtener detalle de un registro específico
   */
  obtenerDetalle: async (id) => {
    const { data } = await api.get(`/api/progreso/${id}`)
    return data
  },

  /**
   * Crear nuevo registro de progreso
   * @param {FormData} formData - Debe incluir fotos como multipart/form-data
   */
  crear: async (formData) => {
    const { data } = await api.post('/api/progreso', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  },

  /**
   * Actualizar registro de progreso
   * @param {string} id - ID del registro
   * @param {FormData} formData - Debe incluir fotos como multipart/form-data
   */
  actualizar: async (id, formData) => {
    const { data } = await api.put(`/api/progreso/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  },

  /**
   * Eliminar registro de progreso
   */
  eliminar: async (id) => {
    const { data } = await api.delete(`/api/progreso/${id}`)
    return data
  }
}

export default progresoAPI
