import { useState } from 'react';
import { Search, Edit, List, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Attribute {
  id: number;
  name: string;
  position: number;
  hideInDetail: boolean;
  hideInFilter: boolean;
}

const MOCK_ATTRIBUTES: Attribute[] = [
  { id: 1, name: 'Travel Styles', position: 1, hideInDetail: false, hideInFilter: false },
  { id: 2, name: 'Facilities', position: 2, hideInDetail: false, hideInFilter: false },
  { id: 3, name: 'Difficulty', position: 3, hideInDetail: false, hideInFilter: true },
];

export default function AdminTourAttributes() {
  const [attributes, setAttributes] = useState<Attribute[]>(MOCK_ATTRIBUTES);
  const [formData, setFormData] = useState({
    name: '',
    position: 0,
    hideInDetail: false,
    hideInFilter: false,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttr: Attribute = {
      id: Date.now(),
      ...formData,
    };
    setAttributes([...attributes, newAttr]);
    setFormData({ name: '', position: 0, hideInDetail: false, hideInFilter: false });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tour Attributes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Attribute */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Attribute</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Travel Styles"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Order</label>
                <input
                  type="number"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hideInDetail}
                    onChange={(e) => setFormData({ ...formData, hideInDetail: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Hide in detail service</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hideInFilter}
                    onChange={(e) => setFormData({ ...formData, hideInFilter: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Hide in filter search</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Attribute List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Position</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attributes.map((attr) => (
                  <tr key={attr.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/tours/attributes/${attr.id}/edit`} className="font-medium text-blue-600 hover:underline">
                        {attr.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{attr.position}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/admin/tours/attributes/${attr.id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                      <Link
                        to={`/admin/tours/attributes/${attr.id}/terms`}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        <List className="w-3 h-3 mr-1" />
                        Manage Terms
                      </Link>
                    </td>
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
