import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Check } from 'lucide-react';
import type { Tour } from '../../types';

interface BookingSidebarProps {
  tour: Tour;
}

export default function BookingSidebar({ tour }: BookingSidebarProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const adultPrice = tour.basePriceAdult || 0;
    const childPrice = tour.basePriceChild || 0;
    setTotal((adults * adultPrice) + (children * childPrice));
  }, [adults, children, tour]);

  const handleBookNow = () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
    const quote = {
      tourId: tour.id,
      tourTitle: tour.title,
      adults,
      children,
      priceAdult: tour.basePriceAdult,
      priceChild: tour.basePriceChild || 0,
      subtotal: total,
      total: total,
      currency: tour.currency
    };

    navigate('/checkout', { 
      state: { 
        tour, 
        quote,
        date
      } 
    });
  };

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-blue-600 p-4 text-white text-center">
        <span className="text-sm font-medium opacity-90">From</span>
        <div className="text-3xl font-bold">
          ${tour.priceFrom} <span className="text-lg font-normal opacity-75">/ person</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Guests Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          
          <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
            <div>
              <span className="block font-medium text-gray-900">Adults</span>
              <span className="text-xs text-gray-500">Age 12+ (${tour.basePriceAdult})</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{adults}</span>
              <button 
                onClick={() => setAdults(adults + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
            <div>
              <span className="block font-medium text-gray-900">Children</span>
              <span className="text-xs text-gray-500">Age 3-11 (${tour.basePriceChild})</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{children}</span>
              <button 
                onClick={() => setChildren(children + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-gray-900 text-lg">Total</span>
          <span className="font-bold text-blue-600 text-2xl">${total.toFixed(2)}</span>
        </div>

        {/* Book Button */}
        <button 
          onClick={handleBookNow}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
        >
          Book Now
        </button>

        {/* Trust Signals */}
        <div className="space-y-2 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Free cancellation up to 24h before</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Secure payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
