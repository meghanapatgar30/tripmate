import React, { useState } from 'react';
import { Plus, Sparkles, Bus } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';
import { useTrips } from '../../context/TripsContext';
import { ExpenseCategory } from '../../types';
import { Button } from '../ui/Button';
import { getTodayFormatted, formatINR } from '../../lib/format';

export const ExpenseForm: React.FC = () => {
  const { addExpense } = useBudget();
  const { savedJourneys } = useTrips();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Transport');
  const [date, setDate] = useState(getTodayFormatted());
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    addExpense({
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      notes: notes.trim() || undefined,
    });

    setTitle('');
    setAmount('');
    setNotes('');
  };

  const handleImportSavedTrip = (journeyTitle: string, journeyPrice: number) => {
    setTitle(`${journeyTitle} Ticket`);
    setAmount(journeyPrice.toString());
    setCategory('Transport');
    setNotes('Auto-imported from saved trip');
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-300 p-6 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center">
            <Plus className="w-4 h-4 text-[#E10600]" />
          </div>
          <h3 className="font-black text-[#2A2A2A] text-base">Add New Travel Expense</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">LocalStorage Saved</span>
      </div>

      {/* Quick import from saved trips pill */}
      {savedJourneys.length > 0 && (
        <div className="bg-[#F5F5F5] p-3 rounded-xl border border-zinc-300 space-y-1.5">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E10600]" /> Quick Import Saved Route:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {savedJourneys.slice(0, 3).map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => handleImportSavedTrip(`${j.operatorName} (${j.origin}-${j.destination})`, j.price)}
                className="px-2.5 py-1 rounded-lg bg-white border border-zinc-300 hover:border-[#2A2A2A] text-[#2A2A2A] text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Bus className="w-3 h-3 text-[#E10600]" />
                <span>{j.operatorName}</span>
                <span className="text-[#E10600] font-black">{formatINR(j.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Title */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Expense Title</label>
            <input
              type="text"
              placeholder="e.g. Bus Ticket, Highway Dinner..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>

          {/* Amount */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Amount (₹)</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="750"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>

          {/* Category */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full px-3 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            >
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Sightseeing">Sightseeing</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Date */}
          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>

          {/* Notes */}
          <div className="sm:col-span-8">
            <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Notes (Optional)</label>
            <input
              type="text"
              placeholder="Shared expense with classmate..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
            />
          </div>

        </div>

        <div className="flex justify-end pt-2 border-t border-zinc-200">
          <Button type="submit" variant="primary" size="md">
            <Plus className="w-4 h-4" /> Save Expense
          </Button>
        </div>
      </form>
    </div>
  );
};
