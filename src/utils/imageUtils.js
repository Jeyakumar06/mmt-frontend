import { IMAGE_BASE } from "../api/adminApi";
/**
 * Normalize any image shape from the backend into { id, url }.
 * Backend may return { id, imageUrl } or { id, url } or a plain string.
 */
export function resolveImage(img) {
  if (!img) return { id: null, url: null };
  if (typeof img === "string") {
    return {
      id: null,
      url: img.startsWith("http") ? img : `${IMAGE_BASE}/${img.replace(/^\//, "")}`,
    };
  }
  const rawUrl = img.imageUrl || img.url || "";
  const url = rawUrl.startsWith("http")
    ? rawUrl
    : `${IMAGE_BASE}/${rawUrl.replace(/^\//, "")}`;
  return { id: img.id ?? null, url };
}