import { useRef } from "react";
import { Upload, X, ImagePlus, Trash2 } from "lucide-react";
import { resolveImage } from "../../utils/imageUtils";

/**
 * Handles both saved (server) images and staged (local preview) images.
 * Delegates actual API calls to parent via callbacks — this component is pure UI.
 */
export default function ImageManager({
  savedImages = [],       // villa.images from server
  stagedFiles = [],       // File[]
  stagedPreviews = [],    // blob URL[]
  onStage,                // (File[]) => void
  onRemoveStaged,         // (index) => void
  onDeleteSaved,          // (imageId) => void
  onReplaceSaved,         // (imageId, File) => void
  submitLabel = "Save",
}) {
  const inputRef = useRef(null);

  const handleFilePick = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) onStage(files);
    e.target.value = "";
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-5">

      {/* ── Saved images ── */}
      {savedImages.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Saved Images
          </p>
          <div className="grid grid-cols-4 gap-3">
            {savedImages.map((img, i) => {
              const { id: imgId, url: imgUrl } = resolveImage(img);
              return (
                <div
                  key={imgId ?? i}
                  className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Saved"
                    className="w-full h-24 object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    {imgId && (
                      <>
                        <label
                          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                          title="Replace"
                        >
                          <ImagePlus className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) onReplaceSaved(imgId, file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        <button
                          onClick={() => onDeleteSaved(imgId)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Staged previews ── */}
      {stagedPreviews.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest mb-2">
            Queued — uploaded when you click "{submitLabel}"
          </p>
          <div className="grid grid-cols-4 gap-3">
            {stagedPreviews.map((url, i) => (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden border-2 border-dashed border-teal-400"
              >
                <img src={url} alt={`Staged ${i + 1}`} className="w-full h-24 object-cover" />
                <button
                  onClick={() => onRemoveStaged(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Upload trigger ── */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <Upload className="w-8 h-8 text-gray-400" />
        <p className="text-sm text-gray-500">Add images</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFilePick}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
        >
          Choose Files
        </button>
      </div>
    </div>
  );
}
