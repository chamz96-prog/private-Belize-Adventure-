import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import type { Tour, Quote } from '../../types';

interface OrderSummaryProps {
  tour: Tour;
  quote: Quote;
  date: string;
}

export default function OrderSummary({ tour, quote, date }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
      <div className="relative h-48">
        <img 
          src={(tour.images && tour.images.length > 0) ? tour.images[0] : 'https://via.placeholder.com/800x450'} 
          alt={tour.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg leading-tight">{tour.title}</h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-3 pb-6 border-b border-gray-100">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-3 text-blue-500" />
            <span className="font-medium text-gray-900">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-3 text-blue-500" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-3 text-blue-500" />
            <span>{tour.departureLocation}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-3 text-blue-500" />
            <span>{quote.adults} Adults, {quote.children} Children</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Adults ({quote.adults} x ${quote.priceAdult})</span>
            <span>${(quote.adults * quote.priceAdult).toFixed(2)}</span>
          </div>
          {quote.children > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Children ({quote.children} x ${quote.priceChild})</span>
              <span>${(quote.children * quote.priceChild).toFixed(2)}</span>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-blue-600 text-2xl">${quote.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 text-xs text-gray-500 text-center">
        <p>Free cancellation up to 24 hours before the tour start time.</p>
      </div>
    </div>
  );
}
