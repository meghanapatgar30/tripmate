import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, Wallet, Bookmark, CheckSquare, Compass, User as UserIcon, 
  Search, ArrowRight, Sparkles, MapPin, Lightbulb
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripsContext';
import { useBudget } from '../context/BudgetContext';
import { POPULAR_ROUTES } from '../data/popularRoutes';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatINR } from '../lib/format';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { savedJourneys, userTrips, checklist } = useTrips();
  const { totalBudget, totalSpent, remainingBudget } = useBudget();

  const firstName = currentUser?.fullName.split(' ')[0] || 'Student';

  const completedChecklist = checklist.filter((i) => i.completed).length;
  const checklistPercent = checklist.length > 0 ? Math.round((completedChecklist / checklist.length) * 100) : 0;

  return (
    <div className="py-10 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Greeting & Personal Welcome in Charcoal #2A2A2A */}
        <div className="bg-[#2A2A2A] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-800 text-white text-xs font-mono border border-zinc-700">
                <span className="w-2 h-2 rounded-full bg-[#E10600]" /> STUDENT DASHBOARD
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                WELCOME BACK, {firstName.toUpperCase()}! 👋
              </h1>
              <p className="text-[#C0C0C0] text-xs sm:text-sm max-w-xl font-medium">
                Your travel summary: saved intercity routes, packing preparation, and travel expense tracking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/explore">
                <Button variant="primary" size="md">
                  <Search className="w-4 h-4" /> Find Routes
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="md" className="bg-transparent text-white border-zinc-600 hover:bg-zinc-800 hover:border-white">
                  <UserIcon className="w-4 h-4 text-[#E10600]" /> Preferences
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Saved Journeys */}
          <Link to="/my-trips" className="block group">
            <Card className="p-5 h-full flex flex-col justify-between group-hover:border-[#2A2A2A] transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center font-bold">
                  <Bookmark className="w-5 h-5 text-[#E10600]" />
                </div>
                <span className="text-[10px] font-black uppercase text-[#2A2A2A] bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
                  Saved
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-[#2A2A2A]">{savedJourneys.length}</span>
                <span className="text-xs text-zinc-500 block font-bold">Bookmarked Routes</span>
              </div>
            </Card>
          </Link>

          {/* Card 2: Planned Trips */}
          <Link to="/my-trips" className="block group">
            <Card className="p-5 h-full flex flex-col justify-between group-hover:border-[#2A2A2A] transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center font-bold">
                  <Bus className="w-5 h-5 text-[#E10600]" />
                </div>
                <span className="text-[10px] font-black uppercase text-[#2A2A2A] bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
                  Scheduled
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-[#2A2A2A]">{userTrips.length}</span>
                <span className="text-xs text-zinc-500 block font-bold">Upcoming Itineraries</span>
              </div>
            </Card>
          </Link>

          {/* Card 3: Packing Readiness */}
          <Link to="/my-trips" className="block group">
            <Card className="p-5 h-full flex flex-col justify-between group-hover:border-[#2A2A2A] transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center font-bold">
                  <CheckSquare className="w-5 h-5 text-[#E10600]" />
                </div>
                <span className="text-[10px] font-black uppercase text-white bg-[#E10600] px-2 py-0.5 rounded">
                  {checklistPercent}%
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-[#2A2A2A]">{completedChecklist}/{checklist.length}</span>
                <span className="text-xs text-zinc-500 block font-bold">Packing Items Packed</span>
              </div>
            </Card>
          </Link>

          {/* Card 4: Budget Balance */}
          <Link to="/budget-planner" className="block group">
            <Card className="p-5 h-full flex flex-col justify-between group-hover:border-[#2A2A2A] transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center font-bold">
                  <Wallet className="w-5 h-5 text-[#E10600]" />
                </div>
                <span className="text-[10px] font-black uppercase text-[#2A2A2A] bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
                  Allowance
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-[#E10600]">{formatINR(remainingBudget)}</span>
                <span className="text-xs text-zinc-500 block font-bold">Remaining Funds</span>
              </div>
            </Card>
          </Link>

        </div>

        {/* Quick Actions & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Saved Journeys List */}
            <div className="bg-white rounded-2xl border border-zinc-300 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-[#2A2A2A] text-lg">My Saved Journeys</h3>
                  <p className="text-xs text-zinc-500 font-medium">Quick access to bookmarked routes</p>
                </div>
                <Link to="/my-trips" className="text-xs font-black text-[#E10600] hover:underline flex items-center gap-1 uppercase tracking-wider">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {savedJourneys.length === 0 ? (
                <div className="p-8 text-center bg-[#F5F5F5] rounded-xl border border-zinc-300 space-y-3">
                  <p className="text-xs text-zinc-500 font-bold">No saved journeys yet.</p>
                  <Link to="/explore">
                    <Button variant="primary" size="sm">
                      Explore Journeys
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedJourneys.slice(0, 4).map((j) => (
                    <div key={j.id} className="p-4 rounded-xl border border-zinc-300 bg-[#F5F5F5] flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-center text-[10px] font-black text-zinc-400 mb-1">
                          <span>{j.transportType}</span>
                          <span className="text-[#2A2A2A]">★ {j.rating}</span>
                        </div>
                        <h4 className="font-black text-[#2A2A2A] text-sm">{j.operatorName}</h4>
                        <p className="text-xs text-zinc-600 font-bold">{j.origin} ➔ {j.destination}</p>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-zinc-300">
                        <span className="font-black text-[#E10600] text-sm">{formatINR(j.price)}</span>
                        <Link to={`/journey/${j.id}`}>
                          <Button variant="primary" size="sm">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Student Destinations */}
            <div className="bg-white rounded-2xl border border-zinc-300 p-6 shadow-2xs space-y-4">
              <h3 className="font-black text-[#2A2A2A] text-lg">Popular Student Corridors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {POPULAR_ROUTES.slice(0, 3).map((route) => (
                  <Link
                    key={route.id}
                    to={`/explore?origin=${encodeURIComponent(route.origin)}&destination=${encodeURIComponent(route.destination)}`}
                    className="p-4 rounded-xl border border-zinc-300 hover:border-[#2A2A2A] transition bg-white block"
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#2A2A2A]">
                      <MapPin className="w-4 h-4 text-[#E10600]" />
                      <span className="font-black text-xs">{route.origin} ➔ {route.destination}</span>
                    </div>
                    <span className="text-[11px] text-[#E10600] font-black block">From {formatINR(route.startingPrice)}</span>
                    <span className="text-[10px] text-zinc-500 font-bold block mt-1">{route.avgDuration}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Action Cards */}
            <div className="bg-white rounded-2xl border border-zinc-300 p-6 shadow-2xs space-y-3">
              <h3 className="font-black text-[#2A2A2A] text-base">Quick Actions</h3>
              
              <Link to="/explore" className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F5F5] hover:bg-[#2A2A2A] hover:text-white border border-zinc-300 text-xs font-bold text-[#2A2A2A] transition group">
                <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] text-white flex items-center justify-center group-hover:bg-[#E10600]">
                  <Compass className="w-4 h-4" />
                </div>
                <span>Search & Compare Routes</span>
              </Link>

              <Link to="/my-trips" className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F5F5] hover:bg-[#2A2A2A] hover:text-white border border-zinc-300 text-xs font-bold text-[#2A2A2A] transition group">
                <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] text-white flex items-center justify-center group-hover:bg-[#E10600]">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <span>Update Packing List</span>
              </Link>

              <Link to="/budget-planner" className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F5F5] hover:bg-[#2A2A2A] hover:text-white border border-zinc-300 text-xs font-bold text-[#2A2A2A] transition group">
                <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] text-white flex items-center justify-center group-hover:bg-[#E10600]">
                  <Wallet className="w-4 h-4" />
                </div>
                <span>Log Travel Expense</span>
              </Link>
            </div>

            {/* Travel Planning Tips */}
            <div className="bg-[#2A2A2A] text-white rounded-2xl border border-zinc-800 p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#E10600] font-black text-sm uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-[#E10600]" />
                <span>Urban Travel Advice</span>
              </div>
              <ul className="space-y-2 text-xs text-[#C0C0C0] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#E10600] font-black">•</span>
                  <span>Always present physical student ID cards at intercity bus terminal counters for discounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E10600] font-black">•</span>
                  <span>Book weekend overnight sleeper buses 3 days in advance during college midterms.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
