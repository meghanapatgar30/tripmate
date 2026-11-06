import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, RotateCcw, AlertCircle } from 'lucide-react';
import { SAMPLE_JOURNEYS } from '../data/journeys';
import { JourneyFilterState } from '../types';
import { JourneyCard } from '../components/journey/JourneyCard';
import { JourneyFilters } from '../components/journey/JourneyFilters';
import { JourneyComparison } from '../components/journey/JourneyComparison';
import { Button } from '../components/ui/Button';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlOrigin = searchParams.get('origin') || '';
  const urlDestination = searchParams.get('destination') || '';

  const initialFilters: JourneyFilterState = {
    searchOrigin: urlOrigin,
    searchDestination: urlDestination,
    maxPrice: 1500,
    transportTypes: [],
    selectedAmenities: [],
    sortBy: 'price-asc',
  };

  const [filters, setFilters] = useState<JourneyFilterState>(initialFilters);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchOrigin: urlOrigin,
      searchDestination: urlDestination,
    }));
  }, [urlOrigin, urlDestination]);

  const handleClearFilters = () => {
    setFilters({
      searchOrigin: '',
      searchDestination: '',
      maxPrice: 1500,
      transportTypes: [],
      selectedAmenities: [],
      sortBy: 'price-asc',
    });
    setSearchParams({});
  };

  const filteredJourneys = useMemo(() => {
    return SAMPLE_JOURNEYS.filter((journey) => {
      if (
        filters.searchOrigin &&
        !journey.origin.toLowerCase().includes(filters.searchOrigin.toLowerCase()) &&
        !journey.originCity.toLowerCase().includes(filters.searchOrigin.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.searchDestination &&
        !journey.destination.toLowerCase().includes(filters.searchDestination.toLowerCase()) &&
        !journey.destinationCity.toLowerCase().includes(filters.searchDestination.toLowerCase())
      ) {
        return false;
      }

      if (journey.price > filters.maxPrice) {
        return false;
      }

      if (
        filters.transportTypes.length > 0 &&
        !filters.transportTypes.includes(journey.transportType)
      ) {
        return false;
      }

      if (filters.selectedAmenities.length > 0) {
        const hasAll = filters.selectedAmenities.every((amenity) =>
          journey.amenities.includes(amenity)
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'duration-asc') return a.durationMinutes - b.durationMinutes;
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      return 0;
    });
  }, [filters]);

  return (
    <div className="py-10 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#E10600] uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Explore Student Corridors</span>
            </div>
            <h1 className="text-3xl font-black text-[#2A2A2A] tracking-tight">
              Sample Intercity Journeys
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-medium">
              Filter by price, amenities, and transport mode across South & West Indian college corridors
            </p>
          </div>

          {(filters.searchOrigin || filters.searchDestination || filters.transportTypes.length > 0 || filters.selectedAmenities.length > 0) && (
            <div className="flex items-center gap-2 bg-zinc-100 px-3.5 py-2 rounded-xl border border-zinc-300 text-xs text-[#2A2A2A] font-bold">
              <span>Active search filters</span>
              <button onClick={handleClearFilters} className="font-black text-[#E10600] underline ml-1">
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Filters Sidebar + Journey Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filter Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <JourneyFilters
              filters={filters}
              setFilters={setFilters}
              onClearFilters={handleClearFilters}
              totalResults={filteredJourneys.length}
            />
          </div>

          {/* Journeys List */}
          <div className="lg:col-span-8 space-y-5">
            {filteredJourneys.length === 0 ? (
              <div className="bg-white rounded-2xl border border-zinc-300 p-12 text-center space-y-4 shadow-2xs">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E10600] border border-red-200 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-[#2A2A2A] text-lg">No Journeys Match Your Filters</h3>
                  <p className="text-zinc-500 text-xs mt-1 max-w-md mx-auto font-medium">
                    Try adjusting your maximum ticket price slider or resetting your city filters.
                  </p>
                </div>
                <Button variant="primary" onClick={handleClearFilters}>
                  <RotateCcw className="w-4 h-4" /> Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {filteredJourneys.map((journey) => (
                  <JourneyCard key={journey.id} journey={journey} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      <JourneyComparison />
    </div>
  );
};
