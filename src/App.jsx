import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'

// Layouts
import MainLayout from './components/layout/MainLayout'

// Pages
import Login from './pages/auth/Login'
import RegisterCliente from './pages/auth/RegisterCliente'
import RegisterEntrenador from './pages/auth/RegisterEntrenador'
import Dashboard from './pages/dashboard/Dashboard'
import ViewProfile from './pages/perfil/ViewProfile'
import EditProfile from './pages/perfil/EditProfile'
import ChangePassword from './pages/perfil/ChangePassword'
import Progreso from './pages/progreso/Progreso'
import Ejercicios from './pages/ejercicios/Ejercicios'
import Rutinas from './pages/rutinas/Rutinas'
import MiRutina from './pages/rutinas/MiRutina'
import Planes from './pages/suscripciones/Planes'
import MiSuscripcion from './pages/suscripciones/MiSuscripcion'
import Checkout from './pages/suscripciones/Checkout'
import Foro from './pages/foro/Foro'
import Clientes from './pages/clientes/Clientes'
import Estadisticas from './pages/estadisticas/Estadisticas'
import Usuarios from './pages/admin/Usuarios'
import Entrenadores from './pages/admin/Entrenadores'
import Suscripciones from './pages/admin/Suscripciones'
import ProtectedRoute from './routes/ProtectedRoute'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  const { isAuthenticated, isInitialized, initialize } = useAuthStore()
  const { theme, initializeTheme } = useThemeStore()

  // Initialize auth state and theme on app load
  useEffect(() => {
    initializeTheme()
    initialize()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Show loading while checking auth status
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary-light dark:text-text-secondary">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            color: theme === 'dark' ? '#e5e5e5' : '#0a0a0a',
            border: theme === 'dark' ? '1px solid #2a2a2a' : '1px solid #e5e5e5',
          },
          success: {
            iconTheme: {
              primary: '#9333ea',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/registro/cliente" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterCliente />} 
          />
          <Route 
            path="/registro/entrenador" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterEntrenador />} 
          />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<ViewProfile />} />
            <Route path="/perfil/editar" element={<EditProfile />} />
            <Route path="/perfil/cambiar-password" element={<ChangePassword />} />
            <Route path="/progreso" element={<Progreso />} />
            <Route path="/ejercicios" element={<Ejercicios />} />
            <Route path="/rutinas" element={<Rutinas />} />
            <Route path="/mi-rutina" element={<MiRutina />} />
            <Route path="/foro" element={<Foro />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/entrenadores" element={<Entrenadores />} />
            <Route path="/suscripciones" element={<Suscripciones />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/mi-suscripcion" element={<MiSuscripcion />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Add more protected routes here */}
          </Route>

          {/* Default Redirect */}
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />

          {/* 404 */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                  <p className="text-text-secondary-light dark:text-text-secondary mb-6">Página no encontrada</p>
                  <a href="/" className="btn-primary">Volver al inicio</a>
                </div>
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
