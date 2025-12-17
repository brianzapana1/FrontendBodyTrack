import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useProfile } from '../../hooks/useProfile'
import { ROLES } from '../../utils/constants'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { updateProfileAsync, isUpdating } = useProfile()

  const isCliente = user?.rol === ROLES.CLIENTE
  const isEntrenador = user?.rol === ROLES.ENTRENADOR

  // Form state
  const [formData, setFormData] = useState({
    // Common fields
    nombres: user?.nombres || '',
    apellidos: user?.apellidos || '',
    telefono: user?.telefono || '',
    
    // Cliente specific
    peso: user?.cliente?.peso || '',
    altura: user?.cliente?.altura || '',
    
    // Entrenador specific
    especialidad: user?.entrenador?.especialidad || '',
    certificaciones: user?.entrenador?.certificaciones || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Prepare data based on role
      let dataToSend = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        telefono: formData.telefono,
      }

      if (isCliente) {
        dataToSend = {
          ...dataToSend,
          peso: formData.peso ? parseFloat(formData.peso) : null,
          altura: formData.altura ? parseFloat(formData.altura) : null,
        }
      }

      if (isEntrenador) {
        dataToSend = {
          ...dataToSend,
          especialidad: formData.especialidad,
          certificaciones: formData.certificaciones,
        }
      }

      await updateProfileAsync(dataToSend)
      navigate('/perfil')
    } catch (error) {
      // Error is handled by the hook with toast
      console.error('Error updating profile:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-heading-2 font-bold">Editar Perfil</h1>
        <p className="text-text-secondary mt-1">
          Actualiza tu información personal
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombres" className="block text-sm font-medium mb-2">
                Nombres <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
                className="input"
                placeholder="Juan Carlos"
              />
            </div>

            <div>
              <label htmlFor="apellidos" className="block text-sm font-medium mb-2">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                className="input"
                placeholder="García López"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="input"
                placeholder="+57 300 123 4567"
              />
            </div>
          </div>
        </div>

        {/* Cliente Specific Fields */}
        {isCliente && (
          <>
            <div className="border-t border-dark-surface"></div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Información Física</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="peso" className="block text-sm font-medium mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    id="peso"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="input"
                    placeholder="75.5"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Tu peso actual en kilogramos
                  </p>
                </div>

                <div>
                  <label htmlFor="altura" className="block text-sm font-medium mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    id="altura"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="input"
                    placeholder="175"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Tu altura en centímetros
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Entrenador Specific Fields */}
        {isEntrenador && (
          <>
            <div className="border-t border-dark-surface"></div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Información Profesional</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="especialidad" className="block text-sm font-medium mb-2">
                    Especialidad
                  </label>
                  <input
                    type="text"
                    id="especialidad"
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    className="input"
                    placeholder="Ej: Fuerza y Musculación"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Tu área de especialización principal
                  </p>
                </div>

                <div>
                  <label htmlFor="certificaciones" className="block text-sm font-medium mb-2">
                    Certificaciones
                  </label>
                  <textarea
                    id="certificaciones"
                    name="certificaciones"
                    value={formData.certificaciones}
                    onChange={handleChange}
                    rows={3}
                    className="input"
                    placeholder="Lista tus certificaciones y títulos profesionales"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Describe tus certificaciones y formación académica
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Form Actions */}
        <div className="border-t border-dark-surface pt-6">
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/perfil')}
              className="btn-secondary"
              disabled={isUpdating}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Guardando...
                </span>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Info Card */}
      <div className="card bg-primary/10 border border-primary/20">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-primary mb-1">Consejo</h4>
            <p className="text-sm text-text-secondary">
              Mantén tu información actualizada para obtener mejores recomendaciones
              y seguimiento de tu progreso.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
