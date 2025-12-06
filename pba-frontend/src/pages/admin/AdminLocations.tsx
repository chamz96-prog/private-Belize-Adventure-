import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Location } from '../../types';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MOCK_LOCATIONS: Location[] = [
  { 
    id: 1, 
    name: 'Belize Tours from Ambergris Caye', 
    slug: 'belize-tours-ambergris-caye', 
    parentId: null, 
    status: 'publish', 
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
    descriptionHtml: '<p>Welcome to Ambergris Caye...</p>',
    latitude: 17.9214,
    longitude: -87.9611
  },
  { 
    id: 2, 
    name: 'Belize Tours from Belize City', 
    slug: 'belize-tours-belize-city', 
    parentId: null, 
    status: 'publish', 
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
    descriptionHtml: '<p>Welcome to Belize City...</p>',
    latitude: 17.5046,
    longitude: -88.1962
  },
  { 
    id: 3, 
    name: 'Belize Tours from San Ignacio', 
    slug: 'belize-tours-san-ignacio', 
    parentId: null, 
    status: 'publish', 
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
    descriptionHtml: '<p>Welcome to San Ignacio...</p>',
    latitude: 17.1521,
    longitude: -89.0800
  },
];

function LocationMarker({ position, setPosition }: { position: [number, number] | null, setPosition: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    description: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newLocation: Location = {
      id: Date.now(),
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/ /g, '-'),
      parentId: formData.parentId ? parseInt(formData.parentId) : null,
      status: 'publish',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      descriptionHtml: formData.description,
      latitude: markerPosition ? markerPosition[0] : null,
      longitude: markerPosition ? markerPosition[1] : null,
    };
    setLocations([...locations, newLocation]);
    setFormData({ name: '', parentId: '', description: '' });
    setMarkerPosition(null);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === locations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(locations.map(l => l.id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Locations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Location */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Location</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Location name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Please Select —</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="h-64 mb-12">
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    className="h-48"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Map</label>
                <div className="h-64 rounded-lg overflow-hidden border border-gray-300 mb-2 z-0 relative">
                  <MapContainer center={[17.1899, -88.4976]} zoom={7} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={markerPosition} setPosition={setMarkerPosition} />
                  </MapContainer>
                </div>
                <p className="text-xs text-gray-500">Click onto map to place location address</p>
                {markerPosition && (
                  <p className="text-xs text-blue-600 mt-1">
                    Selected: {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Location
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Location List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Toolbar */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Bulk Actions</option>
                <option>Publish</option>
                <option>Draft</option>
                <option>Delete</option>
              </select>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Apply
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === locations.length && locations.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {locations.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(location.id)}
                        onChange={() => toggleSelect(location.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/locations/edit/${location.id}`} className="font-medium text-blue-600 hover:underline text-left">
                        {location.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{location.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        location.status === 'publish' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {location.status === 'publish' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{location.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
