import { useState } from 'react';
import { Menu, X, User, ShoppingBag, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Private Belize Adventure
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Belize Tours</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Cruise Excursions</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Transfers</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 font-bold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{user.name || 'User'}</span>
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-500 hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Log in
              </Link>
              <Link 
                to="/login" 
                state={{ isRegistering: true }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-3">
            <Link to="/" className="text-gray-700 font-medium">Home</Link>
            <a href="#" className="text-gray-700 font-medium">Belize Tours</a>
            <a href="#" className="text-gray-700 font-medium">Cruise Excursions</a>
            <a href="#" className="text-gray-700 font-medium">Transfers</a>
            <a href="#" className="text-gray-700 font-medium">About</a>
            <a href="#" className="text-gray-700 font-medium">Contact</a>
            <hr />
            <a href="#" className="flex items-center text-gray-700">
              <ShoppingBag className="w-5 h-5 mr-2" /> My Bookings
            </a>
            {user ? (
              <button onClick={logout} className="flex items-center text-gray-700 w-full text-left">
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" /> Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
