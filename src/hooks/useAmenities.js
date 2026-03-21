import { useState, useCallback } from "react";
import * as api from "../api/adminApi";

export function useAmenities() {
  const [amenities, setAmenities] = useState([]);

  const load = useCallback(async () => {
    try {
      const data = await api.getAmenities();
      setAmenities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Amenities load failed:", err.message);
    }
  }, []);

  return { amenities, load };
}
