import React, { createContext, useContext, useState, useEffect } from 'react';
import { Journey, UserTrip, ChecklistItem } from '../types';
import { SAMPLE_JOURNEYS } from '../data/journeys';
import { getStorageItem, setStorageItem, getTodayFormatted } from '../lib/format';

interface TripsContextType {
  savedJourneyIds: string[];
  savedJourneys: Journey[];
  userTrips: UserTrip[];
  checklist: ChecklistItem[];
  comparedJourneyIds: string[];
  toggleSaveJourney: (journeyId: string) => void;
  isJourneySaved: (journeyId: string) => boolean;
  addToMyTrips: (journey: Journey, travelDate?: string, notes?: string) => void;
  removeTrip: (tripId: string) => void;
  toggleChecklistItem: (itemId: string) => void;
  addChecklistItem: (text: string, category: ChecklistItem['category']) => void;
  deleteChecklistItem: (itemId: string) => void;
  toggleCompareJourney: (journeyId: string) => void;
  isJourneyCompared: (journeyId: string) => boolean;
  clearComparison: () => void;
  comparedJourneys: Journey[];
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'c-1', text: 'College Student ID Card (for discounts/entry)', completed: true, category: 'Documents' },
  { id: 'c-2', text: 'Bus / Train Ticket PDF downloaded offline', completed: true, category: 'Documents' },
  { id: 'c-3', text: 'Government Photo ID (Aadhaar / Driving License)', completed: false, category: 'Documents' },
  { id: 'c-4', text: 'Laptop & Charger + Extension Cord', completed: false, category: 'Electronics' },
  { id: 'c-5', text: 'Power Bank (10,000 mAh+ charged)', completed: true, category: 'Electronics' },
  { id: 'c-6', text: 'Earbuds / Noise Canceling Headphones', completed: false, category: 'Electronics' },
  { id: 'c-7', text: 'Reusable Water Bottle (1 Litre)', completed: false, category: 'Essentials' },
  { id: 'c-8', text: 'Prescription Medicine & Motion Sickness Pills', completed: false, category: 'Essentials' },
  { id: 'c-9', text: 'Comfortable Travel Hoodie / Jacket for AC Bus', completed: false, category: 'Clothing' },
  { id: 'c-10', text: 'Emergency INR Cash (₹500 - ₹1000)', completed: false, category: 'Essentials' }
];

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedJourneyIds, setSavedJourneyIds] = useState<string[]>(() => 
    getStorageItem<string[]>('tripmate_saved_ids', ['j-1', 'j-2'])
  );
  
  const [userTrips, setUserTrips] = useState<UserTrip[]>(() => 
    getStorageItem<UserTrip[]>('tripmate_user_trips', [
      {
        id: 'ut-1',
        journey: SAMPLE_JOURNEYS[0],
        travelDate: getTodayFormatted(),
        notes: 'Weekend trip home after semester midterm exam.',
        addedAt: new Date().toISOString(),
        status: 'Upcoming'
      }
    ])
  );

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => 
    getStorageItem<ChecklistItem[]>('tripmate_checklist', DEFAULT_CHECKLIST)
  );

  const [comparedJourneyIds, setComparedJourneyIds] = useState<string[]>([]);

  // LocalStorage Persistence Sync
  useEffect(() => {
    setStorageItem('tripmate_saved_ids', savedJourneyIds);
  }, [savedJourneyIds]);

  useEffect(() => {
    setStorageItem('tripmate_user_trips', userTrips);
  }, [userTrips]);

  useEffect(() => {
    setStorageItem('tripmate_checklist', checklist);
  }, [checklist]);

  const toggleSaveJourney = (journeyId: string) => {
    setSavedJourneyIds((prev) =>
      prev.includes(journeyId) ? prev.filter((id) => id !== journeyId) : [...prev, journeyId]
    );
  };

  const isJourneySaved = (journeyId: string) => savedJourneyIds.includes(journeyId);

  const addToMyTrips = (journey: Journey, travelDate?: string, notes?: string) => {
    const newTrip: UserTrip = {
      id: `ut-${Date.now()}`,
      journey,
      travelDate: travelDate || getTodayFormatted(),
      notes: notes || 'Planned student intercity journey',
      addedAt: new Date().toISOString(),
      status: 'Upcoming'
    };
    setUserTrips((prev) => [newTrip, ...prev]);

    // Also auto-save the journey if not saved
    if (!savedJourneyIds.includes(journey.id)) {
      setSavedJourneyIds((prev) => [...prev, journey.id]);
    }
  };

  const removeTrip = (tripId: string) => {
    setUserTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const toggleChecklistItem = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item))
    );
  };

  const addChecklistItem = (text: string, category: ChecklistItem['category']) => {
    if (!text.trim()) return;
    const newItem: ChecklistItem = {
      id: `c-${Date.now()}`,
      text: text.trim(),
      completed: false,
      category
    };
    setChecklist((prev) => [newItem, ...prev]);
  };

  const deleteChecklistItem = (itemId: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== itemId));
  };

  const toggleCompareJourney = (journeyId: string) => {
    setComparedJourneyIds((prev) => {
      if (prev.includes(journeyId)) {
        return prev.filter((id) => id !== journeyId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 journeys at a time.');
        return prev;
      }
      return [...prev, journeyId];
    });
  };

  const isJourneyCompared = (journeyId: string) => comparedJourneyIds.includes(journeyId);

  const clearComparison = () => {
    setComparedJourneyIds([]);
  };

  const savedJourneys = SAMPLE_JOURNEYS.filter((j) => savedJourneyIds.includes(j.id));
  const comparedJourneys = SAMPLE_JOURNEYS.filter((j) => comparedJourneyIds.includes(j.id));

  return (
    <TripsContext.Provider
      value={{
        savedJourneyIds,
        savedJourneys,
        userTrips,
        checklist,
        comparedJourneyIds,
        toggleSaveJourney,
        isJourneySaved,
        addToMyTrips,
        removeTrip,
        toggleChecklistItem,
        addChecklistItem,
        deleteChecklistItem,
        toggleCompareJourney,
        isJourneyCompared,
        clearComparison,
        comparedJourneys,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};
