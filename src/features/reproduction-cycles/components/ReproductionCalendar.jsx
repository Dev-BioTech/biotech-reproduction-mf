import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react";
import { motion } from "motion/react";

export function ReproductionCalendar({ onSchedule }) {
  const [currentMonth, setCurrentMonth] = useState(11); // December
  const [currentYear, setCurrentYear] = useState(2024);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const events = [
    {
      date: "2024-12-15",
      animal: "Luna (BOV-001)",
      type: "Inseminación",
      status: "pending",
    },
    {
      date: "2024-12-18",
      animal: "Estrella (BOV-003)",
      type: "Chequeo",
      status: "pending",
    },
    {
      date: "2024-12-22",
      animal: "Rosita (POR-001)",
      type: "Parto Esperado",
      status: "pending",
    },
    {
      date: "2024-12-08",
      animal: "Nube (OVI-001)",
      type: "Inseminación",
      status: "completed",
    },
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const upcomingEvents = events.filter((e) => e.status === "pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-green-900 mb-2 font-bold text-3xl">
            Calendario Reproductivo
          </h1>
          <p className="text-green-600">
            {upcomingEvents.length} eventos programados
          </p>
        </motion.div>

        <motion.button
          onClick={onSchedule}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Programar Evento
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg p-6 border-2 border-pink-200"
        >
          <h3 className="text-pink-900 mb-1 text-xl font-bold">8</h3>
          <p className="text-pink-600">Inseminaciones</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-6 border-2 border-purple-200"
        >
          <h3 className="text-purple-900 mb-1 text-xl font-bold">5</h3>
          <p className="text-purple-600">Partos Esperados</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border-2 border-blue-200"
        >
          <h3 className="text-blue-900 mb-1 text-xl font-bold">12</h3>
          <p className="text-blue-600">En Gestación</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border-2 border-green-200"
        >
          <h3 className="text-green-900 mb-1 text-xl font-bold">85%</h3>
          <p className="text-green-600">Tasa de Éxito</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-green-900 text-xl font-bold">
              {months[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-green-100 rounded-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-green-600" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-green-100 rounded-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div
                key={day}
                className="text-center py-2 text-green-600 font-medium"
              >
                {day}
              </div>
            ))}

            {/* Empty days */}
            {emptyDays.map((i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days */}
            {days.map((day) => {
              const dayEvents = getEventsForDate(day);
              const hasEvent = dayEvents.length > 0;
              const isToday =
                day === 13 && currentMonth === 11 && currentYear === 2024;

              return (
                <motion.div
                  key={day}
                  whileHover={hasEvent ? { scale: 1.05 } : {}}
                  className={`aspect-square p-2 rounded-xl border-2 transition-all cursor-pointer ${
                    isToday
                      ? "bg-green-600 text-white border-green-700"
                      : hasEvent
                      ? "bg-pink-100 border-pink-300 hover:bg-pink-200"
                      : "bg-white border-green-100 hover:bg-green-50"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <span
                      className={`text-center font-medium ${
                        isToday ? "text-white" : "text-green-900"
                      }`}
                    >
                      {day}
                    </span>
                    {hasEvent && (
                      <div className="flex-1 flex items-center justify-center">
                        <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
        >
          <h2 className="text-green-900 mb-6 text-xl font-bold">
            Próximos Eventos
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-green-900 mb-1 font-medium">
                      {event.type}
                    </p>
                    <p className="text-green-600 mb-2 text-sm">
                      {event.animal}
                    </p>
                    <p className="text-pink-600 text-xs font-medium">
                      {event.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
