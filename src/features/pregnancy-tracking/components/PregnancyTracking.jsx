import { useState } from "react";
import { motion } from "motion/react";
import { useReproductionStore } from "@/shared/store/reproductionStore";
import { Calendar, Heart, Activity, AlertCircle } from "lucide-react";
import alertService from "@/shared/utils/alertService";

export default function PregnancyTracking() {
  const { pregnancies, setPregnancies } = useReproductionStore();

  // Mock data initialization if store is empty
  useState(() => {
    if (pregnancies.length === 0) {
      setPregnancies([
        {
          id: 1,
          animal: "Vaca #001",
          conceptionDate: "2024-10-16",
          daysPregnant: 60,
          status: "Saludable",
          nextCheckup: "2025-01-15",
        },
        {
          id: 2,
          animal: "Vaca #012",
          conceptionDate: "2024-11-21",
          daysPregnant: 24,
          status: "Riesgo Bajo",
          nextCheckup: "2024-12-21",
        },
      ]);
    }
  });

  const getHealthStatusColor = (status) => {
    switch (status) {
      case "Saludable":
        return "bg-green-100 text-green-800 border-green-200";
      case "Riesgo Bajo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Riesgo Alto":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdatedCheckup = () => {
    alertService.success("Fecha de chequeo actualizada correctamente", "Éxito");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Seguimiento de Gestación
        </h1>
        <button
          onClick={() =>
            alertService.info(
              "Funcionalidad de exportación en desarrollo",
              "En Desarrollo"
            )
          }
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Exportar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pregnancies.map((preg) => (
          <motion.div
            key={preg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-100 rounded-full">
                    <Heart className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {preg.animal}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Concepción: {preg.conceptionDate}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getHealthStatusColor(
                    preg.status
                  )}`}
                >
                  {preg.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progreso (9 meses)</span>
                    <span className="font-medium text-pink-600">
                      {Math.round((preg.daysPregnant / 280) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-pink-500 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${(preg.daysPregnant / 280) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {preg.daysPregnant} días de gestación
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3">
                  <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Próximo Chequeo
                    </p>
                    <p className="text-sm text-blue-700">{preg.nextCheckup}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={handleUpdatedCheckup}
                  className="text-sm text-gray-600 hover:text-primary-600 font-medium"
                >
                  Actualizar Estado
                </button>
                <button
                  onClick={() =>
                    alertService.info(
                      `Detalles de ${preg.animal} visualizados`,
                      "Información"
                    )
                  }
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all group"
          onClick={() =>
            alertService.info(
              "Formulario de registro en construcción",
              "En Desarrollo"
            )
          }
        >
          <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Heart className="w-8 h-8 text-gray-400 group-hover:text-pink-500" />
          </div>
          <h3 className="font-medium text-gray-900">Registrar Nueva Preñez</h3>
          <p className="text-sm text-gray-500 text-center mt-1">
            Añadir seguimiento para un animal
          </p>
        </motion.div>
      </div>
    </div>
  );
}
