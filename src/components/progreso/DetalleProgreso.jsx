import { X, Calendar, Weight, Activity, Ruler } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function DetalleProgreso({ registro, onClose }) {
  if (!registro) return null

  // Función para obtener la URL completa de la foto
  const getFotoUrl = (foto) => {
    if (foto.startsWith('http')) return foto
    return `${API_URL}${foto}`
  }

  const medidas = [
    { label: 'Peso', value: registro.peso, unit: 'kg', icon: Weight },
    { label: '% Grasa Corporal', value: registro.porcentajeGrasa, unit: '%', icon: Activity },
    { label: 'Pecho', value: registro.medidaPecho, unit: 'cm', icon: Ruler },
    { label: 'Cintura', value: registro.medidaCintura, unit: 'cm', icon: Ruler },
    { label: 'Cadera', value: registro.medidaCadera, unit: 'cm', icon: Ruler },
    { label: 'Brazo', value: registro.medidaBrazo, unit: 'cm', icon: Ruler },
    { label: 'Pierna', value: registro.medidaPierna, unit: 'cm', icon: Ruler },
  ].filter(m => m.value !== null && m.value !== undefined)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-light-border dark:border-dark-border">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
              Detalle de Progreso
            </h2>
            <div className="flex items-center gap-2 mt-2 text-text-secondary-light dark:text-text-secondary">
              <Calendar size={18} />
              <span>
                {format(new Date(registro.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-lg transition"
          >
            <X size={24} className="text-text-secondary-light dark:text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Medidas */}
          {medidas.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
                Medidas Corporales
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {medidas.map((medida, index) => {
                  const Icon = medida.icon
                  return (
                    <div
                      key={index}
                      className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 border border-light-border dark:border-dark-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={18} className="text-blue-600" />
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                          {medida.label}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
                        {medida.value}
                        <span className="text-sm font-normal text-text-secondary-light dark:text-text-secondary ml-1">
                          {medida.unit}
                        </span>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Fotos */}
          {registro.fotos && registro.fotos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
                Fotos de Progreso ({registro.fotos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registro.fotos.map((foto, index) => {
                  const fotoUrl = getFotoUrl(foto)
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={fotoUrl}
                        alt={`Progreso ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg border border-light-border dark:border-dark-border"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => window.open(fotoUrl, '_blank')}
                          className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white dark:bg-dark-card text-text-primary-light dark:text-text-primary rounded-lg font-medium transition"
                        >
                          Ver en grande
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Notas */}
          {registro.notas && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
                Notas
              </h3>
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 border border-light-border dark:border-dark-border">
                <p className="text-text-secondary-light dark:text-text-secondary whitespace-pre-wrap">
                  {registro.notas}
                </p>
              </div>
            </div>
          )}

          {/* No hay medidas ni fotos */}
          {medidas.length === 0 && (!registro.fotos || registro.fotos.length === 0) && !registro.notas && (
            <div className="text-center py-12">
              <p className="text-text-secondary-light dark:text-text-secondary">
                Este registro no tiene medidas, fotos ni notas
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-dark-card border-t border-light-border dark:border-dark-border p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
