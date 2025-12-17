import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'
import { ROLES } from '../../utils/constants'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const location = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const isActive = (path) => location.pathname === path

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        { path: '/mi-suscripcion', label: 'Suscripción', icon: '👑' },
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
    <nav className="bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border sticky top-0 z-50">
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
                    : 'text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-sm font-bold">
                {user?.nombres?.[0]}{user?.apellidos?.[0]}
              </div>
              {/* User Info */}
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-text-primary-light dark:text-text-primary">
                  {user?.nombres} {user?.apellidos}
                </span>
                <span className="text-xs text-text-muted-light dark:text-text-muted uppercase">{user?.rol}</span>
              </div>
              {/* Dropdown Arrow */}
              <svg
                className={`w-4 h-4 text-text-secondary-light dark:text-text-secondary transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/perfil"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                >
                  <span className="text-lg">👤</span>
                  <span>Ver Perfil</span>
                </Link>
                <Link
                  to="/perfil/editar"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                >
                  <span className="text-lg">✏️</span>
                  <span>Editar Perfil</span>
                </Link>
                <Link
                  to="/perfil/cambiar-password"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                >
                  <span className="text-lg">🔒</span>
                  <span>Cambiar Contraseña</span>
                </Link>
                <div className="border-t border-light-border dark:border-dark-border my-2"></div>
                <button
                  onClick={() => {
                    toggleTheme()
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors w-full text-left"
                >
                  <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
                  <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
                <div className="border-t border-light-border dark:border-dark-border my-2"></div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
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
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-light-border dark:border-dark-border">
        <div className="flex justify-around py-2">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-text-secondary-light dark:text-text-secondary'
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
