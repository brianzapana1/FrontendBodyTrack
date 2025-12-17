import { X, Dumbbell, Play, Pencil, Trash2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

/**
 * Modal de detalle de ejercicio con toda la información
 */
export default function DetalleEjercicio({ ejercicio, onCerrar, onEditar, onEliminar }) {
  const { user } = useAuthStore()
  const puedeEditar = user?.rol === 'ENTRENADOR' || user?.rol === 'ADMIN'

  if (!ejercicio) return null

  const imagenDefault = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{ejercicio.nombre}</h2>
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Imagen principal */}
          <div className="mb-6">
            <img
              src={ejercicio.imagenUrl || imagenDefault}
              alt={ejercicio.nombre}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = imagenDefault
              }}
            />
          </div>

          {/* Video (si existe) */}
          {ejercicio.videoUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Play size={20} className="text-blue-600" />
                Video Demostrativo
              </h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  src={ejercicio.videoUrl}
                  title={`Video de ${ejercicio.nombre}`}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Grupo Muscular */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Grupo Muscular</h3>
              <p className="text-lg font-semibold text-blue-600">{ejercicio.grupoMuscular}</p>
            </div>

            {/* Equipamiento */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                <Dumbbell size={16} />
                Equipamiento
              </h3>
              <p className="text-lg font-semibold text-gray-700">
                {ejercicio.equipamiento || 'No especificado'}
              </p>
            </div>
          </div>

          {/* Descripción */}
          {ejercicio.descripcion && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {ejercicio.descripcion}
              </p>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p>
              <span className="font-medium">Creado:</span>{' '}
              {new Date(ejercicio.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onCerrar}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>

          {puedeEditar && (
            <>
              <button
                onClick={() => {
                  onCerrar()
                  onEditar(ejercicio)
                }}
                className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Pencil size={18} />
                <span>Editar</span>
              </button>

              <button
                onClick={() => {
                  onCerrar()
                  onEliminar(ejercicio)
                }}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={18} />
                <span>Eliminar</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
