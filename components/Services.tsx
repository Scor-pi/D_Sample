
import React from 'react';
import { Settings, ClipboardCheck, MessageSquare, Wrench, ShieldCheck } from 'lucide-react';

const Services: React.FC = () => {
  const serviceItems = [
    { title: 'AI Consulting', desc: 'Expert car choice advice', price: 15, icon: MessageSquare, color: 'bg-orange-100 dark:bg-orange-900/20 text-brand-600 dark:text-brand-400' },
    { title: 'Pro Inspection', desc: 'Full mechanical report', price: 45, icon: ClipboardCheck, color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { title: 'Mechanical Quick Fix', desc: 'Minor site repairs', price: 80, icon: Wrench, color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-slate-100">
          <Settings className="text-brand-600" />
          Pro Services
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Professional automotive care at your fingertips.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {serviceItems.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform`}>
                <s.icon size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{s.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xl font-black text-slate-800 dark:text-slate-100">${s.price}</span>
              <button className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 border border-brand-600/20 dark:border-brand-400/20 px-3 py-1 rounded-full mt-1 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-2xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-orange-600 to-red-600" />
        <ShieldCheck className="mx-auto text-brand-400 mb-4" size={48} />
        <h3 className="text-xl font-bold mb-2">Secured Payments</h3>
        <p className="text-slate-400 text-sm mb-6">Transactions secured by Drivecore Guarantee.</p>
        <div className="flex justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 invert opacity-50" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-50" alt="Mastercard" />
        </div>
      </div>
    </div>
  );
};

export default Services;
