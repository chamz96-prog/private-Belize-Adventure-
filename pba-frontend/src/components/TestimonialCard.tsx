import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, location, text, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <div className="relative">
        <Quote className="w-8 h-8 text-blue-100 absolute -top-2 -left-2 -z-10" />
        <p className="text-gray-700 italic mb-6 relative z-10">"{text}"</p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
}
