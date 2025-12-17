import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useProfile } from '../../hooks/useProfile'
import { ROLES } from '../../utils/constants'

export default function ViewProfile() {
  const { user } = useAuthStore()
  const { profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Use profile data if available, otherwise fallback to user from store
  const userData = profile || user

  const isCliente = userData?.rol === ROLES.CLIENTE
  const isEntrenador = userData?.rol === ROLES.ENTRENADOR
  const isAdmin = userData?.rol === ROLES.ADMIN

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading-2 font-bold">Mi Perfil</h1>
          <p className="text-text-secondary-light dark:text-text-secondary mt-1">
            Información de tu cuenta
          </p>
        </div>
        <Link to="/perfil/editar" className="btn-primary">
          Editar Perfil
        </Link>
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="flex items-start gap-6 mb-6">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-4xl font-bold text-white">
            {userData?.nombres?.[0]}{userData?.apellidos?.[0]}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {userData?.nombres} {userData?.apellidos}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary">{userData?.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                {userData?.rol === ROLES.CLIENTE && '👤 Cliente'}
                {userData?.rol === ROLES.ENTRENADOR && '💪 Entrenador'}
                {userData?.rol === ROLES.ADMIN && '🔐 Administrador'}
              </span>
              {userData?.suscripcionActiva && (
                <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-medium">
                  ⭐ Premium
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-light-border dark:border-dark-surface my-6"></div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary mb-3">
              INFORMACIÓN PERSONAL
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-text-secondary-light dark:text-text-secondary">Nombres</label>
                <p className="font-medium">{userData?.nombres || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary-light dark:text-text-secondary">Apellidos</label>
                <p className="font-medium">{userData?.apellidos || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary-light dark:text-text-secondary">Email</label>
                <p className="font-medium">{userData?.email || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary-light dark:text-text-secondary">Teléfono</label>
                <p className="font-medium">{userData?.telefono || 'No registrado'}</p>
              </div>
            </div>
          </div>

          {/* Role-specific information */}
          {isCliente && userData?.cliente && (
            <div>
              <h3 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary mb-3">
                INFORMACIÓN DE CLIENTE
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Peso</label>
                  <p className="font-medium">{userData.cliente.peso ? `${userData.cliente.peso} kg` : '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Altura</label>
                  <p className="font-medium">{userData.cliente.altura ? `${userData.cliente.altura} cm` : '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Plan</label>
                  <p className="font-medium capitalize">{userData.cliente.plan || 'Gratis'}</p>
                </div>
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Entrenador</label>
                  <p className="font-medium">
                    {userData.cliente.entrenadorId ? 'Asignado' : 'Sin asignar'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isEntrenador && userData?.entrenador && (
            <div>
              <h3 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary mb-3">
                INFORMACIÓN PROFESIONAL
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Especialidad</label>
                  <p className="font-medium">{userData.entrenador.especialidad || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Certificaciones</label>
                  <p className="font-medium">{userData.entrenador.certificaciones || 'Ninguna'}</p>
                </div>
                <div>
                  <label className="text-sm text-text-secondary-light dark:text-text-secondary">Calificación</label>
                  <p className="font-medium">
                    {userData.entrenador.calificacion ? `⭐ ${userData.entrenador.calificacion}/5` : 'Sin calificaciones'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isAdmin && (
            <div>
              <h3 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary mb-3">
                PERMISOS DE ADMINISTRADOR
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-accent-teal">✓</span>
                  Gestión de usuarios
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-teal">✓</span>
                  Verificación de suscripciones
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-teal">✓</span>
                  Estadísticas del sistema
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-teal">✓</span>
                  Configuración global
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions Card */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Acciones de Cuenta</h3>
        <div className="space-y-3">
          <Link
            to="/perfil/editar"
            className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-border dark:hover:bg-dark-surface/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✏️</span>
              <div>
                <p className="font-medium">Editar Perfil</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                  Actualiza tu información personal
                </p>
              </div>
            </div>
            <span className="text-text-secondary-light dark:text-text-secondary">→</span>
          </Link>

          <Link
            to="/perfil/cambiar-password"
            className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-border dark:hover:bg-dark-surface/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-medium">Cambiar Contraseña</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                  Actualiza tu contraseña de acceso
                </p>
              </div>
            </div>
            <span className="text-text-secondary-light dark:text-text-secondary">→</span>
          </Link>

          {isCliente && (
            <Link
              to="/suscripcion"
              className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-border dark:hover:bg-dark-surface/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💎</span>
                <div>
                  <p className="font-medium">Gestionar Suscripción</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                    {userData?.suscripcionActiva ? 'Ver detalles de tu plan' : 'Mejora a Premium'}
                  </p>
                </div>
              </div>
              <span className="text-text-secondary-light dark:text-text-secondary">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
