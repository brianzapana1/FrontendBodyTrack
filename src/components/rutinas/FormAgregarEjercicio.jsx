import { useState, useEffect } from 'react'
import { X, Search } from 'lucide-react'
import { useEjercicios } from '../../hooks/useEjercicios'
import {
  useAgregarEjercicioARutina,
  useActualizarEjercicioEnRutina
} from '../../hooks/useRutinas'

const DIAS_SEMANA = [
  { value: 0, label: 'Sin día específico' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 7, label: 'Domingo' }
]

export default function FormAgregarEjercicio({ rutinaId, ejercicioInicial, onCerrar }) {
  const esEdicion = !!ejercicioInicial
  
  // Estado del formulario
  const [busquedaEjercicio, setBusquedaEjercicio] = useState('')
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(
    ejercicioInicial?.ejercicio || null
  )
  const [formData, setFormData] = useState({
    orden: ejercicioInicial?.orden || 1,
    dia: ejercicioInicial?.dia || 1,
    series: ejercicioInicial?.series || 3,
    repeticiones: ejercicioInicial?.repeticiones || '10-12',
    descansoSeg: ejercicioInicial?.descansoSeg || 90,
    notas: ejercicioInicial?.notas || ''
  })
  const [mostrarLista, setMostrarLista] = useState(!esEdicion)

  // Hooks
  const { data: ejercicios = [], isLoading: cargandoEjercicios } = useEjercicios({
    busqueda: busquedaEjercicio
  })
  const agregarMutation = useAgregarEjercicioARutina()
  const actualizarMutation = useActualizarEjercicioEnRutina()

  const handleSeleccionarEjercicio = (ejercicio) => {
    setEjercicioSeleccionado(ejercicio)
    setMostrarLista(false)
    setBusquedaEjercicio('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dia' || name === 'series' || name === 'descansoSeg' || name === 'orden'
        ? parseInt(value) || 0
        : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!ejercicioSeleccionado && !esEdicion) {
      alert('Por favor selecciona un ejercicio')
      return
    }

    const data = {
      ...formData,
      ejercicioId: ejercicioSeleccionado?.id
    }

    if (esEdicion) {
      await actualizarMutation.mutateAsync({
        ejercicioRutinaId: ejercicioInicial.id,
        data
      })
    } else {
      await agregarMutation.mutateAsync({
        rutinaId,
        ejercicioData: data
      })
    }

    onCerrar()
  }

  // Backend already handles accent-insensitive search, no need for client-side filter
  const ejerciciosFiltrados = ejercicios

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {esEdicion ? 'Editar Ejercicio' : 'Agregar Ejercicio a Rutina'}
          </h2>
          <button
            onClick={onCerrar}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selección de ejercicio (solo en modo agregar) */}
          {!esEdicion && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ejercicio *
              </label>

              {ejercicioSeleccionado ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{ejercicioSeleccionado.nombre}</h4>
                      <p className="text-sm text-gray-600 mt-1">{ejercicioSeleccionado.grupoMuscular}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEjercicioSeleccionado(null)
                        setMostrarLista(true)
                      }}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={busquedaEjercicio}
                      onChange={(e) => {
                        setBusquedaEjercicio(e.target.value)
                        setMostrarLista(true)
                      }}
                      onFocus={() => setMostrarLista(true)}
                      placeholder="Buscar ejercicio..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {mostrarLista && (
                    <div className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
                      {cargandoEjercicios ? (
                        <div className="p-4 text-center text-gray-500">Cargando...</div>
                      ) : ejerciciosFiltrados.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No se encontraron ejercicios</div>
                      ) : (
                        ejerciciosFiltrados.map(ejercicio => (
                          <button
                            key={ejercicio.id}
                            type="button"
                            onClick={() => handleSeleccionarEjercicio(ejercicio)}
                            className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-200 last:border-0 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{ejercicio.nombre}</div>
                            <div className="text-sm text-gray-600">{ejercicio.grupoMuscular}</div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Día */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Día de la semana *
            </label>
            <select
              name="dia"
              value={formData.dia}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {DIAS_SEMANA.map(dia => (
                <option key={dia.value} value={dia.value}>
                  {dia.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Series */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Series *
              </label>
              <input
                type="number"
                name="series"
                value={formData.series}
                onChange={handleChange}
                required
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Repeticiones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeticiones *
              </label>
              <input
                type="text"
                name="repeticiones"
                value={formData.repeticiones}
                onChange={handleChange}
                required
                placeholder="ej: 10-12, 15, al fallo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Descanso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descanso (segundos)
              </label>
              <input
                type="number"
                name="descansoSeg"
                value={formData.descansoSeg}
                onChange={handleChange}
                min="0"
                step="15"
                placeholder="90"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Orden */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orden
              </label>
              <input
                type="number"
                name="orden"
                value={formData.orden}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows="3"
              placeholder="Indicaciones especiales, técnica, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCerrar}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={agregarMutation.isPending || actualizarMutation.isPending}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {agregarMutation.isPending || actualizarMutation.isPending ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
