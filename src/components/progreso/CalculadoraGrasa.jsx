import { useState } from 'react'
import { Calculator, X } from 'lucide-react'

/**
 * Body Fat Calculator Component
 * Uses the US Navy Method for estimation
 * 
 * Men: 86.010 × log10(abdomen - neck) - 70.041 × log10(height) + 36.76
 * Women: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
 */
export default function CalculadoraGrasa({ onCalculate, genero, altura }) {
  const [mostrarCalculadora, setMostrarCalculadora] = useState(false)
  const [medidas, setMedidas] = useState({
    cuello: '',
    cintura: '',
    cadera: '',
    altura: altura || ''
  })
  const [resultado, setResultado] = useState(null)

  const calcularGrasaCorporal = () => {
    const { cuello, cintura, cadera, altura } = medidas

    if (!cuello || !cintura || !altura) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    const cuelloNum = parseFloat(cuello)
    const cinturaNum = parseFloat(cintura)
    const caderaNum = parseFloat(cadera)
    const alturaNum = parseFloat(altura)

    let porcentajeGrasa

    if (genero === 'M') {
      // Fórmula US Navy para hombres
      porcentajeGrasa = 
        86.010 * Math.log10(cinturaNum - cuelloNum) - 
        70.041 * Math.log10(alturaNum) + 
        36.76
    } else if (genero === 'F') {
      // Fórmula US Navy para mujeres
      if (!cadera) {
        alert('Para mujeres, la medida de cadera es requerida')
        return
      }
      porcentajeGrasa = 
        163.205 * Math.log10(cinturaNum + caderaNum - cuelloNum) - 
        97.684 * Math.log10(alturaNum) - 
        78.387
    } else {
      // Promedio de ambas fórmulas para "Otro"
      const hombre = 86.010 * Math.log10(cinturaNum - cuelloNum) - 70.041 * Math.log10(alturaNum) + 36.76
      const mujer = cadera 
        ? 163.205 * Math.log10(cinturaNum + caderaNum - cuelloNum) - 97.684 * Math.log10(alturaNum) - 78.387
        : hombre
      porcentajeGrasa = (hombre + mujer) / 2
    }

    const resultado = Math.max(3, Math.min(50, porcentajeGrasa)) // Limitar entre 3% y 50%
    setResultado(resultado.toFixed(1))
  }

  const aplicarResultado = () => {
    if (resultado) {
      onCalculate(resultado)
      setMostrarCalculadora(false)
      setMedidas({ cuello: '', cintura: '', cadera: '', altura: '' })
      setResultado(null)
    }
  }

  const handleChange = (e) => {
    setMedidas({
      ...medidas,
      [e.target.name]: e.target.value
    })
  }

  if (!mostrarCalculadora) {
    return (
      <button
        type="button"
        onClick={() => setMostrarCalculadora(true)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
      >
        <Calculator size={18} />
        <span>Calcular % Grasa</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-card rounded-2xl max-w-md w-full border border-light-border dark:border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
          <div>
            <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary">
              Calculadora de % Grasa
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary mt-1">
              Método US Navy
            </p>
          </div>
          <button
            onClick={() => {
              setMostrarCalculadora(false)
              setResultado(null)
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              💡 <strong>Tip:</strong> Toma las medidas con una cinta métrica flexible. 
              Mide en cm y sin apretar.
            </p>
          </div>

          {/* Altura */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Altura (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              name="altura"
              value={medidas.altura}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="175"
            />
          </div>

          {/* Cuello */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Circunferencia del cuello (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              name="cuello"
              value={medidas.cuello}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="38"
            />
          </div>

          {/* Cintura */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
              Circunferencia de la cintura (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              name="cintura"
              value={medidas.cintura}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="85"
            />
          </div>

          {/* Cadera (solo para mujeres) */}
          {genero === 'F' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary-light dark:text-text-secondary">
                Circunferencia de la cadera (cm) *
              </label>
              <input
                type="number"
                step="0.1"
                name="cadera"
                value={medidas.cadera}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="98"
              />
            </div>
          )}

          {/* Resultado */}
          {resultado && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-900 dark:text-green-200 mb-2">
                Porcentaje de grasa corporal estimado:
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {resultado}%
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                ⚠️ Esta es una estimación. Para resultados precisos, consulta con un profesional.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-light-border dark:border-dark-border flex gap-3">
          <button
            type="button"
            onClick={() => {
              setMostrarCalculadora(false)
              setResultado(null)
            }}
            className="flex-1 px-4 py-2.5 border border-light-border dark:border-dark-border rounded-lg text-text-secondary-light dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface transition"
          >
            Cancelar
          </button>
          {!resultado ? (
            <button
              type="button"
              onClick={calcularGrasaCorporal}
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Calcular
            </button>
          ) : (
            <button
              type="button"
              onClick={aplicarResultado}
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Aplicar Resultado
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
