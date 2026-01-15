import { useState } from "react";
import { Plus, Search, Calendar, Heart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useReproductionEvents } from "../hooks/useReproductionEvents";
import { ReproductionEventForm } from "./ReproductionEventForm";
import alertService from "../../../shared/utils/alertService";

export function ReproductionMonitor() {
  const { events, loading, error, createEvent, cancelEvent, farmId } =
    useReproductionEvents();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleCreate = async (data) => {
    try {
      await createEvent(data);
      alertService.success("Evento registrado correctamente", "Éxito");
      setIsModalOpen(false);
    } catch (e) {
      alertService.error("Error al registrar evento", "Error");
    }
  };

  const safeEvents = Array.isArray(events) ? events : [];

  const filteredEvents = safeEvents.filter((e) => {
    const term = searchTerm.toLowerCase();
    const idStr = String(e.animalId || "");
    const typeStr = String(e.eventType || "");
    return (
      idStr.toLowerCase().includes(term) || typeStr.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-900">Reproducción</h1>
          <p className="text-pink-600">
            Gestión de ciclos y eventos reproductivos
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 shadow-lg shadow-pink-200 transition-all font-bold"
        >
          <Plus className="w-5 h-5" /> Nuevo Evento
        </button>
      </div>

      {/* Warning if no farm */}
      {!farmId && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl border border-yellow-200">
          ⚠️ Selecciona una granja para ver los datos.
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex items-center gap-3">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por ID animal o tipo..."
          className="flex-1 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-10 text-pink-400">
          Cargando eventos...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
          <Heart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No hay eventos registrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={String(event.id || Math.random())}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-pink-500 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {String(event.eventType || "Evento")}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{" "}
                    {event.eventDate
                      ? new Date(event.eventDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Animal #{String(event.animalId || "?")}
                </h3>
                {event.notes && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {String(event.notes)}
                  </p>
                )}

                {event.technician && (
                  <div className="text-xs text-gray-400 mt-2">
                    Tec: {String(event.technician)}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                <button
                  onClick={async () => {
                    const result = await alertService.confirm(
                      "¿Estás seguro de cancelar este evento?",
                      "Confirmar Acción",
                      "Sí, cancelar",
                      "No"
                    );
                    if (result.isConfirmed) {
                      try {
                        await cancelEvent(event.id);
                        alertService.success(
                          "Evento cancelado correctamente",
                          "Cancelado"
                        );
                      } catch (e) {
                        alertService.error(
                          "Error al cancelar el evento",
                          "Error"
                        );
                      }
                    }
                  }}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Cancelar Evento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-pink-900 mb-6">
              Registrar Evento Reproductivo
            </h2>
            <ReproductionEventForm
              onSubmit={handleCreate}
              onCancel={() => setIsModalOpen(false)}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ReproductionMonitor;
