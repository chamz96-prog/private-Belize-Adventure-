import { useState } from 'react';
import { X } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  title: string;
}

export default function TourGallery({ images, title }: TourGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Fallback images if none provided
  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1544582568-76e91eeb4752?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c78?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596423736735-983b65287b4b?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?q=80&w=1974&auto=format&fit=crop'
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px]">
        {/* Main Image */}
        <div 
          className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
          onClick={() => { setIsOpen(true); setPhotoIndex(0); }}
        >
          <img 
            src={displayImages[0]} 
            alt={`${title} main`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
        </div>

        {/* Secondary Images */}
        <div className="hidden md:grid grid-cols-2 col-span-2 row-span-2 gap-2">
          {displayImages.slice(1, 5).map((img, idx) => (
            <div 
              key={idx} 
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => { setIsOpen(true); setPhotoIndex(idx + 1); }}
            >
              <img 
                src={img} 
                alt={`${title} ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {idx === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                  +{displayImages.length - 5} More
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Simplified) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={displayImages[photoIndex]} 
            alt="Full screen" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          
          {/* Navigation Arrows could go here */}
        </div>
      )}
    </div>
  );
}
