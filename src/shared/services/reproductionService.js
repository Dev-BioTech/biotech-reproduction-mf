import apiClient from "../utils/apiClient";

/**
 * Reproduction Service
 * All calls go to POST/GET/PUT /api/v1/Reproduction
 */
export const reproductionService = {
  // ── POST /api/v1/reproduction ──────────────────────────────────────────
  createEvent: async (eventData) => {
    const response = await apiClient.post("/v1/reproduction", eventData);
    return response.data;
  },

  // ── GET /api/v1/reproduction/{id} ─────────────────────────────────────
  getEventById: async (id) => {
    const response = await apiClient.get(`/v1/reproduction/${id}`);
    return response.data;
  },

  // ── GET /api/v1/reproduction/farm ────────────────────────────
  // Uses context from X-Farm-Id header instead of route param
  getEventsByFarm: async (farmId, params = {}) => {
    const query = new URLSearchParams();
    if (params.fromDate) query.append("fromDate", params.fromDate);
    if (params.toDate) query.append("toDate", params.toDate);
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/reproduction/farm${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── GET /api/v1/reproduction/farm (context from JWT) ──────────────────
  getEventsByFarmContext: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.fromDate) query.append("fromDate", params.fromDate);
    if (params.toDate) query.append("toDate", params.toDate);
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/reproduction/farm${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── GET /api/v1/reproduction/animal/{animalId} ────────────────────────
  getEventsByAnimal: async (animalId, params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/reproduction/animal/${animalId}${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── GET /api/v1/reproduction/type/{type} ──────────────────────────────
  getEventsByType: async (type, params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/reproduction/type/${type}${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── PUT /api/v1/reproduction/{id}/cancel ──────────────────────────────
  cancelEvent: async (id) => {
    const response = await apiClient.put(`/v1/reproduction/${id}/cancel`);
    return response.data;
  },

  // ── GET /api/v1/reproduction/pregnancies/farm/{farmId} ──
  // Used by PregnancyTracking.jsx
  getPregnanciesByFarm: async (farmId) => {
    try {
      const response = await apiClient.get(
        `/v1/reproduction/pregnancies/farm/${farmId}`,
      );
      const data = response.data;
      return Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
    } catch (error) {
      console.warn(
        "GET /v1/reproduction/pregnancies/farm — endpoint not yet available:",
        error?.response?.status,
      );
      return [];
    }
  },

  // ── GET /api/v1/reproduction/births/farm/{farmId} ──
  // Used by BirthRegistry.jsx
  getBirthsByFarm: async (farmId) => {
    try {
      const response = await apiClient.get(
        `/v1/reproduction/births/farm/${farmId}`,
      );
      const data = response.data;
      return Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
    } catch (error) {
      console.warn(
        "GET /v1/reproduction/births/farm — endpoint not yet available:",
        error?.response?.status,
      );
      return [];
    }
  },

  // ── POST /api/v1/reproduction/register-birth ──────────────
  postBirth: async (birthData) => {
    const response = await apiClient.post(
      "/v1/reproduction/register-birth",
      birthData,
    );
    return response.data;
  },
};

export default reproductionService;
