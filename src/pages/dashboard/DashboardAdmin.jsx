import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { adminAPI } from '../../api/endpoints/admin'

export default function DashboardAdmin() {
  const { user, isAuthenticated } = useAuthStore()

  // Fetch admin statistics - only when authenticated as admin
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin', 'estadisticas'],
    queryFn: adminAPI.getEstadisticas,
    enabled: isAuthenticated && user?.rol === 'ADMIN',
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 1
  })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card card-hover border-2 border-accent-orange">
        <h1 className="text-heading-2 font-bold mb-2">
          Panel de Administración 🛡️
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Gestión completa del sistema BodyTrack
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card bg-status-error/10 border border-status-error">
          <p className="text-status-error">
            Error al cargar estadísticas: {error.message}
          </p>
        </div>
      )}

      {/* Stats Grid - Usuarios */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Usuarios del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-primary mb-1">
              {isLoading ? '...' : stats?.usuarios?.clientes || 0}
            </div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Clientes</div>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">💪</div>
            <div className="text-3xl font-bold text-accent-teal mb-1">
              {isLoading ? '...' : stats?.usuarios?.entrenadores || 0}
            </div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Entrenadores</div>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">🛡️</div>
            <div className="text-3xl font-bold text-accent-orange mb-1">
              {isLoading ? '...' : stats?.usuarios?.administradores || 0}
            </div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Administradores</div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Finanzas */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Estadísticas Financieras</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-accent-gold mb-1">$0</div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Ingresos Mes</div>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-primary mb-1">
              {isLoading ? '...' : stats?.suscripciones?.activas || 0}
            </div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Suscripciones Activas</div>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-3xl font-bold text-accent-teal mb-1">0%</div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Crecimiento</div>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <div className="text-3xl font-bold text-status-error mb-1">0</div>
            <div className="text-sm text-text-secondary-light dark:text-text-secondary">Por Expirar</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Acciones de Administración</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/admin/usuarios" className="btn-primary text-center">
            👥 Gestionar Usuarios
          </Link>
          <Link to="/admin/suscripciones" className="btn-secondary text-center">
            ⭐ Verificar Suscripciones
          </Link>
          <Link to="/admin/estadisticas" className="btn-secondary text-center">
            📊 Ver Estadísticas
          </Link>
        </div>
      </div>

      {/* Sistema */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Estado del Sistema</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-medium">Base de Datos</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">Conexión estable</p>
              </div>
            </div>
            <span className="text-status-success text-sm font-semibold">Activo</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-medium">API Backend</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">Respondiendo correctamente</p>
              </div>
            </div>
            <span className="text-status-success text-sm font-semibold">Activo</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-medium">Almacenamiento</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">85% disponible</p>
              </div>
            </div>
            <span className="text-status-success text-sm font-semibold">Normal</span>
          </div>
        </div>
      </div>

      {/* Acciones Críticas */}
      <div className="card bg-status-error/10 border border-status-error/30">
        <h2 className="text-xl font-semibold mb-4 text-status-error">⚠️ Acciones Críticas</h2>
        <div className="space-y-2">
          <button className="btn-secondary w-full justify-center">
            🔄 Verificar Suscripciones Expiradas
          </button>
          <button className="btn-secondary w-full justify-center">
            📧 Enviar Recordatorios de Pago
          </button>
          <button className="btn-secondary w-full justify-center">
            🗑️ Limpiar Datos Temporales
          </button>
        </div>
      </div>
    </div>
  )
}
