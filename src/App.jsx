import { useState } from "react";
import { Layout } from "@/layout/components/Layout";
import { ReproductionMonitor } from "./features/reproduction-monitor/components/ReproductionMonitor";
import PregnancyTracking from "./features/pregnancy-tracking/components/PregnancyTracking";
import BirthRegistry from "./features/birth-registry/components/BirthRegistry";

import { Activity, Baby, Heart, ClipboardList } from "lucide-react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("monitor");

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans text-gray-900">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Navigation Tabs */}
          <div className="flex justify-center sticky top-4 z-30">
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-gray-100 inline-flex gap-2">
              <button
                onClick={() => setActiveTab("monitor")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === "monitor"
                    ? "bg-pink-600 text-white shadow-md scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-pink-600"
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                Registros (Real)
              </button>
              <button
                onClick={() => setActiveTab("cycles")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === "cycles"
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <Activity className="w-4 h-4" />
                Ciclos
              </button>
              <button
                onClick={() => setActiveTab("pregnancy")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === "pregnancy"
                    ? "bg-purple-600 text-white shadow-md scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                }`}
              >
                <Heart className="w-4 h-4" />
                Gestación
              </button>
              <button
                onClick={() => setActiveTab("births")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === "births"
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <Baby className="w-4 h-4" />
                Nacimientos
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-6 min-h-[600px] backdrop-blur-xl">
            {activeTab === "monitor" && <ReproductionMonitor />}
            {activeTab === "cycles" && (
              <div className="p-10 text-center text-gray-400">
                Vista de ciclos detallada en construcción (Usar Registros)
              </div>
            )}
            {activeTab === "pregnancy" && <PregnancyTracking />}
            {activeTab === "births" && <BirthRegistry />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
