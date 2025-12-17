import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useEliminarEjercicio } from '../../hooks/useEjercicios'
import ListaEjercicios from '../../components/ejercicios/ListaEjercicios'
import DetalleEjercicio from '../../components/ejercicios/DetalleEjercicio'
import FormEjercicio from '../../components/ejercicios/FormEjercicio'

/**
 * Página principal de Ejercicios
 * - Muestra catálogo completo de ejercicios
 * - Permite crear/editar/eliminar (solo entrenadores/admin)
 * - Filtros y búsqueda
 */
export default function Ejercicios() {
  const { user } = useAuthStore()
  const puedeCrear = user?.rol === 'ENTRENADOR' || user?.rol === 'ADMIN'

  // Estados para modales
  const [ejercicioDetalle, setEjercicioDetalle] = useState(null)
  const [ejercicioEditar, setEjercicioEditar] = useState(null)
  const [mostrarFormNuevo, setMostrarFormNuevo] = useState(false)

  // Mutation para eliminar
  const eliminarMutation = useEliminarEjercicio()

  // Handlers
  const handleVer = (ejercicio) => {
    setEjercicioDetalle(ejercicio)
  }

  const handleEditar = (ejercicio) => {
    setEjercicioEditar(ejercicio)
  }

  const handleEliminar = (ejercicio) => {
    if (window.confirm(`¿Estás seguro de eliminar "${ejercicio.nombre}"?`)) {
      eliminarMutation.mutate(ejercicio.id)
    }
  }

  const handleCerrarDetalle = () => {
    setEjercicioDetalle(null)
  }

  const handleCerrarFormEditar = () => {
    setEjercicioEditar(null)
  }

  const handleCerrarFormNuevo = () => {
    setMostrarFormNuevo(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Catálogo de Ejercicios</h1>
              <p className="text-gray-600 mt-2">
                Explora nuestro catálogo completo de ejercicios organizados por grupo muscular
              </p>
            </div>

            {/* Botón crear (solo para entrenadores/admin) */}
            {puedeCrear && (
              <button
                onClick={() => setMostrarFormNuevo(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Plus size={20} />
                <span>Nuevo Ejercicio</span>
              </button>
            )}
          </div>
        </div>

        {/* Lista de ejercicios */}
        <ListaEjercicios
          onVer={handleVer}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />

        {/* Modal de detalle */}
        {ejercicioDetalle && (
          <DetalleEjercicio
            ejercicio={ejercicioDetalle}
            onCerrar={handleCerrarDetalle}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        )}

        {/* Modal de edición */}
        {ejercicioEditar && (
          <FormEjercicio
            ejercicio={ejercicioEditar}
            onCerrar={handleCerrarFormEditar}
            onGuardado={() => {
              // Cerrar modal de detalle si estaba abierto
              setEjercicioDetalle(null)
            }}
          />
        )}

        {/* Modal de nuevo ejercicio */}
        {mostrarFormNuevo && (
          <FormEjercicio
            onCerrar={handleCerrarFormNuevo}
          />
        )}
      </div>
    </div>
  )
}
