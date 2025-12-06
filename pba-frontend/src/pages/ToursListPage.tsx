import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { MapPin, Calendar, Search, Star, Clock, Filter, ChevronDown } from "lucide-react";
import type { TourCard } from "../types";

// Mock Data
const MOCK_TOURS: TourCard[] = [
  {
    id: 1,
    slug: "altun-ha-cave-tubing",
    title: "Altun Ha & Cave Tubing Combo",
    image: "https://images.unsplash.com/photo-1544582568-76e91eeb4752?q=80&w=2069&auto=format&fit=crop",
    featured: true,
    destinationName: "Belize City",
    duration: "5.5 Hours",
    fromPrice: 85,
    currency: "USD",
    ratingAverage: 4.9,
    ratingCount: 342,
    tagLine: "Belize Tours from Belize City"
  },
  {
    id: 2,
    slug: "xunantunich-mayan-ruins",
    title: "Xunantunich Mayan Ruins",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop",
    destinationName: "San Ignacio",
    duration: "6 Hours",
    fromPrice: 110,
    currency: "USD",
    ratingAverage: 4.8,
    ratingCount: 120,
    tagLine: "Mayan Ruins from San Ignacio"
  },
  {
    id: 3,
    slug: "hol-chan-snorkeling",
    title: "Hol Chan Marine Reserve Snorkeling",
    image: "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    destinationName: "San Pedro",
    duration: "4 Hours",
    fromPrice: 75,
    currency: "USD",
    ratingAverage: 5.0,
    ratingCount: 500,
    tagLine: "Snorkeling from San Pedro"
  },
  {
    id: 4,
    slug: "actun-tunichil-muknal",
    title: "ATM Cave Adventure (Actun Tunichil Muknal)",
    image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1974&auto=format&fit=crop",
    destinationName: "San Ignacio",
    duration: "8 Hours",
    fromPrice: 125,
    currency: "USD",
    ratingAverage: 4.9,
    ratingCount: 210,
    tagLine: "Adventure from San Ignacio"
  },
  {
    id: 5,
    slug: "lamanai-river-safari",
    title: "Lamanai Mayan Ruins & River Safari",
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop",
    destinationName: "Belize City",
    duration: "7 Hours",
    fromPrice: 145,
    currency: "USD",
    ratingAverage: 4.7,
    ratingCount: 180,
    tagLine: "River Safari from Belize City"
  },
  {
    id: 6,
    slug: "caye-caulker-snorkeling",
    title: "Caye Caulker Snorkeling & Beach Break",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    destinationName: "Caye Caulker",
    duration: "5 Hours",
    fromPrice: 65,
    currency: "USD",
    ratingAverage: 4.8,
    ratingCount: 300,
    tagLine: "Snorkeling from Caye Caulker"
  }
];

export default function ToursListPage() {
  const { destinationSlug, categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tours, setTours] = useState<TourCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");

  // Initialize state from URL params
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice && maxPrice) setPriceRange([Number(minPrice), Number(maxPrice)]);

    const ratings = searchParams.get("ratings");
    if (ratings) setSelectedRatings(ratings.split(",").map(Number));

    const types = searchParams.get("types");
    if (types) setSelectedTypes(types.split(","));

    const styles = searchParams.get("styles");
    if (styles) setSelectedStyles(styles.split(","));

    const sort = searchParams.get("sort");
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Update URL when filters change
  const updateParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    // Simulate API Call
    setLoading(true);
    setTimeout(() => {
      let filtered = [...MOCK_TOURS];

      if (destinationSlug) {
        const dest = destinationSlug.replace("-", " ");
        filtered = filtered.filter(t => t.destinationName.toLowerCase().includes(dest.toLowerCase()));
      }

      if (categorySlug) {
        const cat = categorySlug.replace("-", " ");
        filtered = filtered.filter(t => t.title.toLowerCase().includes(cat.toLowerCase()) || t.tagLine?.toLowerCase().includes(cat.toLowerCase()));
      }

      // Apply filters
      if (selectedRatings.length > 0) {
        filtered = filtered.filter(t => selectedRatings.includes(Math.floor(t.ratingAverage)));
      }
      
      // Mock type/style filtering (just for show as mock data doesn't have these fields yet)
      if (selectedTypes.length > 0) {
        console.log("Filtering by types:", selectedTypes);
      }
      if (selectedStyles.length > 0) {
        console.log("Filtering by styles:", selectedStyles);
      }

      setTours(filtered);
      setLoading(false);
    }, 500);
  }, [destinationSlug, categorySlug, selectedRatings, selectedTypes, selectedStyles, priceRange, sortBy]);

  const toggleRating = (rating: number) => {
    const newRatings = selectedRatings.includes(rating) 
      ? selectedRatings.filter(r => r !== rating) 
      : [...selectedRatings, rating];
    setSelectedRatings(newRatings);
    updateParams("ratings", newRatings.length ? newRatings.join(",") : null);
  };

  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    updateParams("types", newTypes.length ? newTypes.join(",") : null);
  };

  const toggleStyle = (style: string) => {
    const newStyles = selectedStyles.includes(style)
      ? selectedStyles.filter(s => s !== style)
      : [...selectedStyles, style];
    setSelectedStyles(newStyles);
    updateParams("styles", newStyles.length ? newStyles.join(",") : null);
  };

  const getPageTitle = () => {
    if (destinationSlug && categorySlug) {
      return `${formatSlug(destinationSlug)} ${formatSlug(categorySlug)} Tours`;
    }
    if (destinationSlug) {
      return `${formatSlug(destinationSlug)} Tours`;
    }
    if (categorySlug) {
      return `${formatSlug(categorySlug)} Tours in Belize`;
    }
    return "All Belize Tours";
  };

  const formatSlug = (slug: string) => {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Bar */}
      <div className="relative h-[300px] bg-gray-900 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544582568-76e91eeb4752?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 max-w-4xl w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {getPageTitle()}
          </h1>
          
          {/* Search Row */}
          <div className="bg-white p-2 rounded-lg shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative border-r border-gray-200">
              <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <select 
                className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-gray-700"
                defaultValue={destinationSlug || ""}
                onChange={(e) => {
                   // In a real app, navigate to the new URL
                   console.log("Navigate to", e.target.value);
                }}
              >
                <option value="">All Destinations</option>
                <option value="belize-city">Belize City</option>
                <option value="san-ignacio">San Ignacio</option>
                <option value="san-pedro">San Pedro</option>
                <option value="caye-caulker">Caye Caulker</option>
              </select>
            </div>
            <div className="flex-1 relative border-r border-gray-200">
              <Calendar className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input type="date" className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-gray-700" />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" /> Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden w-full bg-white border p-3 rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5 mr-2" /> Filters
          </button>

          {/* Left Sidebar: Filters */}
          <aside className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-8">
              
              {/* Price Range */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full p-2 border rounded text-sm"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full p-2 border rounded text-sm"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>

              {/* Review Score */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Review Score</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                      />
                      <div className="ml-2 flex items-center text-sm text-gray-700">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span>& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tour Type */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Tour Type</h3>
                <div className="space-y-2">
                  {["City Trips", "Ecotourism", "Excursions", "Private Tours"].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Travel Style</h3>
                <div className="space-y-2">
                  {["Cultural", "Nature & Adventure", "Marine", "Relaxation"].map((style) => (
                    <label key={style} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                        checked={selectedStyles.includes(style)}
                        onChange={() => toggleStyle(style)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Right Column: Results */}
          <main className="lg:w-3/4">
            
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
                {loading ? "Searching..." : `${tours.length} tours found`}
              </h2>
              
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Show on map</span>
                <div className="relative">
                  <select 
                    className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading tours...</div>
            ) : tours.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
                <button 
                  className="mt-4 text-blue-600 font-medium hover:underline"
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    setSelectedRatings([]);
                    setSelectedTypes([]);
                    setSelectedStyles([]);
                    setPriceRange([0, 500]);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <div key={tour.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                    <div className="relative h-48">
                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                      {tour.featured && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex flex-col grow">
                      <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                        {tour.tagLine || tour.destinationName}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {tour.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="w-4 h-4 mr-1" /> {tour.duration}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                        <div>
                          <div className="flex items-center mb-1">
                            <div className="flex text-yellow-400 text-xs">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="text-gray-700 font-bold ml-1">{tour.ratingAverage}</span>
                            </div>
                            <span className="text-gray-400 text-xs ml-1">({tour.ratingCount})</span>
                          </div>
                          <div className="text-xs text-gray-500">From</div>
                          <div className="text-lg font-bold text-blue-600">
                            {tour.currency} {tour.fromPrice}
                          </div>
                        </div>
                        
                        <Link 
                          to={`/tours/${tour.slug}`}
                          className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                        >
                          View Tour
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && tours.length > 0 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                  &lt;
                </button>
                <button className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  3
                </button>
                <span className="text-gray-400">...</span>
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  8
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  &gt;
                </button>
              </div>
            )}
            
            {!loading && tours.length > 0 && (
              <div className="text-center text-gray-500 text-sm mt-4">
                Showing 1–{tours.length} of {tours.length} tours
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}


