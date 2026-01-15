import {
  MOCK_REPRODUCTION_EVENTS,
  MOCK_EVENT_TYPES,
} from "../mocks/reproductionData";

export const reproductionService = {
  // Create a new reproduction event
  createEvent: async (eventData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newEvent = {
        id: String(MOCK_REPRODUCTION_EVENTS.length + 1),
        ...eventData,
        status: "Programado", // Default status
      };
      MOCK_REPRODUCTION_EVENTS.push(newEvent);
      return newEvent;
    } catch (error) {
      console.error("Error creating reproduction event:", error);
      throw error;
    }
  },

  // Get reproduction events by Farm ID
  getEventsByFarm: async (farmId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_REPRODUCTION_EVENTS.filter(
        (event) => event.farmId === farmId
      );
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_REPRODUCTION_EVENTS.filter(
        (event) => event.animalId === animalId
      );
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_REPRODUCTION_EVENTS.filter((event) => event.type === type);
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
      await new Promise((resolve) => setTimeout(resolve, 200));
      const event = MOCK_REPRODUCTION_EVENTS.find((e) => e.id === id);
      if (!event) throw new Error("Reproduction event not found");
      return event;
    } catch (error) {
      console.error(`Error fetching reproduction event ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/v1/Reproduction/{id} - Cancel/Delete a reproduction event
  cancelEvent: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = MOCK_REPRODUCTION_EVENTS.findIndex((e) => e.id === id);
      if (index === -1) throw new Error("Reproduction event not found");
      MOCK_REPRODUCTION_EVENTS.splice(index, 1);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting reproduction event ${id}:`, error);
      throw error;
    }
  },

  // Get available event types
  getEventTypes: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_EVENT_TYPES;
    } catch (error) {
      console.error("Error fetching event types:", error);
      return [];
    }
  },
};

export default reproductionService;
