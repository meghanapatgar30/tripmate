import React from 'react';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { TripsProvider } from './TripsContext';
import { BudgetProvider } from './BudgetContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <TripsProvider>
          <BudgetProvider>
            {children}
          </BudgetProvider>
        </TripsProvider>
      </ToastProvider>
    </AuthProvider>
  );
};
