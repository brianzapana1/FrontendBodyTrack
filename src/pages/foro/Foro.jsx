import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useForoPosts, useDeletePost } from '../../hooks/useForo'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import CrearPostModal from '../../components/foro/CrearPostModal'
import DetallePostModal from '../../components/foro/DetallePostModal'
import EditarPostModal from '../../components/foro/EditarPostModal'

export default function Foro() {
  const { user } = useAuthStore()
  const { data: posts = [], isLoading } = useForoPosts()
  const deletePostMutation = useDeletePost()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [editingPost, setEditingPost] = useState(null)

  const getUserName = (post) => {
    if (post.usuario.cliente) {
      return `${post.usuario.cliente.nombres} ${post.usuario.cliente.apellidos}`
    }
    if (post.usuario.entrenador) {
      return `${post.usuario.entrenador.nombres} ${post.usuario.entrenador.apellidos}`
    }
    return post.usuario.email
  }

  const canEditPost = (post) => {
    return user.id === post.usuarioId || user.rol === 'ADMIN'
  }

  const handleDeletePost = (postId) => {
    if (window.confirm('¿Estás seguro de eliminar este post?')) {
      deletePostMutation.mutate(postId)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading-2 font-bold mb-2">Foro Comunitario</h1>
            <p className="text-text-secondary-light dark:text-text-secondary">
              Comparte experiencias y consejos con la comunidad
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            ✍️ Crear Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="card text-center py-12">
          <div className="animate-pulse">Cargando posts...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">No hay posts aún</h3>
          <p className="text-text-secondary-light dark:text-text-secondary mb-4">
            Sé el primero en compartir algo con la comunidad
          </p>
          <button onClick={() => setIsCreateModalOpen(true)} className="btn-primary">
            Crear el Primer Post
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white font-bold">
                    {getUserName(post)[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary-light dark:text-text-primary">
                      {getUserName(post)}
                    </div>
                    <div className="text-xs text-text-muted-light dark:text-text-muted flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                        {post.usuario.rol}
                      </span>
                      •
                      <span>
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {canEditPost(post) && (
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setEditingPost(post)}
                      className="text-sm text-primary hover:text-primary/80 px-3 py-1 rounded hover:bg-primary/10"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-sm text-status-error-light dark:text-status-error hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <h3 className="text-lg font-semibold mb-2 text-text-primary-light dark:text-text-primary">
                {post.titulo}
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary line-clamp-3">
                {post.contenido}
              </p>

              {/* Post Footer */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-light-border dark:border-dark-border text-sm text-text-muted-light dark:text-text-muted">
                <div className="flex items-center gap-2">
                  💬 {post.comentarios?.length || 0} comentarios
                </div>
                <div className="text-primary hover:text-primary/80">
                  Ver más →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {isCreateModalOpen && (
        <CrearPostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {selectedPost && (
        <DetallePostModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={() => {
            setEditingPost(selectedPost)
            setSelectedPost(null)
          }}
          onDelete={(id) => {
            handleDeletePost(id)
            setSelectedPost(null)
          }}
        />
      )}

      {editingPost && (
        <EditarPostModal
          post={editingPost}
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  )
}
