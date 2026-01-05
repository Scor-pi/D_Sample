
import React from 'react';
import { ShieldCheck, UserCheck, AlertCircle, TrendingUp } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const pendingVerifications = [
    { id: '1', name: 'Elite Auto House', type: 'Gold', requested: '2h ago' },
    { id: '2', name: 'Westside Motors', type: 'Blue', requested: '5h ago' },
    { id: '3', name: 'Classic Car Hub', type: 'Gold', requested: '1d ago' },
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-slate-100">
          <ShieldCheck className="text-brand-600" />
          Admin Console
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <TrendingUp className="text-green-500 mb-2" size={24} />
          <p className="text-2xl font-black dark:text-slate-100">2.4k</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Live Posts</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <UserCheck className="text-brand-500 mb-2" size={24} />
          <p className="text-2xl font-black dark:text-slate-100">156</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Verified Accounts</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">Verifications</h3>
          <span className="bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded text-[10px] font-bold">REVIEWS</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {pendingVerifications.map((v) => (
            <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${v.type === 'Gold' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600' : 'bg-brand-100 dark:bg-brand-900/20 text-brand-600'}`}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{v.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{v.type} • {v.requested}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-bold hover:bg-brand-700 transition-colors">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
          <AlertCircle className="text-amber-500" size={18} />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">Reports</h3>
        </div>
        <div className="p-8 text-center text-slate-400 dark:text-slate-500">
          <p className="text-sm">Inbox clean. No reports detected.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
