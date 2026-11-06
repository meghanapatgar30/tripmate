import React, { useState } from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle2, Edit2, Bus, Utensils, Home, HelpCircle, Camera } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';
import { formatINR } from '../../lib/format';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ExpenseCategory } from '../../types';

export const BudgetSummary: React.FC = () => {
  const { totalBudget, totalSpent, remainingBudget, categoryTotals, setTotalBudget } = useBudget();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempBudget, setTempBudget] = useState(totalBudget.toString());

  const spentPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(tempBudget);
    if (!isNaN(val) && val >= 0) {
      setTotalBudget(val);
      setIsEditModalOpen(false);
    }
  };

  const getStatusColor = () => {
    if (remainingBudget < 0) return { text: 'text-[#E10600]', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-[#E10600]' };
    if (spentPercent > 80) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' };
    return { text: 'text-[#2A2A2A]', bg: 'bg-zinc-100', border: 'border-zinc-300', bar: 'bg-[#2A2A2A]' };
  };

  const status = getStatusColor();

  const categoriesConfig: { category: ExpenseCategory; icon: any }[] = [
    { category: 'Transport', icon: Bus },
    { category: 'Food', icon: Utensils },
    { category: 'Accommodation', icon: Home },
    { category: 'Sightseeing', icon: Camera },
    { category: 'Miscellaneous', icon: HelpCircle },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Total Budget */}
        <div className="bg-white rounded-2xl border border-zinc-300 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#E10600]" />
            </div>
            <button
              onClick={() => {
                setTempBudget(totalBudget.toString());
                setIsEditModalOpen(true);
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-[#2A2A2A] hover:bg-zinc-100 transition"
              title="Set total budget"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Set Travel Allowance</span>
            <span className="text-3xl font-black text-[#2A2A2A]">{formatINR(totalBudget)}</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1 font-medium">Click edit icon to change allowance</p>
        </div>

        {/* Card 2: Total Spent */}
        <div className="bg-white rounded-2xl border border-zinc-300 p-5 shadow-2xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-[#2A2A2A] flex items-center justify-center border border-zinc-300">
            <TrendingUp className="w-5 h-5 text-[#E10600]" />
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Total Spent</span>
            <span className="text-3xl font-black text-[#2A2A2A]">{formatINR(totalSpent)}</span>
          </div>
          <div className="w-full bg-zinc-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className={`h-2 rounded-full ${status.bar}`} style={{ width: `${Math.min(spentPercent, 100)}%` }} />
          </div>
        </div>

        {/* Card 3: Remaining Budget */}
        <div className={`rounded-2xl border ${status.border} ${status.bg} p-5 shadow-2xs flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs">
              {remainingBudget < 0 ? (
                <AlertTriangle className="w-5 h-5 text-[#E10600]" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#2A2A2A]" />
              )}
            </div>
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-white border border-zinc-200 ${status.text}`}>
              {remainingBudget < 0 ? 'Over Budget!' : `${100 - spentPercent}% Left`}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider block">Remaining Balance</span>
            <span className={`text-3xl font-black ${status.text}`}>{formatINR(remainingBudget)}</span>
          </div>
          <p className="text-[11px] text-zinc-600 mt-1 font-bold">
            {remainingBudget < 0
              ? 'Warning: Total spending exceeded limit'
              : 'Safe travel spending trajectory'}
          </p>
        </div>

      </div>

      {/* Category Breakdown Bar */}
      <div className="bg-white rounded-2xl border border-zinc-300 p-5 shadow-2xs space-y-3">
        <h4 className="font-black text-[#2A2A2A] text-sm tracking-tight">Expense Category Breakdown</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {categoriesConfig.map(({ category, icon: Icon }) => {
            const amount = categoryTotals[category] || 0;
            return (
              <div key={category} className="p-3 rounded-xl bg-[#F5F5F5] border border-zinc-300 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] text-white flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#E10600]" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold block">{category}</span>
                  <span className="font-black text-[#2A2A2A] text-xs">{formatINR(amount)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Set Total Budget Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Set Travel Budget Allowance">
        <form onSubmit={handleSaveBudget} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Total Travel Budget (in INR ₹)</label>
            <input
              type="number"
              min="0"
              step="100"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-base font-black text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
            <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Budget
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
