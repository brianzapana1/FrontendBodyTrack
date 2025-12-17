import api from '../axios'

export const clientesAPI = {
  // Listar todos los clientes (ENTRENADOR, ADMIN)
  getAll: async () => {
    const { data } = await api.get('/api/clientes')
    return data
  },

  // Obtener un cliente por ID
  getById: async (id) => {
    const { data } = await api.get(`/api/clientes/${id}`)
    return data
  },

  // Actualizar perfil de cliente
  update: async (id, clienteData) => {
    const { data } = await api.put(`/api/clientes/${id}`, clienteData)
    return data
  },

  // Eliminar cliente (ADMIN)
  delete: async (id) => {
    const { data } = await api.delete(`/api/clientes/${id}`)
    return data
  }
}
