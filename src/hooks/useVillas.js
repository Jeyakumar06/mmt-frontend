import { useState, useCallback } from "react";
import * as api from "../api/adminApi";

export function useVillas() {
  const [villas,    setVillas]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getVillas();
      setVillas(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload, files = []) => {
    const saved = await api.createVilla(payload);
    if (files.length > 0) await api.uploadImages(saved.id, files);
    await load();
    return saved;
  }, [load]);

  const update = useCallback(async (id, payload, files = []) => {
    const saved = await api.updateVilla(id, payload);
    if (files.length > 0) await api.uploadImages(id, files);
    await load();
    return saved;
  }, [load]);

  const remove = useCallback(async (id) => {
    await api.deleteVilla(id);
    setVillas(prev => prev.filter(v => v.id !== id));
  }, []);

  const removeImage = useCallback(async (imageId, villaId) => {
    await api.deleteImage(imageId);
    setVillas(prev =>
      prev.map(v =>
        v.id === villaId
          ? { ...v, images: v.images.filter(img => (img.id ?? img) !== imageId) }
          : v
      )
    );
  }, []);

  const swapImage = useCallback(async (imageId, villaId, file) => {
    await api.replaceImage(imageId, file);
    await load();
  }, [load]);

  return { villas, loading, error, load, create, update, remove, removeImage, swapImage };
}
