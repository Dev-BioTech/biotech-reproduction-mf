import { useState } from "react";
import {
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Beef,
  Users,
  Activity,
  Syringe,
  Milk,
  Egg,
  Scale,
  ClipboardList,
  Thermometer,
  Leaf,
  FlaskConical,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  // Exact replication of Shell Menu Items
  const menuItems = [
    { title: "Dashboard", url: "#dashboard", icon: Home, active: false },
    { title: "Animales", url: "#animals", icon: Beef, active: false },
    { title: "Usuarios", url: "#users", icon: Users, active: false },
    { title: "Salud", url: "#health", icon: Activity, active: false },
    { title: "Vacunación", url: "#vaccination", icon: Syringe, active: false },
    { title: "Producción Leche", url: "#milk", icon: Milk, active: false },
    { title: "Producción Huevos", url: "#eggs", icon: Egg, active: false },
    { title: "Pesaje", url: "#weight", icon: Scale, active: false },
    { title: "Reportes", url: "#reports", icon: ClipboardList, active: false },
    { title: "Clima", url: "#climate", icon: Thermometer, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isOpen ? 256 : 80 }}
        animate={{ width: isOpen ? 256 : 80 }}
        className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 flex flex-col shadow-sm"
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-gray-100 bg-white">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white flex-shrink-0">
            <Leaf className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col overflow-hidden"
              >
                <span className="font-bold text-gray-800 text-sm whitespace-nowrap leading-tight">
                  BioTech Farm
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap leading-tight">
                  Gestión Agrícola
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 mb-2">
            <span
              className={`text-xs font-semibold text-gray-400 uppercase tracking-wider ${
                !isOpen && "hidden"
              }`}
            >
              Plataforma
            </span>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                item.active
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
              }`}
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0 ${
                  item.active
                    ? "text-white"
                    : "text-gray-500 group-hover:text-green-600"
                }`}
              />

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium text-sm whitespace-nowrap overflow-hidden text-left"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Wrapper */}
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isOpen ? "256px" : "80px" }}
      >
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 text-gray-400 text-sm w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
            <div className="w-8 h-8 bg-green-100 rounded-full border border-green-200 flex items-center justify-center text-green-700 font-bold text-xs uppercase group-hover:scale-105 transition-transform">
              U
            </div>
            <div className="flex flex-col items-start mr-1">
              <span className="text-xs font-bold text-gray-700 group-hover:text-green-700">
                Usuario
              </span>
              <span className="text-xs text-gray-400">admin@biotech.com</span>
            </div>
            <ChevronLeft className="w-3 h-3 text-gray-400 -rotate-90" />
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
