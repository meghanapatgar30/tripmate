import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Bus } from 'lucide-react';
import { SAMPLE_JOURNEYS } from '../../data/journeys';
import { JourneyCard } from '../journey/JourneyCard';

export const FeaturedJourneys: React.FC = () => {
  const featured = SAMPLE_JOURNEYS.slice(0, 4);

  return (
    <section className="py-16 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#E10600] bg-red-50 px-3 py-1 rounded-md border border-red-200 inline-flex mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E10600]" />
              <span>RECOMMENDED TRANSIT ROUTES</span>
            </div>
            <h2 className="text-3xl font-black text-[#2A2A2A] tracking-tight">
              Featured Intercity Journeys
            </h2>
            <p className="text-zinc-500 text-sm mt-1 font-medium">
              Top rated overnight sleeper buses and express trains with student coupon options
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#2A2A2A] hover:text-[#E10600] uppercase tracking-wider transition"
          >
            <span>Browse All {SAMPLE_JOURNEYS.length} Journeys</span>
            <ArrowRight className="w-4 h-4 text-[#E10600]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>

      </div>
    </section>
  );
};
