import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Clock, Star, Bus, Train, Tag, BarChart2 } from 'lucide-react';
import { Journey } from '../../types';
import { useTrips } from '../../context/TripsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatINR } from '../../lib/format';

interface JourneyCardProps {
  journey: Journey;
  showCompareOption?: boolean;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({ journey, showCompareOption = true }) => {
  const { isJourneySaved, toggleSaveJourney, isJourneyCompared, toggleCompareJourney } = useTrips();

  const saved = isJourneySaved(journey.id);
  const compared = isJourneyCompared(journey.id);

  const getTransportIcon = () => {
    if (journey.transportType.includes('Train')) {
      return <Train className="w-4 h-4" />;
    }
    return <Bus className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs hover:border-[#2A2A2A] hover:shadow-xs transition-all duration-200 overflow-hidden flex flex-col justify-between group relative">
      
      {/* Top Bar */}
      <div className="p-5 pb-3 border-b border-zinc-200 flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 text-[#2A2A2A] border border-zinc-300 text-xs font-bold">
              {getTransportIcon()}
              {journey.transportType}
            </span>
            {journey.badge && (
              <Badge variant="red">{journey.badge}</Badge>
            )}
            {journey.studentDiscountCode && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#E10600] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                <Tag className="w-3 h-3 text-[#E10600]" /> {journey.studentDiscountCode}
              </span>
            )}
          </div>
          <h3 className="font-black text-[#2A2A2A] text-base group-hover:text-[#E10600] transition-colors mt-1">
            {journey.operatorName}
          </h3>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleSaveJourney(journey.id)}
          className={`p-2 rounded-xl border transition-all ${
            saved
              ? 'bg-[#2A2A2A] border-[#2A2A2A] text-white shadow-2xs'
              : 'bg-white border-zinc-300 text-zinc-400 hover:text-[#2A2A2A] hover:bg-zinc-100'
          }`}
          title={saved ? 'Remove from saved trips' : 'Save this journey'}
          aria-label={saved ? 'Remove from saved trips' : 'Save this journey'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-[#E10600]' : ''}`} />
        </button>
      </div>

      {/* Main Journey Details Section */}
      <div className="p-5 space-y-4">
        
        {/* Timeline */}
        <div className="bg-[#F5F5F5] p-3.5 rounded-xl border border-zinc-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">DEPARTURE</span>
              <span className="font-black text-[#2A2A2A] text-sm">{journey.departureTime}</span>
              <span className="text-zinc-600 block text-[11px] font-semibold truncate max-w-[140px]">{journey.origin}</span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="text-[10px] font-bold text-zinc-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {journey.duration}
              </span>
              <div className="w-20 sm:w-28 h-0.5 bg-zinc-300 relative my-1.5">
                <div className="w-2 h-2 rounded-full bg-[#2A2A2A] absolute -left-1 -top-0.75" />
                <div className="w-2 h-2 rounded-full bg-[#E10600] absolute -right-1 -top-0.75" />
              </div>
              <span className="text-[10px] text-[#E10600] font-black uppercase tracking-wider">Direct</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">ARRIVAL</span>
              <span className="font-black text-[#2A2A2A] text-sm">{journey.arrivalTime}</span>
              <span className="text-zinc-600 block text-[11px] font-semibold truncate max-w-[140px]">{journey.destination}</span>
            </div>
          </div>
        </div>

        {/* Rating, Seats & Key Amenities */}
        <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 font-black text-[#2A2A2A] bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
              <Star className="w-3.5 h-3.5 fill-[#E10600] text-[#E10600]" />
              {journey.rating}
            </span>
            <span className="text-zinc-400 font-normal">({journey.totalReviews} reviews)</span>
          </div>

          <div className="flex items-center gap-1 font-bold text-zinc-700">
            <span className="w-2 h-2 rounded-full bg-[#E10600]" />
            <span>{journey.availableSeats} seats left</span>
          </div>
        </div>

        {/* Amenities Pills */}
        <div className="flex flex-wrap gap-1.5">
          {journey.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded border border-zinc-200">
              {amenity}
            </span>
          ))}
          {journey.amenities.length > 4 && (
            <span className="text-[10px] font-bold bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded">
              +{journey.amenities.length - 4}
            </span>
          )}
        </div>

      </div>

      {/* Footer Price & Action Buttons */}
      <div className="p-5 pt-3 bg-zinc-50/80 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Sample Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#E10600]">{formatINR(journey.price)}</span>
            <span className="text-xs text-zinc-500 font-medium">/ seat</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showCompareOption && (
            <button
              type="button"
              onClick={() => toggleCompareJourney(journey.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
                compared
                  ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
              }`}
              title="Compare side-by-side"
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#E10600]" />
              <span>{compared ? 'Comparing' : 'Compare'}</span>
            </button>
          )}

          <Link to={`/journey/${journey.id}`} className="flex-1 sm:flex-initial">
            <Button variant="primary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
