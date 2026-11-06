import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, CheckCircle2, FileText, Smartphone, Shirt, Package } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';
import { ChecklistItem } from '../../types';
import { Button } from '../ui/Button';

export const TripChecklist: React.FC = () => {
  const { checklist, toggleChecklistItem, addChecklistItem, deleteChecklistItem } = useTrips();
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ChecklistItem['category']>('Essentials');

  const totalItems = checklist.length;
  const completedItems = checklist.filter((item) => item.completed).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      addChecklistItem(newItemText, selectedCategory);
      setNewItemText('');
    }
  };

  const getCategoryIcon = (category: ChecklistItem['category']) => {
    switch (category) {
      case 'Documents':
        return <FileText className="w-3.5 h-3.5 text-[#2A2A2A]" />;
      case 'Electronics':
        return <Smartphone className="w-3.5 h-3.5 text-[#E10600]" />;
      case 'Clothing':
        return <Shirt className="w-3.5 h-3.5 text-zinc-700" />;
      default:
        return <Package className="w-3.5 h-3.5 text-zinc-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-300 p-6 space-y-6 shadow-2xs">
      
      {/* Header & Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-[#E10600]" />
            </div>
            <div>
              <h3 className="font-black text-[#2A2A2A] text-lg">Pre-Trip Packing Checklist</h3>
              <p className="text-xs text-zinc-500 font-medium">Essential items for your college intercity journey</p>
            </div>
          </div>
          <span className="text-xs font-black text-[#2A2A2A] bg-zinc-100 px-3 py-1 rounded-full border border-zinc-300">
            {completedItems} / {totalItems} Ready ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar in Signal Red */}
        <div className="w-full bg-zinc-200 rounded-full h-2.5 overflow-hidden mt-3">
          <div
            className="bg-[#E10600] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add New Checklist Item Form */}
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-zinc-200">
        <input
          type="text"
          placeholder="Add custom packing item (e.g., Extension Box, Exam Admit Card)..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 px-3.5 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ChecklistItem['category'])}
          className="px-3 py-2.5 bg-[#F5F5F5] border border-zinc-300 rounded-xl text-xs font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A]"
        >
          <option value="Essentials">Essentials</option>
          <option value="Documents">Documents</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>
        <Button type="submit" variant="primary" size="sm">
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </form>

      {/* Checklist Items List */}
      <div className="space-y-2 pt-2">
        {checklist.length === 0 ? (
          <div className="text-center py-6 text-zinc-400 text-xs font-medium">
            No items in your packing checklist yet. Add your first item above!
          </div>
        ) : (
          checklist.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                item.completed
                  ? 'bg-zinc-100 border-zinc-300 text-zinc-400 line-through'
                  : 'bg-white border-zinc-300 text-[#2A2A2A] shadow-2xs hover:border-[#2A2A2A]'
              }`}
            >
              <div
                onClick={() => toggleChecklistItem(item.id)}
                className="flex items-center gap-3 cursor-pointer flex-1 mr-3"
              >
                <button
                  type="button"
                  className={`p-1 rounded-md transition ${
                    item.completed ? 'text-[#E10600]' : 'text-zinc-300 hover:text-zinc-500'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#E10600]" />
                  ) : (
                    <Square className="w-5 h-5 text-zinc-300" />
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{item.text}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-300">
                  {getCategoryIcon(item.category)}
                  {item.category}
                </span>
                <button
                  onClick={() => deleteChecklistItem(item.id)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-[#E10600] hover:bg-red-50 transition"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
