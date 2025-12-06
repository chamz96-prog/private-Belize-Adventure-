

interface ItineraryItem {
  time?: string;
  title: string;
  description: string;
}

interface ItineraryTimelineProps {
  itinerary: ItineraryItem[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Itinerary</h2>
      <div className="relative border-l-2 border-blue-100 ml-3 space-y-8">
        {itinerary.map((item, idx) => (
          <div key={idx} className="relative pl-8">
            {/* Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              {item.time && (
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {item.time}
                </span>
              )}
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
