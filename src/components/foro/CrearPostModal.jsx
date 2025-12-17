import { useState } from 'react'
import { useCreatePost } from '../../hooks/useForo'

export default function CrearPostModal({ isOpen, onClose }) {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const createPostMutation = useCreatePost()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!titulo.trim() || !contenido.trim()) {
      return
    }

    createPostMutation.mutate(
      { titulo, contenido },
      {
        onSuccess: () => {
          setTitulo('')
          setContenido('')
          onClose()
        },
      }
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Crear Nuevo Post</h2>
            <button
              onClick={onClose}
              className="text-text-muted-light dark:text-text-muted hover:text-text-primary-light dark:hover:text-text-primary text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Título <span className="text-status-error-light">*</span>
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="¿De qué quieres hablar?"
              className="input-field"
              maxLength={200}
              required
            />
            <div className="text-xs text-text-muted-light dark:text-text-muted mt-1 text-right">
              {titulo.length}/200
            </div>
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Contenido <span className="text-status-error-light">*</span>
            </label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Comparte tus pensamientos, preguntas o consejos..."
              className="input-field resize-none"
              rows={8}
              maxLength={2000}
              required
            />
            <div className="text-xs text-text-muted-light dark:text-text-muted mt-1 text-right">
              {contenido.length}/2000
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Consejo:</strong> Sé respetuoso y constructivo. Este es un espacio
              para aprender y apoyarnos mutuamente.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={createPostMutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={createPostMutation.isPending || !titulo.trim() || !contenido.trim()}
            >
              {createPostMutation.isPending ? 'Publicando...' : 'Publicar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
