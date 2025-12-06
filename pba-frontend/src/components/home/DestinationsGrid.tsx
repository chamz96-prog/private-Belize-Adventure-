import { Link } from 'react-router-dom';

const destinations = [
  {
    name: 'San Pedro',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c78?q=80&w=1974&auto=format&fit=crop',
    count: '12 Tours',
    slug: 'san-pedro',
    size: 'large'
  },
  {
    name: 'Caye Caulker',
    image: 'https://images.unsplash.com/photo-1544582568-76e91eeb4752?q=80&w=2069&auto=format&fit=crop',
    count: '8 Tours',
    slug: 'caye-caulker',
    size: 'small'
  },
  {
    name: 'San Ignacio',
    image: 'https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=1974&auto=format&fit=crop',
    count: '15 Tours',
    slug: 'san-ignacio',
    size: 'small'
  },
  {
    name: 'Placencia',
    image: 'https://images.unsplash.com/photo-1596423736735-983b65287b4b?q=80&w=1974&auto=format&fit=crop',
    count: '6 Tours',
    slug: 'placencia',
    size: 'medium'
  },
  {
    name: 'Belize City',
    image: 'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?q=80&w=1974&auto=format&fit=crop',
    count: '20 Tours',
    slug: 'belize-city',
    size: 'medium'
  }
];

export default function DestinationsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Explore by Location</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Popular Destinations</h2>
          <p className="text-gray-600 text-lg">
            From the bustling streets of Belize City to the laid-back vibes of Caye Caulker, find your perfect spot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {destinations.map((dest, idx) => (
            <Link 
              key={dest.name}
              to={`/tours/destination/${dest.slug}`}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                idx === 0 ? 'md:col-span-2 md:row-span-2' : 
                idx === 3 || idx === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">
                  {dest.count}
                </span>
                <h3 className={`font-bold ${idx === 0 ? 'text-3xl' : 'text-xl'}`}>
                  {dest.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
