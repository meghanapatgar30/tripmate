import React from 'react';
import { Link } from 'react-router-dom';
import { X, BarChart2, Bus, Zap, DollarSign } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';
import { Button } from '../ui/Button';
import { formatINR } from '../../lib/format';

export const JourneyComparison: React.FC = () => {
  const { comparedJourneys, toggleCompareJourney, clearComparison } = useTrips();

  if (comparedJourneys.length === 0) return null;

  // Compute cheapest & fastest
  const cheapestPrice = Math.min(...comparedJourneys.map((j) => j.price));
  const fastestDuration = Math.min(...comparedJourneys.map((j) => j.durationMinutes));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#2A2A2A] text-white border-t-2 border-[#E10600] shadow-2xl animate-in slide-in-from-bottom duration-300 p-4">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E10600] flex items-center justify-center text-white">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-white flex items-center gap-2 tracking-tight">
                Comparing {comparedJourneys.length} of 3 Journeys
              </h4>
              <p className="text-[10px] text-zinc-400 font-medium">Urban route spec comparison</p>
            </div>
          </div>

          <button
            onClick={clearComparison}
            className="text-xs text-zinc-400 hover:text-white underline font-bold"
          >
            Clear all
          </button>
        </div>

        {/* Side by Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {comparedJourneys.map((journey) => {
            const isCheapest = journey.price === cheapestPrice;
            const isFastest = journey.durationMinutes === fastestDuration;

            return (
              <div
                key={journey.id}
                className={`bg-zinc-900 rounded-xl p-3.5 border relative flex flex-col justify-between transition-all ${
                  isCheapest ? 'border-[#E10600]' : 'border-zinc-700'
                }`}
              >
                <button
                  onClick={() => toggleCompareJourney(journey.id)}
                  className="absolute top-2 right-2 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-1 pr-6">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">
                      {journey.transportType}
                    </span>
                    {isCheapest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black bg-[#E10600] text-white px-1.5 py-0.5 rounded">
                        <DollarSign className="w-3 h-3" /> Cheapest
                      </span>
                    )}
                    {isFastest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black bg-zinc-200 text-[#2A2A2A] px-1.5 py-0.5 rounded">
                        <Zap className="w-3 h-3 text-[#E10600]" /> Fastest
                      </span>
                    )}
                  </div>
                  <h5 className="font-black text-sm text-white truncate">{journey.operatorName}</h5>
                  <p className="text-xs text-zinc-400 font-medium">
                    {journey.origin} ➔ {journey.destination}
                  </p>
                </div>

                <div className="my-2 py-2 border-y border-zinc-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-bold uppercase">Sample Fare</span>
                    <span className={`font-black text-sm ${isCheapest ? 'text-[#E10600]' : 'text-white'}`}>
                      {formatINR(journey.price)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-bold uppercase">Duration & Rating</span>
                    <span className="font-bold text-zinc-200">
                      {journey.duration} • ★ {journey.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1">
                    {journey.amenities.slice(0, 2).map((a) => (
                      <span key={a} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {a}
                      </span>
                    ))}
                  </div>

                  <Link to={`/journey/${journey.id}`}>
                    <Button variant="primary" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Fill empty slots up to 3 */}
          {Array.from({ length: 3 - comparedJourneys.length }).map((_, idx) => (
            <div
              key={idx}
              className="hidden md:flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-center text-xs font-bold"
            >
              <Bus className="w-5 h-5 mb-1 text-zinc-700" />
              <span>Select another journey to compare</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
