import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './store/authStore'

// Layouts
import MainLayout from './components/layout/MainLayout'

// Pages
import Login from './pages/auth/Login'
import RegisterCliente from './pages/auth/RegisterCliente'
import RegisterEntrenador from './pages/auth/RegisterEntrenador'
import Dashboard from './pages/dashboard/Dashboard'
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
  const { isAuthenticated } = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
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
              <div className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                  <p className="text-text-secondary mb-6">Página no encontrada</p>
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
