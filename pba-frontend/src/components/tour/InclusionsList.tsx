import { Check, X } from 'lucide-react';

interface InclusionsListProps {
  included: string[];
  excluded: string[];
}

export default function InclusionsList({ included, excluded }: InclusionsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Check className="w-5 h-5" />
          </span>
          What's Included
        </h3>
        <ul className="space-y-3">
          {included.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-600">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <X className="w-5 h-5" />
          </span>
          What's Not Included
        </h3>
        <ul className="space-y-3">
          {excluded.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-600">
              <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
