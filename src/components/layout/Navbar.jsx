import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { ROLES } from '../../utils/constants'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const getNavLinks = () => {
    if (!user) return []

    const baseLinks = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' }
    ]

    if (user.rol === ROLES.CLIENTE) {
      return [
        ...baseLinks,
        { path: '/mi-rutina', label: 'Mi Rutina', icon: '💪' },
        { path: '/mi-progreso', label: 'Progreso', icon: '📈' },
        { path: '/foro', label: 'Foro', icon: '💬' }
      ]
    }

    if (user.rol === ROLES.ENTRENADOR) {
      return [
        ...baseLinks,
        { path: '/clientes', label: 'Clientes', icon: '👥' },
        { path: '/rutinas', label: 'Rutinas', icon: '📋' },
        { path: '/ejercicios', label: 'Ejercicios', icon: '🏋️' },
        { path: '/foro', label: 'Foro', icon: '💬' }
      ]
    }

    if (user.rol === ROLES.ADMIN) {
      return [
        ...baseLinks,
        { path: '/usuarios', label: 'Usuarios', icon: '👥' },
        { path: '/rutinas', label: 'Rutinas', icon: '📋' },
        { path: '/ejercicios', label: 'Ejercicios', icon: '🏋️' },
        { path: '/suscripciones', label: 'Suscripciones', icon: '💳' }
      ]
    }

    return baseLinks
  }

  const navLinks = getNavLinks()

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              BodyTrack
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-surface'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-text-primary">
                {user?.cliente?.nombres || user?.entrenador?.nombres || user?.email}
              </span>
              <span className="text-xs text-text-muted uppercase">{user?.rol}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-status-error transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-dark-border">
        <div className="flex justify-around py-2">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-text-secondary'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-xs">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
