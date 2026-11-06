import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Bus } from 'lucide-react';
import { POPULAR_ROUTES } from '../../data/popularRoutes';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatINR } from '../../lib/format';

export const PopularRoutes: React.FC = () => {
  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#E10600] uppercase tracking-widest mb-1">
              <Bus className="w-4 h-4" />
              <span>KEY TRANSPORT CORRIDORS</span>
            </div>
            <h2 className="text-3xl font-black text-[#2A2A2A] tracking-tight">
              Popular College Corridors
            </h2>
            <p className="text-zinc-500 text-sm mt-1 font-medium">
              Frequent intercity transit links connecting major Indian student centers
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#2A2A2A] hover:text-[#E10600] uppercase tracking-wider transition"
          >
            <span>View All Routes</span>
            <ArrowRight className="w-4 h-4 text-[#E10600]" />
          </Link>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <Link
              key={route.id}
              to={`/explore?origin=${encodeURIComponent(route.origin)}&destination=${encodeURIComponent(route.destination)}`}
            >
              <Card hoverable className="p-6 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={route.category === 'Student Hub' ? 'red' : 'charcoal'}>
                      {route.category}
                    </Badge>
                    <span className="text-[11px] font-bold text-zinc-500">
                      {route.frequency}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center group-hover:bg-[#E10600] transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#2A2A2A] text-base group-hover:text-[#E10600] transition-colors">
                        {route.origin} ➔ {route.destination}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" /> {route.avgDuration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">Starts from</span>
                    <span className="text-xl font-black text-[#2A2A2A]">{formatINR(route.startingPrice)}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-[#E10600] group-hover:translate-x-1 transition-transform">
                    Explore Option <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
