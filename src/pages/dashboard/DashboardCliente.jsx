import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'

export default function DashboardCliente() {
  const { user } = useAuthStore()
  const cliente = user?.cliente

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card card-hover">
        <h1 className="text-heading-2 font-bold mb-2">
          ¡Bienvenido, {cliente?.nombres}! 👋
        </h1>
        <p className="text-text-secondary">
          Revisa tu progreso, rutinas y mantente en forma.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">💪</div>
          <div className="text-3xl font-bold text-primary mb-1">
            {cliente?.peso || '--'} kg
          </div>
          <div className="text-sm text-text-secondary">Peso Actual</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">📏</div>
          <div className="text-3xl font-bold text-accent-teal mb-1">
            {cliente?.altura || '--'} cm
          </div>
          <div className="text-sm text-text-secondary">Altura</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-3xl font-bold text-accent-gold mb-1">
            {cliente?.plan || 'BASICO'}
          </div>
          <div className="text-sm text-text-secondary">Plan Actual</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">👤</div>
          <div className="text-3xl font-bold text-accent-orange mb-1">
            {cliente?.entrenadorId ? '✓' : '✗'}
          </div>
          <div className="text-sm text-text-secondary">
            {cliente?.entrenadorId ? 'Con Entrenador' : 'Sin Entrenador'}
          </div>
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
          <Link to="/progreso/nuevo" className="btn-primary text-center">
            📈 Registrar Progreso
          </Link>
          <Link to="/rutinas" className="btn-secondary text-center">
            💪 Ver Rutinas
          </Link>
          <Link to="/foro" className="btn-secondary text-center">
            💬 Ir al Foro
          </Link>
        </div>
      </div>

      {/* Progreso Reciente */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Mi Progreso</h2>
          <Link to="/progreso" className="text-primary hover:text-primary/80 text-sm">
            Ver historial →
          </Link>
        </div>
        <div className="bg-dark-surface p-4 rounded-lg text-center">
          <p className="text-text-secondary mb-3">
            Aún no has registrado tu progreso
          </p>
          <Link to="/progreso/nuevo" className="btn-primary inline-block">
            Registrar Primer Progreso
          </Link>
        </div>
      </div>

      {/* Plan y Suscripción */}
      <div className="card bg-gradient-to-br from-primary/10 to-accent-gold/10 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="text-5xl">⭐</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">Plan {cliente?.plan || 'BASICO'}</h3>
            <p className="text-text-secondary text-sm">
              {cliente?.plan === 'PRO' 
                ? 'Disfruta de todas las funciones premium'
                : cliente?.plan === 'PREMIUM'
                ? 'Acceso a rutinas avanzadas y estadísticas'
                : 'Mejora tu plan para más beneficios'}
            </p>
          </div>
          {cliente?.plan !== 'PRO' && (
            <Link to="/suscripciones" className="btn-gold">
              Mejorar Plan
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
