import { Crown, X, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function UpgradePrompt({ isOpen, onClose, feature, description }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleUpgrade = () => {
    onClose()
    navigate('/planes')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header con degradado */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Crown className="text-yellow-900" size={24} />
            </div>
            <h2 className="text-2xl font-bold">Función Premium</h2>
          </div>
          <p className="text-blue-100">
            Esta funcionalidad está disponible solo para usuarios Premium
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature}
            </h3>
            <p className="text-gray-600">
              {description}
            </p>
          </div>

          {/* Beneficios Premium */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Con Premium también obtienes:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Rutinas personalizadas por entrenadores profesionales
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Historial de progreso ilimitado
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Soporte prioritario 24/7
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Seguimiento personalizado de objetivos
              </li>
            </ul>
          </div>

          {/* Precio */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              $29.99<span className="text-lg text-gray-500">/mes</span>
            </div>
            <p className="text-sm text-gray-500">Cancela cuando quieras</p>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Ahora no
            </button>
            <button
              onClick={handleUpgrade}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Mejorar ahora
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
