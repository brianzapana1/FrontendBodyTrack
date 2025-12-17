import { Dumbbell, Pencil, Trash2, Eye } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

/**
 * Tarjeta de ejercicio que muestra información resumida
 */
export default function CardEjercicio({ ejercicio, onVer, onEditar, onEliminar }) {
  const { user } = useAuthStore()
  const puedeEditar = user?.rol === 'ENTRENADOR' || user?.rol === 'ADMIN'

  // Imagen por defecto si no hay imagenUrl
  const imagenDefault = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={ejercicio.imagenUrl || imagenDefault}
          alt={ejercicio.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = imagenDefault
          }}
        />
        {/* Badge de grupo muscular */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {ejercicio.grupoMuscular}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {ejercicio.nombre}
        </h3>

        {/* Descripción truncada */}
        {ejercicio.descripcion && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {ejercicio.descripcion}
          </p>
        )}

        {/* Equipamiento */}
        {ejercicio.equipamiento && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <Dumbbell size={16} />
            <span>{ejercicio.equipamiento}</span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          <button
            onClick={() => onVer(ejercicio)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={18} />
            <span>Ver Detalle</span>
          </button>

          {puedeEditar && (
            <>
              <button
                onClick={() => onEditar(ejercicio)}
                className="flex items-center justify-center bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                title="Editar ejercicio"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => onEliminar(ejercicio)}
                className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                title="Eliminar ejercicio"
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
