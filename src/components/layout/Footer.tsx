import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, ShieldAlert, GraduationCap, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2A2A2A] text-zinc-300 pt-14 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">
          
          {/* Col 1: Brand & Description */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E10600] flex items-center justify-center text-white font-bold">
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                TRIP<span className="text-[#E10600]">MATE</span>
              </span>
            </div>
            <p className="text-xs text-[#C0C0C0] leading-relaxed">
              Plan smarter. Travel better. Spend wisely. Bold urban travel-tech platform for college students and intercity travelers in India.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-xs text-zinc-200 font-medium">
              <GraduationCap className="w-4 h-4 text-[#E10600]" />
              <span>ISE College Milestone Project</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E10600] pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C0C0C0]">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Home Corridor</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white hover:underline transition-colors">Explore All Journeys</Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-white hover:underline transition-colors">My Saved Trips & Packing List</Link>
              </li>
              <li>
                <Link to="/budget-planner" className="hover:text-white hover:underline transition-colors">Travel Budget Planner</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Student Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E10600] pl-2">
              Student Corridors
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C0C0C0]">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E10600]" /> Mangaluru ⇄ Bengaluru
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E10600]" /> Mysuru ⇄ Bengaluru
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E10600]" /> Pune ⇄ Mumbai
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E10600]" /> Manipal ⇄ Bengaluru
              </li>
            </ul>
          </div>

          {/* Col 4: Project Disclaimer */}
          <div className="bg-zinc-800/80 p-4.5 rounded-xl border border-zinc-700/80 space-y-2">
            <div className="flex items-center gap-2 text-[#E10600] font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Academic Milestone Disclaimer</span>
            </div>
            <p className="text-[11px] text-[#C0C0C0] leading-normal">
              TripMate is an independent academic concept project. All routes, pricing, and bus/train operator names are sample demonstration data for evaluation purposes.
            </p>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} TRIPMATE. Information Science Engineering Milestone.</p>
          <div className="flex items-center gap-1 text-[#C0C0C0]">
            <span>React 19 • TypeScript • Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
