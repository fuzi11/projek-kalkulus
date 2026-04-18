import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const tabs = [
    { id: 'challenges', path: '/challenges', label: '⚔️ Tantangan (CTF)' },
    { id: 'lab', path: '/laboratorium', label: '🔬 Laboratorium' },
    { id: 'tutorial', path: '/panduan', label: '📖 Buku Panduan' },
    { id: 'leaderboard', path: '/leaderboard', label: '🏆 Peringkat' }
  ];

  return (
    <header className="bg-slate-900 text-white shadow-xl z-50 sticky top-0 border-b border-slate-700">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-wide cursor-default hover:opacity-80 transition-opacity">
          CRYPTOMATH ENIGMA
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-mono bg-slate-800/80 px-4 py-1.5 rounded-lg text-sm text-emerald-300 border border-slate-700 shadow-inner flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {user.name ? user.name.split(' ')[0] : 'Agent'} <span className="text-slate-500">|</span> <span className="font-bold">{user.points || 0} PTS</span>
          </span>
          <button onClick={handleLogout} className="bg-rose-500/10 text-rose-400 text-xs px-4 py-2 rounded-lg font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 border border-rose-500/20 hover:border-rose-500">
            LOGOUT
          </button>
        </div>
      </div>
      <nav className="flex px-4 gap-2 bg-slate-800 overflow-x-auto border-t border-slate-700">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => navigate(tab.path)}
            className={`px-6 py-3.5 font-semibold rounded-t-xl transition-all duration-300 capitalize whitespace-nowrap transform origin-bottom flex items-center gap-2
            ${location.pathname === tab.path 
              ? 'bg-slate-50 text-slate-900 scale-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' 
              : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-700/50 hover:scale-95'}`}>
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}