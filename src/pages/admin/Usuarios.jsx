export default function Usuarios() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-heading-2 font-bold mb-2">Gestión de Usuarios</h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Administra todos los usuarios del sistema
        </p>
      </div>

      <div className="card bg-gradient-to-br from-primary/10 to-accent-purple/10 border border-primary/20 text-center py-12">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-bold mb-2">Panel de Administración</h2>
        <p className="text-text-secondary-light dark:text-text-secondary mb-4">
          Esta función estará disponible próximamente
        </p>
        <p className="text-sm text-text-muted-light dark:text-text-muted">
          Podrás gestionar clientes, entrenadores y administradores
        </p>
      </div>
    </div>
  )
}
