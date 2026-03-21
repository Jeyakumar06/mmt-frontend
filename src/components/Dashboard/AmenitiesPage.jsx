import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, X, Package } from 'lucide-react';

// API Configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL = `${BASE_URL}/api/admin`;

const apiService = {
  getHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  async getAmenities() {
    const response = await fetch(`${API_BASE_URL}/amenities`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch amenities');
    }

    return response.json();
  },

  async createAmenity(amenity) {
    const response = await fetch(`${API_BASE_URL}/amenities`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(amenity),
    });

    if (!response.ok) {
      throw new Error('Failed to create amenity');
    }

    return response.json();
  },

  async updateAmenity(id, amenity) {
    console.log('Updating amenity with ID:', id, 'Data:', amenity); // Debug log
    const response = await fetch(`${API_BASE_URL}/amenities/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(amenity),
    });

    if (!response.ok) {
      throw new Error('Failed to update amenity');
    }

    return response.json();
  },

  async deleteAmenity(id) {
    const response = await fetch(`${API_BASE_URL}/amenities/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete amenity');
    }
    return true;
  },
};

function AmenitiesPage() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAmenities();
      setAmenities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAmenities = amenities.filter((amenity) =>
    amenity.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingAmenity(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const openEditModal = (amenity) => {
    setEditingAmenity(amenity);
    setFormData({ name: amenity.name });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter an amenity name');
      return;
    }

    try {
      setSubmitting(true);

      if (editingAmenity) {
        await apiService.updateAmenity(editingAmenity.id, formData);
      } else {
        await apiService.createAmenity(formData);
      }

      setShowModal(false);
      await loadAmenities();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this amenity?')) {
      return;
    }

    try {
      await apiService.deleteAmenity(id);
      await loadAmenities();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-800">Error</h3>
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={loadAmenities}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search amenities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Amenity
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAmenities.map((amenity) => (
          <div
            key={amenity.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold">{amenity.name}</h3>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => openEditModal(amenity)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(amenity.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal remains same as your implementation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingAmenity ? 'Edit Amenity' : 'Add Amenity'}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg mb-4"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                >
                  {editingAmenity ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AmenitiesPage;
