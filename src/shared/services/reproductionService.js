import apiClient from "../utils/apiClient";

export const reproductionService = {
  // Create a new reproduction event
  createEvent: async (eventData) => {
    try {
      // POST /api/v1/Reproduction
      const response = await apiClient.post("/v1/Reproduction", eventData);
      return response.data;
    } catch (error) {
      console.error("Error creating reproduction event:", error);
      throw error;
    }
  },

  // Get reproduction events by Farm ID
  getEventsByFarm: async (farmId) => {
    try {
      // GET /api/v1/Reproduction/farm/{farmId}
      const response = await apiClient.get(`/v1/Reproduction/farm/${farmId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching reproduction events for farm ${farmId}:`,
        error
      );
      throw error;
    }
  },

  // Get reproduction events by Animal ID
  getEventsByAnimal: async (animalId) => {
    try {
      // GET /api/v1/Reproduction/animal/{animalId}
      const response = await apiClient.get(
        `/v1/Reproduction/animal/${animalId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching reproduction events for animal ${animalId}:`,
        error
      );
      throw error;
    }
  },

  // Get reproduction events by Event Type
  getEventsByType: async (type) => {
    try {
      // GET /api/v1/Reproduction/type/{type}
      const response = await apiClient.get(`/v1/Reproduction/type/${type}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching reproduction events of type ${type}:`,
        error
      );
      throw error;
    }
  },

  // Get a specific reproduction event by ID
  getEventById: async (id) => {
    try {
      // GET /api/v1/Reproduction/{id}
      const response = await apiClient.get(`/v1/Reproduction/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reproduction event ${id}:`, error);
      throw error;
    }
  },

  // Cancel (soft delete) a reproduction event
  cancelEvent: async (id) => {
    try {
      // PUT /api/v1/Reproduction/{id}/cancel
      const response = await apiClient.put(`/v1/Reproduction/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling reproduction event ${id}:`, error);
      throw error;
    }
  },
};

export default reproductionService;
