import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

export function ReproductionEventForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    animalId: "",
    eventType: "Inseminacion", // Insemination, Palpation, Birth, etc. matching backend enum/string
    eventDate: new Date().toISOString().split("T")[0],
    notes: "",
    technician: "", // Optional if needed
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        ...formData,
        animalId: Number(formData.animalId), // Ensure numeric
        // map eventType if needed by backend, assuming string match for now
      });
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Animal
          </label>
          <input
            type="number"
            required
            value={formData.animalId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, animalId: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Ej. 102"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Evento
          </label>
          <select
            value={formData.eventType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, eventType: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="Celo">Celo (Heat)</option>
            <option value="Inseminacion">Inseminación</option>
            <option value="Palpacion">Palpación</option>
            <option value="Parto">Parto</option>
            <option value="Aborto">Aborto</option>
            <option value="Secado">Secado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            required
            value={formData.eventDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, eventDate: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Técnico / Responsable
          </label>
          <input
            type="text"
            value={formData.technician}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, technician: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Opcional"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas
        </label>
        <textarea
          rows="3"
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 text-white bg-pink-600 hover:bg-pink-700 rounded-xl font-medium flex justify-center items-center gap-2 shadow-lg shadow-pink-200"
        >
          {isSubmitting ? (
            "Guardando..."
          ) : (
            <>
              <Save className="w-4 h-4" /> Guardar
            </>
          )}
        </button>
      </div>
    </form>
  );
}
