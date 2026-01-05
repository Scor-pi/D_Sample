
import React from 'react';
import { ShoppingBag, Filter, BadgeCheck, Zap } from 'lucide-react';

const MOCK_LISTINGS = [
  { id: '1', make: 'BMW', model: 'M4 Competition', year: 2023, price: 78000, mileage: 5200, tier: 'gold', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400' },
  { id: '2', make: 'Toyota', model: 'Supra', year: 2021, price: 52000, mileage: 12000, tier: 'blue', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=400' },
  { id: '3', make: 'Audi', model: 'RS6 Avant', year: 2024, price: 125000, mileage: 50, tier: 'gold', image: 'https://images.unsplash.com/photo-1603584173870-7f3ca97669d2?auto=format&fit=crop&q=80&w=400' },
  { id: '4', make: 'Honda', model: 'Civic Type R', year: 2022, price: 44000, mileage: 8000, tier: 'none', image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=400' },
];

const Marketplace: React.FC = () => {
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-slate-100">
          <ShoppingBag className="text-brand-600" />
          Marketplace
        </h2>
        <button className="flex items-center gap-2 text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Subscription Teaser */}
      <div className="bg-gradient-to-r from-brand-500 to-orange-700 rounded-2xl p-6 text-white overflow-hidden relative shadow-lg">
        <Zap className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Dealer Verification</h3>
          <p className="text-orange-50 opacity-90 text-sm mb-4 max-w-sm">
            Get Drivecore Verified status to unlock virtual stores, auto-marketing, and exclusive auction access.
          </p>
          <div className="flex gap-3">
            <button className="bg-white text-brand-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition-colors">
              Upgrade to Gold
            </button>
            <button className="bg-brand-400/30 backdrop-blur text-white border border-brand-300/50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_LISTINGS.map((car) => (
          <div key={car.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:shadow-md transition-all">
            <div className="aspect-[4/3] relative">
              <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 flex gap-1">
                {car.tier === 'gold' && (
                  <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1">
                    <BadgeCheck size={12} /> Gold Verified
                  </div>
                )}
                {car.tier === 'blue' && (
                  <div className="bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1">
                    <BadgeCheck size={12} /> Verified
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{car.year} {car.make}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{car.model}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-brand-600 dark:text-brand-400">${car.price.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{car.mileage.toLocaleString()} miles</p>
                </div>
              </div>
              <button className="w-full mt-2 bg-brand-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-brand-700 transition-colors">
                Message Dealer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
