import { Check, Crown, Sparkles } from 'lucide-react'
import { usePlanes, useMiSuscripcion } from '../../hooks/useSuscripciones'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Planes() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { data: planes, isLoading: planesLoading } = usePlanes()
  const { data: miSuscripcion } = useMiSuscripcion()

  const planActual = miSuscripcion?.planActual || 'FREE'
  const esCliente = user?.rol === 'CLIENTE'

  const handleSeleccionarPlan = (nombrePlan) => {
    if (!esCliente) {
      return
    }
    
    if (nombrePlan === 'FREE') {
      navigate('/mi-suscripcion')
      return
    }

    navigate('/checkout', { state: { plan: nombrePlan } })
  }

  if (planesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Cargando planes...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elige el Plan Perfecto para Ti
          </h1>
          <p className="text-xl text-gray-600">
            Alcanza tus objetivos fitness con el plan adecuado
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {planes?.map((plan) => {
            const esPlanActual = plan.nombre === planActual
            const esFree = plan.nombre === 'FREE'
            const esPremium = plan.nombre === 'PREMIUM'

            return (
              <div
                key={plan.nombre}
                className={`relative rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                  esPremium
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
                    : 'bg-white'
                }`}
              >
                {/* Premium Badge */}
                {esPremium && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      <Crown size={16} />
                      Recomendado
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      {esPremium && <Sparkles className="text-yellow-400" size={24} />}
                      <h2
                        className={`text-3xl font-bold ${
                          esPremium ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {plan.nombre}
                      </h2>
                    </div>
                    <p className={esPremium ? 'text-blue-100' : 'text-gray-600'}>
                      {plan.descripcion}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">
                        ${plan.precio}
                      </span>
                      <span className={esPremium ? 'text-blue-200' : 'text-gray-500'}>
                        /mes
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check
                          className={`flex-shrink-0 mt-1 ${
                            esPremium ? 'text-green-300' : 'text-green-600'
                          }`}
                          size={20}
                        />
                        <span className={esPremium ? 'text-blue-50' : 'text-gray-700'}>
                          {caracteristica}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {esCliente ? (
                    <button
                      onClick={() => handleSeleccionarPlan(plan.nombre)}
                      disabled={esPlanActual && !esFree}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                        esPlanActual && !esFree
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : esPremium
                          ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {esPlanActual && !esFree
                        ? 'Plan Actual'
                        : esFree
                        ? 'Plan Gratuito'
                        : 'Contratar Ahora'}
                    </button>
                  ) : (
                    <div className="text-center py-4 text-sm text-gray-500">
                      Disponible solo para clientes
                    </div>
                  )}

                  {esPlanActual && (
                    <div className="mt-4 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                          esPremium
                            ? 'bg-blue-500/30 text-blue-100'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <Check size={16} />
                        Tu plan actual
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Todos los planes incluyen acceso al foro comunitario y soporte técnico básico
          </p>
        </div>
      </div>
    </div>
  )
}
