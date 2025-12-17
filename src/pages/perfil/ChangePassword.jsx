import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'

export default function ChangePassword() {
  const navigate = useNavigate()
  const { changePasswordAsync, isChangingPassword } = useProfile()

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es requerida'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es requerida'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu nueva contraseña'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña debe ser diferente a la actual'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await changePasswordAsync({
        passwordActual: formData.currentPassword,
        passwordNuevo: formData.newPassword
      })
      
      // Clear form and navigate on success
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      setTimeout(() => {
        navigate('/perfil')
      }, 1500)
    } catch (error) {
      // Error is handled by the hook with toast
      console.error('Error changing password:', error)
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-heading-2 font-bold">Cambiar Contraseña</h1>
        <p className="text-text-secondary-light dark:text-text-secondary mt-1">
          Actualiza tu contraseña de acceso
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
            Contraseña Actual <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`input pr-10 ${errors.currentPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Ingresa tu contraseña actual"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-white"
            >
              {showPasswords.current ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>

        <div className="border-t border-light-border dark:border-dark-surface"></div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
            Nueva Contraseña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`input pr-10 ${errors.newPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Ingresa tu nueva contraseña"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-white"
            >
              {showPasswords.new ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
          <p className="text-xs text-text-secondary-light dark:text-text-secondary mt-1">
            Mínimo 6 caracteres. Usa una combinación de letras y números.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirmar Nueva Contraseña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Confirma tu nueva contraseña"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary hover:text-text-primary-light dark:hover:text-white"
            >
              {showPasswords.confirm ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="border-t border-light-border dark:border-dark-surface pt-6">
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/perfil')}
              className="btn-secondary"
              disabled={isChangingPassword}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Cambiando...
                </span>
              ) : (
                'Cambiar Contraseña'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Security Tips Card */}
      <div className="card bg-accent-gold/10 border border-accent-gold/20">
        <div className="flex gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <h4 className="font-semibold text-accent-gold mb-2">Consejos de Seguridad</h4>
            <ul className="text-sm text-text-secondary-light dark:text-text-secondary space-y-1">
              <li>• Usa al menos 8 caracteres con letras y números</li>
              <li>• No uses información personal obvia</li>
              <li>• Cambia tu contraseña periódicamente</li>
              <li>• No compartas tu contraseña con nadie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
