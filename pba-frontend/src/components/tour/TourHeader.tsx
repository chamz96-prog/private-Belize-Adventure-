import { MapPin, Clock, Star, Gauge } from 'lucide-react';
import type { Tour } from '../../types';

interface TourHeaderProps {
  tour: Tour;
}

export default function TourHeader({ tour }: TourHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4 text-sm text-blue-600 font-medium mb-3">
        <span className="bg-blue-50 px-3 py-1 rounded-full">
          {tour.isCruiseFriendly ? 'Cruise Friendly' : 'Adventure Tour'}
        </span>
        {tour.isFamilyFriendly && (
          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
            Family Friendly
          </span>
        )}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        {tour.title}
      </h1>

      <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-bold text-gray-900">{tour.ratingAverage || 5.0}</span>
          <span className="text-gray-400">({tour.ratingCount || 50} reviews)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span>{tour.departureLocation}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span>{tour.duration}</span>
        </div>

        {tour.difficulty && (
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-gray-400" />
            <span>{tour.difficulty}</span>
          </div>
        )}
      </div>
    </div>
  );
}
