import { useState, useMemo, useEffect } from "react";
import { FilterSidebar } from "../components/FilterSidebar";
import { VillaCard } from "../components/VillaCard";
import { SlidersHorizontal, Loader2, AlertCircle } from "lucide-react";
import api from "../api/axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const IMAGE_BASE_URL = BASE_URL; // Base URL for images, adjust if needed

/** Normalise a raw image entry (string | {id, imageUrl} | {id, url}) → plain string URL */
const resolveImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") {
    return img.startsWith("http") ? img : `${IMAGE_BASE_URL}/${img.replace(/^\//, "")}`;
  }
  const raw = img.imageUrl || img.url || "";
  if (!raw) return null;
  return raw.startsWith("http") ? raw : `${IMAGE_BASE_URL}/${raw.replace(/^\//, "")}`;
};

/** Convert all images in a villa to plain URL strings so child components don't need to know the shape */
const normaliseVilla = (villa) => ({
  ...villa,
  images: (villa.images || []).map(resolveImageUrl).filter(Boolean),
});

export default function VillasList() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [villas, setVillas]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [page, setPage]                 = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchVillas = async (pageNum = 0, append = false) => {
    try {
      append ? setIsFetchingMore(true) : setLoading(true);
      setError(null);

      const { data } = await api.get("/api/villas", {
        params: { page: pageNum, size: 6 },
      });

      const list = (data.content ?? data).map(normaliseVilla); // ✅ resolve images here
      setVillas((prev) => (append ? [...prev, ...list] : list));
      setTotalPages(data.totalPages ?? 1);
      setPage(pageNum);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => { fetchVillas(0); }, []);

  const maxPriceRange = useMemo(
    () => (villas.length > 0 ? Math.max(...villas.map((v) => v.price)) : 100000),
    [villas]
  );

  const [filters, setFilters] = useState({
    bhk: null, pool: null, beachView: false, maxPrice: null,
  });

  useEffect(() => {
    if (villas.length > 0) {
      setFilters((prev) =>
        prev.maxPrice === null ? { ...prev, maxPrice: maxPriceRange } : prev
      );
    }
  }, [maxPriceRange, villas.length]);

  const activeMaxPrice = filters.maxPrice ?? maxPriceRange;

  const filteredVillas = useMemo(() => {
    return villas.filter((villa) => {
      if (filters.bhk && villa.bhk !== filters.bhk) return false;
      if (filters.pool && villa.pool !== filters.pool) return false;
      if (filters.beachView && !villa.beachView) return false;
      if (villa.price > activeMaxPrice) return false;
      return true;
    });
  }, [filters, villas, activeMaxPrice]);

  const resetFilters = () =>
    setFilters({ bhk: null, pool: null, beachView: false, maxPrice: maxPriceRange });

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-lg">Loading villas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle size={48} className="text-red-400" />
        <h2 className="text-2xl font-bold text-gray-700">Failed to load villas</h2>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <button
          onClick={() => fetchVillas(0)}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
              Our Villas
            </h1>
            <p className="text-muted-foreground">{filteredVillas.length} properties found</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <FilterSidebar
            filters={{ ...filters, maxPrice: activeMaxPrice }}
            setFilters={setFilters}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            maxPriceRange={maxPriceRange}
          />

          <div className="flex-1 w-full">
            {filteredVillas.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredVillas.map((villa, idx) => (
                    <VillaCard key={villa.id} villa={villa} index={idx} />
                  ))}
                </div>

                {page + 1 < totalPages && (
                  <div className="text-center mb-12">
                    <button
                      onClick={() => fetchVillas(page + 1, true)}
                      disabled={isFetchingMore}
                      className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg flex items-center gap-2 mx-auto disabled:opacity-70"
                    >
                      {isFetchingMore && <Loader2 size={16} className="animate-spin" />}
                      {isFetchingMore ? "Loading..." : "Load More Villas"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No villas found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
                <button onClick={resetFilters} className="text-accent hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}