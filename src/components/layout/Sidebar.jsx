import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'
import { ROLES } from '../../utils/constants'
import { useState, useRef, useEffect } from 'react'

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const location = useLocation()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        { path: '/progreso', label: 'Mi Progreso', icon: '📈' },
        { path: '/ejercicios', label: 'Ejercicios', icon: '🏋️' },
        { path: '/mi-rutina', label: 'Mi Rutina', icon: '💪' },
        { path: '/foro', label: 'Foro', icon: '💬' },
        { path: '/mi-suscripcion', label: 'Suscripción', icon: '💳' }
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
    <aside className="hidden lg:flex lg:flex-col w-64 bg-light-card dark:bg-dark-card border-r border-light-border dark:border-dark-border h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-light-border dark:border-dark-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="text-3xl">💪</span>
          <div>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent block">
              BodyTrack
            </span>
            <span className="text-xs text-text-muted-light dark:text-text-muted">
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
                : 'text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface border-l-transparent'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Menu Section */}
      <div className="border-t border-light-border dark:border-dark-border">
        <div className="p-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-sm font-bold flex-shrink-0">
              {user?.nombres?.[0]}{user?.apellidos?.[0]}
            </div>
            {/* User Info */}
            <div className="flex-1 text-left overflow-hidden">
              <div className="text-sm font-medium text-text-primary-light dark:text-text-primary truncate">
                {user?.nombres} {user?.apellidos}
              </div>
              <div className="text-xs text-text-muted-light dark:text-text-muted uppercase">
                {user?.rol}
              </div>
            </div>
            {/* Dropdown Arrow */}
            <svg
              className={`w-4 h-4 text-text-secondary-light dark:text-text-secondary transition-transform flex-shrink-0 ${
                isUserMenuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/perfil"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
              >
                <span className="text-lg">👤</span>
                <span>Ver Perfil</span>
              </Link>
              <Link
                to="/perfil/editar"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
              >
                <span className="text-lg">✏️</span>
                <span>Editar Perfil</span>
              </Link>
              <Link
                to="/perfil/cambiar-password"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
              >
                <span className="text-lg">🔒</span>
                <span>Cambiar Contraseña</span>
              </Link>
              <div className="border-t border-light-border dark:border-dark-border my-2"></div>
              <button
                onClick={() => {
                  toggleTheme()
                  setIsUserMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors w-full text-left"
              >
                <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
                <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
              </button>
              <div className="border-t border-light-border dark:border-dark-border my-2"></div>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false)
                  logout()
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-status-error-light dark:text-status-error hover:bg-light-surface dark:hover:bg-dark-surface transition-colors w-full text-left"
              >
                <span className="text-lg">🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Premium Upgrade (only for FREE users) */}
      {user?.rol === ROLES.CLIENTE && user?.cliente?.plan !== 'PREMIUM' && (
        <div className="p-6 border-t border-light-border dark:border-dark-border">
          <div className="card p-4 bg-gradient-to-br from-primary/20 to-primary-light/20 border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏆</span>
              <span className="font-semibold text-sm">Actualiza a Premium</span>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary mb-3">
              Desbloquea todas las funciones premium
            </p>
            <Link to="/planes" className="btn-gold w-full text-sm py-2 block text-center">
              Ver Planes
            </Link>
          </div>
        </div>
      )}
    </aside>
  )
}
