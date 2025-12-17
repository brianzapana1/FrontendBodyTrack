import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useEliminarRutina } from '../../hooks/useRutinas'
import ListaRutinas from '../../components/rutinas/ListaRutinas'
import DetalleRutina from '../../components/rutinas/DetalleRutina'
import FormRutina from '../../components/rutinas/FormRutina'
import ModalAsignarCliente from '../../components/rutinas/ModalAsignarCliente'

export default function Rutinas() {
  const { user } = useAuthStore()
  const puedeCrear = user?.rol === 'ENTRENADOR' || user?.rol === 'ADMIN'

  const [rutinaDetalle, setRutinaDetalle] = useState(null)
  const [rutinaEditar, setRutinaEditar] = useState(null)
  const [mostrarFormNueva, setMostrarFormNueva] = useState(false)
  const [rutinaAsignar, setRutinaAsignar] = useState(null)

  const eliminarMutation = useEliminarRutina()

  const handleVer = (rutina) => setRutinaDetalle(rutina)
  const handleEditar = (rutina) => setRutinaEditar(rutina)
  const handleEliminar = (rutina) => {
    if (window.confirm(`¿Eliminar la rutina "${rutina.nombre}"?`)) {
      eliminarMutation.mutate(rutina.id)
    }
  }
  const handleAsignar = (rutina) => {
    setRutinaAsignar(rutina)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rutinas de Entrenamiento</h1>
              <p className="text-gray-600 mt-2">
                Gestiona y visualiza las rutinas de entrenamiento
              </p>
            </div>

            {puedeCrear && (
              <button
                onClick={() => setMostrarFormNueva(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Plus size={20} />
                <span>Nueva Rutina</span>
              </button>
            )}
          </div>
        </div>

        <ListaRutinas
          onVer={handleVer}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          onAsignar={handleAsignar}
        />

        {rutinaDetalle && (
          <DetalleRutina
            rutina={rutinaDetalle}
            puedeEditar={puedeCrear}
            onCerrar={() => setRutinaDetalle(null)}
          />
        )}

        {rutinaEditar && (
          <FormRutina
            rutina={rutinaEditar}
            onCerrar={() => setRutinaEditar(null)}
            onGuardado={() => setRutinaDetalle(null)}
          />
        )}

        {mostrarFormNueva && (
          <FormRutina
            onCerrar={() => setMostrarFormNueva(false)}
          />
        )}

        {rutinaAsignar && (
          <ModalAsignarCliente
            rutina={rutinaAsignar}
            onCerrar={() => setRutinaAsignar(null)}
          />
        )}
      </div>
    </div>
  )
}
