import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Clear any previous errors when component mounts
  useEffect(() => {
    clearError()
    
    // Clear errors when unmounting
    return () => clearError()
  }, [clearError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData.email, formData.password)
    
    // Only navigate if login was successful (returned data)
    if (result) {
      navigate('/dashboard')
    }
    // If result is null, error is already set in store and will be displayed
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">💪</span>
            <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              BodyTrack
            </h1>
          </div>
          <p className="text-text-secondary">Inicia sesión en tu cuenta</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-status-error/10 border border-status-error text-status-error rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dark-border space-y-3">
            <p className="text-center text-sm text-text-secondary">
              ¿No tienes una cuenta?
            </p>
            <div className="flex gap-3">
              <Link to="/registro/cliente" className="btn-secondary flex-1 text-center">
                Registrarme como Cliente
              </Link>
              <Link to="/registro/entrenador" className="btn-secondary flex-1 text-center">
                Soy Entrenador
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
