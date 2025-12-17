export default function Estadisticas() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-heading-2 font-bold mb-2">Estadísticas</h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Visualiza métricas y análisis de rendimiento
        </p>
      </div>

      <div className="card bg-gradient-to-br from-primary/10 to-accent-orange/10 border border-primary/20 text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold mb-2">Panel de Estadísticas</h2>
        <p className="text-text-secondary-light dark:text-text-secondary mb-4">
          Esta función estará disponible próximamente
        </p>
        <p className="text-sm text-text-muted-light dark:text-text-muted">
          Incluirá gráficos de progreso, métricas de rendimiento y análisis detallados
        </p>
      </div>
    </div>
  )
}
