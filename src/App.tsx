/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Providers } from './context/Providers';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ExplorePage } from './pages/ExplorePage';
import { JourneyDetailsPage } from './pages/JourneyDetailsPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/journey/:id" element={<JourneyDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/help" element={<HelpPage />} />

              {/* Protected Student Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-trips"
                element={
                  <ProtectedRoute>
                    <MyTripsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budget-planner"
                element={
                  <ProtectedRoute>
                    <BudgetPlannerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Providers>
    </BrowserRouter>
  );
}
