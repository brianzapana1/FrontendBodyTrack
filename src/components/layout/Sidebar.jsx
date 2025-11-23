import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { ROLES } from '../../utils/constants'

export default function Sidebar() {
  const { user } = useAuthStore()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const getMenuItems = () => {
    if (!user) return []

    const baseItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/perfil', label: 'Mi Perfil', icon: '👤' }
    ]

    if (user.rol === ROLES.CLIENTE) {
      return [
        ...baseItems,
        { path: '/mi-rutina', label: 'Mi Rutina', icon: '💪' },
        { path: '/mi-progreso', label: 'Mi Progreso', icon: '📈' },
        { path: '/foro', label: 'Foro', icon: '💬' },
        { path: '/suscripcion', label: 'Suscripción', icon: '💳' }
      ]
    }

    if (user.rol === ROLES.ENTRENADOR) {
      return [
        ...baseItems,
        { path: '/clientes', label: 'Mis Clientes', icon: '👥' },
        { path: '/rutinas', label: 'Rutinas', icon: '📋' },
        { path: '/ejercicios', label: 'Ejercicios', icon: '🏋️' },
        { path: '/foro', label: 'Foro', icon: '💬' },
        { path: '/estadisticas', label: 'Estadísticas', icon: '📊' }
      ]
    }

    if (user.rol === ROLES.ADMIN) {
      return [
        ...baseItems,
        { path: '/usuarios', label: 'Usuarios', icon: '👥' },
        { path: '/entrenadores', label: 'Entrenadores', icon: '🏃' },
        { path: '/rutinas', label: 'Rutinas', icon: '📋' },
        { path: '/ejercicios', label: 'Ejercicios', icon: '🏋️' },
        { path: '/suscripciones', label: 'Suscripciones', icon: '💳' },
        { path: '/estadisticas', label: 'Estadísticas', icon: '📊' }
      ]
    }

    return baseItems
  }

  const menuItems = getMenuItems()

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-dark-card border-r border-dark-border h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="text-3xl">💪</span>
          <div>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent block">
              BodyTrack
            </span>
            <span className="text-xs text-text-muted">
              {user?.rol === ROLES.CLIENTE && 'Cliente'}
              {user?.rol === ROLES.ENTRENADOR && 'Entrenador'}
              {user?.rol === ROLES.ADMIN && 'Administrador'}
            </span>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-3 ${
              isActive(item.path)
                ? 'bg-primary/10 text-primary border-l-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-dark-surface border-l-transparent'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-dark-border">
        <div className="card p-4 bg-gradient-to-br from-primary/20 to-primary-light/20 border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold text-sm">Actualiza a PRO</span>
          </div>
          <p className="text-xs text-text-secondary mb-3">
            Desbloquea todas las funciones premium
          </p>
          <button className="btn-gold w-full text-sm py-2">
            Ver Planes
          </button>
        </div>
      </div>
    </aside>
  )
}
