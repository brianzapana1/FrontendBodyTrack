import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useForoPost, useCreateComment, useDeleteComment, useUpdateComment } from '../../hooks/useForo'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export default function DetallePostModal({ post: initialPost, isOpen, onClose, onEdit, onDelete }) {
  const { user } = useAuthStore()
  const { data: post } = useForoPost(initialPost?.id)
  const createCommentMutation = useCreateComment()
  const deleteCommentMutation = useDeleteComment()
  const updateCommentMutation = useUpdateComment()

  const [nuevoComentario, setNuevoComentario] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')

  const postData = post || initialPost

  const getUserName = (usuario) => {
    if (usuario.cliente) {
      return `${usuario.cliente.nombres} ${usuario.cliente.apellidos}`
    }
    if (usuario.entrenador) {
      return `${usuario.entrenador.nombres} ${usuario.entrenador.apellidos}`
    }
    return usuario.email
  }

  const canEditPost = () => {
    return user.id === postData.usuarioId || user.rol === 'ADMIN'
  }

  const canEditComment = (comment) => {
    return user.id === comment.usuarioId || user.rol === 'ADMIN'
  }

  const handleCreateComment = async (e) => {
    e.preventDefault()
    if (!nuevoComentario.trim()) return

    createCommentMutation.mutate(
      { postId: postData.id, contenido: nuevoComentario },
      {
        onSuccess: () => {
          setNuevoComentario('')
        },
      }
    )
  }

  const handleUpdateComment = (commentId) => {
    if (!editingCommentText.trim()) return

    updateCommentMutation.mutate(
      { id: commentId, contenido: editingCommentText },
      {
        onSuccess: () => {
          setEditingCommentId(null)
          setEditingCommentText('')
        },
      }
    )
  }

  const handleDeleteComment = (commentId) => {
    if (window.confirm('¿Eliminar este comentario?')) {
      deleteCommentMutation.mutate(commentId)
    }
  }

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id)
    setEditingCommentText(comment.contenido)
  }

  if (!isOpen || !postData) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Detalle del Post</h2>
            <button
              onClick={onClose}
              className="text-text-muted-light dark:text-text-muted hover:text-text-primary-light dark:hover:text-text-primary text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Post Content */}
          <div>
            {/* Author Info */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white font-bold text-lg">
                  {getUserName(postData.usuario)[0]}
                </div>
                <div>
                  <div className="font-semibold text-text-primary-light dark:text-text-primary">
                    {getUserName(postData.usuario)}
                  </div>
                  <div className="text-sm text-text-muted-light dark:text-text-muted flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                      {postData.usuario.rol}
                    </span>
                    •
                    <span>
                      {formatDistanceToNow(new Date(postData.createdAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {canEditPost() && (
                <div className="flex gap-2">
                  <button onClick={onEdit} className="text-primary hover:text-primary/80 text-sm px-3 py-1 rounded hover:bg-primary/10">
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => onDelete(postData.id)}
                    className="text-status-error-light dark:text-status-error hover:bg-red-50 dark:hover:bg-red-900/20 text-sm px-3 py-1 rounded"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              )}
            </div>

            {/* Post Title & Content */}
            <h3 className="text-2xl font-bold mb-3 text-text-primary-light dark:text-text-primary">
              {postData.titulo}
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary whitespace-pre-wrap">
              {postData.contenido}
            </p>
          </div>

          {/* Comments Section */}
          <div className="border-t border-light-border dark:border-dark-border pt-6">
            <h4 className="text-lg font-semibold mb-4">
              Comentarios ({postData.comentarios?.length || 0})
            </h4>

            {/* Comment Form */}
            <form onSubmit={handleCreateComment} className="mb-6">
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe un comentario..."
                className="input-field resize-none"
                rows={3}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-text-muted-light dark:text-text-muted">
                  {nuevoComentario.length}/500
                </span>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!nuevoComentario.trim() || createCommentMutation.isPending}
                >
                  {createCommentMutation.isPending ? 'Enviando...' : 'Comentar'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {postData.comentarios && postData.comentarios.length > 0 ? (
                postData.comentarios.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-light-surface dark:bg-dark-surface rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-teal to-accent-purple flex items-center justify-center text-white font-bold text-sm">
                          {getUserName(comment.usuario)[0]}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {getUserName(comment.usuario)}
                          </div>
                          <div className="text-xs text-text-muted-light dark:text-text-muted">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                              locale: es,
                            })}
                          </div>
                        </div>
                      </div>

                      {canEditComment(comment) && editingCommentId !== comment.id && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditComment(comment)}
                            className="text-xs text-primary hover:text-primary/80"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-status-error-light dark:text-status-error"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                          className="input-field resize-none text-sm"
                          rows={3}
                          maxLength={500}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              setEditingCommentId(null)
                              setEditingCommentText('')
                            }}
                            className="btn-secondary text-sm py-1"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleUpdateComment(comment.id)}
                            className="btn-primary text-sm py-1"
                            disabled={!editingCommentText.trim()}
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary whitespace-pre-wrap">
                        {comment.contenido}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-text-muted-light dark:text-text-muted py-8">
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
