import { useState } from "react";
import { motion } from "motion/react";
import { useReproductionStore } from "@/shared/store/reproductionStore";
import { Baby, Weight, Ruler, Calendar, Check } from "lucide-react";
import { useToastStore } from "@/shared/store/toastStore";
import { useForm } from "react-hook-form";

export default function BirthRegistry() {
  const { births, setBirths } = useReproductionStore();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showForm, setShowForm] = useState(false);

  // Mock data initialization
  useState(() => {
    if (births.length === 0) {
      setBirths([
        {
          id: 1,
          mother: "Vaca #001",
          calfId: "BEC-001",
          birthDate: "2024-12-01",
          weight: 35,
          gender: "Macho",
          notes: "Parto normal",
        },
        {
          id: 2,
          mother: "Vaca #004",
          calfId: "BEC-002",
          birthDate: "2024-12-10",
          weight: 32,
          gender: "Hembra",
          notes: "Asistido",
        },
      ]);
    }
  });

  const onSubmit = (data) => {
    const newBirth = {
      id: Date.now(),
      ...data,
    };
    setBirths([newBirth, ...births]);
    addToast("Nacimiento registrado exitosamente", "success");
    reset();
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Registro de Nacimientos
          </h1>
          <p className="text-gray-500 mt-1">Gestionar partos y nuevas crías</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg flex items-center gap-2 transition-all"
        >
          <Baby className="w-5 h-5" />
          {showForm ? "Cancelar Registro" : "Registrar Nacimiento"}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: showForm ? "auto" : 0, opacity: showForm ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-900">
            Nuevo Registro
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Madre (ID)
              </label>
              <input
                {...register("mother", { required: true })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Ej: Vaca #001"
              />
              {errors.mother && (
                <span className="text-red-500 text-xs">Requerido</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Cría
              </label>
              <input
                {...register("calfId", { required: true })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Ej: BEC-003"
              />
              {errors.calfId && (
                <span className="text-red-500 text-xs">Requerido</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Nacimiento
              </label>
              <input
                type="date"
                {...register("birthDate", { required: true })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight", { required: true })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sexo
                </label>
                <select
                  {...register("gender")}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas
              </label>
              <textarea
                {...register("notes")}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                rows="2"
                placeholder="Observaciones del parto..."
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Guardar Registro
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {births.map((birth) => (
          <motion.div
            key={birth.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div
                className={`p-3 rounded-full flex-shrink-0 ${
                  birth.gender === "Hembra"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <Baby className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {birth.calfId}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({birth.gender})
                  </span>
                </h3>
                <p className="text-sm text-gray-600">Madre: {birth.mother}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {birth.birthDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Weight className="w-4 h-4" />
                {birth.weight} kg
              </div>
              <button
                className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                title="Ver Ficha"
              >
                <Ruler className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
