import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { Save, Plus, Trash2, MapPin, Calendar, DollarSign, Settings, Search, Info, List, Image as ImageIcon, ExternalLink } from 'lucide-react';
import TourOptionsSection from '../../components/admin/tour/TourOptionsSection';
import MediaPicker from '../../components/admin/MediaPicker';
import type { TourOptionPayload } from '../../types';
import { api } from '../../api/client';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Types
interface RepeaterItem {
  title: string;
  content: string;
}

interface ItineraryItem {
  image: string;
  title: string;
  content: string;
}

interface SurroundingItem {
  name: string;
  content: string;
  distance: string;
}

interface TourFormValues {
  // General
  title: string;
  content: string;
  category: string;
  videoUrl: string;
  duration: number;
  minAdvanceReservations: number;
  minPeople: number;
  maxPeople: number;
  faqs: RepeaterItem[];
  includes: RepeaterItem[];
  excludes: RepeaterItem[];
  itinerary: ItineraryItem[];
  bannerImage: string;
  featureImageUrl: string;
  gallery: string[];
  surroundings: {
    education: SurroundingItem[];
    health: SurroundingItem[];
    transportation: SurroundingItem[];
  };
  
  // Location
  locationId: string;
  address: string;
  latitude: number;
  longitude: number;
  zoom: number;

  // Pricing
  basePrice: number;
  salePrice: number;
  isPricePerPerson: boolean;
  extraPrice: {
    name: string;
    price: number;
    type: string;
  }[];

  // Availability
  availabilityType: string;
  
  // Status
  status: 'published' | 'draft';
  isFeatured: boolean;

  // SEO
  metaTitle: string;
  metaDescription: string;
  slug: string;

  // Options
  options: TourOptionPayload[];
}

const initialValues: TourFormValues = {
  title: '',
  content: '',
  featureImageUrl: '',
  category: '',
  videoUrl: '',
  duration: 0,
  minAdvanceReservations: 0,
  minPeople: 1,
  maxPeople: 10,
  faqs: [],
  includes: [],
  excludes: [],
  itinerary: [],
  bannerImage: '',
  gallery: [],
  surroundings: {
    education: [],
    health: [],
    transportation: []
  },
  locationId: '',
  address: '',
  latitude: 17.1899, // Belize default
  longitude: -88.4976,
  zoom: 8,
  basePrice: 0,
  salePrice: 0,
  isPricePerPerson: true,
  extraPrice: [],
  availabilityType: 'always',
  status: 'draft',
  isFeatured: false,
  metaTitle: '',
  metaDescription: '',
  slug: '',
  options: []
};

// Map Click Handler
function LocationMarker({ position, setPosition }: { position: L.LatLngExpression, setPosition: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
    dragend() {
        // Handle drag if needed, but click is easier for now
    }
  });

  return position === null ? null : (
    <Marker position={position} draggable={true} eventHandlers={{
      dragend: (e) => {
        const marker = e.target;
        const position = marker.getLatLng();
        setPosition(position.lat, position.lng);
      },
    }} />
  );
}



// ... imports

export default function AdminTourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('general');
  const [values, setValues] = useState<TourFormValues>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [activeMediaField, setActiveMediaField] = useState<'banner' | 'feature' | null>(null);

  const handleMediaSelect = (url: string) => {
    if (activeMediaField === 'banner') {
      updateValue('bannerImage', url);
    } else if (activeMediaField === 'feature') {
      updateValue('featureImageUrl', url);
    }
    setShowMediaPicker(false);
    setActiveMediaField(null);
  };

  const openMediaPicker = (field: 'banner' | 'feature') => {
    setActiveMediaField(field);
    setShowMediaPicker(true);
  };

  // Fetch data if editing
  useEffect(() => {
    if (id) {
      const fetchTour = async () => {
        try {
          const res = await api.get(`/admin/tours/${id}`);
          console.log('Fetched tour:', res.data);
          const tour = res.data;
          
          // Map backend data to form values
          setValues({
            title: tour.title || '',
            content: tour.description || '',
            category: '', // Backend doesn't have category field yet in Tour model, need to check
            videoUrl: tour.videoUrl || '',
            duration: parseInt(tour.duration) || 0,
            minAdvanceReservations: 0, // Not in schema
            minPeople: 1, // Not in schema
            maxPeople: 10, // Not in schema
            faqs: tour.faqs || [],
            includes: tour.inclusions?.map((i: any) => ({ title: i.item, content: '' })) || [],
            excludes: tour.exclusions?.map((i: any) => ({ title: i.item, content: '' })) || [],
            itinerary: tour.itinerary || [],
            bannerImage: tour.images?.[0]?.url || '',
            featureImageUrl: tour.featureImageUrl || '',
            gallery: tour.images?.slice(1).map((i: any) => i.url) || [],
            surroundings: {
              education: tour.surroundings?.filter((s: any) => s.type === 'education') || [],
              health: tour.surroundings?.filter((s: any) => s.type === 'health') || [],
              transportation: tour.surroundings?.filter((s: any) => s.type === 'transportation') || [],
            },
            locationId: tour.locationId?.toString() || '',
            address: tour.address || '',
            latitude: tour.latitude || 17.1899,
            longitude: tour.longitude || -88.4976,
            zoom: tour.zoom || 8,
            basePrice: tour.basePriceAdult,
            salePrice: tour.salePrice || 0,
            isPricePerPerson: true,
            extraPrice: [],
            availabilityType: 'always',
            status: tour.isActive ? 'published' : 'draft',
            isFeatured: false,
            metaTitle: tour.metaTitle || '',
            metaDescription: tour.metaDescription || '',
            slug: tour.slug,
            options: tour.options || []
          });
        } catch (error) {
          console.error('Failed to fetch tour:', error);
          alert('Failed to load tour data');
        }
      };
      fetchTour();
    }
  }, [id]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Prepare payload
      const payload = {
        title: values.title,
        description: values.content,
        videoUrl: values.videoUrl,
        duration: values.duration.toString(),
        // minAdvanceReservations: values.minAdvanceReservations,
        // minPeople: values.minPeople,
        // maxPeople: values.maxPeople,
        faqs: values.faqs,
        inclusions: values.includes.map(i => i.title),
        exclusions: values.excludes.map(i => i.title),
        itinerary: values.itinerary,
        images: [values.bannerImage, ...values.gallery].filter(Boolean),
        surroundings: [
          ...values.surroundings.education.map(s => ({ ...s, type: 'education' })),
          ...values.surroundings.health.map(s => ({ ...s, type: 'health' })),
          ...values.surroundings.transportation.map(s => ({ ...s, type: 'transportation' })),
        ],
        locationId: values.locationId ? parseInt(values.locationId) : undefined,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
        zoom: values.zoom,
        basePriceAdult: values.basePrice,
        salePrice: values.salePrice,
        isActive: values.status === 'published',
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        slug: values.slug || undefined,
        options: values.options
      };

      console.log('Sending payload:', payload);

      if (id) {
        await api.put(`/admin/tours/${id}`, payload);
        alert('Tour updated successfully!');
      } else {
        await api.post('/admin/tours', payload);
        alert('Tour created successfully!');
        navigate('/admin/tours');
      }
    } catch (error: any) {
      console.error('Failed to save tour:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to save tour: ${JSON.stringify(error.response?.data || error.message)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateValue = (field: keyof TourFormValues, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  // Repeater Helpers
  const addRepeaterItem = (field: 'faqs' | 'includes' | 'excludes') => {
    setValues(prev => ({
      ...prev,
      [field]: [...prev[field], { title: '', content: '' }]
    }));
  };

  const updateRepeaterItem = (field: 'faqs' | 'includes' | 'excludes', index: number, key: 'title' | 'content', value: string) => {
    setValues(prev => {
      const newItems = [...prev[field]];
      newItems[index] = { ...newItems[index], [key]: value };
      return { ...prev, [field]: newItems };
    });
  };

  const removeRepeaterItem = (field: 'faqs' | 'includes' | 'excludes', index: number) => {
    setValues(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Itinerary Helpers
  const addItineraryItem = () => {
    setValues(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { image: '', title: '', content: '' }]
    }));
  };

  const updateItineraryItem = (index: number, key: keyof ItineraryItem, value: string) => {
    setValues(prev => {
      const newItems = [...prev.itinerary];
      newItems[index] = { ...newItems[index], [key]: value };
      return { ...prev, itinerary: newItems };
    });
  };

  const removeItineraryItem = (index: number) => {
    setValues(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  // Surroundings Helper (simplified for brevity)
  const addSurroundingItem = (category: 'education' | 'health' | 'transportation') => {
    setValues(prev => ({
      ...prev,
      surroundings: {
        ...prev.surroundings,
        [category]: [...prev.surroundings[category], { name: '', content: '', distance: '' }]
      }
    }));
  };

   const updateSurroundingItem = (category: 'education' | 'health' | 'transportation', index: number, key: keyof SurroundingItem, value: string) => {
    setValues(prev => {
        const newItems = [...prev.surroundings[category]];
        newItems[index] = { ...newItems[index], [key]: value };
        return {
            ...prev,
            surroundings: {
                ...prev.surroundings,
                [category]: newItems
            }
        };
    });
   };

   const removeSurroundingItem = (category: 'education' | 'health' | 'transportation', index: number) => {
       setValues(prev => ({
           ...prev,
           surroundings: {
               ...prev.surroundings,
               [category]: prev.surroundings[category].filter((_, i) => i !== index)
           }
       }));
   };


  const tabs = [
    { id: 'general', label: 'General', icon: Info },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'options', label: 'Pricing', icon: DollarSign },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'status', label: 'Status', icon: Settings },
    { id: 'seo', label: 'SEO', icon: Search },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Tour Information</h2>
        </div>
        <nav className="p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>



      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? 'Edit Tour' : 'Add New Tour'}
          </h1>
          <div className="flex items-center space-x-3">
            {values.slug && (
              <a
                href={`/tours/${values.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Tour
              </a>
            )}
            <button
            onClick={handleSave}
            disabled={isLoading}
            className={`flex items-center px-6 py-2 text-white rounded-lg font-medium ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={values.title}
                        onChange={(e) => updateValue('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tour Title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <div className="h-64 mb-12">
                        <ReactQuill
                          theme="snow"
                          value={values.content}
                          onChange={(content) => updateValue('content', content)}
                          className="h-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={values.category}
                          onChange={(e) => updateValue('category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Category</option>
                          <option value="cave-tubing">Cave Tubing</option>
                          <option value="mayan-ruins">Mayan Ruins</option>
                          <option value="snorkeling">Snorkeling</option>
                          <option value="jungle-adventure">Jungle Adventure</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video</label>
                        <input
                          type="text"
                          value={values.videoUrl}
                          onChange={(e) => updateValue('videoUrl', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                        <input
                          type="number"
                          value={values.duration}
                          onChange={(e) => updateValue('duration', Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min People</label>
                        <input
                          type="number"
                          value={values.minPeople}
                          onChange={(e) => updateValue('minPeople', Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max People</label>
                        <input
                          type="number"
                          value={values.maxPeople}
                          onChange={(e) => updateValue('maxPeople', Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg font-bold text-gray-900">FAQs</h3>
                    <button onClick={() => addRepeaterItem('faqs')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                      <Plus className="w-4 h-4 mr-1" /> Add Item
                    </button>
                  </div>
                  <div className="space-y-4">
                    {values.faqs.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1 space-y-4">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateRepeaterItem('faqs', index, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Question"
                          />
                          <textarea
                            value={item.content}
                            onChange={(e) => updateRepeaterItem('faqs', index, 'content', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Answer"
                            rows={2}
                          />
                        </div>
                        <button onClick={() => removeRepeaterItem('faqs', index)} className="text-red-500 hover:text-red-700 p-2">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Include/Exclude */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                      <h3 className="text-lg font-bold text-gray-900">Include</h3>
                      <button onClick={() => addRepeaterItem('includes')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </button>
                    </div>
                    <div className="space-y-4">
                      {values.includes.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateRepeaterItem('includes', index, 'title', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Included item"
                          />
                          <button onClick={() => removeRepeaterItem('includes', index)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                      <h3 className="text-lg font-bold text-gray-900">Exclude</h3>
                      <button onClick={() => addRepeaterItem('excludes')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </button>
                    </div>
                    <div className="space-y-4">
                      {values.excludes.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateRepeaterItem('excludes', index, 'title', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Excluded item"
                          />
                          <button onClick={() => removeRepeaterItem('excludes', index)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Itinerary */}
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg font-bold text-gray-900">Itinerary</h3>
                    <button onClick={addItineraryItem} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add Step
                    </button>
                    </div>
                    <div className="space-y-6">
                    {values.itinerary.map((item, index) => (
                        <div key={index} className="flex gap-6 items-start bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-600">
                            {index + 1}
                        </div>
                        <div className="flex-1 space-y-4">
                            <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium"
                            placeholder="Step Title (e.g., Pickup)"
                            />
                            <textarea
                            value={item.content}
                            onChange={(e) => updateItineraryItem(index, 'content', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Description of this step..."
                            rows={3}
                            />
                            <input
                            type="text"
                            value={item.image}
                            onChange={(e) => updateItineraryItem(index, 'image', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Image URL (optional)"
                            />
                        </div>
                        <button onClick={() => removeItineraryItem(index)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 className="w-5 h-5" />
                        </button>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Images</h3>
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image (Banner)</label>
                        {values.bannerImage ? (
                            <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                                <img 
                                    src={values.bannerImage} 
                                    alt="Banner" 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => openMediaPicker('banner')}
                                        className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100"
                                    >
                                        Change
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateValue('bannerImage', '')}
                                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => openMediaPicker('banner')}
                                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                            >
                                <ImageIcon className="w-8 h-8 mb-2" />
                                <span className="text-sm font-medium">Add Hero Image</span>
                            </button>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image URLs (comma separated)</label>
                        <textarea
                            value={values.gallery.join(', ')}
                            onChange={(e) => updateValue('gallery', e.target.value.split(',').map(s => s.trim()))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            rows={3}
                            placeholder="https://image1.jpg, https://image2.jpg"
                        />
                    </div>
                </div>

                {/* Surroundings */}
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Surroundings</h3>
                    {(['education', 'health', 'transportation'] as const).map(category => (
                        <div key={category} className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-700 capitalize">{category}</h4>
                                <button onClick={() => addSurroundingItem(category)} className="text-blue-600 text-xs font-medium flex items-center">
                                    <Plus className="w-3 h-3 mr-1" /> Add
                                </button>
                            </div>
                            {values.surroundings[category].map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateSurroundingItem(category, index, 'name', e.target.value)}
                                        className="col-span-5 px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        value={item.distance}
                                        onChange={(e) => updateSurroundingItem(category, index, 'distance', e.target.value)}
                                        className="col-span-3 px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="Distance"
                                    />
                                    <input
                                        type="text"
                                        value={item.content}
                                        onChange={(e) => updateSurroundingItem(category, index, 'content', e.target.value)}
                                        className="col-span-3 px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="Content"
                                    />
                                    <button onClick={() => removeSurroundingItem(category, index)} className="col-span-1 text-red-500 hover:text-red-700 flex justify-center">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
              </div>
            )}

            {/* LOCATION TAB */}
            {activeTab === 'location' && (
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Location</h3>
                
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location Select</label>
                        <select
                            value={values.locationId}
                            onChange={(e) => updateValue('locationId', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">-- Please Select --</option>
                            <option value="belize-city">Belize City</option>
                            <option value="san-ignacio">San Ignacio</option>
                            <option value="san-pedro">San Pedro</option>
                            <option value="caye-caulker">Caye Caulker</option>
                            <option value="placencia">Placencia</option>
                            <option value="hopkins">Hopkins</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Real Tour Address</label>
                        <input
                            type="text"
                            value={values.address}
                            onChange={(e) => updateValue('address', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Meeting point or specific address"
                        />
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-[400px] rounded-xl overflow-hidden border border-gray-300 z-0">
                            <MapContainer 
                                center={[values.latitude, values.longitude]} 
                                zoom={values.zoom} 
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <LocationMarker 
                                    position={[values.latitude, values.longitude]} 
                                    setPosition={(lat, lng) => {
                                        updateValue('latitude', lat);
                                        updateValue('longitude', lng);
                                    }}
                                />
                            </MapContainer>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Map Latitude</label>
                                <input
                                    type="number"
                                    value={values.latitude}
                                    onChange={(e) => updateValue('latitude', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    step="0.0001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Map Longitude</label>
                                <input
                                    type="number"
                                    value={values.longitude}
                                    onChange={(e) => updateValue('longitude', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    step="0.0001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Map Zoom</label>
                                <input
                                    type="number"
                                    value={values.zoom}
                                    onChange={(e) => updateValue('zoom', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {/* PRICING TAB (Merged) */}
            {activeTab === 'options' && (
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Pricing</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Manage different versions of this tour (e.g., Private vs Shared) and their pricing schedules.
                  </p>
                  
                  <TourOptionsSection 
                    options={values.options} 
                    onChange={(newOptions) => updateValue('options', newOptions)}
                    currency={values.extraPrice?.[0]?.type === 'currency' ? values.extraPrice[0].name : 'USD'} // Fallback currency
                  />
                </div>

                {/* Legacy Pricing Section */}
                <div className="border-t pt-8">
                    <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer list-none">
                            <h4 className="text-md font-semibold text-gray-700">Legacy Pricing</h4>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
                                <input
                                    type="number"
                                    value={values.basePrice}
                                    onChange={(e) => updateValue('basePrice', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                                <input
                                    type="number"
                                    value={values.salePrice}
                                    onChange={(e) => updateValue('salePrice', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="flex items-center md:col-span-2">
                                <input
                                    type="checkbox"
                                    checked={values.isPricePerPerson}
                                    onChange={(e) => updateValue('isPricePerPerson', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-700">Price is per person</label>
                            </div>
                        </div>
                    </details>
                </div>
              </div>
            )}

            {/* AVAILABILITY TAB */}
            {activeTab === 'availability' && (
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Availability</h3>
                    <p className="text-gray-500 italic">Availability calendar settings will go here.</p>
                </div>
            )}

            {/* STATUS TAB */}
            {activeTab === 'status' && (
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Status</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tour Status</label>
                        <select
                            value={values.status}
                            onChange={(e) => updateValue('status', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={values.isFeatured}
                            onChange={(e) => updateValue('isFeatured', e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Featured Tour</label>
                    </div>
                    
                    {/* Feature Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Feature Image</label>
                        {values.featureImageUrl ? (
                            <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                                <img 
                                    src={values.featureImageUrl} 
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
                                        onClick={() => updateValue('featureImageUrl', '')}
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
            )}

            {/* SEO TAB */}
            {activeTab === 'seo' && (
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-4">SEO</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                        <input
                            type="text"
                            value={values.metaTitle}
                            onChange={(e) => updateValue('metaTitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                        <textarea
                            value={values.metaDescription}
                            onChange={(e) => updateValue('metaDescription', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                            type="text"
                            value={values.slug}
                            onChange={(e) => updateValue('slug', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                </div>
            )}

          </div>
        </div>
      </div>

      
      {showMediaPicker && (
        <MediaPicker
          onSelect={handleMediaSelect}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
