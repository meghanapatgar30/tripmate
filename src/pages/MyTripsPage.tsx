import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, CheckSquare, Trash2, Calendar, Compass, Bus, Plus } from 'lucide-react';
import { useTrips } from '../context/TripsContext';
import { TripChecklist } from '../components/trips/TripChecklist';
import { JourneyCard } from '../components/journey/JourneyCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatINR, formatDate } from '../lib/format';

export const MyTripsPage: React.FC = () => {
  const { savedJourneys, userTrips, removeTrip } = useTrips();
  const [activeTab, setActiveTab] = useState<'saved' | 'itineraries' | 'checklist'>('saved');

  return (
    <div className="py-10 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#E10600] uppercase tracking-wider mb-1">
              <Bookmark className="w-4 h-4" />
              <span>Student Travel Workspace</span>
            </div>
            <h1 className="text-3xl font-black text-[#2A2A2A] tracking-tight">
              My Trips & Packing Checklist
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-medium">
              Manage saved intercity journeys, scheduled student itineraries, and pre-trip packing lists
            </p>
          </div>

          <Link to="/explore">
            <Button variant="primary" size="md">
              <Plus className="w-4 h-4" /> Explore More Routes
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-300 bg-white px-4 rounded-2xl shadow-2xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-black border-b-2 flex items-center gap-2 transition ${
              activeTab === 'saved'
                ? 'border-[#E10600] text-[#2A2A2A]'
                : 'border-transparent text-zinc-500 hover:text-[#2A2A2A]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#E10600]" />
            <span>Saved Journeys ({savedJourneys.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('itineraries')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-black border-b-2 flex items-center gap-2 transition ${
              activeTab === 'itineraries'
                ? 'border-[#E10600] text-[#2A2A2A]'
                : 'border-transparent text-zinc-500 hover:text-[#2A2A2A]'
            }`}
          >
            <Bus className="w-4 h-4 text-[#2A2A2A]" />
            <span>Planned Itineraries ({userTrips.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-black border-b-2 flex items-center gap-2 transition ${
              activeTab === 'checklist'
                ? 'border-[#E10600] text-[#2A2A2A]'
                : 'border-transparent text-zinc-500 hover:text-[#2A2A2A]'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-[#E10600]" />
            <span>Packing Checklist</span>
          </button>
        </div>

        {/* Tab Content 1: Saved Journeys */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            {savedJourneys.length === 0 ? (
              <div className="bg-white rounded-2xl border border-zinc-300 p-12 text-center space-y-4 shadow-2xs">
                <div className="w-16 h-16 rounded-2xl bg-[#2A2A2A] text-white flex items-center justify-center mx-auto">
                  <Bookmark className="w-8 h-8 text-[#E10600]" />
                </div>
                <div>
                  <h3 className="font-black text-[#2A2A2A] text-lg">No Saved Journeys Yet</h3>
                  <p className="text-zinc-500 text-xs mt-1 max-w-md mx-auto font-medium">
                    Bookmark intercity buses and trains from the Explore page for quick access.
                  </p>
                </div>
                <Link to="/explore">
                  <Button variant="primary">
                    <Compass className="w-4 h-4" /> Browse Journeys
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJourneys.map((journey) => (
                  <JourneyCard key={journey.id} journey={journey} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Planned Itineraries */}
        {activeTab === 'itineraries' && (
          <div className="space-y-6">
            {userTrips.length === 0 ? (
              <div className="bg-white rounded-2xl border border-zinc-300 p-12 text-center space-y-4 shadow-2xs">
                <div className="w-16 h-16 rounded-2xl bg-[#2A2A2A] text-white flex items-center justify-center mx-auto">
                  <Bus className="w-8 h-8 text-[#E10600]" />
                </div>
                <div>
                  <h3 className="font-black text-[#2A2A2A] text-lg">No Upcoming Planned Trips</h3>
                  <p className="text-zinc-500 text-xs mt-1 max-w-md mx-auto font-medium">
                    Add a route to "My Trips" from any journey details page.
                  </p>
                </div>
                <Link to="/explore">
                  <Button variant="primary">
                    <Compass className="w-4 h-4" /> Plan a Trip
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userTrips.map((trip) => (
                  <div key={trip.id} className="bg-white rounded-2xl border border-zinc-300 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="red">{trip.status}</Badge>
                        <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#2A2A2A]" /> Date: {formatDate(trip.travelDate)}
                        </span>
                      </div>
                      <h3 className="font-black text-[#2A2A2A] text-lg">
                        {trip.journey.origin} ➔ {trip.journey.destination}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 font-bold">
                        <span className="text-[#2A2A2A]">{trip.journey.operatorName}</span>
                        <span>Departure: {trip.journey.departureTime}</span>
                        <span className="text-[#E10600] font-black">{formatINR(trip.journey.price)}</span>
                      </div>
                      {trip.notes && (
                        <p className="text-xs text-zinc-600 italic bg-[#F5F5F5] p-2 rounded-lg border border-zinc-200">
                          Notes: "{trip.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-0 border-zinc-200">
                      <Link to={`/journey/${trip.journey.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <button
                        onClick={() => removeTrip(trip.id)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-[#E10600] hover:bg-red-50 transition border border-zinc-300"
                        title="Remove trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 3: Pre-Trip Checklist */}
        {activeTab === 'checklist' && (
          <div className="max-w-4xl mx-auto">
            <TripChecklist />
          </div>
        )}

      </div>
    </div>
  );
};
