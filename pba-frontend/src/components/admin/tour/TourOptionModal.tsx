import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { TourOptionPayload, TourOptionSchedule, TourOptionPricingTier } from '../../../types';

interface TourOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (option: TourOptionPayload) => void;
  initialData?: TourOptionPayload | null;
  currency: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const GUEST_TYPES = ['adult', 'child', 'youth', 'infant', 'other'];

const emptyTier: TourOptionPricingTier = {
  label: 'Adult',
  guestType: 'adult',
  minGuests: 1,
  maxGuests: 10,
  pricePerPerson: 0
};

const emptySchedule: TourOptionSchedule = {
  startDate: new Date().toISOString().split('T')[0],
  daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
  startTime: '08:00',
  pricingTiers: [{ ...emptyTier }]
};

const emptyOption: TourOptionPayload = {
  code: '',
  name: '',
  type: 'private',
  isDefault: false,
  includesTransportation: true,
  includesTransfers: false,
  includesEntranceFees: false,
  currency: 'USD',
  isActive: true,
  schedules: [{ ...emptySchedule }]
};

export default function TourOptionModal({ isOpen, onClose, onSave, initialData, currency }: TourOptionModalProps) {
  const [formData, setFormData] = useState<TourOptionPayload>(emptyOption);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ? JSON.parse(JSON.stringify(initialData)) : { ...emptyOption, currency });
    }
  }, [isOpen, initialData, currency]);

  if (!isOpen) return null;

  const updateField = (field: keyof TourOptionPayload, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Schedule Helpers
  const addSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedules: [...prev.schedules, { ...emptySchedule }]
    }));
  };

  const removeSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index)
    }));
  };

  const updateSchedule = (index: number, field: keyof TourOptionSchedule, value: any) => {
    setFormData(prev => {
      const newSchedules = [...prev.schedules];
      newSchedules[index] = { ...newSchedules[index], [field]: value };
      return { ...prev, schedules: newSchedules };
    });
  };

  const toggleDay = (scheduleIndex: number, dayIndex: number) => {
    setFormData(prev => {
      const newSchedules = [...prev.schedules];
      const currentDays = newSchedules[scheduleIndex].daysOfWeek;
      const newDays = currentDays.includes(dayIndex)
        ? currentDays.filter(d => d !== dayIndex)
        : [...currentDays, dayIndex].sort();
      newSchedules[scheduleIndex] = { ...newSchedules[scheduleIndex], daysOfWeek: newDays };
      return { ...prev, schedules: newSchedules };
    });
  };

  // Tier Helpers
  const addTier = (scheduleIndex: number) => {
    setFormData(prev => {
      const newSchedules = [...prev.schedules];
      newSchedules[scheduleIndex].pricingTiers.push({ ...emptyTier });
      return { ...prev, schedules: newSchedules };
    });
  };

  const removeTier = (scheduleIndex: number, tierIndex: number) => {
    setFormData(prev => {
      const newSchedules = [...prev.schedules];
      newSchedules[scheduleIndex].pricingTiers = newSchedules[scheduleIndex].pricingTiers.filter((_, i) => i !== tierIndex);
      return { ...prev, schedules: newSchedules };
    });
  };

  const updateTier = (scheduleIndex: number, tierIndex: number, field: keyof TourOptionPricingTier, value: any) => {
    setFormData(prev => {
      const newSchedules = [...prev.schedules];
      const newTiers = [...newSchedules[scheduleIndex].pricingTiers];
      newTiers[tierIndex] = { ...newTiers[tierIndex], [field]: value };
      newSchedules[scheduleIndex].pricingTiers = newTiers;
      return { ...prev, schedules: newSchedules };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Option' : 'Add New Option'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Basic Settings */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Option Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Private Tour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={e => updateField('code', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. TG1-PVT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={e => updateField('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="private">Private</option>
                  <option value="shared">Shared</option>
                  <option value="with_transfers">With Transfers</option>
                  <option value="transport_only">Transport Only</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={e => updateField('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="BZD">BZD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={e => updateField('isDefault', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Default Option</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includesTransportation}
                  onChange={e => updateField('includesTransportation', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Includes Transportation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includesTransfers}
                  onChange={e => updateField('includesTransfers', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Includes Transfers</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includesEntranceFees}
                  onChange={e => updateField('includesEntranceFees', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Includes Entrance Fees</span>
              </label>
            </div>
          </section>

          {/* Pricing Schedules */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-bold text-gray-900">Pricing Schedules</h3>
              <button
                onClick={addSchedule}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Schedule
              </button>
            </div>

            {formData.schedules.map((schedule, sIdx) => (
              <div key={sIdx} className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative">
                <button
                  onClick={() => removeSchedule(sIdx)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={schedule.startDate}
                      onChange={e => updateSchedule(sIdx, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">End Date (Optional)</label>
                    <input
                      type="date"
                      value={schedule.endDate || ''}
                      onChange={e => updateSchedule(sIdx, 'endDate', e.target.value || null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={schedule.startTime}
                      onChange={e => updateSchedule(sIdx, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Duration (Hours)</label>
                    <input
                      type="number"
                      value={schedule.durationHours || ''}
                      onChange={e => updateSchedule(sIdx, 'durationHours', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g. 6"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-500 mb-2">Days of Week</label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((day, dIdx) => (
                      <button
                        key={dIdx}
                        onClick={() => toggleDay(sIdx, dIdx)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          schedule.daysOfWeek.includes(dIdx)
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing Tiers Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                      <tr>
                        <th className="px-4 py-2">Guest Type</th>
                        <th className="px-4 py-2">Label</th>
                        <th className="px-4 py-2">Min Guests</th>
                        <th className="px-4 py-2">Max Guests</th>
                        <th className="px-4 py-2">Price ({formData.currency})</th>
                        <th className="px-4 py-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {schedule.pricingTiers.map((tier, tIdx) => (
                        <tr key={tIdx}>
                          <td className="p-2">
                            <select
                              value={tier.guestType}
                              onChange={e => updateTier(sIdx, tIdx, 'guestType', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded"
                            >
                              {GUEST_TYPES.map(t => (
                                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={tier.label}
                              onChange={e => updateTier(sIdx, tIdx, 'label', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={tier.minGuests}
                              onChange={e => updateTier(sIdx, tIdx, 'minGuests', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-200 rounded"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={tier.maxGuests}
                              onChange={e => updateTier(sIdx, tIdx, 'maxGuests', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-200 rounded"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={tier.pricePerPerson}
                              onChange={e => updateTier(sIdx, tIdx, 'pricePerPerson', Number(e.target.value))}
                              className="w-24 px-2 py-1 border border-gray-200 rounded"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => removeTier(sIdx, tIdx)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-2 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={() => addTier(sIdx)}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Pricing Tier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save Option
          </button>
        </div>
      </div>
    </div>
  );
}
