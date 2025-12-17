import { Calendar, Target, Dumbbell, Eye, Pencil, Trash2, UserPlus } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export default function CardRutina({ rutina, onVer, onEditar, onEliminar, onAsignar }) {
  const { user } = useAuthStore()
  const puedeEditar = user?.rol === 'ENTRENADOR' || user?.rol === 'ADMIN'

  // Agrupar ejercicios por día
  const ejerciciosPorDia = rutina.ejercicios?.reduce((acc, ej) => {
    if (!acc[ej.dia]) acc[ej.dia] = []
    acc[ej.dia].push(ej)
    return acc
  }, {}) || {}

  const diasActivos = Object.keys(ejerciciosPorDia).filter(d => d > 0).length
  const totalEjercicios = rutina.ejercicios?.length || 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <h3 className="text-lg font-semibold text-white mb-1">{rutina.nombre}</h3>
        {rutina.objetivo && (
          <div className="flex items-center gap-2 text-blue-100">
            <Target size={16} />
            <span className="text-sm">{rutina.objetivo}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Descripción */}
        {rutina.descripcion && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{rutina.descripcion}</p>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Dumbbell size={14} />
              <span>Ejercicios</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{totalEjercicios}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Calendar size={14} />
              <span>Días/semana</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{diasActivos}</p>
          </div>
        </div>

        {/* Duración */}
        {rutina.duracionSemanas && (
          <div className="text-sm text-gray-600 mb-3">
            📅 Duración: {rutina.duracionSemanas} semanas
          </div>
        )}

        {/* Entrenador */}
        {rutina.entrenador && (
          <div className="text-sm text-gray-500 mb-4">
            Por: {rutina.entrenador.nombres} {rutina.entrenador.apellidos}
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          <button
            onClick={() => onVer(rutina)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={18} />
            <span>Ver Detalle</span>
          </button>

          {puedeEditar && (
            <>
              <button
                onClick={() => onAsignar(rutina)}
                className="flex items-center justify-center bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
                title="Asignar a cliente"
              >
                <UserPlus size={18} />
              </button>

              <button
                onClick={() => onEditar(rutina)}
                className="flex items-center justify-center bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                title="Editar rutina"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => onEliminar(rutina)}
                className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                title="Eliminar rutina"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
