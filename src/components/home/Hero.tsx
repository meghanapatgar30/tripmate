import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Wallet, CheckCircle2, Bus, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#2A2A2A] text-white pt-14 pb-20 border-b border-zinc-800">
      
      {/* Subtle Grid / Architectural Lines Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C0C0C0_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs font-mono text-[#C0C0C0] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E10600]" />
              <span>URBAN TRAVEL TECH PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              PLAN SMARTER. <br />
              TRAVEL BETTER. <br />
              <span className="text-[#E10600] font-black">
                SPEND WISELY.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#C0C0C0] max-w-2xl leading-relaxed font-normal">
              An urban intercity travel planner designed for college students across Indian transport corridors. Compare bus & train schedules, organize packing checklists, and control travel budgets.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-white pt-1">
              <div className="flex items-center gap-2 bg-zinc-800/90 px-3.5 py-2 rounded-xl border border-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
                <span>Intercity Route Comparison</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-800/90 px-3.5 py-2 rounded-xl border border-zinc-700">
                <Wallet className="w-4 h-4 text-[#E10600]" />
                <span>Travel Budget Tracker</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-800/90 px-3.5 py-2 rounded-xl border border-zinc-700">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>100% Offline Persistence</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <Link to="/explore">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <Compass className="w-5 h-5" />
                  Explore Journeys
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/budget-planner">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent text-white border-zinc-600 hover:bg-zinc-800 hover:border-white">
                  <Wallet className="w-5 h-5 text-[#E10600]" />
                  Try Budget Planner
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container */}
              <div className="bg-white text-[#2A2A2A] rounded-2xl p-6 shadow-2xl border border-zinc-300 relative">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] flex items-center justify-center text-white">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#2A2A2A] text-sm">Mangaluru ➔ Bengaluru</h3>
                      <p className="text-xs text-zinc-500 font-medium">Overnight AC Sleeper Bus</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-[#2A2A2A] text-white text-xs font-black">
                    ₹750
                  </span>
                </div>

                {/* Timeline visual */}
                <div className="space-y-3 bg-[#F5F5F5] p-4 rounded-xl border border-zinc-200">
                  <div className="flex justify-between items-center text-xs font-bold text-[#2A2A2A]">
                    <span>21:45 • State Bank</span>
                    <span className="text-zinc-500 text-[11px]">8h 45m</span>
                    <span>06:30 (+1d) • Majestic</span>
                  </div>
                  
                  <div className="relative flex items-center justify-between px-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
                    <div className="flex-1 h-0.5 bg-[#2A2A2A] mx-2 relative">
                      <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-[#2A2A2A] text-white px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase">
                        CANARA EXPRESS
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-zinc-300 font-bold text-zinc-700">Wi-Fi</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-zinc-300 font-bold text-zinc-700">Charging Slot</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 border border-red-200 text-[#E10600] font-black">Code: STUDENT50</span>
                  </div>
                </div>

                {/* Bottom stats float box */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
                    <span className="font-bold text-[#2A2A2A]">14 Seats Left</span>
                  </div>
                  <span className="text-[#2A2A2A] font-extrabold">★ 4.8 (340 Reviews)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
