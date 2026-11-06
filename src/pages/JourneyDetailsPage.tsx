import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, Clock, Star, Bus, Train, Tag, ShieldAlert, 
  MapPin, CheckCircle2, ShieldCheck, AlertCircle, Plus 
} from 'lucide-react';
import { SAMPLE_JOURNEYS } from '../data/journeys';
import { useTrips } from '../context/TripsContext';
import { useBudget } from '../context/BudgetContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { formatINR, getTodayFormatted } from '../lib/format';

export const JourneyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isJourneySaved, toggleSaveJourney, addToMyTrips } = useTrips();
  const { addExpense } = useBudget();

  const journey = SAMPLE_JOURNEYS.find((j) => j.id === id);

  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [travelDate, setTravelDate] = useState(getTodayFormatted());
  const [tripNotes, setTripNotes] = useState('');
  const [autoAddExpense, setAutoAddExpense] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!journey) {
    return (
      <div className="py-20 text-center bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-zinc-300 max-w-md shadow-xs space-y-4">
          <AlertCircle className="w-12 h-12 text-[#E10600] mx-auto" />
          <h2 className="text-xl font-black text-[#2A2A2A]">Journey Not Found</h2>
          <p className="text-zinc-500 text-xs font-medium">The requested journey ID does not exist.</p>
          <Link to="/explore">
            <Button variant="primary">Back to Explore Journeys</Button>
          </Link>
        </div>
      </div>
    );
  }

  const saved = isJourneySaved(journey.id);

  const handleConfirmAddToMyTrips = (e: React.FormEvent) => {
    e.preventDefault();
    addToMyTrips(journey, travelDate, tripNotes);

    if (autoAddExpense) {
      addExpense({
        title: `${journey.operatorName} (${journey.origin}-${journey.destination})`,
        amount: journey.price,
        category: 'Transport',
        date: travelDate,
        notes: `Trip to ${journey.destination}`,
      });
    }

    setIsTripModalOpen(false);
    setToastMessage('Added to My Trips & Travel Budget Planner!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="py-10 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation back bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A2A2A] hover:text-[#E10600] transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#E10600]" />
            <span>Back to Search Results</span>
          </button>

          <button
            onClick={() => toggleSaveJourney(journey.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
              saved
                ? 'bg-[#2A2A2A] border-[#2A2A2A] text-white'
                : 'bg-white border-zinc-300 text-[#2A2A2A] hover:bg-zinc-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-[#E10600]' : ''}`} />
            <span>{saved ? 'Saved in My Trips' : 'Save Journey'}</span>
          </button>
        </div>

        {/* Toast Alert Feedback */}
        {toastMessage && (
          <div className="bg-[#2A2A2A] text-white text-xs font-bold p-3.5 rounded-2xl flex items-center justify-between shadow-xl border-l-4 border-[#E10600] animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
              <span>{toastMessage}</span>
            </div>
            <Link to="/my-trips" className="underline text-red-400 hover:text-white">
              View My Trips ➔
            </Link>
          </div>
        )}

        {/* Academic Demo Disclaimer Header */}
        <div className="bg-white border border-zinc-300 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#E10600] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-700 leading-relaxed font-medium">
            <span className="font-bold text-[#2A2A2A] block uppercase tracking-wider text-[11px]">Academic Demonstration Data Notice</span>
            All bus/train names, routes, prices (INR), boarding points, and seat availability are sample demonstration data for college milestone evaluation purposes.
          </div>
        </div>

        {/* Journey Main Header Card */}
        <div className="bg-white rounded-2xl border border-zinc-300 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-md bg-[#2A2A2A] text-white text-xs font-black flex items-center gap-1.5">
                  {journey.transportType.includes('Train') ? <Train className="w-4 h-4" /> : <Bus className="w-4 h-4" />}
                  {journey.transportType}
                </span>
                {journey.badge && <Badge variant="red">{journey.badge}</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2A2A2A]">{journey.operatorName}</h1>
              <p className="text-zinc-500 text-xs mt-1 font-medium">{journey.description}</p>
            </div>

            <div className="bg-[#F5F5F5] p-4.5 rounded-xl border border-zinc-300 text-right flex flex-row md:flex-col justify-between items-center md:items-end">
              <div>
                <span className="text-[10px] text-zinc-400 font-black uppercase block">Sample Fare</span>
                <span className="text-3xl font-black text-[#E10600]">{formatINR(journey.price)}</span>
              </div>
              <span className="text-xs text-[#2A2A2A] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E10600]" /> {journey.availableSeats} Seats Left
              </span>
            </div>
          </div>

          {/* Timeline & Route Section */}
          <div className="bg-[#F5F5F5] p-6 rounded-xl border border-zinc-300 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              
              {/* Origin */}
              <div className="space-y-1">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">DEPARTURE</span>
                <span className="text-2xl font-black text-[#2A2A2A]">{journey.departureTime}</span>
                <h4 className="font-extrabold text-[#2A2A2A] text-sm">{journey.origin}</h4>
                <p className="text-xs text-zinc-500 font-medium">{journey.originCity}</p>
              </div>

              {/* Duration center line */}
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-[#2A2A2A] bg-white px-3 py-1 rounded-md border border-zinc-300 shadow-2xs">
                  {journey.duration} total duration
                </span>
                <div className="w-full h-0.5 bg-[#2A2A2A] my-3 relative">
                  <div className="w-3 h-3 rounded-full bg-[#E10600] absolute -left-1.5 -top-1.25" />
                  <div className="w-3 h-3 rounded-full bg-[#E10600] absolute -right-1.5 -top-1.25" />
                </div>
                <span className="text-[11px] text-zinc-600 font-bold">★ {journey.rating} Rating ({journey.totalReviews} reviews)</span>
              </div>

              {/* Destination */}
              <div className="space-y-1 md:text-right">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">ARRIVAL</span>
                <span className="text-2xl font-black text-[#2A2A2A]">{journey.arrivalTime}</span>
                <h4 className="font-extrabold text-[#2A2A2A] text-sm">{journey.destination}</h4>
                <p className="text-xs text-zinc-500 font-medium">{journey.destinationCity}</p>
              </div>

            </div>

            {/* Boarding and Dropping Points Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-300">
              <div className="space-y-2">
                <h5 className="text-xs font-black text-[#2A2A2A] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2A2A2A]" /> Boarding Locations
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-700 font-medium">
                  {journey.boardingPoints.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] mt-1.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-black text-[#2A2A2A] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E10600]" /> Dropping Locations
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-700 font-medium">
                  {journey.droppingPoints.map((dp, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A] mt-1.5" />
                      <span>{dp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h4 className="font-black text-[#2A2A2A] text-base">Included Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {journey.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 p-3 rounded-xl bg-[#F5F5F5] border border-zinc-300 text-xs font-bold text-[#2A2A2A]">
                  <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Discount & Cancellation Policy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {journey.studentDiscountCode && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1">
                <div className="flex items-center gap-2 text-[#E10600] font-bold text-xs">
                  <Tag className="w-4 h-4 text-[#E10600]" />
                  <span>Student Discount Coupon Code</span>
                </div>
                <p className="text-xs text-[#2A2A2A] font-medium">
                  Use promo code <span className="font-black bg-white px-2 py-0.5 rounded border border-red-300 text-[#E10600]">{journey.studentDiscountCode}</span> at bus counter for extra 10% off.
                </p>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-[#F5F5F5] border border-zinc-300 space-y-1">
              <div className="flex items-center gap-2 text-[#2A2A2A] font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#2A2A2A]" />
                <span>Cancellation Policy</span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">{journey.cancellationPolicy}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-500 font-bold">
              Organize this route into your student itinerary?
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => toggleSaveJourney(journey.id)}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  saved ? 'bg-[#2A2A2A] border-[#2A2A2A] text-white' : 'bg-white border-zinc-300 text-[#2A2A2A] hover:bg-zinc-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-[#E10600]' : ''}`} />
                {saved ? 'Saved' : 'Save Journey'}
              </button>

              <Button
                variant="primary"
                size="md"
                className="flex-1 sm:flex-initial"
                onClick={() => setIsTripModalOpen(true)}
              >
                <Plus className="w-4 h-4" /> Add to My Trips
              </Button>
            </div>
          </div>

        </div>

      </div>

      {/* Add to My Trips Modal */}
      <Modal isOpen={isTripModalOpen} onClose={() => setIsTripModalOpen(false)} title="Add Journey to My Trips">
        <form onSubmit={handleConfirmAddToMyTrips} className="space-y-4">
          <div className="p-3 bg-[#F5F5F5] rounded-xl border border-zinc-300">
            <h4 className="font-black text-sm text-[#2A2A2A]">{journey.operatorName}</h4>
            <p className="text-xs text-zinc-600 font-medium">{journey.origin} ➔ {journey.destination} • {formatINR(journey.price)}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Planned Travel Date</label>
            <input
              type="date"
              value={travelDate}
              min={getTodayFormatted()}
              onChange={(e) => setTravelDate(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Trip Purpose / Notes</label>
            <input
              type="text"
              placeholder="e.g. Midterm weekend break..."
              value={tripNotes}
              onChange={(e) => setTripNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2A2A2A] pt-1">
            <input
              type="checkbox"
              checked={autoAddExpense}
              onChange={(e) => setAutoAddExpense(e.target.checked)}
              className="accent-[#E10600] w-4 h-4"
            />
            <span>Also log ticket expense ({formatINR(journey.price)}) in Travel Budget Planner</span>
          </label>

          <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
            <Button type="button" variant="ghost" onClick={() => setIsTripModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm & Save Trip
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
