import { useState } from "react";
import { Plus, Calendar, List, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import {
  REPRODUCTION_STATUS,
  INSEMINATION_METHODS,
} from "@/shared/constants/reproductionConstants";
import { ReproductionCalendar } from "./ReproductionCalendar";
import { useReproductionStore } from "@/shared/store/reproductionStore";
import alertService from "@/shared/utils/alertService";

export default function ReproductionCycles() {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [showModal, setShowModal] = useState(false);

  const { cycles, setCycles } = useReproductionStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Initialize mock data if empty
  useState(() => {
    if (cycles.length === 0) {
      setCycles([
        {
          id: 1,
          animal: "Vaca #001",
          status: "Preñada",
          lastHeat: "2024-10-15",
          inseminationDate: "2024-10-16",
          dueDate: "2025-07-15",
          daysPregnant: 60,
        },
        {
          id: 2,
          animal: "Vaca #005",
          status: "En Celo",
          lastHeat: "2024-12-10",
          inseminationDate: null,
          dueDate: null,
          daysPregnant: 0,
        },
        {
          id: 3,
          animal: "Vaca #012",
          status: "Inseminada",
          lastHeat: "2024-11-20",
          inseminationDate: "2024-11-21",
          dueDate: "2025-08-20",
          daysPregnant: 21,
        },
      ]);
    }
  });

  const onSubmit = (data) => {
    const newCycle = {
      id: Date.now(),
      ...data,
      daysPregnant: 0,
      dueDate: null,
    };

    setCycles([newCycle, ...cycles]);
    alertService.success(
      "Evento reproductivo registrado correctamente",
      "Éxito"
    );
    reset();
    setShowModal(false);
  };

  if (viewMode === "calendar") {
    return (
      <div className="space-y-6">
        <div className="flex justify-end mb-4">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex gap-1 shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
              title="Vista de Lista"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className="p-2 rounded-md bg-green-50 text-green-600 shadow-sm transition-all"
              title="Vista de Calendario"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
        <ReproductionCalendar onSchedule={() => setShowModal(true)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Ciclos Reproductivos
        </h1>

        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex gap-1 shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className="p-2 rounded-md bg-primary-50 text-primary-600 shadow-sm transition-all"
              title="Vista de Lista"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
              title="Vista de Calendario"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Registrar Evento</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* ... stats content ... */}
        <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-medium">En Celo</p>
              <p className="text-3xl font-bold text-pink-700">8</p>
            </div>
            <span className="text-4xl">💓</span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Inseminadas</p>
              <p className="text-3xl font-bold text-purple-700">12</p>
            </div>
            <span className="text-4xl">🧬</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Preñadas</p>
              <p className="text-3xl font-bold text-blue-700">45</p>
            </div>
            <span className="text-4xl">🤰</span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Próximos Partos
              </p>
              <p className="text-3xl font-bold text-green-700">7</p>
            </div>
            <span className="text-4xl">🐄</span>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Vacías</p>
              <p className="text-3xl font-bold text-orange-700">18</p>
            </div>
            <span className="text-4xl">⚠️</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Todos los estados</option>
            {Object.entries(REPRODUCTION_STATUS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Buscar por ID o nombre..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />

          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Buscar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Último Celo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Fecha Inseminación
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Días de Gestación
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Fecha Parto Estimada
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cycles.map((cycle) => (
                <tr key={cycle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                        <span className="text-lg">🐄</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {cycle.animal}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        cycle.status === "Preñada"
                          ? "bg-blue-100 text-blue-800"
                          : cycle.status === "En Celo"
                          ? "bg-pink-100 text-pink-800"
                          : cycle.status === "Inseminada"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {cycle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(cycle.lastHeat).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {cycle.inseminationDate
                      ? new Date(cycle.inseminationDate).toLocaleDateString(
                          "es-ES"
                        )
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {cycle.daysPregnant > 0
                      ? `${cycle.daysPregnant} días`
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {cycle.dueDate
                      ? new Date(cycle.dueDate).toLocaleDateString("es-ES")
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline de eventos próximos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Eventos Próximos
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📅</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Parto Estimado - Vaca #001
              </p>
              <p className="text-sm text-gray-600">
                15 de Julio, 2025 (en 60 días)
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Preparar instalaciones de maternidad
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Detalles
            </button>
          </div>

          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔬</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Confirmación de Preñez - Vaca #012
              </p>
              <p className="text-sm text-gray-600">Hoy - Examen recomendado</p>
              <p className="text-sm text-gray-500 mt-1">
                21 días desde la inseminación
              </p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
              Programar
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900">
                  Registrar Evento Reproductivo
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Animal ID
                  </label>
                  <input
                    {...register("animal", {
                      required: "El ID del animal es requerido",
                    })}
                    placeholder="Ej. Vaca #001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.animal && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.animal.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Evento
                    </label>
                    <select
                      {...register("status")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="En Celo">Celo Detectado</option>
                      <option value="Inseminada">Inseminación</option>
                      <option value="Preñada">Confirmación Preñez</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      {...register("lastHeat", {
                        required: "La fecha es requerida",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                    {errors.lastHeat && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastHeat.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observaciones
                  </label>
                  <textarea
                    {...register("notes")}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Detalles adicionales..."
                  ></textarea>
                </div>

                <div className="pt-4 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
