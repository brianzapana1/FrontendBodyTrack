import api from '../axios'

export const suscripcionesAPI = {
  // Obtener todos los planes disponibles (público)
  obtenerPlanes: async () => {
    const { data } = await api.get('/api/suscripciones/planes')
    return data
  },

  // Obtener la suscripción activa del cliente autenticado
  obtenerMiSuscripcion: async () => {
    const { data } = await api.get('/api/suscripciones/mi-suscripcion')
    return data
  },

  // Contratar un plan premium (simulación de pago)
  contratarPlan: async (planData) => {
    const { data } = await api.post('/api/suscripciones/contratar', planData)
    return data
  },

  // Cancelar la suscripción activa
  cancelarSuscripcion: async () => {
    const { data } = await api.post('/api/suscripciones/cancelar')
    return data
  }
}
