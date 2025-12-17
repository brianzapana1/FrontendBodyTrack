import { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import CardEjercicio from './CardEjercicio'
import { useEjercicios, useGruposMusculares } from '../../hooks/useEjercicios'

/**
 * Componente que muestra la lista de ejercicios con filtros y búsqueda
 */
export default function ListaEjercicios({ onVer, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('')
  const [grupoMuscular, setGrupoMuscular] = useState('')
  const [equipamiento, setEquipamiento] = useState('')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  // Queries
  const { data: gruposMusculares = [] } = useGruposMusculares()
  const { data: ejercicios = [], isLoading, error } = useEjercicios({
    grupoMuscular,
    equipamiento,
    busqueda
  })

  // Obtener equipamientos únicos de los ejercicios
  const equipamientosUnicos = useMemo(() => {
    if (!ejercicios) return []
    const equipamientos = ejercicios
      .map(e => e.equipamiento)
      .filter(Boolean)
    return [...new Set(equipamientos)].sort()
  }, [ejercicios])

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setBusqueda('')
    setGrupoMuscular('')
    setEquipamiento('')
  }

  // Verificar si hay filtros activos
  const hayFiltrosActivos = busqueda || grupoMuscular || equipamiento

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Error al cargar ejercicios: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Búsqueda */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar ejercicios por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              mostrarFiltros || hayFiltrosActivos
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter size={20} />
            <span>Filtros</span>
            {hayFiltrosActivos && !mostrarFiltros && (
              <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                !
              </span>
            )}
          </button>

          {hayFiltrosActivos && (
            <button
              onClick={limpiarFiltros}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <X size={20} />
              <span>Limpiar</span>
            </button>
          )}
        </div>

        {/* Panel de filtros */}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            {/* Filtro por grupo muscular */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grupo Muscular
              </label>
              <select
                value={grupoMuscular}
                onChange={(e) => setGrupoMuscular(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los grupos</option>
                {gruposMusculares.map((grupo) => (
                  <option key={grupo} value={grupo}>
                    {grupo}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por equipamiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipamiento
              </label>
              <select
                value={equipamiento}
                onChange={(e) => setEquipamiento(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los equipamientos</option>
                {equipamientosUnicos.map((equip) => (
                  <option key={equip} value={equip}>
                    {equip}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Contador de resultados */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {ejercicios.length} {ejercicios.length === 1 ? 'ejercicio' : 'ejercicios'} encontrado
          {ejercicios.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid de ejercicios */}
      {ejercicios.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            {hayFiltrosActivos
              ? 'No se encontraron ejercicios con los filtros aplicados'
              : 'No hay ejercicios disponibles'}
          </p>
          {hayFiltrosActivos && (
            <button
              onClick={limpiarFiltros}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ejercicios.map((ejercicio) => (
            <CardEjercicio
              key={ejercicio.id}
              ejercicio={ejercicio}
              onVer={onVer}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </div>
  )
}
