import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Compass, Bookmark, Wallet, CheckSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Comparison' | 'Budget' | 'Checklist';
}

export const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'General',
      question: 'How do I search for sample intercity routes?',
      answer: 'Go to the Home or Explore page, select your From City, To City, and preferred Travel Date. Click "Find Journeys" to view available options.'
    },
    {
      category: 'Comparison',
      question: 'How does side-by-side journey comparison work?',
      answer: 'Click the "Compare" button on up to 3 journey cards. A floating drawer will appear at the bottom highlighting the cheapest and fastest options across your selected routes.'
    },
    {
      category: 'Budget',
      question: 'How does the Travel Budget Planner track my expenses?',
      answer: 'Set your total travel allowance in the Budget Planner page. When you log expenses (e.g. bus ticket, dinner, hostel stay), your total spent and remaining balance update automatically.'
    },
    {
      category: 'Checklist',
      question: 'Is my packing checklist saved if I refresh the browser?',
      answer: 'Yes! All saved journeys, checklist completion states, custom packing items, and travel budget logs are persisted automatically using browser LocalStorage.'
    },
    {
      category: 'General',
      question: 'Can I book real bus or train tickets on TripMate?',
      answer: 'No. TripMate is an academic student concept MVP. All pricing, schedules, and operator names are sample demonstration data for milestone evaluation.'
    }
  ];

  return (
    <div className="py-12 bg-[#F5F5F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-[#2A2A2A] text-white rounded-2xl p-8 sm:p-10 border border-zinc-800 shadow-xl text-center space-y-3">
          <div className="w-14 h-14 rounded-xl bg-[#E10600] text-white flex items-center justify-center mx-auto shadow-md">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            HELP & USER GUIDES
          </h1>
          <p className="text-[#C0C0C0] text-sm max-w-lg mx-auto font-medium">
            Find answers to frequently asked questions and learn how to make the most of TripMate features.
          </p>
        </div>

        {/* Quick User Guides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-2">
            <div className="flex items-center gap-2 font-black text-[#2A2A2A] text-sm">
              <Compass className="w-4 h-4 text-[#E10600]" />
              <span>1. Searching & Filtering</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Use origin, destination, max price sliders, and transport filter buttons to narrow down student intercity buses.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-2">
            <div className="flex items-center gap-2 font-black text-[#2A2A2A] text-sm">
              <Bookmark className="w-4 h-4 text-[#2A2A2A]" />
              <span>2. Saving & Comparing</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Bookmark favorite routes or click "Compare" to view up to 3 options side-by-side with cheapest/fastest badges.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-2">
            <div className="flex items-center gap-2 font-black text-[#2A2A2A] text-sm">
              <CheckSquare className="w-4 h-4 text-[#E10600]" />
              <span>3. Packing Checklist</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Ensure you don't forget your College Student ID card, tickets, power bank, or medicines using the progress bar.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-2">
            <div className="flex items-center gap-2 font-black text-[#2A2A2A] text-sm">
              <Wallet className="w-4 h-4 text-[#2A2A2A]" />
              <span>4. Expense Tracking</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Log transport, meal, and stay costs in the Budget Planner to stay within your weekend allowance.
            </p>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl border border-zinc-300 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-xl font-black text-[#2A2A2A] mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-zinc-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-black text-[#2A2A2A] text-sm hover:text-[#E10600] transition"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#E10600]" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs text-zinc-600 leading-relaxed animate-in fade-in duration-200 font-medium">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
