import { useState, useEffect, useCallback } from "react";
import { X, AlertCircle, RefreshCw } from "lucide-react";
import ImageManager from "./ImageManager";

const EMPTY_FORM = {
  name: "", location: "", price: "", bhk: "", guestCapacity: "",
  pool: "Private", beachView: false, description: "", amenityIds: [],
};

export default function VillaModal({
  villa = null,        // null = add mode, object = edit mode
  amenities = [],
  onSubmit,            // async (payload, files, villaId?) => void
  onDeleteImage,       // async (imageId) => void
  onReplaceImage,      // async (imageId, file) => void
  onClose,
}) {
  const [formData,  setFormData]  = useState(EMPTY_FORM);
  const [staged,    setStaged]    = useState([]);     // File[]
  const [previews,  setPreviews]  = useState([]);     // blob URLs
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState(null);

  // Seed form when opening in edit mode
  useEffect(() => {
    if (villa) {
      setFormData({
        name:          villa.name          || "",
        location:      villa.location      || "",
        price:         villa.price?.toString()         || "",
        bhk:           villa.bhk?.toString()           || "",
        guestCapacity: villa.guestCapacity?.toString() || "",
        pool:          villa.pool          || "Private",
        beachView:     villa.beachView     || false,
        description:   villa.description   || "",
        amenityIds:    villa.amenities?.map(a => (typeof a === "object" ? a.id : a)) || [],
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setStaged([]);
    setPreviews([]);
    setError(null);
  }, [villa]);

  // Revoke blob URLs on unmount / staged change to avoid memory leaks
  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageFiles = useCallback((files) => {
    const urls = files.map(f => URL.createObjectURL(f));
    setStaged(p  => [...p, ...files]);
    setPreviews(p => [...p, ...urls]);
  }, []);

  const removeStaged = useCallback((i) => {
    URL.revokeObjectURL(previews[i]);
    setStaged(p  => p.filter((_, j) => j !== i));
    setPreviews(p => p.filter((_, j) => j !== i));
  }, [previews]);

  const field = (key, val) => setFormData(f => ({ ...f, [key]: val }));

  const toggleAmenity = (id) =>
    setFormData(f => ({
      ...f,
      amenityIds: f.amenityIds.includes(id)
        ? f.amenityIds.filter(x => x !== id)
        : [...f.amenityIds, id],
    }));

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.price) {
      setError("Name, location, and price are required.");
      return;
    }
    const payload = {
      name:          formData.name,
      location:      formData.location,
      price:         Number(formData.price),
      bhk:           Number(formData.bhk),
      guestCapacity: Number(formData.guestCapacity),
      pool:          formData.pool,
      beachView:     formData.beachView,
      description:   formData.description,
      amenities:     formData.amenityIds.map(id => ({ id })),
    };
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit(payload, staged, villa?.id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const submitLabel = villa ? "Update Villa" : "Add Villa";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">

        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{villa ? "Edit Villa" : "Add New Villa"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Villa Images</label>
            <ImageManager
              savedImages={villa?.images || []}
              stagedFiles={staged}
              stagedPreviews={previews}
              submitLabel={submitLabel}
              onStage={stageFiles}
              onRemoveStaged={removeStaged}
              onDeleteSaved={(imgId) => onDeleteImage(imgId, villa.id)}
              onReplaceSaved={(imgId, file) => onReplaceImage(imgId, villa.id, file)}
            />
          </div>

          {/* Text fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Villa Name *",          key: "name",          type: "text",   placeholder: "Enter villa name" },
              { label: "Location *",             key: "location",      type: "text",   placeholder: "ECR, Chennai" },
              { label: "Price per Night (₹) *", key: "price",         type: "number", placeholder: "25000" },
              { label: "BHK",                   key: "bhk",           type: "number", placeholder: "4" },
              { label: "Guest Capacity",         key: "guestCapacity", type: "number", placeholder: "12" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <input
                  type={type}
                  value={formData[key]}
                  placeholder={placeholder}
                  onChange={e => field(key, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pool Type</label>
              <select
                value={formData.pool}
                onChange={e => field("pool", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option>Private</option>
                <option>Shared</option>
                <option>None</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              placeholder="Enter villa description"
              onChange={e => field("description", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Beach View */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.beachView}
              onChange={e => field("beachView", e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Beach View</span>
          </label>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
            {amenities.length === 0 ? (
              <p className="text-sm text-gray-400">No amenities loaded.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenities.map(a => {
                  const checked = formData.amenityIds.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all
                        ${checked ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(a.id)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{a.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {submitting && <RefreshCw className="w-4 h-4 animate-spin" />}
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
