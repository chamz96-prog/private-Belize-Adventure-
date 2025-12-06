import { useState } from 'react';
import { Edit2, Plus, Calendar, Clock } from 'lucide-react';
import type { TourOptionPayload } from '../../../types';
import TourOptionModal from './TourOptionModal';

interface TourOptionsSectionProps {
  options: TourOptionPayload[];
  onChange: (options: TourOptionPayload[]) => void;
  currency: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TourOptionsSection({ options, onChange, currency }: TourOptionsSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSave = (option: TourOptionPayload) => {
    if (editingIndex !== null) {
      const newOptions = [...options];
      newOptions[editingIndex] = option;
      onChange(newOptions);
    } else {
      onChange([...options, option]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this option?')) {
      const newOptions = options.filter((_, i) => i !== index);
      onChange(newOptions);
    }
  };

  const formatDays = (days: number[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 0) return 'No days selected';
    return days.map(d => DAYS[d]).join(', ');
  };

  if (!options) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {options.map((option, index) => {
          const firstSchedule = option.schedules?.[0];
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                      {option.code && (
                        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {option.code}
                        </span>
                      )}
                      {option.isDefault && (
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    {firstSchedule?.durationHours && (
                      <p className="text-sm text-gray-500">{firstSchedule.durationHours} hours</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5 rotate-45" />
                    </button>
                  </div>
                </div>

                {/* Schedule Summary */}
                {firstSchedule && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(firstSchedule.startDate).toLocaleDateString()} 
                          {firstSchedule.endDate ? ` - ${new Date(firstSchedule.endDate).toLocaleDateString()}` : ' - No end date'}
                        </p>
                        <p className="text-xs mt-0.5">{formatDays(firstSchedule.daysOfWeek)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{firstSchedule.startTime}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 space-y-1">
                      {firstSchedule.pricingTiers.map((tier, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {tier.label}: {tier.minGuests}-{tier.maxGuests} guests
                          </span>
                          <span className="font-medium text-gray-900">
                            {option.currency} {tier.pricePerPerson.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <button 
                    onClick={() => handleEdit(index)}
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    + Add a pricing schedule
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Option Box */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Add another option</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            An option is a unique version of your product that offers specific languages, starting points, or customizations.
          </p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add option
          </button>
        </div>
      </div>

      <TourOptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingIndex !== null ? options[editingIndex] : null}
        currency={currency}
      />
    </div>
  );
}
