import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '../types';
import { getStorageItem, setStorageItem, getTodayFormatted } from '../lib/format';

interface BudgetContextType {
  totalBudget: number;
  expenses: Expense[];
  setTotalBudget: (budget: number) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  editExpense: (id: string, updated: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  totalSpent: number;
  remainingBudget: number;
  categoryTotals: Record<ExpenseCategory, number>;
}

const DEFAULT_EXPENSES: Expense[] = [
  {
    id: 'e-1',
    title: 'AC Sleeper Bus Ticket (Mangaluru to Bengaluru)',
    amount: 750,
    category: 'Transport',
    date: getTodayFormatted(),
    notes: 'Booked with STUDENT50 discount coupon'
  },
  {
    id: 'e-2',
    title: 'Highway Rest Stop Dinner & Tea',
    amount: 180,
    category: 'Food',
    date: getTodayFormatted(),
    notes: 'Thali dinner at Hassan bypass stop'
  },
  {
    id: 'e-3',
    title: 'Auto Rickshaw from Majestic Bus Terminal to Hostel',
    amount: 120,
    category: 'Transport',
    date: getTodayFormatted()
  },
  {
    id: 'e-4',
    title: 'Weekend PG Guest Room Night',
    amount: 500,
    category: 'Accommodation',
    date: getTodayFormatted(),
    notes: 'Stayed at friend college hostel guest room'
  }
];

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalBudget, setTotalBudgetState] = useState<number>(() =>
    getStorageItem<number>('tripmate_total_budget', 2500)
  );

  const [expenses, setExpenses] = useState<Expense[]>(() =>
    getStorageItem<Expense[]>('tripmate_expenses', DEFAULT_EXPENSES)
  );

  useEffect(() => {
    setStorageItem('tripmate_total_budget', totalBudget);
  }, [totalBudget]);

  useEffect(() => {
    setStorageItem('tripmate_expenses', expenses);
  }, [expenses]);

  const setTotalBudget = (budget: number) => {
    setTotalBudgetState(Math.max(0, budget));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const editExpense = (id: string, updated: Omit<Expense, 'id'>) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...updated, id } : item))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  const categoryTotals: Record<ExpenseCategory, number> = {
    Transport: 0,
    Food: 0,
    Accommodation: 0,
    Miscellaneous: 0,
    Sightseeing: 0,
  };

  expenses.forEach((exp) => {
    if (categoryTotals[exp.category] !== undefined) {
      categoryTotals[exp.category] += exp.amount;
    } else {
      categoryTotals.Miscellaneous += exp.amount;
    }
  });

  return (
    <BudgetContext.Provider
      value={{
        totalBudget,
        expenses,
        setTotalBudget,
        addExpense,
        editExpense,
        deleteExpense,
        totalSpent,
        remainingBudget,
        categoryTotals,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
