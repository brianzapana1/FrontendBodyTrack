import { useState, useMemo } from 'react'
import { Filter, X } from 'lucide-react'
import CardRutina from './CardRutina'
import { useRutinas } from '../../hooks/useRutinas'

export default function ListaRutinas({ onVer, onEditar, onEliminar, onAsignar }) {
  const [objetivo, setObjetivo] = useState('')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const { data: rutinas = [], isLoading, error } = useRutinas()

  // Obtener objetivos únicos
  const objetivosUnicos = useMemo(() => {
    if (!rutinas) return []
    const objetivos = rutinas
      .map(r => r.objetivo)
      .filter(Boolean)
    return [...new Set(objetivos)].sort()
  }, [rutinas])

  // Filtrar rutinas
  const rutinasFiltradas = useMemo(() => {
    if (!objetivo) return rutinas
    return rutinas.filter(r => r.objetivo === objetivo)
  }, [rutinas, objetivo])

  const limpiarFiltros = () => {
    setObjetivo('')
  }

  const hayFiltrosActivos = !!objetivo

  return (
    <div className="space-y-6">
      {/* Barra de filtros */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-3">
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
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivo
              </label>
              <select
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los objetivos</option>
                {objetivosUnicos.map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Contador de resultados */}
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Cargando...
            </span>
          ) : (
            <span>
              {rutinasFiltradas.length} {rutinasFiltradas.length === 1 ? 'rutina' : 'rutinas'} encontrada
              {rutinasFiltradas.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">Error al cargar rutinas: {error.message}</p>
        </div>
      )}

      {/* Grid de rutinas */}
      {!error && rutinasFiltradas.length === 0 && !isLoading ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            {hayFiltrosActivos
              ? 'No se encontraron rutinas con los filtros aplicados'
              : 'No hay rutinas disponibles'}
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
          {rutinasFiltradas.map((rutina) => (
            <CardRutina
              key={rutina.id}
              rutina={rutina}
              onVer={onVer}
              onEditar={onEditar}
              onEliminar={onEliminar}
              onAsignar={onAsignar}
            />
          ))}
        </div>
      )}
    </div>
  )
}
