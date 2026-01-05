
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Feed from './components/Feed';
import Marketplace from './components/Marketplace';
import AIAdvisor from './components/AIAdvisor';
import ChatRoom from './components/Chat';
import AdminPanel from './components/Admin';
import Services from './components/Services';
import { UserRole } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // Remove the #/admin from URL for cleaner experience once logged in
    if (window.location.hash === '#/admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    // Set default tab based on role
    if (role === 'admin') setActiveTab('admin');
    else setActiveTab('feed');
  };

  const handleLogout = () => {
    setUserRole(null);
    setActiveTab('feed');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (!userRole) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'feed': return <Feed />;
      case 'marketplace': return <Marketplace />;
      case 'ai': return <AIAdvisor />;
      case 'chat': return <ChatRoom />;
      case 'services': return <Services />;
      case 'admin': return <AdminPanel />;
      case 'profile':
        return (
          <div className="py-20 text-center space-y-8">
            <div className="relative inline-block">
               <div className="w-24 h-24 rounded-3xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center border-2 border-brand-500 mx-auto">
                 <img src={`https://i.pravatar.cc/150?u=${userRole}`} alt="avatar" className="w-20 h-20 rounded-2xl object-cover" />
               </div>
               <div className="absolute -bottom-2 -right-2 bg-brand-500 text-white p-1 rounded-lg border-2 border-white dark:border-slate-900">
                 {userRole === 'admin' ? <ShieldCheck size={16} /> : <User size={16} />}
               </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-slate-100">Portal Settings</h2>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-1 uppercase tracking-[0.2em] font-bold">{userRole} Session Active</p>
            </div>
            
            <div className="max-w-xs mx-auto space-y-3">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 text-left shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Preference</p>
                <div className="flex items-center justify-between">
                   <span className="text-sm font-bold dark:text-white">Dark Interface</span>
                   <button 
                    onClick={toggleDarkMode}
                    className={`w-14 h-7 rounded-full transition-colors relative shadow-inner ${darkMode ? 'bg-brand-600' : 'bg-slate-200'}`}
                   >
                     <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${darkMode ? 'right-1' : 'left-1'}`} />
                   </button>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30"
              >
                Terminate Session
              </button>
            </div>
          </div>
        );
      default: return <Feed />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userRole={userRole} 
      darkMode={darkMode} 
      toggleDarkMode={toggleDarkMode}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

// Internal icons helper for clean rendering
const ShieldCheck = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>;
const User = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

export default App;
