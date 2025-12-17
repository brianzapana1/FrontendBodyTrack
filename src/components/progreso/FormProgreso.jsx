import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useAuthStore } from '../../store/authStore'
import CalculadoraGrasa from './CalculadoraGrasa'

const progresoSchema = z.object({
  peso: z.string().min(1, 'El peso es requerido'),
  porcentajeGrasa: z.string().optional(),
  medidaPecho: z.string().optional(),
  medidaCintura: z.string().optional(),
  medidaCadera: z.string().optional(),
  medidaBrazo: z.string().optional(),
  medidaPierna: z.string().optional(),
  notas: z.string().optional()
})

export default function FormProgreso({ onSubmit, onCancel, initialData, isLoading }) {
  const { theme } = useThemeStore()
  const { user } = useAuthStore()
  const [fotos, setFotos] = useState([])
  // Don't pre-fill photos from previous record, only show if editing existing record
  const [previews, setPreviews] = useState(initialData?.id ? (initialData?.fotos || []) : [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(progresoSchema),
    defaultValues: initialData || {}
  })

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length + fotos.length + previews.length > 5) {
      alert('Máximo 5 fotos permitidas')
      return
    }

    setFotos([...fotos, ...files])
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index) => {
    setFotos(fotos.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  const onSubmitForm = (data) => {
    const formData = new FormData()
    
    // Add text fields
    Object.keys(data).forEach(key => {
      if (data[key]) {
        formData.append(key, data[key])
      }
    })

    // Add photos
    fotos.forEach(foto => {
      formData.append('fotos', foto)
    })

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Medidas Corporales */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
          Medidas Corporales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Peso */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Peso (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              {...register('peso')}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.peso 
                  ? 'border-red-500' 
                  : 'border-light-border dark:border-dark-border'
              } bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="75.5"
              required
            />
            {errors.peso && (
              <p className="text-red-500 text-sm mt-1">{errors.peso.message}</p>
            )}
          </div>

          {/* Porcentaje de Grasa */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary">
                % Grasa Corporal
              </label>
              <CalculadoraGrasa 
                genero={user?.cliente?.genero || user?.genero} 
                altura={user?.cliente?.altura}
                onCalculate={(valor) => setValue('porcentajeGrasa', valor)}
              />
            </div>
            <input
              type="number"
              step="0.1"
              {...register('porcentajeGrasa')}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.porcentajeGrasa 
                  ? 'border-red-500' 
                  : 'border-light-border dark:border-dark-border'
              } bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="18.5"
            />
          </div>

          {/* Pecho */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Pecho (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('medidaPecho')}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="95.0"
            />
          </div>

          {/* Cintura */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Cintura (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('medidaCintura')}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="80.0"
            />
          </div>

          {/* Cadera */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Cadera (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('medidaCadera')}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="98.0"
            />
          </div>

          {/* Brazo */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Brazo (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('medidaBrazo')}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="35.0"
            />
          </div>

          {/* Pierna */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Pierna (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('medidaPierna')}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="55.0"
            />
          </div>
        </div>
      </div>

      {/* Fotos de Progreso */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
          Fotos de Progreso
        </h3>
        
        {/* Upload Button */}
        <div className="mb-4">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Upload size={20} />
            <span>Subir Fotos (máx. 5)</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={previews.length >= 5}
            />
          </label>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary mt-2">
            {previews.length} de 5 fotos
          </p>
        </div>

        {/* Photo Previews */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-light-border dark:border-dark-border"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length === 0 && (
          <div className="border-2 border-dashed border-light-border dark:border-dark-border rounded-lg p-8 text-center">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-text-secondary-light dark:text-text-secondary">
              No has subido fotos aún
            </p>
          </div>
        )}
      </div>

      {/* Notas */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
          Notas (opcional)
        </label>
        <textarea
          {...register('notas')}
          rows={4}
          className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Agrega cualquier observación sobre tu progreso, cómo te sientes, cambios en tu rutina..."
        />
      </div>

      {/* Required fields note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>* Campos requeridos</strong> - El peso es obligatorio. Todas las demás medidas, fotos y notas son opcionales.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-light-border dark:border-dark-border rounded-lg text-text-secondary-light dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface transition"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Guardar Registro'}
        </button>
      </div>
    </form>
  )
}
