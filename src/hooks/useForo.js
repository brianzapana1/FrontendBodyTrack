import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { foroApi } from '../api/endpoints/foro'
import toast from 'react-hot-toast'

// Hook para listar posts
export const useForoPosts = () => {
  return useQuery({
    queryKey: ['foro', 'posts'],
    queryFn: foroApi.getPosts,
    staleTime: 1 * 60 * 1000, // 1 minuto
  })
}

// Hook para ver detalle de un post
export const useForoPost = (postId) => {
  return useQuery({
    queryKey: ['foro', 'post', postId],
    queryFn: () => foroApi.getPost(postId),
    enabled: !!postId,
    staleTime: 30 * 1000, // 30 segundos
  })
}

// Hook para crear post
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: foroApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['foro', 'posts'])
      toast.success('Post creado exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Error al crear el post')
    },
  })
}

// Hook para actualizar post
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: foroApi.updatePost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['foro', 'posts'])
      queryClient.invalidateQueries(['foro', 'post', variables.id])
      toast.success('Post actualizado exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Error al actualizar el post')
    },
  })
}

// Hook para eliminar post
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: foroApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['foro', 'posts'])
      toast.success('Post eliminado exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Error al eliminar el post')
    },
  })
}

// Hook para crear comentario
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: foroApi.createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['foro', 'post', variables.postId])
      queryClient.invalidateQueries(['foro', 'posts']) // Para actualizar contador
      toast.success('Comentario agregado')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Error al comentar')
    },
  })
}

// Hook para actualizar comentario
export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: foroApi.updateComment,
    onSuccess: (data) => {
      // Invalidar el post que contiene este comentario
      queryClient.invalidateQueries(['foro', 'posts'])
      toast.success('Comentario actualizado')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Error al actualizar comentario')
    },
  })
}

// Hook para eliminar comentario
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: foroApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['foro', 'posts'])
      toast.success('Comentario eliminado')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Error al eliminar comentario')
    },
  })
}
