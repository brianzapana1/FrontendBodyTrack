import { useAuthStore } from '../../store/authStore'
import { Link, useNavigate } from 'react-router-dom'
import { useProgresoHistorial, useProgresoEstadisticas } from '../../hooks/useProgreso'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import DetalleProgreso from '../../components/progreso/DetalleProgreso'

export default function DashboardCliente() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const cliente = user?.cliente
  const clienteId = cliente?.id

  // State for detail modal
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null)

  // Fetch progress data
  const { data: historial = [], isLoading: loadingHistorial } = useProgresoHistorial(clienteId)
  const { data: estadisticas = {}, isLoading: loadingEstadisticas } = useProgresoEstadisticas(clienteId)

  // Get latest progress record
  const ultimoProgreso = historial[0]
  
  // Calculate days since last progress
  const diasDesdeUltimoProgreso = ultimoProgreso 
    ? Math.floor((new Date() - new Date(ultimoProgreso.fecha)) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card card-hover">
        <h1 className="text-heading-2 font-bold mb-2">
          ¡Bienvenido, {user?.nombres || cliente?.nombres}! 👋
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          {ultimoProgreso 
            ? `Último registro hace ${diasDesdeUltimoProgreso} ${diasDesdeUltimoProgreso === 1 ? 'día' : 'días'}`
            : 'Comienza a registrar tu progreso para alcanzar tus metas'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">💪</div>
          <div className="text-3xl font-bold text-primary mb-1">
            {loadingEstadisticas ? '...' : (cliente?.peso || ultimoProgreso?.peso || '--')} 
            {(cliente?.peso || ultimoProgreso?.peso) && ' kg'}
          </div>
          <div className="text-sm text-text-secondary-light dark:text-text-secondary">Peso Actual</div>
          {estadisticas.cambioEnPeso && (
            <div className={`text-xs mt-1 ${estadisticas.cambioEnPeso > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {estadisticas.cambioEnPeso > 0 ? '+' : ''}{estadisticas.cambioEnPeso.toFixed(1)} kg
            </div>
          )}
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">📏</div>
          <div className="text-3xl font-bold text-accent-teal mb-1">
            {cliente?.altura || '--'} 
            {cliente?.altura && ' cm'}
          </div>
          <div className="text-sm text-text-secondary-light dark:text-text-secondary">Altura</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">📊</div>
          <div className="text-3xl font-bold text-accent-purple mb-1">
            {loadingHistorial ? '...' : historial.length}
          </div>
          <div className="text-sm text-text-secondary-light dark:text-text-secondary">Registros Totales</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-accent-orange mb-1">
            {ultimoProgreso?.porcentajeGrasa ? `${ultimoProgreso.porcentajeGrasa}%` : '--'}
          </div>
          <div className="text-sm text-text-secondary-light dark:text-text-secondary">% Grasa Corporal</div>
        </div>
      </div>

      {/* Mi Rutina Activa */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Mi Rutina de Hoy</h2>
          <Link to="/rutinas" className="text-primary hover:text-primary/80 text-sm">
            Ver todas →
          </Link>
        </div>
        <div className="bg-dark-surface p-4 rounded-lg text-center">
          <p className="text-text-secondary mb-3">
            {cliente?.entrenadorId 
              ? 'Cargando rutina del día...' 
              : 'No tienes un entrenador asignado aún'}
          </p>
          <Link to="/rutinas" className="btn-primary inline-block">
            {cliente?.entrenadorId ? 'Ver Mi Rutina' : 'Buscar Entrenador'}
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button 
            onClick={() => navigate('/progreso')}
            className="btn-primary text-center"
          >
            📈 Registrar Progreso
          </button>
          <button 
            onClick={() => navigate('/rutinas')}
            className="btn-secondary text-center"
          >
            💪 Ver Rutinas
          </button>
          <button 
            onClick={() => navigate('/foro')}
            className="btn-secondary text-center"
          >
            💬 Ir al Foro
          </button>
        </div>
      </div>

      {/* Progreso Reciente */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Mi Progreso Reciente</h2>
          <Link to="/progreso" className="text-primary hover:text-primary/80 text-sm">
            Ver historial →
          </Link>
        </div>
        
        {loadingHistorial ? (
          <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg text-center">
            <div className="animate-pulse">Cargando...</div>
          </div>
        ) : historial.length === 0 ? (
          <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg text-center">
            <p className="text-text-secondary-light dark:text-text-secondary mb-3">
              Aún no has registrado tu progreso
            </p>
            <button 
              onClick={() => navigate('/progreso')}
              className="btn-primary inline-block"
            >
              Registrar Primer Progreso
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {historial.slice(0, 3).map((registro) => (
              <div 
                key={registro.id}
                className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition cursor-pointer"
                onClick={() => setRegistroSeleccionado(registro)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📊</div>
                    <div>
                      <div className="font-medium">
                        {format(new Date(registro.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                      </div>
                      <div className="text-sm text-text-secondary-light dark:text-text-secondary">
                        {registro.peso && `Peso: ${registro.peso} kg`}
                        {registro.peso && registro.porcentajeGrasa && ' • '}
                        {registro.porcentajeGrasa && `Grasa: ${registro.porcentajeGrasa}%`}
                      </div>
                    </div>
                  </div>
                  {registro.fotos && registro.fotos.length > 0 && (
                    <div className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-blue-600 dark:text-blue-400">
                      {registro.fotos.length} {registro.fotos.length === 1 ? 'foto' : 'fotos'}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {historial.length > 3 && (
              <button 
                onClick={() => navigate('/progreso')}
                className="w-full text-center text-sm text-primary hover:text-primary/80 py-2"
              >
                Ver todos los registros ({historial.length})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Plan y Suscripción - Only show upgrade prompt for FREE users */}
      {cliente?.plan !== 'PREMIUM' && (
        <div className="card bg-gradient-to-br from-primary/10 to-accent-gold/10 border border-primary/20">
          <div className="flex items-center gap-4">
            <div className="text-5xl">⭐</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">Plan {cliente?.plan || 'FREE'}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary text-sm">
                Mejora tu plan para acceder a rutinas personalizadas y más beneficios
              </p>
            </div>
            <Link to="/planes" className="btn-gold">
              Mejorar Plan
            </Link>
          </div>
        </div>
      )}

      {/* Modal de Detalle de Progreso */}
      {registroSeleccionado && (
        <DetalleProgreso 
          registro={registroSeleccionado}
          onClose={() => setRegistroSeleccionado(null)}
        />
      )}
    </div>
  )
}
