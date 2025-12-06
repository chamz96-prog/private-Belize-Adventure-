import { useState } from 'react';
import { MapPin, Clock, Users, Star, Check, X as XIcon, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tour } from '../types';

interface TourDetailLayoutProps {
  tour: Tour;
  onBook: (date: string, adults: number, children: number) => void;
}

export default function TourDetailLayout({ tour, onBook }: TourDetailLayoutProps) {
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState('Select Pickup Location');

  const total = (adults * tour.priceFrom) + (children * (tour.basePriceChild || tour.priceFrom * 0.5)); // Simple mock calc

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link> &gt; 
          <span className="mx-1">Belize Tours</span> &gt; 
          <span className="mx-1">{tour.departureLocation}</span> &gt; 
          <span className="font-medium text-gray-900 ml-1">{tour.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Section */}
          <div>
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-6 shadow-lg">
              <img 
                src={tour.images[0]} 
                alt={tour.title} 
                className="w-full h-full object-cover"
              />
              {tour.isCruiseFriendly && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-md">
                  <Ship className="w-4 h-4 mr-1" /> Cruise Friendly
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{tour.title}</h1>
            {tour.subtitle && <p className="text-xl text-gray-600 mb-4">{tour.subtitle}</p>}

            <div className="flex items-center space-x-4 mb-6 text-sm">
              <div className="flex items-center text-yellow-500 font-bold">
                <Star className="w-5 h-5 fill-current mr-1" />
                {tour.ratingAverage} ({tour.ratingCount} reviews)
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" /> {tour.duration}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" /> {tour.departureLocation}
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" /> {tour.groupSize || 'Small Group'}
              </div>
            </div>
          </div>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {tour.overview}
            </div>
          </section>

          {/* Highlights */}
          <section className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Highlights</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
            <div className="space-y-6 border-l-2 border-blue-200 ml-3 pl-6 relative">
              {tour.itinerary.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                  {item.time && <span className="text-sm font-bold text-blue-600 block mb-1">{item.time}</span>}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Included / Excluded */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-2" /> What's Included
              </h3>
              <ul className="space-y-2">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 text-sm">
                    <span className="mr-2">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <XIcon className="w-5 h-5 text-red-500 mr-2" /> What's Not Included
              </h3>
              <ul className="space-y-2">
                {tour.excluded.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 text-sm">
                    <span className="mr-2">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* What to Bring & Good to Know */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">What to Bring</h3>
              <ul className="space-y-2">
                {tour.whatToBring.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Good to Know</h3>
              <ul className="space-y-2">
                {tour.goodToKnow.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pickup Info */}
          {tour.pickupInfo && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pickup & Meeting Point</h2>
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                {tour.pickupInfo.cruisePassengers && (
                  <div className="mb-4">
                    <h4 className="font-bold text-blue-600 mb-2 flex items-center"><Ship className="w-4 h-4 mr-2"/> For Cruise Passengers</h4>
                    <p className="text-gray-700 text-sm">{tour.pickupInfo.cruisePassengers}</p>
                  </div>
                )}
                {tour.pickupInfo.hotelGuests && (
                  <div className="mb-4">
                    <h4 className="font-bold text-blue-600 mb-2 flex items-center"><Hotel className="w-4 h-4 mr-2"/> For Hotel Guests</h4>
                    <p className="text-gray-700 text-sm">{tour.pickupInfo.hotelGuests}</p>
                  </div>
                )}
                {/* Map Placeholder */}
                <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  <MapPin className="w-6 h-6 mr-2" /> Map View (Coming Soon)
                </div>
              </div>
            </section>
          )}

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tour.faqs.map((faq, index) => (
                <details key={index} className="group bg-white border rounded-lg p-4 cursor-pointer">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center">
                    {faq.question}
                    <span className="transform group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Booking Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <div className="mb-6">
              <span className="text-sm text-gray-500">From</span>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-blue-600">{tour.currency} {tour.priceFrom}</span>
                <span className="text-gray-500 ml-1">/ person</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <select 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                >
                  <option>Select Pickup Location</option>
                  <option>Belize City Hotel</option>
                  <option>Cruise Port (Terminal 1)</option>
                  <option>Cruise Port (Terminal 2)</option>
                  <option>Airport (BZE)</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-700">Total</span>
              <span className="text-xl font-bold text-blue-600">{tour.currency} {total.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => onBook(date, adults, children)}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Book Now
            </button>
            
            <div className="mt-4 flex items-center justify-center text-xs text-gray-500 space-x-2">
              <span className="flex items-center"><Check className="w-3 h-3 mr-1 text-green-500"/> Instant Confirmation</span>
              <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1 text-green-500"/> Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hotel({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M12 7h.01"/><path d="M14 15.43V22"/><path d="M15 16a5 5 0 0 0-6 0"/><path d="M16 11h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M8 7h.01"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg>
    )
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
    )
}
