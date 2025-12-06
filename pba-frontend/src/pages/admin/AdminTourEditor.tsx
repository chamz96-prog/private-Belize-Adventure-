import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, MapPin, Calendar } from 'lucide-react';
import { api } from '../../api/client';
import MediaPicker from '../../components/admin/MediaPicker';

interface Location {
  id: number;
  name: string;
}

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export default function AdminTourEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    basePriceAdult: 0,
    basePriceChild: 0,
    currency: 'USD',
    isActive: true,
    duration: '',
    locationId: '',
    images: [] as string[],
    itinerary: [] as ItineraryItem[],
    inclusions: [] as string[],
    exclusions: [] as string[],
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLocations();
    if (isEditing) {
      fetchTour();
    }
  }, [id]);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/locations');
      setLocations(res.data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const fetchTour = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/tours/${id}`);
      const tour = res.data;
      setFormData({
        title: tour.title,
        slug: tour.slug,
        shortDescription: tour.shortDescription || '',
        description: tour.description || '',
        basePriceAdult: tour.basePriceAdult,
        basePriceChild: tour.basePriceChild || 0,
        currency: tour.currency,
        isActive: tour.isActive,
        duration: tour.duration || '',
        locationId: tour.locationId || '',
        images: tour.images?.map((img: any) => img.url) || [],
        itinerary: tour.itinerary?.map((item: any) => ({
          day: item.day,
          title: item.title,
          description: item.description
        })) || [],
        inclusions: tour.inclusions?.map((inc: any) => inc.item) || [],
        exclusions: tour.exclusions?.map((exc: any) => exc.item) || [],
      });
    } catch (err) {
      console.error('Failed to fetch tour', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        ...formData,
        locationId: formData.locationId ? Number(formData.locationId) : undefined,
      };

      if (isEditing) {
        await api.put(`/admin/tours/${id}`, dataToSave);
      } else {
        await api.post('/admin/tours', dataToSave);
      }
      navigate('/admin/tours');
    } catch (err) {
      console.error('Failed to save tour', err);
      alert('Failed to save tour');
    }
  };

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: formData.itinerary.length + 1, title: '', description: '' }
      ]
    });
  };

  const updateItineraryItem = (index: number, field: keyof ItineraryItem, value: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const removeItineraryItem = (index: number) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    // Re-index days
    const reindexed = newItinerary.map((item, i) => ({ ...item, day: i + 1 }));
    setFormData({ ...formData, itinerary: reindexed });
  };

  const addListItem = (field: 'inclusions' | 'exclusions') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const updateListItem = (field: 'inclusions' | 'exclusions', index: number, value: string) => {
    const newList = [...formData[field]];
    newList[index] = value;
    setFormData({ ...formData, [field]: newList });
  };

  const removeListItem = (field: 'inclusions' | 'exclusions', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleImageSelect = (url: string) => {
    setFormData({
      ...formData,
      images: [...formData.images, url]
    });
    setShowMediaPicker(false);
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Tour' : 'Create New Tour'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Auto-generated if empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Details & Pricing */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Details & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.locationId}
                  onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                >
                  <option value="">Select Location</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. 4 hours"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.basePriceAdult}
                onChange={(e) => setFormData({ ...formData, basePriceAdult: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Child Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.basePriceChild}
                onChange={(e) => setFormData({ ...formData, basePriceChild: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900">Images</h2>
            <button
              type="button"
              onClick={() => setShowMediaPicker(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Image
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((url, index) => (
              <div key={index} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img src={url} alt={`Tour image ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {formData.images.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                No images added yet
              </div>
            )}
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </button>
          </div>

          <div className="space-y-4">
            {formData.itinerary.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                <button
                  type="button"
                  onClick={() => removeItineraryItem(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700 w-16">Day {item.day}</span>
                    <input
                      type="text"
                      placeholder="Day Title"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={item.title}
                      onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                    />
                  </div>
                  <textarea
                    placeholder="Description of activities..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={item.description}
                    onChange={(e) => updateItineraryItem(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900">Inclusions</h2>
              <button
                type="button"
                onClick={() => addListItem('inclusions')}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.inclusions.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md"
                  value={item}
                  onChange={(e) => updateListItem('inclusions', index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeListItem('inclusions', index)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900">Exclusions</h2>
              <button
                type="button"
                onClick={() => addListItem('exclusions')}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.exclusions.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md"
                  value={item}
                  onChange={(e) => updateListItem('exclusions', index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeListItem('exclusions', index)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/tours')}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Update Tour' : 'Create Tour'}
          </button>
        </div>
      </form>

      {showMediaPicker && (
        <MediaPicker
          onSelect={handleImageSelect}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
