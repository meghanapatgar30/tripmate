import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Bus, LogOut, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { TransportType } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, updatePreferences, logout } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  const [preferredTransport, setPreferredTransport] = useState<TransportType>(
    currentUser?.preferences?.preferredTransport || 'AC Sleeper Bus'
  );
  const [budgetRange, setBudgetRange] = useState(
    currentUser?.preferences?.budgetRange || 'Moderate (₹700 - ₹1100)'
  );
  const [homeCity, setHomeCity] = useState(currentUser?.preferences?.homeCity || 'Mangaluru');
  const [collegeCity, setCollegeCity] = useState(currentUser?.preferences?.collegeCity || 'Bengaluru');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      phone,
    });
    updatePreferences({
      preferredTransport,
      budgetRange: budgetRange as any,
      homeCity,
      collegeCity,
    });
    showToast('Profile preferences updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out of TripMate session', 'info');
    navigate('/');
  };

  return (
    <div className="py-10 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-300 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#2A2A2A] text-white flex items-center justify-center text-xl font-black border border-zinc-800 shadow-md">
              {getInitials(fullName || 'Student')}
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#2A2A2A]">{fullName}</h1>
              <p className="text-xs text-zinc-500 font-bold">{email} • Student Account</p>
              <div className="inline-flex items-center gap-1.5 mt-1.5 text-[10px] font-black text-[#2A2A2A] bg-zinc-100 px-2.5 py-0.5 rounded border border-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E10600]" /> LocalSession Active
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-50 text-[#E10600] hover:bg-red-100 font-bold text-xs flex items-center gap-2 border border-red-200 transition"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>

        {/* Profile & Travel Preferences Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* Account Details Section */}
          <div className="bg-white rounded-2xl border border-zinc-300 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 text-[#2A2A2A] font-black text-base">
              <UserIcon className="w-5 h-5 text-[#E10600]" />
              <span>Personal Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                />
              </div>
            </div>
          </div>

          {/* Travel Preferences Section */}
          <div className="bg-white rounded-2xl border border-zinc-300 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 text-[#2A2A2A] font-black text-base">
              <Bus className="w-5 h-5 text-[#E10600]" />
              <span>Travel Preferences</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Preferred Transport Mode</label>
                <select
                  value={preferredTransport}
                  onChange={(e) => setPreferredTransport(e.target.value as TransportType)}
                  className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                >
                  <option value="AC Sleeper Bus">AC Sleeper Bus</option>
                  <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                  <option value="AC Seater Bus">AC Seater Bus</option>
                  <option value="Express Train">Express Train</option>
                  <option value="Vande Bharat Express">Vande Bharat Express</option>
                  <option value="Shared Shuttle">Shared Shuttle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Target Budget Range</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                >
                  <option value="Budget (₹300 - ₹700)">Budget (₹300 - ₹700)</option>
                  <option value="Moderate (₹700 - ₹1100)">Moderate (₹700 - ₹1100)</option>
                  <option value="Premium Sleeper (₹1100+)">Premium Sleeper (₹1100+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Hometown City</label>
                <input
                  type="text"
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">College City</label>
                <input
                  type="text"
                  value={collegeCity}
                  onChange={(e) => setCollegeCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
                />
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="lg" className="px-8">
              <Save className="w-4 h-4" /> Save Preferences
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};
