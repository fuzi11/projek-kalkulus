import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Definisikan interface untuk tipe data User
interface User {
  name: string;
  points: number;
  npm?: string;
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State dengan tipe data User atau null
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Proteksi jika user tidak ada
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const tabs = [
    { id: 'challenges', path: '/challenges', label: 'Challenges' },
    { id: 'lab', path: '/laboratorium', label: 'Lab' },
    { id: 'tutorial', path: '/panduan', label: 'Guide' },
    { id: 'leaderboard', path: '/leaderboard', label: 'Rankings' }
  ];

  const gradasi = "linear-gradient(to right, #A855F7, #06B6D4)";

  return (
    <header className="bg-slate-900 text-white shadow-xl z-50 sticky top-0 border-b border-slate-700 flex justify-between items-end px-6 pt-4">
      
      {/* KIRI: Logo & Navigasi */}
      <div className="flex items-end gap-10">
        
        {/* LOGO: ENIGMA UNGU NEON */}
        <h1 
          style={{
            WebkitTextStroke: '1.5px #A855F7',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 0px 8px #A855F7)',
          }}
          className="text-xl font-black italic tracking-wide cursor-default uppercase pb-4"
        >
          ENIGMA
        </h1>

        {/* Navigasi Tabs */}
        <nav className="flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => navigate(tab.path)}
              className={`px-6 py-3.5 font-semibold rounded-t-xl transition-all duration-300 capitalize whitespace-nowrap transform origin-bottom flex items-center gap-2 relative
              ${location.pathname === tab.path 
                ? 'bg-slate-50 text-slate-900 scale-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' 
                : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800 hover:scale-95'}`}
            >
              {tab.label}
              {location.pathname === tab.path && (
                <div 
                  className="absolute bottom-0 left-0 w-full h-[3px]"
                  style={{ background: gradasi }}
                ></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* KANAN: User Info & Logout */}
      <div className="flex items-center gap-4 pb-3">
        <div className="font-mono bg-slate-800/80 px-4 py-1.5 rounded-lg text-sm border border-slate-700 shadow-inner flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: gradasi }}></span>
          <span className="text-white">
            {user.name ? user.name.split(' ')[0] : 'Agent'}
          </span>
          <span className="text-slate-500">|</span> 
          <span className="font-bold text-cyan-400">{user.points || 0} PTS</span>
        </div>
        
        {/* TOMBOL LOGOUT TRANSPARAN DENGAN BORDER GRADASI */}
        <button 
          onClick={handleLogout} 
          className="group relative p-[2px] rounded-lg transition-all duration-300 active:scale-95 overflow-hidden"
        >
          {/* Background Gradasi untuk Border */}
          <div 
            className="absolute inset-0" 
            style={{ background: gradasi }}
          ></div>
          
          {/* Konten Tombol (Background mengikuti Header agar terlihat transparan) */}
          <div className="relative bg-slate-900 px-4 py-1.5 rounded-[6px] transition-colors group-hover:bg-slate-800">
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              LOGOUT
            </span>
          </div>
        </button>
      </div>

    </header>
  );
}