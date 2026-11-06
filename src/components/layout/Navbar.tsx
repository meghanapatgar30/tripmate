import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Bookmark, Wallet, Menu, X, Sparkles, Bus, User as UserIcon, LogOut, LayoutDashboard, HelpCircle, Info } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { savedJourneyIds } = useTrips();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const totalSaved = savedJourneyIds.length;

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const loggedInLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/my-trips', label: 'My Trips', icon: Bookmark, badge: totalSaved > 0 ? totalSaved : undefined },
    { path: '/budget-planner', label: 'Budget Planner', icon: Wallet },
    { path: '/about', label: 'About', icon: Info },
    { path: '/help', label: 'Help', icon: HelpCircle },
  ];

  const loggedOutLinks = [
    { path: '/', label: 'Home', icon: Bus },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/about', label: 'About', icon: Info },
    { path: '/help', label: 'Help', icon: HelpCircle },
  ];

  const navLinks = isAuthenticated ? loggedInLinks : loggedOutLinks;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-300 shadow-2xs">
      {/* Top Academic Demo Bar in Charcoal & Red */}
      <div className="bg-[#2A2A2A] text-zinc-300 text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-zinc-800">
        <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
        <span className="tracking-tight">TripMate Intercity Travel Planner • Urban Student Travel-Tech</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center text-white font-black text-xl group-hover:bg-[#E10600] transition-colors shadow-2xs">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-[#2A2A2A] tracking-tight flex items-center gap-1 font-sans">
                TRIP<span className="text-[#E10600]">MATE</span>
              </span>
              <span className="hidden sm:block text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                URBAN TRAVEL TECH
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    active
                      ? 'bg-zinc-100 text-[#2A2A2A]'
                      : 'text-zinc-600 hover:text-[#2A2A2A] hover:bg-zinc-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#E10600]' : 'text-zinc-400'}`} />
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#E10600] rounded-full" />
                  )}
                  {link.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-extrabold bg-[#E10600] text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Auth Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-zinc-100 transition group"
                  title="View User Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white flex items-center justify-center text-xs font-extrabold border border-zinc-300 group-hover:border-[#E10600] transition-colors">
                    {getInitials(currentUser.fullName)}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-black text-[#2A2A2A] block leading-tight truncate max-w-[110px]">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] text-zinc-500 block font-medium">Student Account</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-zinc-400 hover:text-[#E10600] hover:bg-red-50 transition"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isAuthenticated && currentUser && (
              <Link to="/profile" className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#2A2A2A] text-white flex items-center justify-center text-[10px] font-bold">
                  {getInitials(currentUser.fullName)}
                </div>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-600 hover:text-[#2A2A2A] hover:bg-zinc-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                  active ? 'bg-zinc-100 text-[#2A2A2A] border-l-4 border-[#E10600]' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? 'text-[#E10600]' : 'text-zinc-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#E10600] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-zinc-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                    <UserIcon className="w-5 h-5 text-[#2A2A2A]" />
                    <div>
                      <span className="font-bold text-xs text-[#2A2A2A] block">{currentUser?.fullName}</span>
                      <span className="text-[10px] text-zinc-500">{currentUser?.email}</span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-red-50 text-[#E10600] font-bold text-xs hover:bg-red-100 transition"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
