import { useRoute } from "wouter";
import { Gallery } from "../components/Gallery";
import { MapPin, ShieldCheck, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api/axiosInstance";



const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


const resolveImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") {
    return img.startsWith("http") ? img : `${IMAGE_BASE_URL}/${img.replace(/^\//, "")}`;
  }
  const raw = img.imageUrl || img.url || "";
  if (!raw) return null;
  return raw.startsWith("http") ? raw : `${IMAGE_BASE_URL}/${raw.replace(/^\//, "")}`;
};

/** Convert all images in a villa to plain URL strings */
const normaliseVilla = (villa) => ({
  ...villa,
  images: (villa.images || []).map(resolveImageUrl).filter(Boolean),
  // amenities may be [{id, name}] objects — flatten to strings for display
  amenities: (villa.amenities || []).map((a) => (typeof a === "object" ? a.name : a)),
});

export default function VillaPage() {
  const [match, params] = useRoute("/villa/:id");
  const [guests, setGuests]   = useState(2);
  const [addons, setAddons]   = useState([]);

  const [villa, setVilla]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Fetch by ID directly — avoids loading all villas just to find one
        const { data } = await api.get(`/api/villas/${params?.id}`);
        setVilla(normaliseVilla(data));
      } catch (err) {
        // Fallback: if no single-villa endpoint, search the list
        try {
          const { data: listData } = await api.get("/api/villas");
          const list = listData.content ?? listData;
          const found = list.find((v) => v.id === parseInt(params?.id));
          if (!found) throw new Error("Villa not found");
          setVilla(normaliseVilla(found));
        } catch (fallbackErr) {
          setError(fallbackErr.response?.data?.message || fallbackErr.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchVilla();
  }, [params?.id]);

  const availableAddons = [
    { id: "campfire", name: "Campfire Setup",    price: 0 },
    { id: "chef",     name: "Private Chef",       price: 0 },
    { id: "decor",    name: "Event Decoration",   price: 0 },
    { id: "games",    name: "Extra Games Kit",    price: 0  },
  ];

  const toggleAddon = (id) =>
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const totalPrice = villa
    ? villa.price + addons.reduce((acc, id) => {
        const addon = availableAddons.find((a) => a.id === id);
        return acc + (addon ? addon.price : 0);
      }, 0)
    : 0;

  const handleWhatsAppClick = () => {
    const selectedAddons = availableAddons
      .filter((a) => addons.includes(a.id))
      .map((a) => a.name)
      .join(", ");

    const message =
      `Hi MMT Resorts, I'm interested in booking this ECR beach-view villa:%0A` +
      `Villa: *${villa.name}*%0A` +
      `Guests: ${guests}%0A` +
      `Price: ₹${totalPrice}%0A` +
      `Add-ons: ${selectedAddons || "None"}%0A` +
      `Please check availability.`;

    window.open(`https://wa.me/918940294931?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-lg">Loading villa details...</p>
      </div>
    );
  }

  if (error || !villa) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle size={48} className="text-red-400" />
        <h2 className="text-2xl font-bold text-gray-700">
          {error === "Villa not found" ? "Villa Not Found" : "Something went wrong"}
        </h2>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a> /{" "}
          <a href="/villas" className="hover:text-primary">Villas</a> /{" "}
          <span className="text-primary font-medium">{villa.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery — receives plain string URLs ✅ */}
            {villa.images.length > 0 ? (
              <Gallery images={villa.images} />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                No images available
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/50">
              <div className="flex flex-wrap gap-3 mb-6">
                {villa.beachView && (
                  <span className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-bold rounded-full">
                    Beach View
                  </span>
                )}
                {villa.pool && (
                  <span className="px-3 py-1 bg-primary/5 text-primary text-sm font-bold rounded-full">
                    {villa.pool} Pool
                  </span>
                )}
                {villa.bhk && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">
                    {villa.bhk} BHK
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                {villa.name}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin size={18} />
                <span>{villa.location}</span>
              </div>

              {villa.description && (
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {villa.description}
                </p>
              )}

              {villa.amenities.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-6 border-b pb-2">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {villa.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                          <ShieldCheck size={14} />
                        </div>
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl shadow-lg border border-border/50 p-6">
              <div className="flex justify-between items-end mb-6 border-b pb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-3xl font-bold text-primary">₹{villa.price.toLocaleString()}</p>
                </div>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  >
                    {[...Array(villa.guestCapacity || 10).keys()].map((i) => (
                      <option key={i} value={i + 1}>{i + 1} Guests</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">Add-on Experiences</label>
                  <div className="space-y-3">
                    {availableAddons.map((addon) => (
                      <label
                        key={addon.id}
                        className="flex items-center justify-between cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={addons.includes(addon.id)}
                            onChange={() => toggleAddon(addon.id)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-sm font-medium">{addon.name}</span>
                        </div>
                        {/* <span className="text-xs font-bold text-gray-500">+₹{addon.price}</span> */}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                <span className="font-bold text-gray-700">Total Estimate</span>
                <span className="font-bold text-xl text-primary">₹{totalPrice.toLocaleString()}</span>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle size={24} /> Request to Book
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                You'll be redirected to WhatsApp to chat with our booking agent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}