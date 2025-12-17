export default function Suscripciones() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-heading-2 font-bold mb-2">Gestión de Suscripciones</h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Administra las suscripciones de todos los clientes
        </p>
      </div>

      <div className="card bg-gradient-to-br from-primary/10 to-accent-gold/10 border border-primary/20 text-center py-12">
        <div className="text-6xl mb-4">💳</div>
        <h2 className="text-2xl font-bold mb-2">Panel de Suscripciones</h2>
        <p className="text-text-secondary-light dark:text-text-secondary mb-4">
          Esta función estará disponible próximamente
        </p>
        <p className="text-sm text-text-muted-light dark:text-text-muted">
          Podrás ver todas las suscripciones activas, vencidas y gestionar pagos
        </p>
      </div>
    </div>
  )
}
