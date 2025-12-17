import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, Weight, Activity, Ruler, Eye, Trash2 } from 'lucide-react'

export default function ListaProgreso({ registros, onVerDetalle, onEliminar }) {
  if (registros.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-12 text-center">
        <Activity size={64} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2 text-text-primary-light dark:text-text-primary">
          No hay registros de progreso
        </h3>
        <p className="text-text-secondary-light dark:text-text-secondary">
          Comienza registrando tu primer progreso para ver tu evolución
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {registros.map((registro) => (
        <div
          key={registro.id}
          className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 hover:shadow-lg transition"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Side - Date & Measurements */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary">
                  {format(new Date(registro.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Peso */}
                {registro.peso && (
                  <div className="flex items-center gap-2">
                    <Weight size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary">
                        Peso
                      </p>
                      <p className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
                        {registro.peso} kg
                      </p>
                    </div>
                  </div>
                )}

                {/* % Grasa */}
                {registro.porcentajeGrasa && (
                  <div className="flex items-center gap-2">
                    <Activity size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary">
                        % Grasa
                      </p>
                      <p className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
                        {registro.porcentajeGrasa}%
                      </p>
                    </div>
                  </div>
                )}

                {/* Cintura */}
                {registro.medidaCintura && (
                  <div className="flex items-center gap-2">
                    <Ruler size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary">
                        Cintura
                      </p>
                      <p className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
                        {registro.medidaCintura} cm
                      </p>
                    </div>
                  </div>
                )}

                {/* Fotos */}
                {registro.fotos && registro.fotos.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {registro.fotos.length} {registro.fotos.length === 1 ? 'foto' : 'fotos'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notas Preview */}
              {registro.notas && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary line-clamp-2">
                    {registro.notas}
                  </p>
                </div>
              )}
            </div>

            {/* Right Side - Actions */}
            <div className="flex md:flex-col gap-2">
              <button
                onClick={() => onVerDetalle(registro)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Eye size={18} />
                <span>Ver Detalle</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de eliminar este registro?')) {
                    onEliminar(registro.id)
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <Trash2 size={18} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
