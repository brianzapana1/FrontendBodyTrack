import api from '../axios'

// Posts del Foro
export const foroApi = {
  // Listar posts
  getPosts: async () => {
    const response = await api.get('/api/foro/posts')
    return response.data
  },

  // Ver detalle de un post con comentarios
  getPost: async (id) => {
    const response = await api.get(`/api/foro/posts/${id}`)
    return response.data
  },

  // Crear post
  createPost: async (postData) => {
    const response = await api.post('/api/foro/posts', postData)
    return response.data
  },

  // Actualizar post
  updatePost: async ({ id, data }) => {
    const response = await api.put(`/api/foro/posts/${id}`, data)
    return response.data
  },

  // Eliminar post
  deletePost: async (id) => {
    const response = await api.delete(`/api/foro/posts/${id}`)
    return response.data
  },

  // Crear comentario
  createComment: async ({ postId, contenido }) => {
    const response = await api.post(`/api/foro/posts/${postId}/comentarios`, { contenido })
    return response.data
  },

  // Actualizar comentario
  updateComment: async ({ id, contenido }) => {
    const response = await api.put(`/api/foro/comentarios/${id}`, { contenido })
    return response.data
  },

  // Eliminar comentario
  deleteComment: async (id) => {
    const response = await api.delete(`/api/foro/comentarios/${id}`)
    return response.data
  }
}
