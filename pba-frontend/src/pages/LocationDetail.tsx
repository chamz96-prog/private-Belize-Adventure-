import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import type { Location } from '../types';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock Data
const MOCK_LOCATION: Location = {
  id: 1,
  name: 'Belize Tours from Belize City',
  slug: 'belize-tours-belize-city',
  shortTitle: 'Belize City',
  heroSubtitle: 'The Gateway to Adventure',
  descriptionHtml: `
    <p class="mb-4">Belize City is the historical capital of the nation and its largest city. It is the principal port and the country's financial and industrial hub.</p>
    <p class="mb-4">From here, you can easily access some of the most popular tours in the country, including the famous Altun Ha Mayan ruins, cave tubing at Nohoch Che'en, and snorkeling at the barrier reef.</p>
    <p>Whether you are arriving by cruise ship or staying in the city, our tours offer the perfect blend of history, culture, and adventure.</p>
  `,
  excerpt: 'Discover the best tours starting from Belize City.',
  latitude: 17.5046,
  longitude: -88.1962,
  mapZoom: 10,
  heroImageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  featureImageUrl: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  status: 'publish',
  createdAt: '2025-12-01',
  updatedAt: '2025-12-01',
};

const MOCK_TOURS = [
  {
    id: 1,
    title: 'Altun Ha & Cave Tubing',
    slug: 'altun-ha-cave-tubing',
    image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '6 hours',
    location: 'Belize City',
    priceFrom: 85,
  },
  {
    id: 2,
    title: 'Lamanai Mayan Ruins & River Safari',
    slug: 'lamanai-mayan-ruins',
    image: 'https://images.unsplash.com/photo-1518182170546-0766aa6f6a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '7 hours',
    location: 'Belize City',
    priceFrom: 110,
  },
  {
    id: 3,
    title: 'Xunantunich Mayan Ruins',
    slug: 'xunantunich-mayan-ruins',
    image: 'https://images.unsplash.com/photo-1518182170546-0766aa6f6a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '5 hours',
    location: 'San Ignacio',
    priceFrom: 95,
  },
];

const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'Top 5 Things to Do in Belize City',
    slug: 'top-5-things-belize-city',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover the hidden gems of Belize City beyond the cruise port.',
  },
  {
    id: 2,
    title: 'History of the Old Capital',
    slug: 'history-old-capital',
    image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    excerpt: 'A deep dive into the colonial history of Belize City.',
  },
];

export default function LocationDetail() {
  const { slug } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch based on slug
    // In real app: fetch(`/api/locations/${slug}`)
    setTimeout(() => {
      setLocation(MOCK_LOCATION);
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!location) {
    return <div className="min-h-screen flex items-center justify-center">Location not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={location.heroImageUrl}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {location.name}
            </h1>
            {location.heroSubtitle && (
              <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
                {location.heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Intro Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {location.shortTitle || location.name}
            </h2>
            <div 
              className="prose prose-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: location.descriptionHtml || '' }}
            />
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={location.featureImageUrl}
                alt={location.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore the place</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-picked adventures starting from {location.shortTitle || 'this location'}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_TOURS.map((tour) => (
              <Link key={tour.id} to={`/tours/${tour.slug}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                    From ${tour.priceFrom}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {tour.location}
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={`/tours?location=${location.slug}`}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              View More Tours
            </Link>
          </div>
        </div>
      </div>

      {/* City Map */}
      <div className="h-[500px] w-full relative z-0">
        <MapContainer 
          center={[location.latitude || 0, location.longitude || 0]} 
          zoom={location.mapZoom || 10} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.latitude || 0, location.longitude || 0]}>
            <Popup>
              <div className="font-bold">{location.name}</div>
              <div className="text-sm">Start your adventure here!</div>
            </Popup>
          </Marker>
        </MapContainer>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg z-[1000]">
          <h2 className="text-xl font-bold text-gray-900">The City Map</h2>
        </div>
      </div>

      {/* Trip Ideas */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trip Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_ARTICLES.map((article) => (
            <div key={article.id} className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="md:w-1/3 aspect-video md:aspect-auto">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <Link to={`/blog/${article.slug}`} className="text-blue-600 font-medium hover:underline">
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
