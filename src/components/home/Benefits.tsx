import React from 'react';
import { Compass, Wallet, CheckSquare, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export const Benefits: React.FC = () => {
  const benefitsList = [
    {
      icon: Compass,
      title: 'Compare Intercity Options',
      description: 'Side-by-side spec evaluation for prices, schedules, and duration across sleeper buses, trains, and shuttles.'
    },
    {
      icon: Wallet,
      title: 'Integrated Travel Budget',
      description: 'Set custom travel limits, log ticket, meal, and stay costs, and maintain a real-time spending ledger.'
    },
    {
      icon: CheckSquare,
      title: 'Pre-Trip Packing List',
      description: 'Ensure college ID cards, hall tickets, power banks, and essential medications are packed before departure.'
    },
    {
      icon: ShieldCheck,
      title: '100% Offline Persistence',
      description: 'All saved routes, preferences, and expense logs persist safely inside your browser LocalStorage.'
    }
  ];

  return (
    <section className="py-16 bg-[#F5F5F5] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-[#E10600] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md border border-red-200">
            ENGINEERED FOR URBAN TRANSIT
          </span>
          <h2 className="text-3xl font-black text-[#2A2A2A] tracking-tight mt-3">
            Designed for College & Weekend Travelers
          </h2>
          <p className="text-zinc-500 text-sm mt-2 font-medium">
            Built to solve intercity travel friction for students heading home or embarking on weekend road trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] text-white flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#E10600]" />
                  </div>
                  <h3 className="font-black text-[#2A2A2A] text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
