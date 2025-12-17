export default function Foro() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-heading-2 font-bold mb-2">Foro Comunitario</h1>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Próximamente: Espacio para compartir experiencias y consejos con la comunidad
        </p>
      </div>

      <div className="card bg-gradient-to-br from-primary/10 to-accent-purple/10 border border-primary/20 text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-bold mb-2">Foro en desarrollo</h2>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Esta función estará disponible próximamente
        </p>
      </div>
    </div>
  )
}
