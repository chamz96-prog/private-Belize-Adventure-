import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Image as ImageIcon } from 'lucide-react';

interface Term {
  id: number;
  name: string;
  iconClass: string;
  image: string | null;
  date: string;
}

const MOCK_TERMS: Term[] = [
  { id: 1, name: 'Group Tours', iconClass: 'fa fa-users', image: null, date: '2025-12-01' },
  { id: 2, name: 'Private Tours', iconClass: 'fa fa-user', image: null, date: '2025-12-01' },
];

export default function AdminTourAttributeTerms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [terms, setTerms] = useState<Term[]>(MOCK_TERMS);
  const [formData, setFormData] = useState({
    name: '',
    iconClass: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newTerm: Term = {
      id: Date.now(),
      name: formData.name,
      iconClass: formData.iconClass,
      image: null,
      date: new Date().toISOString().split('T')[0],
    };
    setTerms([...terms, newTerm]);
    setFormData({ name: '', iconClass: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/admin/tours/attributes')} className="text-gray-500 hover:text-gray-700 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Attributes
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Attribute Terms: Travel Styles</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Term */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Term</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Group Tours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Icon</label>
                <input
                  type="text"
                  value={formData.iconClass}
                  onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. fa fa-users"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Click to upload (30px)</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Term
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Terms List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {terms.map((term) => (
                  <tr key={term.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/tours/attributes/${id}/terms/${term.id}/edit`} className="font-medium text-blue-600 hover:underline">
                        {term.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{term.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/tours/attributes/${id}/terms/${term.id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
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
