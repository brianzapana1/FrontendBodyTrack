import { useState, useEffect } from 'react'
import { X, Calendar, Target, Dumbbell, Plus, Pencil, Trash2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useEjercicios } from '../../hooks/useEjercicios'
import {
  useRutina,
  useAgregarEjercicioARutina,
  useActualizarEjercicioEnRutina,
  useEliminarEjercicioDeRutina
} from '../../hooks/useRutinas'
import FormAgregarEjercicio from './FormAgregarEjercicio'

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function DetalleRutina({ rutina: rutinaInicial, onCerrar, puedeEditar = false }) {
  const { user } = useAuthStore()
  const [mostrarFormAgregar, setMostrarFormAgregar] = useState(false)
  const [ejercicioEditando, setEjercicioEditando] = useState(null)

  // Fetch fresh data from API to get updates
  const { data: rutinaActualizada } = useRutina(rutinaInicial?.id)
  const rutina = rutinaActualizada || rutinaInicial

  const eliminarEjercicioMutation = useEliminarEjercicioDeRutina()

  if (!rutina) return null

  const handleEliminarEjercicio = (ejercicioRutinaId) => {
    if (confirm('¿Estás seguro de eliminar este ejercicio de la rutina?')) {
      eliminarEjercicioMutation.mutate(ejercicioRutinaId)
    }
  }

  const esEntrenadorOAdmin = user?.rol === 'ENTRENADOR' || user?.rol === 'ADMIN'

  // Agrupar ejercicios por día
  const ejerciciosPorDia = rutina.ejercicios?.reduce((acc, ej) => {
    if (!acc[ej.dia]) acc[ej.dia] = []
    acc[ej.dia].push(ej)
    return acc
  }, {}) || {}

  const diasOrdenados = Object.keys(ejerciciosPorDia).sort((a, b) => a - b)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{rutina.nombre}</h2>
            {rutina.objetivo && (
              <div className="flex items-center gap-2 text-blue-100 mt-1">
                <Target size={16} />
                <span>{rutina.objetivo}</span>
              </div>
            )}
          </div>
          <button
            onClick={onCerrar}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Descripción */}
          {rutina.descripcion && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-700">{rutina.descripcion}</p>
            </div>
          )}

          {/* Info general */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {rutina.duracionSemanas && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">Duración</span>
                </div>
                <p className="text-xl font-bold text-blue-700">{rutina.duracionSemanas} semanas</p>
              </div>
            )}

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <Dumbbell size={18} />
                <span className="text-sm font-medium">Ejercicios</span>
              </div>
              <p className="text-xl font-bold text-green-700">{rutina.ejercicios?.length || 0}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <Calendar size={18} />
                <span className="text-sm font-medium">Días/semana</span>
              </div>
              <p className="text-xl font-bold text-purple-700">{diasOrdenados.filter(d => d > 0).length}</p>
            </div>
          </div>

          {/* Ejercicios por día */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Ejercicios por día</h3>
              {puedeEditar && esEntrenadorOAdmin && (
                <button
                  onClick={() => setMostrarFormAgregar(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={18} />
                  Agregar Ejercicio
                </button>
              )}
            </div>

            {diasOrdenados.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">No hay ejercicios en esta rutina</p>
              </div>
            ) : (
              diasOrdenados.map(dia => (
                <div key={dia} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {dia == 0 ? 'Sin día específico' : DIAS_SEMANA[dia]}
                  </h4>

                  <div className="space-y-3">
                    {ejerciciosPorDia[dia].map((ej, idx) => (
                      <div key={ej.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 mb-2">
                              {idx + 1}. {ej.ejercicio?.nombre || 'Ejercicio'}
                            </h5>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">Series:</span>
                                <span className="ml-2 font-semibold text-gray-900">{ej.series}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Reps:</span>
                                <span className="ml-2 font-semibold text-gray-900">{ej.repeticiones}</span>
                              </div>
                              {ej.descansoSeg && (
                                <div>
                                  <span className="text-gray-500">Descanso:</span>
                                  <span className="ml-2 font-semibold text-gray-900">{ej.descansoSeg}s</span>
                                </div>
                              )}
                            </div>

                            {ej.notas && (
                              <p className="mt-2 text-sm text-gray-600 italic">{ej.notas}</p>
                            )}
                          </div>

                          {puedeEditar && esEntrenadorOAdmin && (
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => setEjercicioEditando(ej)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar ejercicio"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleEliminarEjercicio(ej.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar ejercicio"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Entrenador */}
          {rutina.entrenador && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Creado por: <span className="font-medium text-gray-900">
                  {rutina.entrenador.nombres} {rutina.entrenador.apellidos}
                </span>
                {rutina.entrenador.especialidad && (
                  <span className="text-gray-500"> - {rutina.entrenador.especialidad}</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onCerrar}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Modal para agregar ejercicio */}
      {mostrarFormAgregar && (
        <FormAgregarEjercicio
          rutinaId={rutina.id}
          onCerrar={() => setMostrarFormAgregar(false)}
        />
      )}

      {/* Modal para editar ejercicio */}
      {ejercicioEditando && (
        <FormAgregarEjercicio
          rutinaId={rutina.id}
          ejercicioInicial={ejercicioEditando}
          onCerrar={() => setEjercicioEditando(null)}
        />
      )}
    </div>
  )
}
