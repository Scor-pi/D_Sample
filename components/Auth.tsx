
import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Store, ArrowRight, Lock, Mail } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [selectedPortal, setSelectedPortal] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#/admin');

  useEffect(() => {
    const handleHashChange = () => {
      const isRootAdmin = window.location.hash === '#/admin';
      setIsAdminRoute(isRootAdmin);
      if (isRootAdmin) {
        setSelectedPortal('admin');
      } else {
        setSelectedPortal(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (isAdminRoute) setSelectedPortal('admin');
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminRoute]);

  const portals = [
    { 
      id: 'customer' as UserRole, 
      name: 'Buyer Portal', 
      domain: 'drivecore.app',
      icon: User, 
      color: 'bg-brand-500',
      description: 'Access the social feed, marketplace, and AI budgeting tools.'
    },
    { 
      id: 'dealer' as UserRole, 
      name: 'Dealer Portal', 
      domain: 'dealers.drivecore.app',
      icon: Store, 
      color: 'bg-blue-600',
      description: 'Inventory management, virtual stores, and verification perks.'
    }
  ];

  const adminPortal = { 
    id: 'admin' as UserRole, 
    name: 'Admin Control Center', 
    domain: 'admin.drivecore.internal',
    icon: ShieldCheck, 
    color: 'bg-slate-900',
    description: 'System-wide content moderation and verification management.'
  };

  const jumpToAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/admin';
  };

  // If we are on the hidden admin route, show the admin login directly
  if (selectedPortal === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-red-900/20">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Command</h2>
              <p className="text-xs text-slate-500 font-mono mt-2 tracking-widest uppercase">Internal Network Access Only</p>
              <p className="text-[10px] text-red-500 font-bold mt-1">RESTRICTED DOMAIN: {adminPortal.domain}</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="Admin Identifier"
                  className="w-full bg-slate-800 border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  placeholder="Security Key"
                  className="w-full bg-slate-800 border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button 
                onClick={() => onLogin('admin')}
                className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all mt-4 uppercase tracking-widest text-xs"
              >
                Establish Secure Session
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800 text-center">
              <button 
                onClick={() => { window.location.hash = ''; setSelectedPortal(null); }}
                className="text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                Return to Public Gateways
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gateway for normal users
  if (!selectedPortal) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-3">
            <div className="inline-block px-4 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-2">
              The Car Social Marketplace
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-brand-600 italic">DRIVECORE</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Choose your portal to begin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {portals.map((portal) => (
              <button
                key={portal.id}
                onClick={() => setSelectedPortal(portal.id)}
                className="group relative bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-brand-500 dark:hover:border-brand-500 transition-all text-left flex flex-col h-full overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors" />
                <div className={`${portal.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                  <portal.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold dark:text-white mb-2">{portal.name}</h3>
                <p className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 mb-4 tracking-wider uppercase">{portal.domain}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-10 flex-1 leading-relaxed">{portal.description}</p>
                <div className="flex items-center gap-2 text-brand-600 font-black text-sm uppercase tracking-widest">
                  Enter <ArrowRight size={18} />
                </div>
              </button>
            ))}
          </div>
          
          <div className="pt-12 flex flex-col items-center gap-4">
            <div className="text-slate-300 dark:text-slate-700 text-[10px] font-bold uppercase tracking-[0.3em]">
              End-to-End Encrypted Ecosystem
            </div>
            {/* Quick access for admin testing */}
            <button 
              onClick={jumpToAdmin}
              className="mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-600 hover:text-brand-600 dark:hover:text-brand-500 uppercase tracking-[0.2em] py-2 px-4 border border-slate-100 dark:border-slate-800 rounded-full transition-all flex items-center gap-2"
            >
              <ShieldCheck size={12} /> Admin Domain Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal login for Buyer or Dealer
  const currentPortal = portals.find(p => p.id === selectedPortal)!;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-500">
      <div className="max-w-md w-full">
        <button 
          onClick={() => setSelectedPortal(null)}
          className="text-slate-400 hover:text-brand-600 mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors"
        >
          ← Change Portal
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-500 to-orange-400" />
          
          <div className="text-center mb-10">
            <div className={`${currentPortal.color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl`}>
              <currentPortal.icon size={40} />
            </div>
            <h2 className="text-3xl font-bold dark:text-white">{currentPortal.name}</h2>
            <p className="text-[10px] text-brand-600 font-mono mt-2 tracking-widest font-bold">{currentPortal.domain}</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all shadow-inner"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all shadow-inner"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button 
              onClick={() => onLogin(selectedPortal)}
              className={`w-full ${currentPortal.color} text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-500/10 hover:brightness-110 transition-all mt-6 uppercase tracking-widest text-xs`}
            >
              Sign In
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock size={12} /> Secure Auth Session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
