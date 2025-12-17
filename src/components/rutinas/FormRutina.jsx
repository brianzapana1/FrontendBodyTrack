import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Save } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCrearRutina, useActualizarRutina } from '../../hooks/useRutinas'

const rutinaSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  descripcion: z.string().optional(),
  objetivo: z.string().optional(),
  duracionSemanas: z.number().min(1).max(52).optional().or(z.literal(''))
})

export default function FormRutina({ rutina, onCerrar, onGuardado }) {
  const { user } = useAuthStore()
  const esEdicion = !!rutina
  const crearMutation = useCrearRutina()
  const actualizarMutation = useActualizarRutina()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(rutinaSchema),
    defaultValues: rutina || {
      nombre: '',
      descripcion: '',
      objetivo: '',
      duracionSemanas: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      const rutinaData = {
        ...data,
        entrenadorId: user?.entrenador?.id,
        duracionSemanas: data.duracionSemanas ? parseInt(data.duracionSemanas) : null
      }

      if (esEdicion) {
        await actualizarMutation.mutateAsync({ id: rutina.id, data: rutinaData })
      } else {
        await crearMutation.mutateAsync(rutinaData)
      }
      onGuardado?.()
      onCerrar()
    } catch (error) {
      console.error('Error al guardar rutina:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">
            {esEdicion ? 'Editar Rutina' : 'Nueva Rutina'}
          </h2>
          <button onClick={onCerrar} className="text-white hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('nombre')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Rutina Fullbody 3 días"
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="text"
              {...register('objetivo')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Hipertrofia, Pérdida de peso, Fuerza..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración (semanas) <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="number"
              {...register('duracionSemanas', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 12"
              min="1"
              max="52"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <textarea
              {...register('descripcion')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe la rutina, a quién está dirigida..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCerrar}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{esEdicion ? 'Actualizar' : 'Crear'} Rutina</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
