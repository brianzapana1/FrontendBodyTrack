import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function RegisterCliente() {
  const navigate = useNavigate()
  const { registroCliente, isLoading, error } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    dni: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    genero: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      const { confirmPassword, ...userData } = formData
      await registroCliente(userData)
      navigate('/dashboard')
    } catch (err) {
      // Error is already handled by the store and displayed
      console.error('Error al registrarse:', err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">💪</span>
            <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              BodyTrack
            </h1>
          </div>
          <p className="text-text-secondary">Registro de Cliente</p>
        </div>

        {/* Registration Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-status-error/10 border border-status-error text-status-error rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Información de Cuenta */}
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-lg font-semibold mb-4">Información de Cuenta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="email" className="label">
                    Email *
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
                    Contraseña *
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
                    minLength={6}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Información Personal */}
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dni" className="label">
                    DNI/CI *
                  </label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    className="input"
                    placeholder="12345678"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="input"
                    placeholder="70123456"
                  />
                </div>

                <div>
                  <label htmlFor="nombres" className="label">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    className="input"
                    placeholder="Juan"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="apellidos" className="label">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className="input"
                    placeholder="Pérez"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="fechaNacimiento" className="label">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="genero" className="label">
                    Género
                  </label>
                  <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dark-border text-center">
            <p className="text-sm text-text-secondary">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-primary hover:text-primary-light font-medium">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
