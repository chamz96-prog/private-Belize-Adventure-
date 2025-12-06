import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import MediaPicker from '../../components/admin/MediaPicker';
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

function LocationMarker({ position, setPosition }: { position: [number, number] | null, setPosition: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} draggable={true} eventHandlers={{
      dragend: (e) => {
        const marker = e.target;
        const position = marker.getLatLng();
        setPosition([position.lat, position.lng]);
      }
    }}></Marker>
  );
}

export default function AdminLocationEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    slug: '',
    parentId: null,
    shortTitle: '',
    heroSubtitle: '',
    descriptionHtml: '',
    excerpt: '',
    latitude: 17.1899,
    longitude: -88.4976,
    mapZoom: 7,
    heroImageUrl: '',
    featureImageUrl: '',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [activeMediaField, setActiveMediaField] = useState<'hero' | 'feature' | null>(null);

  const handleMediaSelect = (url: string) => {
    if (activeMediaField === 'hero') {
      setFormData({ ...formData, heroImageUrl: url });
    } else if (activeMediaField === 'feature') {
      setFormData({ ...formData, featureImageUrl: url });
    }
    setShowMediaPicker(false);
    setActiveMediaField(null);
  };

  const openMediaPicker = (field: 'hero' | 'feature') => {
    setActiveMediaField(field);
    setShowMediaPicker(true);
  };

  useEffect(() => {
    // Mock fetch
    if (id) {
      // In a real app, fetch data here
      if (id === '1') {
         setFormData({
            name: 'Belize Tours from Ambergris Caye',
            slug: 'belize-tours-ambergris-caye',
            parentId: null,
            shortTitle: 'Ambergris Caye',
            heroSubtitle: 'Discover the beauty of the islands',
            descriptionHtml: '<p>Welcome to Ambergris Caye...</p>',
            excerpt: 'The largest island in Belize.',
            latitude: 17.9214,
            longitude: -87.9611,
            mapZoom: 10,
            heroImageUrl: 'https://placehold.co/1200x400',
            featureImageUrl: 'https://placehold.co/600x400',
            status: 'publish',
            seoTitle: 'Tours from Ambergris Caye | Private Belize Adventure',
            seoDescription: 'Book the best tours from Ambergris Caye.',
            seoKeywords: 'belize, ambergris caye, tours',
         });
         setMarkerPosition([17.9214, -87.9611]);
      }
    }
  }, [id]);

  useEffect(() => {
    if (markerPosition) {
      setFormData(prev => ({ ...prev, latitude: markerPosition[0], longitude: markerPosition[1] }));
    }
  }, [markerPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving location:', formData);
    navigate('/admin/locations');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/admin/locations')} className="text-gray-500 hover:text-gray-700 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Locations
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? `Edit: ${formData.name}` : 'Add New Location'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Belize Tours from Belize City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Location</label>
                <select
                  value={formData.parentId || ''}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Please Select —</option>
                  <option value="1">Belize Tours from Ambergris Caye</option>
                  {/* Add more mock options */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Title</label>
                <input
                  type="text"
                  value={formData.shortTitle}
                  onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Belize City"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional tagline under title"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
            <div className="h-96 mb-12">
              <ReactQuill
                theme="snow"
                value={formData.descriptionHtml}
                onChange={(value) => setFormData({ ...formData, descriptionHtml: value })}
                className="h-80"
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
               <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Short intro paragraph"
               />
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Location Map</h2>
            <div className="h-96 rounded-lg overflow-hidden border border-gray-300 relative z-0">
               <MapContainer 
                 center={[formData.latitude || 17.1899, formData.longitude || -88.4976]} 
                 zoom={formData.mapZoom || 7} 
                 style={{ height: '100%', width: '100%' }}
               >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker position={markerPosition} setPosition={setMarkerPosition} />
              </MapContainer>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
               <p>Click map to place marker. Drag marker to adjust.</p>
               <div className="flex space-x-4">
                  <span>Lat: {formData.latitude?.toFixed(4)}</span>
                  <span>Lng: {formData.longitude?.toFixed(4)}</span>
               </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Media</h2>
            
            {/* Hero Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              {formData.heroImageUrl ? (
                <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={formData.heroImageUrl} 
                    alt="Hero" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => openMediaPicker('hero')}
                      className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, heroImageUrl: '' })}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openMediaPicker('hero')}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Add Hero Image</span>
                </button>
              )}
            </div>


          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Publish</h2>
            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="publish"
                  checked={formData.status === 'publish'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Published</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Draft</span>
              </label>
            </div>
            <div className="text-sm text-gray-500 mb-4">
               {formData.updatedAt && <p>Last updated: {formData.updatedAt}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>

          {/* Feature Image Sidebar Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Feature Image</h2>
            <div>
              {formData.featureImageUrl ? (
                <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={formData.featureImageUrl} 
                    alt="Feature" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => openMediaPicker('feature')}
                      className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, featureImageUrl: '' })}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openMediaPicker('feature')}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Add Feature Image</span>
                </button>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">SEO Settings</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Comma separated"
              />
            </div>
          </div>
        </div>
      </form>

      {showMediaPicker && (
        <MediaPicker
          onSelect={handleMediaSelect}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
