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
        { path: '/mi-rutina', label: 'Rutina', icon: '💪' },
        { path: '/progreso', label: 'Progreso', icon: '📈' },
        { path: '/foro', label: 'Foro', icon: '💬' }
      ]
    }

    if (user.rol === ROLES.ENTRENADOR) {
      return [
        ...baseLinks,
        { path: '/clientes', label: 'Clientes', icon: '👥' },
        { path: '/rutinas', label: 'Rutinas', icon: '📋' },
        { path: '/ejercicios', label: 'Ejercicios', icon: '🏋️' }
      ]
    }

    if (user.rol === ROLES.ADMIN) {
      return [
        ...baseLinks,
        { path: '/usuarios', label: 'Usuarios', icon: '👥' },
        { path: '/rutinas', label: 'Rutinas', icon: '📋' },
        { path: '/suscripciones', label: 'Suscripciones', icon: '💳' }
      ]
    }

    return baseLinks
  }

  const navLinks = getNavLinks()

  return (
    <>
      {/* Desktop Top Bar - Only theme toggle */}
      <nav className="hidden lg:block bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border sticky top-0 z-40">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Page Title - Optional */}
          <div className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
            {/* Dynamic title can go here */}
          </div>

          {/* Theme Toggle - Desktop only */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          >
            <span className="text-2xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="lg:hidden bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border sticky top-0 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              BodyTrack
            </span>
          </Link>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-sm font-bold">
                {user?.nombres?.[0]}{user?.apellidos?.[0]}
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
      </nav>

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary-light dark:text-text-secondary'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="lg:hidden h-20"></div>
    </>
  )
}
