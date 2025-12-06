import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_TOURS = [
  { id: 1, title: 'Cave Tubing' },
  { id: 2, title: 'Mayan Ruins' },
  { id: 3, title: 'Snorkeling' },
  { id: 4, title: 'Jungle Zipline' },
  { id: 5, title: 'City Tour' },
  { id: 6, title: 'Zoo Visit' },
  { id: 7, title: 'River Safari' },
];

export default function AdminTourBookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Dec 2025

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(year, month, i + 1);
      return {
        date: i + 1,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: d
      };
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Tour Booking Calendar</h1>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            <option>— All Category —</option>
            <option>Adventure</option>
            <option>Cultural</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tour..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex rounded-md shadow-sm bg-white">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="p-1.5 border border-gray-300 rounded-l hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="p-1.5 border-t border-b border-r border-gray-300 rounded-r hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Gantt Grid */}
        <div className="flex-1 overflow-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-20 w-64 border-r border-gray-200 shadow-sm">
                      Tours
                    </th>
                    {days.map((day) => (
                      <th key={day.date} scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px] border-r border-gray-100">
                        <div>{day.date}</div>
                        <div className="text-[10px]">{day.dayName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_TOURS.map((tour) => (
                    <tr key={tour.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                        {tour.title}
                      </td>
                      {days.map((day) => (
                        <td key={day.date} className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-100 text-center relative hover:bg-gray-50">
                          {/* Mock Booking Block */}
                          {Math.random() > 0.8 && (
                            <div className="absolute inset-1 bg-blue-100 rounded flex items-center justify-center text-blue-700 text-xs font-bold cursor-pointer hover:bg-blue-200">
                              {Math.floor(Math.random() * 5) + 1}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
