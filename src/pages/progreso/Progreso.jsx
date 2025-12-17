import { useState, useMemo } from 'react'
import { Plus, TrendingUp, Calendar, Filter } from 'lucide-react'
import { useProgreso } from '../../hooks/useProgreso'
import { useAuthStore } from '../../store/authStore'
import FormProgreso from '../../components/progreso/FormProgreso'
import ListaProgreso from '../../components/progreso/ListaProgreso'
import GraficasProgreso from '../../components/progreso/GraficasProgreso'
import DetalleProgreso from '../../components/progreso/DetalleProgreso'

const FILTROS_TIEMPO = [
  { id: 'all', label: 'Todo el tiempo', meses: null },
  { id: '1m', label: 'Último mes', meses: 1 },
  { id: '3m', label: 'Últimos 3 meses', meses: 3 },
  { id: '6m', label: 'Últimos 6 meses', meses: 6 },
  { id: '1y', label: 'Último año', meses: 12 }
]

export default function Progreso() {
  const { user } = useAuthStore()
  const { historial, estadisticas, isLoading, crear, eliminar, isCreating, isDeleting } = useProgreso()
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null)
  const [vistaActual, setVistaActual] = useState('historial') // 'historial' | 'graficas'
  const [filtroTiempo, setFiltroTiempo] = useState('all')

  // Filter records by time
  const registrosFiltrados = useMemo(() => {
    const filtro = FILTROS_TIEMPO.find(f => f.id === filtroTiempo)
    if (!filtro || filtro.meses === null) return historial

    const fechaLimite = new Date()
    fechaLimite.setMonth(fechaLimite.getMonth() - filtro.meses)

    return historial.filter(registro => new Date(registro.fecha) >= fechaLimite)
  }, [historial, filtroTiempo])

  // Get latest progress for pre-filling form
  const ultimoRegistro = historial.length > 0 ? historial[0] : null

  const handleCrearProgreso = (formData) => {
    // Add clienteId to formData
    formData.append('clienteId', user.cliente.id)
    
    crear(formData, {
      onSuccess: () => {
        setMostrarFormulario(false)
      }
    })
  }

  const handleEliminar = (id) => {
    eliminar(id)
  }

  const handleVerDetalle = (registro) => {
    setRegistroSeleccionado(registro)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-text-secondary-light dark:text-text-secondary">Cargando progreso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary">
            Mi Progreso
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary mt-1">
            Registra y visualiza tu evolución física
          </p>
        </div>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <Plus size={20} />
          <span>Nuevo Registro</span>
        </button>
      </div>

      {/* Stats Cards */}
      {estadisticas.totalRegistros > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                  Total de Registros
                </p>
                <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
                  {estadisticas.totalRegistros}
                </p>
              </div>
            </div>
          </div>

          {estadisticas.pesoActual && (
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                    Peso Actual
                  </p>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
                    {estadisticas.pesoActual} kg
                  </p>
                </div>
              </div>
              {estadisticas.diferenciaPeso !== null && (
                <p className={`text-sm mt-2 ${
                  estadisticas.diferenciaPeso < 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {estadisticas.diferenciaPeso > 0 ? '+' : ''}
                  {estadisticas.diferenciaPeso.toFixed(1)} kg desde el inicio
                </p>
              )}
            </div>
          )}

          {estadisticas.grasaActual && (
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                    % Grasa Actual
                  </p>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
                    {estadisticas.grasaActual}%
                  </p>
                </div>
              </div>
              {estadisticas.diferenciaGrasa !== null && (
                <p className={`text-sm mt-2 ${
                  estadisticas.diferenciaGrasa < 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {estadisticas.diferenciaGrasa > 0 ? '+' : ''}
                  {estadisticas.diferenciaGrasa.toFixed(1)}% desde el inicio
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* View Toggle */}
      {historial.length > 0 && (
        <div className="space-y-4">
          {/* Time Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary">
              <Filter size={18} />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            {FILTROS_TIEMPO.map(filtro => (
              <button
                key={filtro.id}
                onClick={() => setFiltroTiempo(filtro.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filtroTiempo === filtro.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-light-surface dark:bg-dark-surface text-text-secondary-light dark:text-text-secondary hover:bg-light-border dark:hover:bg-dark-border'
                }`}
              >
                {filtro.label}
              </button>
            ))}
            {filtroTiempo !== 'all' && (
              <span className="text-sm text-text-secondary-light dark:text-text-secondary ml-2">
                ({registrosFiltrados.length} {registrosFiltrados.length === 1 ? 'registro' : 'registros'})
              </span>
            )}
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 border-b border-light-border dark:border-dark-border">
            <button
              onClick={() => setVistaActual('historial')}
              className={`px-6 py-3 font-medium transition border-b-2 ${
                vistaActual === 'historial'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary'
              }`}
            >
              Historial
            </button>
            <button
              onClick={() => setVistaActual('graficas')}
              className={`px-6 py-3 font-medium transition border-b-2 ${
                vistaActual === 'graficas'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary'
              }`}
            >
              Gráficas
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {vistaActual === 'historial' ? (
        <ListaProgreso
          registros={registrosFiltrados}
          onVerDetalle={handleVerDetalle}
          onEliminar={handleEliminar}
        />
      ) : (
        <GraficasProgreso registros={registrosFiltrados} estadisticas={estadisticas} />
      )}

      {/* Modals */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-light-border dark:border-dark-border">
            <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border p-6">
              <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
                Nuevo Registro de Progreso
              </h2>
              {ultimoRegistro && (
                <p className="text-sm text-text-secondary-light dark:text-text-secondary mt-1">
                  💡 Los campos se han pre-llenado con tu último registro para facilitar la actualización
                </p>
              )}
            </div>
            <div className="p-6">
              <FormProgreso
                onSubmit={handleCrearProgreso}
                onCancel={() => setMostrarFormulario(false)}
                isLoading={isCreating}
                initialData={ultimoRegistro ? {
                  peso: ultimoRegistro.peso?.toString() || '',
                  porcentajeGrasa: ultimoRegistro.porcentajeGrasa?.toString() || '',
                  medidaPecho: ultimoRegistro.medidaPecho?.toString() || '',
                  medidaCintura: ultimoRegistro.medidaCintura?.toString() || '',
                  medidaCadera: ultimoRegistro.medidaCadera?.toString() || '',
                  medidaBrazo: ultimoRegistro.medidaBrazo?.toString() || '',
                  medidaPierna: ultimoRegistro.medidaPierna?.toString() || ''
                } : undefined}
              />
            </div>
          </div>
        </div>
      )}

      {registroSeleccionado && (
        <DetalleProgreso
          registro={registroSeleccionado}
          onClose={() => setRegistroSeleccionado(null)}
        />
      )}
    </div>
  )
}
