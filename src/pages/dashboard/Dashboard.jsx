import { useAuthStore } from '../../store/authStore'
import { ROLES } from '../../utils/constants'

export default function Dashboard() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card card-hover">
        <h1 className="text-heading-2 font-bold mb-2">
          ¡Bienvenido, {user?.cliente?.nombres || user?.entrenador?.nombres || user?.email}! 👋
        </h1>
        <p className="text-text-secondary">
          {user?.rol === ROLES.CLIENTE && 'Aquí puedes ver tu progreso y rutinas asignadas.'}
          {user?.rol === ROLES.ENTRENADOR && 'Gestiona tus clientes y crea rutinas personalizadas.'}
          {user?.rol === ROLES.ADMIN && 'Panel de administración del sistema.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">💪</div>
          <div className="text-3xl font-bold text-primary mb-1">12</div>
          <div className="text-sm text-text-secondary">Entrenamientos</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-accent-teal mb-1">850</div>
          <div className="text-sm text-text-secondary">Calorías Hoy</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-3xl font-bold text-accent-gold mb-1">5</div>
          <div className="text-sm text-text-secondary">Racha Días</div>
        </div>

        <div className="card card-hover text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-3xl font-bold text-accent-orange mb-1">8</div>
          <div className="text-sm text-text-secondary">Logros</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {user?.rol === ROLES.CLIENTE && (
            <>
              <button className="btn-primary">Ver Mi Rutina</button>
              <button className="btn-secondary">Registrar Progreso</button>
              <button className="btn-secondary">Ir al Foro</button>
            </>
          )}
          {user?.rol === ROLES.ENTRENADOR && (
            <>
              <button className="btn-primary">Crear Rutina</button>
              <button className="btn-secondary">Ver Clientes</button>
              <button className="btn-secondary">Agregar Ejercicio</button>
            </>
          )}
          {user?.rol === ROLES.ADMIN && (
            <>
              <button className="btn-primary">Gestionar Usuarios</button>
              <button className="btn-secondary">Ver Estadísticas</button>
              <button className="btn-secondary">Verificar Suscripciones</button>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-dark-surface rounded-lg">
            <div className="text-2xl">📈</div>
            <div className="flex-1">
              <p className="font-medium">Progreso Registrado</p>
              <p className="text-sm text-text-secondary">Hace 2 horas</p>
            </div>
            <span className="text-accent-teal text-sm font-semibold">+2.5 kg</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-dark-surface rounded-lg">
            <div className="text-2xl">💪</div>
            <div className="flex-1">
              <p className="font-medium">Entrenamiento Completado</p>
              <p className="text-sm text-text-secondary">Ayer</p>
            </div>
            <span className="text-accent-gold text-sm font-semibold">🏆 Récord</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-dark-surface rounded-lg">
            <div className="text-2xl">💬</div>
            <div className="flex-1">
              <p className="font-medium">Nuevo Comentario en Foro</p>
              <p className="text-sm text-text-secondary">Hace 3 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
