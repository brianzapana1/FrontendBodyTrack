import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard, Lock, Check, ArrowLeft } from 'lucide-react'
import { useContratarPlan } from '../../hooks/useSuscripciones'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const plan = location.state?.plan || 'PREMIUM'
  const contratarMutation = useContratarPlan()

  const [metodoPago, setMetodoPago] = useState('Tarjeta de Crédito')
  const [simularExito, setSimularExito] = useState(true)

  const preciosPlan = {
    PREMIUM: 29.99
  }

  const precio = preciosPlan[plan] || 0

  const handleProcesarPago = () => {
    contratarMutation.mutate(
      {
        plan,
        datosSimulacion: {
          metodoPago,
          exito: simularExito
        }
      },
      {
        onSuccess: () => {
          navigate('/mi-suscripcion')
        }
      }
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/planes')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Volver a planes
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">Completa tu suscripción a BodyTrack {plan}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario de Pago (Simulado) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="text-blue-600" size={24} />
                Información de Pago (Simulación)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de Pago
                  </label>
                  <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                    <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="19"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <Lock className="text-gray-400 flex-shrink-0 mt-1" size={16} />
                  <p className="text-sm text-gray-600">
                    Este es un entorno de simulación. No se procesarán pagos reales.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulación de Estado */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                Panel de Simulación (Solo para pruebas)
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={simularExito}
                    onChange={() => setSimularExito(true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Simular pago exitoso ✅
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={!simularExito}
                    onChange={() => setSimularExito(false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Simular pago rechazado ❌
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900">{plan}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Precio mensual</span>
                  <span className="font-semibold text-gray-900">${precio}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Duración</span>
                  <span className="font-semibold text-gray-900">30 días</span>
                </div>

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${precio}</span>
                </div>
              </div>

              <button
                onClick={handleProcesarPago}
                disabled={contratarMutation.isPending}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contratarMutation.isPending ? (
                  'Procesando...'
                ) : (
                  <>Confirmar y Pagar</>
                )}
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Garantía de devolución de 30 días</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Soporte prioritario 24/7</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Cancela cuando quieras</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
