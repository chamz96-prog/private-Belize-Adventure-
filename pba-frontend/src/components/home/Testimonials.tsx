import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'Texas, USA',
    image: 'https://i.pravatar.cc/150?img=32',
    text: "The cave tubing was the highlight of our cruise! Our guide was funny, knowledgeable, and got us back to the ship with time to spare. Highly recommend!",
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    image: 'https://i.pravatar.cc/150?img=11',
    text: "We booked a private transfer and a ruins tour. Everything was seamless. The van was clean, AC was cold, and the driver was excellent.",
    rating: 5
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'London, UK',
    image: 'https://i.pravatar.cc/150?img=5',
    text: "Great experience at Altun Ha. It was hot but the guide made sure we had water and stayed in the shade. Beautiful country and lovely people.",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">What Our Guests Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-8 italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-600">
            <span className="text-green-500 text-2xl">●</span> TripAdvisor
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-gray-600">
            <span className="text-blue-500 text-2xl">G</span> Google Reviews
          </div>
        </div>
      </div>
    </section>
  );
}
