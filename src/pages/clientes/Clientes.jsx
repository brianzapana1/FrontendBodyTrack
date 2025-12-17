export default function Clientes() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-heading-2 font-bold mb-2">Mis Clientes</h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Gestiona tus clientes y sus rutinas personalizadas
        </p>
      </div>

      <div className="card bg-gradient-to-br from-primary/10 to-accent-teal/10 border border-primary/20 text-center py-12">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-bold mb-2">Gestión de Clientes</h2>
        <p className="text-text-secondary-light dark:text-text-secondary mb-4">
          Esta función estará disponible próximamente
        </p>
        <p className="text-sm text-text-muted-light dark:text-text-muted">
          Podrás ver la lista de tus clientes, asignarles rutinas y hacer seguimiento de su progreso
        </p>
      </div>
    </div>
  )
}
