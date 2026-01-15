import { useState, useEffect } from "react";
import { reproductionService } from "../../../shared/services/reproductionService";

export const useReproductionEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]); // Items for list view

  const [farmId, setFarmId] = useState(null);

  useEffect(() => {
    // Attempt to get farmId from localStorage, similar to other MFs
    const authStorage = localStorage.getItem("auth-storage");
    let foundId = 1; // Default to 1 (Mock)
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        if (parsed?.state?.selectedFarm?.id) {
          foundId = parsed.state.selectedFarm.id;
        }
      } catch (e) {
        console.error("Error parsing auth storage", e);
      }
    }
    setFarmId(foundId);
  }, []);

  const fetchEvents = async () => {
    if (!farmId) {
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const data = await reproductionService.getEventsByFarm(farmId);
      
      setEvents(data);
      setItems(data); // Sync items
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar eventos de reproducción");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [farmId]);

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      // Ensure farmId is included if missing
      if (!eventData.farmId && farmId) {
        eventData.farmId = Number(farmId);
      }
      await reproductionService.createEvent(eventData);
      // Refresh
      await fetchEvents();
      return true;
    } catch (err) {
      setError("Error al crear evento");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelEvent = async (id) => {
    try {
      await reproductionService.cancelEvent(id);
      await fetchEvents();
    } catch (err) {
      setError("Error al cancelar evento");
    }
  };

  return {
    events,
    items,
    loading,
    error,
    farmId,
    createEvent,
    cancelEvent,
    refetch: fetchEvents,
  };
};
