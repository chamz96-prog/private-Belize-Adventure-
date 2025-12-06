import { Search, MapPin, Calendar, Anchor } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1544582568-76e91eeb4752?q=80&w=2069&auto=format&fit=crop" 
          alt="Belize Blue Hole" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 animate-fade-in-up">
            Discover the Jewel of the Caribbean
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-fade-in-up delay-100">
            Unforgettable <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Belize Adventures
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl drop-shadow-md animate-fade-in-up delay-200">
            Experience private cave tubing, ancient Mayan ruins, and pristine barrier reefs with local experts who treat you like family.
          </p>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl animate-fade-in-up delay-300">
            <div className="bg-white rounded-xl flex flex-col md:flex-row p-2 gap-2">
              <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-100">
                <div className="absolute left-4 top-3.5 text-blue-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <select className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                  <option value="">Where to?</option>
                  <option value="belize-city">Belize City</option>
                  <option value="san-pedro">San Pedro</option>
                  <option value="caye-caulker">Caye Caulker</option>
                  <option value="placencia">Placencia</option>
                </select>
              </div>
              
              <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-100">
                <div className="absolute left-4 top-3.5 text-blue-500">
                  <Anchor className="w-5 h-5" />
                </div>
                <select className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                  <option value="">Experience</option>
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="culture">Culture</option>
                  <option value="wildlife">Wildlife</option>
                </select>
              </div>

              <div className="flex-1 relative">
                <div className="absolute left-4 top-3.5 text-blue-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <input 
                  type="date" 
                  className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-gray-700 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                />
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center">
                <Search className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4 animate-fade-in-up delay-500">
            <div className="flex -space-x-4">
              <img className="w-10 h-10 rounded-full border-2 border-gray-900" src="https://i.pravatar.cc/100?img=1" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-gray-900" src="https://i.pravatar.cc/100?img=2" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-gray-900" src="https://i.pravatar.cc/100?img=3" alt="User" />
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-800 text-white text-xs flex items-center justify-center font-bold">
                500+
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex text-yellow-400 text-sm">
                {'★'.repeat(5)}
              </div>
              <span className="text-gray-300 text-xs">Trusted by happy travelers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
