import { useEffect } from "react";
import { useLocation } from "wouter";
import { Home, MapPin, Users, DollarSign, Eye, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useVillas }    from "../hooks/useVillas";
import { useAmenities } from "../hooks/useAmenities";
import StatCard         from "../components/Dashboard/StatCard";
import VillasTab        from "../components/Dashboard/VillasTab";
import AmenitiesPage    from "../components/Dashboard/AmenitiesPage";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: Home   },
  { id: "amenities", label: "Amenities", icon: MapPin },
  { id: "villas",    label: "Villas",    icon: MapPin },
  { id: "bookings",  label: "Bookings",  icon: Users  },
];

const TAB_LABELS = {
  dashboard: "Dashboard",
  villas:    "Villa Management",
  amenities: "Amenities Management",
  bookings:  "Bookings",
};

export default function Dashboard() {
  const [activeTab,   setActiveTab]   = useState("villas");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, setLocation] = useLocation();

  const villaHooks    = useVillas();
  const amenityHooks  = useAmenities();

  useEffect(() => {
    villaHooks.load();
    amenityHooks.load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setLocation("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0"} bg-teal-600 transition-all duration-300 overflow-hidden relative flex-shrink-0`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-white font-bold text-xl">MMT Admin</span>
          </div>
          <nav className="space-y-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id ? "bg-teal-700 text-white" : "text-teal-100 hover:bg-teal-700"}`}>
                <Icon className="w-5 h-5" /><span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-teal-100 hover:bg-teal-700 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /><span>Logout</span>
          </button>
        </div>
      </aside>

       <ToastContainer position="top-right" autoClose={3000} />

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center px-6 py-4 gap-4">
            <button onClick={() => setSidebarOpen(s => !s)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{TAB_LABELS[activeTab]}</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={Home}       title="Total Villas"      value={villaHooks.villas.length}                              color="bg-blue-500"   />
              <StatCard icon={Users}      title="Total Bookings"    value="48"                                                    color="bg-green-500"  />
              <StatCard icon={DollarSign} title="Revenue (Monthly)" value="₹12.5L"                                               color="bg-purple-500" />
              <StatCard icon={Eye}        title="Beach View Villas" value={villaHooks.villas.filter(v => v.beachView).length}     color="bg-teal-500"   />
            </div>
          )}

          {activeTab === "villas" && (
            <VillasTab
              villas={villaHooks.villas}
              amenities={amenityHooks.amenities}
              loading={villaHooks.loading}
              error={villaHooks.error}
              onLoad={villaHooks.load}
              hooks={villaHooks}
            />
          )}

          {activeTab === "amenities" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <AmenitiesPage />
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>
              <p className="text-gray-500">Bookings management coming soon…</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
