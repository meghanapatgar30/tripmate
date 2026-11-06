export type TransportType = 
  | 'AC Sleeper Bus'
  | 'Non-AC Sleeper'
  | 'AC Seater Bus'
  | 'Express Train'
  | 'Vande Bharat Express'
  | 'Shared Shuttle';

export type Amenity = 
  | 'Wi-Fi'
  | 'Charging Point'
  | 'Water Bottle'
  | 'Blanket & Pillow'
  | 'Live GPS Tracking'
  | 'Reading Light'
  | 'Reclining Seats'
  | 'Rest Stop'
  | 'Emergency Button';

export interface Journey {
  id: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departureTime: string; // e.g. "21:30"
  arrivalTime: string;   // e.g. "06:15 (+1 day)"
  duration: string;      // e.g. "8h 45m"
  durationMinutes: number; // for numeric sorting
  price: number;          // INR
  transportType: TransportType;
  operatorName: string;   // e.g. "Coastal Express Sleeper", "Deccan Intercity Line"
  rating: number;         // e.g. 4.8
  totalReviews: number;
  availableSeats: number;
  amenities: Amenity[];
  boardingPoints: string[];
  droppingPoints: string[];
  description: string;
  cancellationPolicy: string;
  studentDiscountCode?: string;
  badge?: string;
}

export interface PopularRoute {
  id: string;
  origin: string;
  destination: string;
  startingPrice: number;
  avgDuration: string;
  frequency: string;
  category: 'Popular' | 'Weekend Getaway' | 'Student Hub';
  imageUrl: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'Documents' | 'Electronics' | 'Clothing' | 'Essentials' | 'Other';
}

export interface UserTrip {
  id: string;
  journey: Journey;
  travelDate: string;
  notes?: string;
  addedAt: string;
  status: 'Upcoming' | 'Completed' | 'Planned';
}

export type ExpenseCategory = 'Transport' | 'Food' | 'Accommodation' | 'Miscellaneous' | 'Sightseeing';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes?: string;
}

export interface JourneyFilterState {
  searchOrigin: string;
  searchDestination: string;
  maxPrice: number;
  transportTypes: TransportType[];
  selectedAmenities: Amenity[];
  sortBy: 'price-asc' | 'price-desc' | 'duration-asc' | 'rating-desc';
}

// User & Authentication Types
export interface TravelPreferences {
  preferredTransport: TransportType;
  budgetRange: 'Budget (₹300 - ₹700)' | 'Moderate (₹700 - ₹1100)' | 'Premium Sleeper (₹1100+)';
  homeCity: string;
  collegeCity: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  preferences: TravelPreferences;
  createdAt: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
