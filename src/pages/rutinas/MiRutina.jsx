import { Calendar, Dumbbell, CheckCircle } from 'lucide-react'
import { useMiRutina } from '../../hooks/useRutinas'

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function MiRutina() {
  const { data: asignacion, isLoading, error } = useMiRutina()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !asignacion || !asignacion.rutina) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Dumbbell size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No tienes una rutina asignada
            </h2>
            <p className="text-gray-600">
              Contacta a tu entrenador para que te asigne una rutina personalizada
            </p>
          </div>
        </div>
      </div>
    )
  }

  const rutina = asignacion.rutina
  const entrenador = asignacion.entrenador

  // Agrupar ejercicios por día
  const ejerciciosPorDia = rutina.ejercicios?.reduce((acc, ej) => {
    if (!acc[ej.dia]) acc[ej.dia] = []
    acc[ej.dia].push(ej)
    return acc
  }, {}) || {}

  const diasOrdenados = Object.keys(ejerciciosPorDia).sort((a, b) => a - b)

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header con info de rutina */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={32} className="text-green-300" />
                <h1 className="text-3xl font-bold">{rutina.nombre}</h1>
              </div>
              {rutina.objetivo && (
                <p className="text-blue-100 text-lg">Objetivo: {rutina.objetivo}</p>
              )}
            </div>
          </div>

          {rutina.descripcion && (
            <p className="text-blue-50 mb-4">{rutina.descripcion}</p>
          )}

          {/* Stats compactos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rutina.duracionSemanas && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} />
                  <span className="text-xs">Duración</span>
                </div>
                <p className="text-xl font-bold">{rutina.duracionSemanas} semanas</p>
              </div>
            )}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Dumbbell size={16} />
                <span className="text-xs">Ejercicios</span>
              </div>
              <p className="text-xl font-bold">{rutina.ejercicios?.length || 0}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={16} />
                <span className="text-xs">Días/semana</span>
              </div>
              <p className="text-xl font-bold">{diasOrdenados.filter(d => d > 0).length}</p>
            </div>
            {entrenador && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs mb-1">Tu entrenador</div>
                <p className="text-sm font-semibold truncate">
                  {entrenador.nombres} {entrenador.apellidos}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ejercicios por día - Vista compacta */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {diasOrdenados.map(dia => (
            <div key={dia} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-5 py-3">
                <h2 className="text-lg font-bold text-white">
                  {dia == 0 ? 'Sin día específico' : DIAS_SEMANA[dia]}
                </h2>
                <p className="text-xs text-gray-300">
                  {ejerciciosPorDia[dia].length} ejercicio{ejerciciosPorDia[dia].length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="p-5">
                <div className="space-y-3">
                  {ejerciciosPorDia[dia].map((ej, idx) => (
                    <div key={ej.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{ej.ejercicio?.nombre || 'Ejercicio'}</span>
                      </h3>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-xs text-gray-600 mb-1">Series</p>
                          <p className="text-lg font-bold text-blue-600">{ej.series}</p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-2">
                          <p className="text-xs text-gray-600 mb-1">Reps</p>
                          <p className="text-lg font-bold text-green-600">{ej.repeticiones}</p>
                        </div>

                        {ej.descansoSeg && (
                          <div className="bg-orange-50 rounded-lg p-2">
                            <p className="text-xs text-gray-600 mb-1">Descanso</p>
                            <p className="text-lg font-bold text-orange-600">{ej.descansoSeg}s</p>
                          </div>
                        )}
                      </div>

                      {ej.notas && (
                        <div className="mt-3 p-2 bg-yellow-50 border-l-3 border-yellow-400 rounded text-xs">
                          <span className="font-medium text-gray-700">💡 </span>
                          <span className="text-gray-600">{ej.notas}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota informativa */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Nota:</strong> Actualmente se muestra tu rutina activa. 
            Si tu entrenador te asigna una nueva rutina, esta se actualizará automáticamente aquí.
          </p>
        </div>
      </div>
    </div>
  )
}
