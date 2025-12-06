import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LocationCategory {
  id: number;
  name: string;
  iconClass: string;
  status: 'Published' | 'Draft';
  createdAt: string;
}

const MOCK_CATEGORIES: LocationCategory[] = [
  { id: 1, name: 'Education', iconClass: 'icofont-education', status: 'Published', createdAt: '2025-12-01' },
  { id: 2, name: 'Health', iconClass: 'icofont-heart-beat', status: 'Published', createdAt: '2025-12-01' },
  { id: 3, name: 'Transportation', iconClass: 'icofont-bus', status: 'Published', createdAt: '2025-12-01' },
];

export default function AdminLocationCategories() {
  const [categories, setCategories] = useState<LocationCategory[]>(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    iconClass: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: LocationCategory = {
      id: Date.now(),
      name: formData.name,
      iconClass: formData.iconClass,
      status: 'Published',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCategories([...categories, newCategory]);
    setFormData({ name: '', iconClass: '' });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === categories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map(c => c.id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Location Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Category */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Category</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Class</label>
                <input
                  type="text"
                  value={formData.iconClass}
                  onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. icofont-education"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Category
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Category List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Toolbar */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Bulk Actions</option>
                <option>Delete</option>
                <option>Publish</option>
                <option>Draft</option>
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
                      checked={selectedIds.length === categories.length && categories.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(category.id)}
                        onChange={() => toggleSelect(category.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/locations/categories/${category.id}/edit`} className="font-medium text-blue-600 hover:underline">
                        {category.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{category.createdAt}</td>
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
