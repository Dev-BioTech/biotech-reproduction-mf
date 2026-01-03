import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "reproductionMF",
      filename: "remoteEntry.js",
      exposes: {
        "./ReproductionCycles":
          "./src/features/reproduction-cycles/components/ReproductionCycles.jsx",
        "./PregnancyTracking":
          "./src/features/pregnancy-tracking/components/PregnancyTracking.jsx",
        "./BirthRegistry":
          "./src/features/birth-registry/components/BirthRegistry.jsx",
        "./ReproductionMonitor":
          "./src/features/reproduction-monitor/components/ReproductionMonitor.jsx",
        "./ReproductionStore": "./src/shared/store/reproductionStore.js",
      },
      shared: ["react", "react-dom", "react-router-dom", "zustand", "axios"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      // Alias to access shared services from Shell
      "@shared-services": path.resolve(
        __dirname,
        "../biotech-shell/src/shared/services"
      ),
    },
  },
  server: {
    port: 5005,
    cors: true,
    fs: {
      allow: [".."],
    },
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
