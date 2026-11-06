import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, TravelPreferences } from '../types';
import { getStorageItem, setStorageItem } from '../lib/format';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (fullName: string, email: string, password: string, phone?: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  updatePreferences: (newPreferences: TravelPreferences) => void;
}

const DEFAULT_PREFERENCES: TravelPreferences = {
  preferredTransport: 'AC Sleeper Bus',
  budgetRange: 'Moderate (₹700 - ₹1100)',
  homeCity: 'Mangaluru',
  collegeCity: 'Bengaluru',
};

const DEFAULT_DEMO_USER: User = {
  id: 'u-1',
  fullName: 'Rahul Sharma',
  email: 'rahul.sharma@college.edu',
  phone: '+91 98765 43210',
  preferences: DEFAULT_PREFERENCES,
  createdAt: new Date().toISOString(),
};

interface RegisteredUserRecord {
  user: User;
  passwordHash: string; // Demo mock hash
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getStorageItem<User | null>('tripmate_auth_user', DEFAULT_DEMO_USER)
  );

  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUserRecord[]>(() =>
    getStorageItem<RegisteredUserRecord[]>('tripmate_registered_users', [
      { user: DEFAULT_DEMO_USER, passwordHash: 'student123' }
    ])
  );

  useEffect(() => {
    setStorageItem('tripmate_auth_user', currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStorageItem('tripmate_registered_users', registeredUsers);
  }, [registeredUsers]);

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check registered accounts
    const found = registeredUsers.find((r) => r.user.email.toLowerCase() === cleanEmail);
    if (!found) {
      // Demo convenience: allow any valid email if matching demo password or fallback
      if (cleanEmail === 'rahul.sharma@college.edu' || cleanEmail.includes('@')) {
        const newUser: User = {
          id: `u-${Date.now()}`,
          fullName: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          email: cleanEmail,
          preferences: DEFAULT_PREFERENCES,
          createdAt: new Date().toISOString(),
        };
        setCurrentUser(newUser);
        setRegisteredUsers((prev) => [...prev, { user: newUser, passwordHash: password || 'student123' }]);
        return { success: true };
      }
      return { success: false, error: 'User not found. Please register first.' };
    }

    if (found.passwordHash && found.passwordHash !== password) {
      return { success: false, error: 'Incorrect demo password. Try "student123"' };
    }

    setCurrentUser(found.user);
    return { success: true };
  };

  const register = (fullName: string, email: string, password: string, phone?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find((r) => r.user.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone?.trim() || undefined,
      preferences: DEFAULT_PREFERENCES,
      createdAt: new Date().toISOString(),
    };

    setRegisteredUsers((prev) => [...prev, { user: newUser, passwordHash: password }]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);

    // Sync in registered list
    setRegisteredUsers((prev) =>
      prev.map((r) => (r.user.id === currentUser.id ? { ...r, user: updated } : r))
    );
  };

  const updatePreferences = (newPreferences: TravelPreferences) => {
    if (!currentUser) return;
    updateProfile({ preferences: newPreferences });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        updateProfile,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
