import { useState } from "react";
import { Search, Plus, AlertCircle, RefreshCw } from "lucide-react";
import VillaCard from "./VillaCard";
import VillaModal from "./VillaModal";
import { toast } from "react-toastify";

export default function VillasTab({ villas, amenities, loading, error, onLoad, hooks }) {
  const [search,  setSearch]  = useState("");
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = villas.filter(v =>
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.location?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd  = () => { setEditing(null); setModal(true); };
  const openEdit = (v) => { setEditing(v);   setModal(true); };
  const close    = () => { setModal(false); setEditing(null); };

  // ✅ FIXED: toast on success, toast on error, modal closes only on success
  const handleSubmit = async (payload, files, villaId) => {
    try {
      if (villaId) {
        await hooks.update(villaId, payload, files);
        toast.success(`"${payload.name}" has been updated.`);
      } else {
        await hooks.create(payload, files);
         toast.success(`"${payload.name}" has been added.`);
      }
      close();
    } catch (err) {
       toast.error(err.message || "Something went wrong.");
    }
  };

  // ✅ FIXED: toast on delete success/error
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this villa and all its images?")) return;
    try {
      await hooks.remove(id);
     toast.success("Villa deleted successfully.");
    } catch (err) {
      toast.error(err.message || "Delete failed.");
    }
  };

  // ✅ FIXED: toast on image delete success/error
  const handleDeleteImage = async (imageId, villaId) => {
    if (!window.confirm("Delete this image permanently?")) return;
    try {
      await hooks.removeImage(imageId, villaId);
     toast.success("Image deleted successfully.");
    } catch (err) {
      toast.error(err.message || "Image delete failed.");
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search villas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />Add New Villa
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
          <p>Loading villas…</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700">Failed to load villas</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <button onClick={onLoad} className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(villa => (
            <VillaCard
              key={villa.id}
              villa={villa}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">No villas found.</div>
          )}
        </div>
      )}

      {modal && (
        <VillaModal
          villa={editing}
          amenities={amenities}
          onSubmit={handleSubmit}
          onDeleteImage={handleDeleteImage}
          onReplaceImage={hooks.swapImage}
          onClose={close}
        />
      )}
    </div>
  );
}