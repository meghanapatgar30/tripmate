import React from 'react';
import { Wallet, ShieldCheck } from 'lucide-react';
import { BudgetSummary } from '../components/budget/BudgetSummary';
import { ExpenseForm } from '../components/budget/ExpenseForm';
import { ExpenseList } from '../components/budget/ExpenseList';

export const BudgetPlannerPage: React.FC = () => {
  return (
    <div className="py-10 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#E10600] uppercase tracking-wider mb-1">
              <Wallet className="w-4 h-4" />
              <span>Student Financial Manager</span>
            </div>
            <h1 className="text-3xl font-black text-[#2A2A2A] tracking-tight">
              Travel Budget & Expense Planner
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-medium">
              Set weekend travel limits, log transport, food, and stay expenses, and track your remaining balance in real time
            </p>
          </div>

          <div className="bg-zinc-100 px-3.5 py-2 rounded-xl border border-zinc-300 text-xs text-[#2A2A2A] font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E10600]" />
            <span>Browser LocalStorage Sync</span>
          </div>
        </div>

        {/* Top Overview Cards & Progress */}
        <BudgetSummary />

        {/* Main Grid: Add Expense Form + Expense Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ExpenseForm />
          </div>

          <div className="lg:col-span-7">
            <ExpenseList />
          </div>

        </div>

      </div>
    </div>
  );
};
