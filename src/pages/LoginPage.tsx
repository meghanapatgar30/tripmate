import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Bus, Sparkles, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFillDemo = () => {
    setEmail('rahul.sharma@college.edu');
    setPassword('student123');
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      showToast('Logged in successfully! Welcome to TripMate.', 'success');
      navigate(redirectPath);
    } else {
      setErrorMessage(result.error || 'Invalid credentials');
    }
  };

  const handleGoogleSignInDemo = () => {
    showToast('Google Sign-In is simulated for this academic MVP.', 'info');
    setEmail('student.demo@google.com');
    setPassword('google-demo-pass');
    login('student.demo@google.com', 'google-demo-pass');
    navigate(redirectPath);
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
                URBAN TRAVEL TECH
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                PLAN SMARTER. <br />
                TRAVEL BETTER.
              </h2>
              <p className="text-[#C0C0C0] text-xs mt-3 leading-relaxed font-medium">
                Log in to access your saved intercity routes, compare bus schedules, track travel budgets, and manage your packing lists.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-8 relative z-10 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-[#C0C0C0] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
              <span>Intercity student corridors across India</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C0C0C0] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
              <span>Integrated expense planner & checklist</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-[#2A2A2A] tracking-tight">Welcome Back</h3>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">Log in to your TripMate student account</p>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1.5 rounded-lg bg-[#2A2A2A] text-white border border-zinc-700 text-[10px] font-bold hover:bg-[#E10600] transition flex items-center gap-1 shadow-2xs"
                title="Auto-fill demo credentials"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E10600]" /> Demo Credentials
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[#E10600] text-xs font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
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
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#2A2A2A]">Password</label>
                  <Link to="/forgot-password" className="text-xs font-bold text-[#E10600] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-zinc-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#E10600] rounded"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                Log In <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

            {/* Google Sign-in Demo Divider */}
            <div className="my-6 relative flex items-center justify-center">
              <div className="border-t border-zinc-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-black text-zinc-400 uppercase tracking-wider absolute">
                Or Continue With
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignInDemo}
              className="w-full py-2.5 px-4 bg-white border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] hover:bg-zinc-100 transition flex items-center justify-center gap-2 shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google (Demo)</span>
            </button>

          </div>

          <div className="pt-6 text-center text-xs text-zinc-500 font-medium border-t border-zinc-200 mt-6">
            Don't have a student account?{' '}
            <Link to="/register" className="font-extrabold text-[#E10600] hover:underline">
              Create Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
