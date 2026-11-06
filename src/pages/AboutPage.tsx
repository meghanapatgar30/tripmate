import React from 'react';
import { Bus, GraduationCap, Compass, Code2, ShieldAlert } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero Banner */}
        <div className="bg-[#2A2A2A] text-white rounded-2xl p-8 sm:p-10 border border-zinc-800 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-xl bg-[#E10600] text-white flex items-center justify-center mx-auto shadow-md">
            <Bus className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono font-bold text-[#C0C0C0] uppercase tracking-widest bg-zinc-800 px-3 py-1 rounded border border-zinc-700 inline-block">
            INFORMATION SCIENCE ENGINEERING MILESTONE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ABOUT TRIPMATE
          </h1>
          <p className="text-[#C0C0C0] text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Plan smarter. Travel better. Spend wisely. TripMate is an urban intercity travel planner designed for college students and budget travelers across Indian transport corridors.
          </p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-zinc-300 p-7 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-[#E10600]" />
            </div>
            <h3 className="font-black text-[#2A2A2A] text-lg">The Student Travel Problem</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              College students frequently travel between university campuses and home cities (e.g., Mangaluru ⇄ Bengaluru, Pune ⇄ Mumbai). Comparing bus schedules, managing weekend allowances, tracking packing essentials, and remembering student discount codes across platforms is cumbersome.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-300 p-7 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center font-bold">
              <Compass className="w-5 h-5 text-[#E10600]" />
            </div>
            <h3 className="font-black text-[#2A2A2A] text-lg">The TripMate Solution</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              TripMate consolidates intercity route exploration, side-by-side journey comparison, packing checklists, and budget calculation into a single client-side web application with 100% offline persistence.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-2xl border border-zinc-300 p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 text-[#2A2A2A] font-black text-lg">
            <Code2 className="w-5 h-5 text-[#E10600]" />
            <span>Technology Stack</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#F5F5F5] border border-zinc-300 space-y-1">
              <span className="font-black text-xs text-[#2A2A2A] block">React 19 & Vite</span>
              <span className="text-[11px] text-zinc-500 font-bold">Client SPA engine</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F5F5] border border-zinc-300 space-y-1">
              <span className="font-black text-xs text-[#2A2A2A] block">TypeScript</span>
              <span className="text-[11px] text-zinc-500 font-bold">Full type safety</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F5F5] border border-zinc-300 space-y-1">
              <span className="font-black text-xs text-[#2A2A2A] block">Tailwind CSS v4</span>
              <span className="text-[11px] text-zinc-500 font-bold">Charcoal & Signal Red</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F5F5] border border-zinc-300 space-y-1">
              <span className="font-black text-xs text-[#2A2A2A] block">LocalStorage API</span>
              <span className="text-[11px] text-zinc-500 font-bold">Offline persistence</span>
            </div>
          </div>
        </div>

        {/* Academic Project Disclaimer */}
        <div className="bg-white rounded-2xl border border-zinc-300 p-7 space-y-3">
          <div className="flex items-center gap-2 text-[#E10600] font-black text-sm">
            <ShieldAlert className="w-5 h-5 text-[#E10600]" />
            <span>Academic Milestone Disclaimer</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed font-medium">
            TripMate is a student milestone project created for academic evaluation. All route prices, operator names, bus timings, and seat availability are sample demonstration data.
          </p>
        </div>

      </div>
    </div>
  );
};
