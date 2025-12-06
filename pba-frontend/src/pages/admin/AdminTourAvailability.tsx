import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const MOCK_TOURS = [
  { id: 101, title: 'Cave Tubing Adventure' },
  { id: 102, title: 'Mayan Ruins Expedition' },
  { id: 103, title: 'Snorkeling at Hol Chan' },
  { id: 104, title: 'Jungle Zipline' },
  { id: 105, title: 'St George\'s Caye Lamanai Mayan Ruin Tour' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AdminTourAvailability() {
  const [selectedTourId, setSelectedTourId] = useState<number>(101);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Dec 2025

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Tours Availability Calendar</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tour..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
            />
          </div>
          <span className="text-sm text-gray-500">Showing 1-5 of 12 spaces</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex">
        {/* Left Panel: Tour List */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
          <div className="p-4 border-b border-gray-200 font-medium text-gray-700">
            Select Tour
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_TOURS.map((tour) => (
              <button
                key={tour.id}
                onClick={() => setSelectedTourId(tour.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-white transition-colors ${
                  selectedTourId === tour.id ? 'bg-white border-l-4 border-l-blue-600 shadow-sm' : ''
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">#{tour.id}</div>
                <div className={`text-sm font-medium ${selectedTourId === tour.id ? 'text-blue-600' : 'text-gray-900'}`}>
                  {tour.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Calendar */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Calendar Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Today
              </button>
              <div className="flex rounded-md shadow-sm">
                <button onClick={handlePrevMonth} className="p-1.5 border border-gray-300 rounded-l hover:bg-gray-50">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={handleNextMonth} className="p-1.5 border-t border-b border-r border-gray-300 rounded-r hover:bg-gray-50">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {/* Days Header */}
              {DAYS.map(day => (
                <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}

              {/* Empty cells before first day */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-white h-32 p-2" />
              ))}

              {/* Days */}
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1;
                return (
                  <div key={day} className="bg-white h-32 p-2 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100 relative group">
                    <span className="text-sm font-medium text-gray-700">{day}</span>
                    
                    {/* Mock Data Badges */}
                    <div className="mt-2 space-y-1">
                      <div className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded border border-blue-100">
                        Adult: $285
                      </div>
                      <div className="bg-green-50 text-green-700 text-xs px-1.5 py-0.5 rounded border border-green-100">
                        Max: 8
                      </div>
                    </div>

                    {/* Hover Edit Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <span className="bg-white shadow-sm px-2 py-1 rounded text-xs font-medium text-gray-700">Edit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
