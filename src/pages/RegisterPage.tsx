import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, Lock, Eye, EyeOff, Bus, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms to proceed.');
      return;
    }

    const result = register(fullName, email, password, phone);
    if (result.success) {
      showToast('Account created successfully! Welcome to TripMate.', 'success');
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F5F5F5] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-zinc-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Charcoal Split Layout */}
        <div className="lg:col-span-5 bg-[#2A2A2A] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#E10600] flex items-center justify-center text-white shadow-md">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#C0C0C0] uppercase tracking-widest block mb-1">
                JOIN TRIPMATE
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                URBAN STUDENT <br />
                TRAVEL TECH.
              </h2>
              <p className="text-[#C0C0C0] text-xs mt-3 leading-relaxed font-medium">
                Create a profile to save favorite bus routes, compare fares across operators, maintain pre-trip checklists, and control travel expenses.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-8 relative z-10 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-[#C0C0C0] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
              <span>100% Client-side LocalStorage persistence</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C0C0C0] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
              <span>No credit cards or paid APIs required</span>
            </div>
          </div>
        </div>

        {/* Right Column: Register Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-black text-[#2A2A2A] tracking-tight">Create Student Account</h3>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">Free instant access to student travel tools</p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[#E10600] text-xs font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                  />
                </div>
              </div>

              {/* Email & Phone grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="student@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-9 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2 cursor-pointer text-xs font-bold text-zinc-600 pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="accent-[#E10600] rounded mt-0.5"
                />
                <span>
                  I agree to the <span className="text-[#E10600]">TripMate Terms</span> and acknowledge sample pricing data.
                </span>
              </label>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                Create Account <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>

          <div className="pt-6 text-center text-xs text-zinc-500 font-medium border-t border-zinc-200 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-extrabold text-[#E10600] hover:underline">
              Log In Instead
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
