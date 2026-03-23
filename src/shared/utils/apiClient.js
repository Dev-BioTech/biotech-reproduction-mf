import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_GATEWAY_URL ||
  "https://api.biotech.159.54.176.254.nip.io/api";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        const state = parsed.state;
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
        if (state?.selectedFarm?.id) {
          config.headers["X-Farm-Id"] = state.selectedFarm.id;
          if (config.method === "get") {
            config.params = { ...config.params, farmId: state.selectedFarm.id };
          }
        }
      } catch (e) {
        console.error("Error parsing auth storage:", e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear session if there is genuinely no token.
      // Resource-level 401s (farm context issues) must NOT log the user out.
      try {
        const parsed = JSON.parse(localStorage.getItem("auth-storage") || "{}");
        if (!parsed?.state?.token) {
          localStorage.removeItem("auth-storage");
          window.dispatchEvent(new Event("auth-change"));
        }
      } catch {
        localStorage.removeItem("auth-storage");
        window.dispatchEvent(new Event("auth-change"));
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
