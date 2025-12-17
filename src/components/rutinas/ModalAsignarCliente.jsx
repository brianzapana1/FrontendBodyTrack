import { useState } from 'react'
import { X, Search, User, CheckCircle, AlertCircle } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../api/axios'
import { useAsignarRutinaACliente } from '../../hooks/useRutinas'
import { useAuthStore } from '../../store/authStore'

export default function ModalAsignarCliente({ rutina, onCerrar }) {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [busqueda, setBusqueda] = useState('')
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)

  const asignarMutation = useAsignarRutinaACliente()

  // Obtener lista de clientes con sus rutinas asignadas
  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ['clientes-con-rutinas', busqueda],
    queryFn: async () => {
      const response = await api.get('/api/clientes', {
        params: { busqueda }
      })
      return response.data
    }
  })

  // Helper function to check if client has active routine
  const getClienteAsignacion = (cliente) => {
    // Check if cliente has rutinasAsignadas array with active routine
    const asignacionActiva = cliente.rutinasAsignadas?.find(asig => asig.activa)
    if (asignacionActiva) {
      return {
        clienteId: cliente.id,
        rutinaId: asignacionActiva.rutinaId,
        rutinaNombre: asignacionActiva.rutina?.nombre || 'Rutina asignada'
      }
    }
    return null
  }

  const handleAsignar = async () => {
    if (!clienteSeleccionado) {
      alert('Por favor selecciona un cliente')
      return
    }

    // Check if client already has an active routine
    const asignacionExistente = getClienteAsignacion(clienteSeleccionado)
    if (asignacionExistente) {
      const confirmar = confirm(
        `⚠️ ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos} ya tiene la rutina "${asignacionExistente.rutinaNombre}" asignada.\n\n` +
        `Al asignar esta nueva rutina, se desactivará la anterior automáticamente.\n\n` +
        `¿Deseas continuar?`
      )
      if (!confirmar) return
    }

    try {
      // Get entrenador ID from current user profile
      const entrenadorResponse = await api.get('/api/auth/perfil')
      const entrenadorId = entrenadorResponse.data.entrenador?.id

      if (!entrenadorId) {
        alert('Error: No se pudo obtener el ID del entrenador. Verifica que tengas un perfil de entrenador.')
        return
      }

      // Use the mutation with all required data
      await asignarMutation.mutateAsync({
        rutinaId: rutina.id,
        clienteId: clienteSeleccionado.id,
        entrenadorId: entrenadorId
      })

      // Refresh clients list to show updated assignments
      queryClient.invalidateQueries(['clientes-con-rutinas'])
      
      onCerrar()
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error('Error asignando rutina:', error)
    }
  }

  const clientesFiltrados = clientes.filter(cliente =>
    `${cliente.nombres} ${cliente.apellidos}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.Usuario?.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Asignar Rutina a Cliente</h2>
            <p className="text-purple-100 text-sm mt-1">{rutina.nombre}</p>
          </div>
          <button
            onClick={onCerrar}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Búsqueda */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar cliente por nombre o email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center text-gray-500 py-8">Cargando clientes...</div>
          ) : clientesFiltrados.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No se encontraron clientes
            </div>
          ) : (
            <div className="space-y-2">
              {clientesFiltrados.map(cliente => {
                const asignacion = getClienteAsignacion(cliente)
                const tieneRutina = !!asignacion
                const esMismaRutina = asignacion?.rutinaId === rutina.id
                
                return (
                  <button
                    key={cliente.id}
                    onClick={() => setClienteSeleccionado(cliente)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      clienteSeleccionado?.id === cliente.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <User className="text-purple-600" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">
                          {cliente.nombres} {cliente.apellidos}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {cliente.Usuario?.email}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Plan: {cliente.plan}
                          </span>
                          {tieneRutina && (
                            <>
                              <span className="text-gray-300">•</span>
                              {esMismaRutina ? (
                                <span className="flex items-center gap-1 text-xs text-green-600">
                                  <CheckCircle size={12} />
                                  Ya tiene esta rutina
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-orange-600">
                                  <AlertCircle size={12} />
                                  Tiene: {asignacion.rutinaNombre}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      {clienteSeleccionado?.id === cliente.id && (
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50">
          <button
            onClick={onCerrar}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAsignar}
            disabled={!clienteSeleccionado || asignarMutation.isPending}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {asignarMutation.isPending ? 'Asignando...' : 'Asignar Rutina'}
          </button>
        </div>
      </div>
    </div>
  )
}
