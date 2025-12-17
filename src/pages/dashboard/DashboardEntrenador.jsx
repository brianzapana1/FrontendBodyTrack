import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'

export default function DashboardEntrenador() {
  const { user } = useAuthStore()
  const entrenador = user?.entrenador

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card card-hover">
        <h1 className="text-heading-2 font-bold mb-2">
          ¡Hola, {entrenador?.nombres}! 💪
        </h1>
        <p className="text-text-secondary">
          {entrenador?.especialidad || 'Entrenador Personal'} - Gestiona tus clientes y rutinas
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-3xl font-bold text-primary mb-1">0</div>
          <div className="text-sm text-text-secondary">Clientes Activos</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">📋</div>
          <div className="text-3xl font-bold text-accent-teal mb-1">0</div>
          <div className="text-sm text-text-secondary">Rutinas Creadas</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">💪</div>
          <div className="text-3xl font-bold text-accent-gold mb-1">0</div>
          <div className="text-sm text-text-secondary">Ejercicios Propios</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-3xl font-bold text-accent-orange mb-1">--</div>
          <div className="text-sm text-text-secondary">Valoración</div>
        </div>
      </div>

      {/* Mis Clientes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Mis Clientes</h2>
          <Link to="/clientes" className="text-primary hover:text-primary/80 text-sm">
            Ver todos →
          </Link>
        </div>
        <div className="bg-dark-surface p-6 rounded-lg text-center">
          <div className="text-5xl mb-3">👥</div>
          <p className="text-text-secondary mb-3">
            Aún no tienes clientes asignados
          </p>
          <p className="text-sm text-text-secondary">
            Los clientes te serán asignados por el administrador del sistema
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/rutinas/crear" className="btn-primary text-center">
            📋 Crear Rutina
          </Link>
          <Link to="/ejercicios/crear" className="btn-secondary text-center">
            💪 Agregar Ejercicio
          </Link>
          <Link to="/clientes" className="btn-secondary text-center">
            👥 Ver Clientes
          </Link>
        </div>
      </div>

      {/* Perfil Profesional */}
      <div className="card bg-gradient-to-br from-primary/10 to-accent-gold/10 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🎓</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">Perfil Profesional</h3>
            <p className="text-text-secondary text-sm mb-2">
              {entrenador?.certificaciones 
                ? 'Certificaciones verificadas'
                : 'Completa tu perfil profesional'}
            </p>
            {entrenador?.especialidad && (
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">
                {entrenador.especialidad}
              </span>
            )}
          </div>
          <Link to="/perfil/editar" className="btn-secondary">
            Editar Perfil
          </Link>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <div className="bg-dark-surface p-6 rounded-lg text-center">
          <p className="text-text-secondary">
            No hay actividad reciente
          </p>
        </div>
      </div>
    </div>
  )
}
