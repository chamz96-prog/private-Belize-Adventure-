import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Tour } from '../types';
import TourGallery from '../components/tour/TourGallery';
import TourHeader from '../components/tour/TourHeader';
import BookingSidebar from '../components/tour/BookingSidebar';
import ItineraryTimeline from '../components/tour/ItineraryTimeline';
import InclusionsList from '../components/tour/InclusionsList';
import TourReviews from '../components/tour/TourReviews';

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch by slug. 
    // For now, fetch all and find matching slug (MVP).
    api.get('/tours')
      .then((res) => {
        const found = res.data.find((t: Tour) => t.slug === slug);
        setTour(found || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb could go here */}
        
        <TourHeader tour={tour} />
        
        <TourGallery images={tour.images || []} title={tour.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            
            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {tour.overview || tour.shortDescription}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ItineraryTimeline itinerary={tour.itinerary || []} />
            
            <InclusionsList 
              included={tour.included || []} 
              excluded={tour.excluded || []} 
            />

            {/* What to Bring */}
            {tour.whatToBring && tour.whatToBring.length > 0 && (
              <div className="mb-12 bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What to Bring</h3>
                <div className="flex flex-wrap gap-3">
                  {tour.whatToBring.map((item, idx) => (
                    <span key={idx} className="bg-white px-4 py-2 rounded-full text-sm text-blue-800 font-medium shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <TourReviews tourId={tour.id} />

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <BookingSidebar tour={tour} />
          </div>
        </div>
      </div>
    </div>
  );
}
