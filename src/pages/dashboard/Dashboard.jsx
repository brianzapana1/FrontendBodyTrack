import { useAuthStore } from '../../store/authStore'
import { ROLES } from '../../utils/constants'
import DashboardCliente from './DashboardCliente'
import DashboardEntrenador from './DashboardEntrenador'
import DashboardAdmin from './DashboardAdmin'

export default function Dashboard() {
  const { user } = useAuthStore()

  // Render dashboard based on user role
  if (user?.rol === ROLES.CLIENTE) {
    return <DashboardCliente />
  }

  if (user?.rol === ROLES.ENTRENADOR) {
    return <DashboardEntrenador />
  }

  if (user?.rol === ROLES.ADMIN) {
    return <DashboardAdmin />
  }

  // Fallback if role is not recognized
  return (
    <div className="space-y-6">
      <div className="card card-hover">
        <h1 className="text-heading-2 font-bold mb-2">
          ¡Bienvenido! 👋
        </h1>
        <p className="text-text-secondary">
          Cargando tu panel de control...
        </p>
      </div>
    </div>
  )
}
