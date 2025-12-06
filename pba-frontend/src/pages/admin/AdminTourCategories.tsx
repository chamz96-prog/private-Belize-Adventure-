import { useState } from 'react';
import { Search, Edit, Trash2, Plus, Check } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: string | null;
  status: 'Published' | 'Draft';
  count: number;
}

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Cave Tubing', slug: 'cave-tubing', parent: null, status: 'Published', count: 12 },
  { id: 2, name: 'Mayan Ruins', slug: 'mayan-ruins', parent: null, status: 'Published', count: 8 },
  { id: 3, name: 'Snorkeling', slug: 'snorkeling', parent: null, status: 'Published', count: 5 },
  { id: 4, name: 'Cruise Excursions', slug: 'cruise-excursions', parent: null, status: 'Published', count: 20 },
  { id: 5, name: 'Jungle Zipline', slug: 'jungle-zipline', parent: 'Adventure', status: 'Draft', count: 0 },
];

export default function AdminTourCategories() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent: '',
  });

  const handleSearch = () => {
    // In a real app, this would trigger a backend search
    console.log('Searching for:', searchTerm);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: Date.now(),
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-'),
      parent: formData.parent || null,
      status: 'Published',
      count: 0,
    };
    setCategories([...categories, newCategory]);
    setFormData({ name: '', slug: '', parent: '' });
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
      <h1 className="text-2xl font-bold text-gray-900">Tour Categories</h1>

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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Category Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                <select
                  value={formData.parent}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Please Select —</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
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
              <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">Count</th>
                  <th className="px-6 py-4 font-medium">Status</th>
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
                      <button className="font-medium text-blue-600 hover:underline">
                        {category.parent ? `— ${category.name}` : category.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {category.status}
                      </span>
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
