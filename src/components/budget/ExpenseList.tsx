import React, { useState } from 'react';
import { Trash2, Edit2, Bus, Utensils, Home, HelpCircle, Camera, Calendar } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';
import { Expense, ExpenseCategory } from '../../types';
import { formatINR, formatDate } from '../../lib/format';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, editExpense } = useBudget();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState<ExpenseCategory>('Transport');
  const [editDate, setEditDate] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const openEditModal = (exp: Expense) => {
    setEditingExpense(exp);
    setEditTitle(exp.title);
    setEditAmount(exp.amount.toString());
    setEditCategory(exp.category);
    setEditDate(exp.date);
    setEditNotes(exp.notes || '');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;
    const numAmount = parseFloat(editAmount);
    if (!editTitle.trim() || isNaN(numAmount)) return;

    editExpense(editingExpense.id, {
      title: editTitle.trim(),
      amount: numAmount,
      category: editCategory,
      date: editDate,
      notes: editNotes.trim() || undefined,
    });

    setEditingExpense(null);
  };

  const getCategoryBadge = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'Transport':
        return <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-zinc-100 text-[#2A2A2A] border border-zinc-300"><Bus className="w-3 h-3 text-[#E10600]" /> Transport</span>;
      case 'Food':
        return <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-zinc-100 text-[#2A2A2A] border border-zinc-300"><Utensils className="w-3 h-3 text-[#2A2A2A]" /> Food</span>;
      case 'Accommodation':
        return <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-zinc-100 text-[#2A2A2A] border border-zinc-300"><Home className="w-3 h-3 text-[#2A2A2A]" /> Accommodation</span>;
      case 'Sightseeing':
        return <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-zinc-100 text-[#2A2A2A] border border-zinc-300"><Camera className="w-3 h-3 text-[#2A2A2A]" /> Sightseeing</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-300"><HelpCircle className="w-3 h-3" /> Misc</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-300 p-6 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <h3 className="font-black text-[#2A2A2A] text-base">Expense Log & Ledger</h3>
          <p className="text-xs text-zinc-500 font-medium">Tracked items sorted by newest entry</p>
        </div>
        <span className="text-xs font-black text-[#2A2A2A] bg-zinc-100 px-3 py-1 rounded-full border border-zinc-300">
          {expenses.length} Entries
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-10 text-zinc-400 space-y-2">
          <p className="text-xs font-bold text-zinc-500">No travel expenses logged yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-200">
          {expenses.map((exp) => (
            <div key={exp.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#F5F5F5] p-2.5 rounded-xl transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#2A2A2A] text-sm">{exp.title}</h4>
                  {getCategoryBadge(exp.category)}
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" /> {formatDate(exp.date)}
                  </span>
                  {exp.notes && (
                    <span className="text-zinc-600 bg-zinc-200/80 px-2 py-0.5 rounded text-[11px] font-bold">
                      {exp.notes}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-2 sm:pt-0 border-zinc-200">
                <span className="font-black text-[#2A2A2A] text-base">{formatINR(exp.amount)}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(exp)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#2A2A2A] hover:bg-zinc-200 transition"
                    title="Edit expense"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#E10600] hover:bg-red-50 transition"
                    title="Delete expense"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingExpense && (
        <Modal isOpen={!!editingExpense} onClose={() => setEditingExpense(null)} title="Edit Trip Expense">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Amount (₹)</label>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2A2A2A] mb-1">Category</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A]"
              >
                <option value="Transport">Transport</option>
                <option value="Food">Food</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Sightseeing">Sightseeing</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
              <Button type="button" variant="ghost" onClick={() => setEditingExpense(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update Expense
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
