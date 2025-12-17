import api from '../axios'

export const adminAPI = {
  // Obtener estadísticas del sistema
  getEstadisticas: async () => {
    const { data } = await api.get('/api/admin/estadisticas')
    return data
  },

  // Listar usuarios
  getUsuarios: async (filtros = {}) => {
    const params = new URLSearchParams()
    if (filtros.rol) params.append('rol', filtros.rol)
    if (filtros.activo !== undefined) params.append('activo', filtros.activo)
    
    const { data } = await api.get(`/api/admin/usuarios?${params}`)
    return data
  },

  // Toggle usuario activo/inactivo
  toggleUsuarioActivo: async (usuarioId) => {
    const { data } = await api.patch(`/api/admin/usuarios/${usuarioId}/toggle-activo`)
    return data
  }
}
