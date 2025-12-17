import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export default function GraficasProgreso({ registros, estadisticas }) {
  if (registros.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-12 text-center">
        <p className="text-text-secondary-light dark:text-text-secondary">
          No hay suficientes datos para mostrar gráficas
        </p>
      </div>
    )
  }

  // Prepare data for charts
  const chartData = registros
    .slice()
    .reverse()
    .map(registro => ({
      fecha: format(new Date(registro.fecha), 'dd/MM', { locale: es }),
      peso: registro.peso || null,
      grasa: registro.porcentajeGrasa || null
    }))

  const getTrendIcon = (diff) => {
    if (!diff) return <Minus size={20} className="text-gray-400" />
    if (diff < 0) return <TrendingDown size={20} className="text-green-500" />
    return <TrendingUp size={20} className="text-red-500" />
  }

  const getTrendColor = (diff) => {
    if (!diff) return 'text-gray-600 dark:text-gray-400'
    if (diff < 0) return 'text-green-600 dark:text-green-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Peso */}
        {estadisticas.pesoActual && (
          <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
                Evolución de Peso
              </h3>
              {getTrendIcon(estadisticas.diferenciaPeso)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                  Peso Inicial
                </span>
                <span className="font-semibold text-text-primary-light dark:text-text-primary">
                  {estadisticas.pesoInicial} kg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                  Peso Actual
                </span>
                <span className="font-semibold text-text-primary-light dark:text-text-primary">
                  {estadisticas.pesoActual} kg
                </span>
              </div>
              {estadisticas.diferenciaPeso !== null && (
                <div className="flex justify-between items-center pt-2 border-t border-light-border dark:border-dark-border">
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                    Diferencia
                  </span>
                  <span className={`font-bold ${getTrendColor(estadisticas.diferenciaPeso)}`}>
                    {estadisticas.diferenciaPeso > 0 ? '+' : ''}
                    {estadisticas.diferenciaPeso.toFixed(1)} kg
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* % Grasa */}
        {estadisticas.grasaActual && (
          <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
                Evolución de Grasa Corporal
              </h3>
              {getTrendIcon(estadisticas.diferenciaGrasa)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                  % Grasa Inicial
                </span>
                <span className="font-semibold text-text-primary-light dark:text-text-primary">
                  {estadisticas.grasaInicial}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                  % Grasa Actual
                </span>
                <span className="font-semibold text-text-primary-light dark:text-text-primary">
                  {estadisticas.grasaActual}%
                </span>
              </div>
              {estadisticas.diferenciaGrasa !== null && (
                <div className="flex justify-between items-center pt-2 border-t border-light-border dark:border-dark-border">
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                    Diferencia
                  </span>
                  <span className={`font-bold ${getTrendColor(estadisticas.diferenciaGrasa)}`}>
                    {estadisticas.diferenciaGrasa > 0 ? '+' : ''}
                    {estadisticas.diferenciaGrasa.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gráfica de Peso */}
      {chartData.some(d => d.peso !== null) && (
        <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
          <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
            Gráfica de Peso
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="fecha" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="peso" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Peso (kg)"
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gráfica de % Grasa */}
      {chartData.some(d => d.grasa !== null) && (
        <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
          <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary">
            Gráfica de % Grasa Corporal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="fecha" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="grasa" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="% Grasa"
                dot={{ fill: '#F59E0B', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
