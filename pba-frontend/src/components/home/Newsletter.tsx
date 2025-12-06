import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get Travel Tips & Exclusive Offers
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Join our newsletter to receive Belize travel guides, hidden gem recommendations, and special discounts for your next adventure.
        </p>
        
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-6 py-3 rounded-full outline-none focus:ring-4 focus:ring-blue-400/50 text-gray-900"
            required
          />
          <button 
            type="submit" 
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Subscribe <Send className="w-4 h-4 ml-2" />
          </button>
        </form>
        <p className="text-blue-200 text-xs mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
