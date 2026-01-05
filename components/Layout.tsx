
import React from 'react';
import { Home, Search, PlusSquare, ShoppingBag, MessageCircle, User, ShieldCheck, Sun, Moon, LogOut, Globe } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRole, darkMode, toggleDarkMode, onLogout }) => {
  const portalDomains: Record<UserRole, string> = {
    customer: 'drivecore.app',
    dealer: 'dealers.drivecore.app',
    admin: 'admin.drivecore.internal'
  };

  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed', roles: ['customer', 'dealer'] },
    { id: 'marketplace', icon: ShoppingBag, label: 'Market', roles: ['customer', 'dealer'] },
    { id: 'ai', icon: Search, label: 'AI Advisor', roles: ['customer', 'dealer'] },
    { id: 'chat', icon: MessageCircle, label: 'Chat', roles: ['customer', 'dealer', 'admin'] },
    { id: 'services', icon: PlusSquare, label: 'Services', roles: ['customer', 'dealer'] },
    { id: 'admin', icon: ShieldCheck, label: 'Admin', roles: ['admin'] },
    { id: 'profile', icon: User, label: 'Settings', roles: ['customer', 'dealer', 'admin'] },
  ].filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 glass dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tighter text-brand-600 italic leading-none">DRIVECORE</h1>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-slate-500 uppercase">
              {userRole}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Globe size={10} className="text-slate-400" />
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[150px]">
              {portalDomains[userRole]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1" />

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="text-xs font-bold hidden sm:block">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0 md:pl-0 max-w-2xl mx-auto w-full px-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 px-6 py-3 md:py-4 z-50">
        <div className="max-w-screen-xl mx-auto flex justify-around sm:justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === item.id ? 'text-brand-600 scale-110' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-medium hidden sm:block">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
