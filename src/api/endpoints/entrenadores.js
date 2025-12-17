import api from '../axios'

export const entrenadoresAPI = {
  // Listar todos los entrenadores
  getAll: async () => {
    const { data } = await api.get('/api/entrenadores')
    return data
  },

  // Obtener un entrenador por ID
  getById: async (id) => {
    const { data } = await api.get(`/api/entrenadores/${id}`)
    return data
  },

  // Actualizar perfil de entrenador
  update: async (id, entrenadorData) => {
    const { data } = await api.put(`/api/entrenadores/${id}`, entrenadorData)
    return data
  },

  // Obtener clientes asignados a un entrenador
  getClientes: async (id) => {
    const { data } = await api.get(`/api/entrenadores/${id}/clientes`)
    return data
  },

  // Obtener estadísticas del entrenador
  getEstadisticas: async (id) => {
    const { data } = await api.get(`/api/entrenadores/${id}/estadisticas`)
    return data
  }
}
