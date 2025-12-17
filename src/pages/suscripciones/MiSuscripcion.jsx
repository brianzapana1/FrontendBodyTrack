import { Calendar, CreditCard, Crown, AlertCircle } from 'lucide-react'
import { useMiSuscripcion, useCancelarSuscripcion } from '../../hooks/useSuscripciones'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function MiSuscripcion() {
  const navigate = useNavigate()
  const { data: miSuscripcion, isLoading } = useMiSuscripcion()
  const cancelarMutation = useCancelarSuscripcion()
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const planActual = miSuscripcion?.planActual
  const planInfo = miSuscripcion?.planInfo
  const suscripcion = miSuscripcion?.suscripcion

  const esPremium = planActual === 'PREMIUM'

  const handleCancelar = () => {
    cancelarMutation.mutate(undefined, {
      onSuccess: () => {
        setMostrarConfirmacion(false)
      }
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Cargando suscripción...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Suscripción</h1>
          <p className="text-gray-600 mt-2">Gestiona tu plan y suscripción</p>
        </div>

        {/* Plan Actual */}
        <div
          className={`rounded-xl shadow-lg p-8 mb-6 ${
            esPremium
              ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
              : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {esPremium && <Crown className="text-yellow-400" size={32} />}
              <div>
                <h2 className="text-2xl font-bold">{planInfo?.nombre}</h2>
                <p className={esPremium ? 'text-blue-100' : 'text-gray-600'}>
                  {planInfo?.descripcion}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">${planInfo?.precio}</div>
              <div className={`text-sm ${esPremium ? 'text-blue-200' : 'text-gray-500'}`}>
                por mes
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="border-t border-opacity-20 pt-6">
            <h3 className={`font-semibold mb-3 ${esPremium ? 'text-blue-100' : 'text-gray-700'}`}>
              Características incluidas:
            </h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {planInfo?.caracteristicas.map((caracteristica, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 ${
                    esPremium ? 'text-blue-50' : 'text-gray-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    esPremium ? 'bg-yellow-400' : 'bg-blue-600'
                  }`} />
                  {caracteristica}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detalles de Suscripción (solo para Premium) */}
        {esPremium && suscripcion && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles de la Suscripción
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="text-blue-600 mt-1" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Fecha de inicio</div>
                  <div className="font-medium text-gray-900">
                    {new Date(suscripcion.fechaInicio).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-blue-600 mt-1" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Próxima renovación</div>
                  <div className="font-medium text-gray-900">
                    {new Date(suscripcion.fechaFin).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="text-blue-600 mt-1" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Método de pago</div>
                  <div className="font-medium text-gray-900">{suscripcion.metodoPago}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 mt-1 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className="font-medium text-green-600">{suscripcion.estado}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          {!esPremium ? (
            <button
              onClick={() => navigate('/planes')}
              className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Mejorar a Premium
            </button>
          ) : (
            <button
              onClick={() => setMostrarConfirmacion(true)}
              className="flex-1 bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
              Cancelar Suscripción
            </button>
          )}

          <button
            onClick={() => navigate('/planes')}
            className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Ver Todos los Planes
          </button>
        </div>

        {/* Modal de Confirmación */}
        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4 text-amber-600">
                <AlertCircle size={32} />
                <h3 className="text-xl font-bold">Confirmar Cancelación</h3>
              </div>

              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas cancelar tu suscripción Premium? 
                Perderás acceso a las rutinas personalizadas y otras funciones premium.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarConfirmacion(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  disabled={cancelarMutation.isPending}
                >
                  No, Mantener Premium
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={cancelarMutation.isPending}
                >
                  {cancelarMutation.isPending ? 'Cancelando...' : 'Sí, Cancelar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
