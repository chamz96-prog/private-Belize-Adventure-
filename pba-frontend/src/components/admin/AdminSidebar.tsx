import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, LogOut, MapPin, Image as ImageIcon, FileText, Map, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '../../api/AuthContext';

// Force HMR update
export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [isToursOpen, setIsToursOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/admin/tours')) {
      setIsToursOpen(true);
    }
    if (location.pathname.startsWith('/admin/locations')) {
      setIsLocationOpen(true);
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isToursActive = location.pathname.startsWith('/admin/tours');
  const isLocationActive = location.pathname.startsWith('/admin/locations');

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 text-sm">Private Belize Adventure</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin') ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        {/* Tours Group */}
        <div className="space-y-1">
          <button
            onClick={() => setIsToursOpen(!isToursOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              isToursActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Map className="w-5 h-5" />
              <span className="font-semibold">TOURS</span>
            </div>
            {isToursOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {isToursOpen && (
            <div className="space-y-1 pl-4">
              {[
                { path: '/admin/tours', label: 'All Tours' },
                { path: '/admin/tours/new', label: 'Add Tour' },
                { path: '/admin/tours/categories', label: 'Categories' },
                { path: '/admin/tours/attributes', label: 'Attributes' },
                { path: '/admin/tours/availability', label: 'Availability' },
                { path: '/admin/tours/booking-calendar', label: 'Booking Calendar' },
                { path: '/admin/tours/recovery', label: 'Recovery' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-slate-800 text-white border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/admin/bookings" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/bookings') ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <CalendarDays className="w-5 h-5" />
          <span>Bookings</span>
        </Link>
        {/* Location Group */}
        <div className="space-y-1">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              isLocationActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Location</span>
            </div>
            {isLocationOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {isLocationOpen && (
            <div className="space-y-1 pl-4">
              {[
                { path: '/admin/locations', label: 'All Location' },
                { path: '/admin/locations/categories', label: 'All Category' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-slate-800 text-white border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/admin/media" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/media') ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <ImageIcon className="w-5 h-5" />
          <span>Media</span>
        </Link>
        <Link to="/admin/pages" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/pages') ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <FileText className="w-5 h-5" />
          <span>Pages</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
