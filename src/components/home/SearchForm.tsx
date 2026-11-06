import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRightLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { getTodayFormatted } from '../../lib/format';

const POPULAR_CITIES = [
  'Mangaluru',
  'Bengaluru',
  'Mysuru',
  'Mumbai',
  'Pune',
  'Goa',
  'Hyderabad',
  'Chennai',
  'Manipal',
  'Kochi'
];

export const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState(getTodayFormatted());

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin) params.append('origin', origin);
    if (destination) params.append('destination', destination);
    if (travelDate) params.append('date', travelDate);
    navigate(`/explore?${params.toString()}`);
  };

  const handleQuickPreset = (from: string, to: string) => {
    setOrigin(from);
    setDestination(to);
    navigate(`/explore?origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`);
  };

  return (
    <div className="max-w-5xl mx-auto -mt-10 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-300 p-6 sm:p-7">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2 text-[#2A2A2A] font-black text-sm uppercase tracking-wider">
              <Search className="w-4 h-4 text-[#E10600]" />
              <span>Search Intercity Corridors</span>
            </div>
            <span className="text-xs text-zinc-500 font-bold">Buses • Express Trains • Shuttles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Origin input */}
            <div className="md:col-span-4 relative">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-wider mb-1">From City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#2A2A2A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Mangaluru, Pune..."
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  list="origin-cities"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                />
                <datalist id="origin-cities">
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center pt-4 md:pt-4">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-full bg-zinc-100 text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white border border-zinc-300 transition-transform active:rotate-180 shadow-2xs"
                title="Swap origin and destination"
                aria-label="Swap origin and destination"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination input */}
            <div className="md:col-span-4 relative">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-wider mb-1">To City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#E10600] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Goa..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  list="destination-cities"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                />
                <datalist id="destination-cities">
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Date input */}
            <div className="md:col-span-3">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-wider mb-1">Travel Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={travelDate}
                  min={getTodayFormatted()}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                />
              </div>
            </div>

          </div>

          {/* Quick Route Buttons & Submit Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-200">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-zinc-500 font-bold flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#E10600]" /> Popular Presets:
              </span>
              <button
                type="button"
                onClick={() => handleQuickPreset('Mangaluru', 'Bengaluru')}
                className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-[#2A2A2A] hover:text-white text-[#2A2A2A] font-bold text-[11px] transition border border-zinc-300"
              >
                Mangaluru ➔ Bengaluru
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('Bengaluru', 'Mysuru')}
                className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-[#2A2A2A] hover:text-white text-[#2A2A2A] font-bold text-[11px] transition border border-zinc-300"
              >
                Bengaluru ➔ Mysuru
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('Pune', 'Mumbai')}
                className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-[#2A2A2A] hover:text-white text-[#2A2A2A] font-bold text-[11px] transition border border-zinc-300"
              >
                Pune ➔ Mumbai
              </button>
            </div>

            <Button type="submit" variant="primary" className="w-full sm:w-auto px-8 py-3">
              <Search className="w-4 h-4" />
              Find Journeys
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
