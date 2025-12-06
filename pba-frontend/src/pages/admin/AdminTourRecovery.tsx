import { useState } from 'react';
import { Search, RotateCcw, Trash2 } from 'lucide-react';

interface TrashedTour {
  id: number;
  title: string;
  location: string;
  author: string;
  status: 'Draft' | 'Published';
  reviews: number;
  deletedAt: string;
}

const MOCK_TRASHED: TrashedTour[] = [
  { id: 101, title: 'Old City Tour', location: 'Belize City', author: 'Admin', status: 'Draft', reviews: 0, deletedAt: '2025-11-30' },
  { id: 102, title: 'Deprecated Jungle Walk', location: 'San Ignacio', author: 'Admin', status: 'Published', reviews: 5, deletedAt: '2025-11-28' },
];

export default function AdminTourRecovery() {
  const [tours, setTours] = useState<TrashedTour[]>(MOCK_TRASHED);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleRestore = (id: number) => {
    if (window.confirm('Restore this tour?')) {
      setTours(tours.filter(t => t.id !== id));
    }
  };

  const handleDeletePermanently = (id: number) => {
    if (window.confirm('Delete this tour permanently? This cannot be undone.')) {
      setTours(tours.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Recovery</h1>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Bulk Actions</option>
            <option>Restore</option>
            <option>Delete Permanently</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            Apply
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name"
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
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Deleted At</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{tour.title}</td>
                <td className="px-6 py-4 text-gray-500">{tour.location}</td>
                <td className="px-6 py-4 text-gray-500">{tour.author}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tour.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tour.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{tour.deletedAt}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleRestore(tour.id)}
                    className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Restore"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePermanently(tour.id)}
                    className="inline-block p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No items in trash.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
