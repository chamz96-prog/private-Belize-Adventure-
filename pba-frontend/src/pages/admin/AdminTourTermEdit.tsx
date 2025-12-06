import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function AdminTourTermEdit() {
  const { id, termId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    iconClass: '',
  });

  useEffect(() => {
    // Mock fetch
    if (termId) {
      setFormData({
        name: 'Group Tours',
        iconClass: 'fa fa-users',
      });
    }
  }, [termId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving term:', formData);
    navigate(`/admin/tours/attributes/${id}/terms`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(`/admin/tours/attributes/${id}/terms`)} className="text-gray-500 hover:text-gray-700 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Terms
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Term</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Icon</label>
            <input
              type="text"
              value={formData.iconClass}
              onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <span className="text-xs text-gray-500">Click to upload (30px)</span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
