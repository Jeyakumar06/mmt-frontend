import { useState } from "react";
import { MapPin, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { resolveImage } from "../../utils/imageUtils";

export default function VillaCard({ villa, onEdit, onDelete }) {
  const [idx, setIdx] = useState(0);
  const images = (villa.images || []).map(resolveImage);
  const total  = images.length;

  const prev = () => setIdx(i => (i === 0 ? total - 1 : i - 1));
  const next = () => setIdx(i => (i + 1) % total);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">

      {/* ── Carousel ── */}
      <div className="relative h-48 bg-gray-200">
        {total > 0 && images[idx]?.url ? (
          <img
            src={images[idx].url}
            alt={villa.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Images
          </div>
        )}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {idx + 1} / {total}
            </div>
          </>
        )}

        {villa.beachView && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
            Beach View
          </span>
        )}
      </div>

      {/* ── Info ── */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{villa.name}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4" />{villa.location}
        </p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{villa.description}</p>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {villa.amenities?.slice(0, 4).map((a, i) => (
            <span key={i} className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded">
              {typeof a === "object" ? a.name : a}
            </span>
          ))}
          {villa.amenities?.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{villa.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-600">
          <div>{villa.bhk} BHK</div>
          <div>{villa.guestCapacity} Guests</div>
          <div>{villa.pool} Pool</div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-sm text-gray-500">Price per night</p>
            <p className="text-xl font-bold text-teal-600">₹{villa.price?.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(villa)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(villa.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
