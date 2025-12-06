import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TourCard from '../TourCard';
import type { Tour } from '../../types';

interface FeaturedToursProps {
  tours: Tour[];
  isLoading: boolean;
}

export default function FeaturedTours({ tours, isLoading }: FeaturedToursProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Top Rated Adventures</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Popular Tours in Belize</h2>
            <p className="text-gray-600 text-lg">
              Handpicked experiences that our guests love the most. From ancient history to underwater wonders.
            </p>
          </div>
          <Link 
            to="/tours" 
            className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors group"
          >
            View All Tours 
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton Loading State
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[450px] animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between pt-4">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            tours.slice(0, 3).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/tours" 
            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            View All Tours 
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
