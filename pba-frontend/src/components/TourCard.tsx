import { Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-gray-200">
        {/* Placeholder for image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
          <span className="text-lg font-medium">Image: {tour.title}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
          Best Seller
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-gray-500 text-xs ml-2">(124 reviews)</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{tour.shortDescription}</p>

        <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>6 hours</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Belize City</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div>
            <span className="text-gray-500 text-xs block">From</span>
            <span className="text-xl font-bold text-blue-600">{tour.currency} {tour.basePriceAdult}</span>
          </div>
          <Link 
            to={`/tours/${tour.slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Tour
          </Link>
        </div>
      </div>
    </div>
  );
}
