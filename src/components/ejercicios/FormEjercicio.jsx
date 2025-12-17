import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Save } from 'lucide-react'
import { useGruposMusculares, useCrearEjercicio, useActualizarEjercicio } from '../../hooks/useEjercicios'

// Schema de validación con Zod
const ejercicioSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  grupoMuscular: z.string().min(1, 'El grupo muscular es requerido'),
  descripcion: z.string().optional(),
  equipamiento: z.string().optional(),
  videoUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  imagenUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal(''))
})

/**
 * Formulario para crear o editar ejercicios
 */
export default function FormEjercicio({ ejercicio, onCerrar, onGuardado }) {
  const esEdicion = !!ejercicio
  const { data: gruposMusculares = [] } = useGruposMusculares()
  const crearMutation = useCrearEjercicio()
  const actualizarMutation = useActualizarEjercicio()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(ejercicioSchema),
    defaultValues: ejercicio || {
      nombre: '',
      grupoMuscular: '',
      descripcion: '',
      equipamiento: '',
      videoUrl: '',
      imagenUrl: ''
    }
  })

  // Resetear formulario cuando cambia el ejercicio
  useEffect(() => {
    if (ejercicio) {
      reset(ejercicio)
    }
  }, [ejercicio, reset])

  const onSubmit = async (data) => {
    try {
      if (esEdicion) {
        await actualizarMutation.mutateAsync({ id: ejercicio.id, data })
      } else {
        await crearMutation.mutateAsync(data)
      }
      onGuardado?.()
      onCerrar()
    } catch (error) {
      // El error ya se maneja en el hook con toast
      console.error('Error al guardar ejercicio:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {esEdicion ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
          </h2>
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Nombre (requerido) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Ejercicio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('nombre')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Press de banca"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>

          {/* Grupo Muscular (requerido) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grupo Muscular <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('grupoMuscular')}
              list="grupos-musculares"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Pecho, Espalda, Piernas..."
            />
            <datalist id="grupos-musculares">
              {gruposMusculares.map((grupo) => (
                <option key={grupo} value={grupo} />
              ))}
            </datalist>
            {errors.grupoMuscular && (
              <p className="mt-1 text-sm text-red-600">{errors.grupoMuscular.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Puedes seleccionar un grupo existente o escribir uno nuevo
            </p>
          </div>

          {/* Equipamiento (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipamiento <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="text"
              {...register('equipamiento')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Mancuernas, Barra, Máquina, Peso corporal..."
            />
            {errors.equipamiento && (
              <p className="mt-1 text-sm text-red-600">{errors.equipamiento.message}</p>
            )}
          </div>

          {/* Descripción (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <textarea
              {...register('descripcion')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Instrucciones, técnica, consejos..."
            />
            {errors.descripcion && (
              <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
            )}
          </div>

          {/* URL de Imagen (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="url"
              {...register('imagenUrl')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imagenUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.imagenUrl.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              URL completa de la imagen del ejercicio
            </p>
          </div>

          {/* URL de Video (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Video <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="url"
              {...register('videoUrl')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://www.youtube.com/embed/..."
            />
            {errors.videoUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              URL de YouTube embed, Vimeo, etc. (debe ser una URL de iframe)
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCerrar}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{esEdicion ? 'Actualizar' : 'Crear'} Ejercicio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
