import React from 'react';
import { RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import { TransportType, Amenity, JourneyFilterState } from '../../types';

interface JourneyFiltersProps {
  filters: JourneyFilterState;
  setFilters: React.Dispatch<React.SetStateAction<JourneyFilterState>>;
  onClearFilters: () => void;
  totalResults: number;
}

const ALL_TRANSPORT_TYPES: TransportType[] = [
  'AC Sleeper Bus',
  'Non-AC Sleeper',
  'AC Seater Bus',
  'Express Train',
  'Vande Bharat Express',
  'Shared Shuttle'
];

const ALL_AMENITIES: Amenity[] = [
  'Wi-Fi',
  'Charging Point',
  'Water Bottle',
  'Blanket & Pillow',
  'Live GPS Tracking',
  'Reading Light',
  'Reclining Seats',
  'Rest Stop'
];

export const JourneyFilters: React.FC<JourneyFiltersProps> = ({
  filters,
  setFilters,
  onClearFilters,
  totalResults,
}) => {
  const toggleTransportType = (type: TransportType) => {
    setFilters((prev) => {
      const exists = prev.transportTypes.includes(type);
      return {
        ...prev,
        transportTypes: exists
          ? prev.transportTypes.filter((t) => t !== type)
          : [...prev.transportTypes, type],
      };
    });
  };

  const toggleAmenity = (amenity: Amenity) => {
    setFilters((prev) => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists
          ? prev.selectedAmenities.filter((a) => a !== amenity)
          : [...prev.selectedAmenities, amenity],
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-300 p-5 space-y-6 shadow-2xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-2 font-black text-[#2A2A2A] text-sm uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4 text-[#E10600]" />
          <span>Filters</span>
          <span className="text-xs font-bold text-zinc-400">({totalResults})</span>
        </div>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#E10600] hover:underline transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sorting Dropdown */}
      <div>
        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortBy: e.target.value as JourneyFilterState['sortBy'] }))
          }
          className="w-full px-3 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="duration-asc">Fastest Duration</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
      </div>

      {/* Max Price Range Filter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">Max Ticket Price</span>
          <span className="font-black text-[#E10600] text-sm">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={300}
          max={1500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-[#E10600] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 font-bold">
          <span>₹300</span>
          <span>₹900</span>
          <span>₹1500</span>
        </div>
      </div>

      {/* Transport Type Filter */}
      <div className="space-y-2">
        <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-wider">
          Transport Mode
        </span>
        <div className="space-y-1.5">
          {ALL_TRANSPORT_TYPES.map((type) => {
            const checked = filters.transportTypes.includes(type);
            return (
              <label
                key={type}
                onClick={() => toggleTransportType(type)}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold cursor-pointer transition border ${
                  checked
                    ? 'bg-[#2A2A2A] border-[#2A2A2A] text-white'
                    : 'bg-[#F5F5F5] border-transparent text-zinc-700 hover:bg-zinc-200/80'
                }`}
              >
                <span>{type}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                    checked ? 'bg-[#E10600] border-[#E10600] text-white' : 'border-zinc-400 bg-white'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="space-y-2 pt-2 border-t border-zinc-200">
        <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-wider">
          Amenities
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {ALL_AMENITIES.map((amenity) => {
            const checked = filters.selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border text-left truncate transition ${
                  checked
                    ? 'bg-[#E10600] text-white border-[#E10600]'
                    : 'bg-[#F5F5F5] text-zinc-700 border-zinc-300 hover:bg-zinc-200'
                }`}
                title={amenity}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
