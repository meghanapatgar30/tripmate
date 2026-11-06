import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, Info, ArrowLeft, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[75vh] bg-[#F5F5F5] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-zinc-300 p-8 shadow-xl space-y-6">
        
        {/* Top Back Link */}
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-[#2A2A2A] transition">
          <ArrowLeft className="w-4 h-4 text-[#E10600]" />
          <span>Back to Login</span>
        </Link>

        {submitted ? (
          <div className="text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-[#2A2A2A] text-white rounded-2xl border border-zinc-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#E10600]" />
            </div>
            <h2 className="text-2xl font-black text-[#2A2A2A]">Demo Reset Dispatched</h2>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              If an account exists for <span className="font-bold text-[#2A2A2A]">{email}</span>, password reset instructions would have been dispatched.
            </p>

            <div className="bg-[#F5F5F5] p-4 rounded-xl border border-zinc-300 text-left space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2A2A2A]">
                <Info className="w-4 h-4 text-[#E10600]" />
                <span>Academic MVP Notice</span>
              </div>
              <p className="text-[11px] text-zinc-700 leading-normal font-medium">
                TripMate operates on local browser storage for this student project. Log in with demo password <code className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-bold text-[#E10600]">student123</code>.
              </p>
            </div>

            <Link to="/login" className="block pt-2">
              <Button variant="primary" className="w-full">
                Return to Login
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-[#E10600]" />
              </div>
              <h2 className="text-2xl font-black text-[#2A2A2A] tracking-tight">Forgot Password?</h2>
              <p className="text-xs text-zinc-500 font-medium mt-1">
                Enter your registered student email address to initiate demo account recovery.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <Send className="w-4 h-4" /> Send Reset Instructions
              </Button>
            </form>

            <div className="bg-[#F5F5F5] p-3.5 rounded-xl border border-zinc-300 text-zinc-500 text-[11px] font-medium">
              Note: This is a client-side student project flow.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
