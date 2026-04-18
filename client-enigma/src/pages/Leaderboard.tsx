import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; 
const socket: Socket = io(SERVER_URL);

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{"name": ""}');

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/leaderboard`);
        const data = await res.json();
        if (data.success && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      } catch (error) {}
    };
    fetchInitialLeaderboard();

    socket.on('update_leaderboard', (data) => {
      setLeaderboard(data);
    });

    return () => { 
      socket.off('update_leaderboard'); 
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-1 pt-10 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transform transition-all">
          <div className="bg-slate-900 p-8 text-center border-b-4 border-emerald-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
            <h2 className="text-emerald-400 font-black text-3xl tracking-[0.2em] relative z-10 flex items-center justify-center gap-4">
              <span>🏆</span> HALL OF FAME
            </h2>
          </div>
          <div className="p-6 bg-slate-50">
            {leaderboard.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest animate-pulse">Menyinkronkan data...</div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((p, i) => {
                  const playerName = p.name || p.nama || p.username || p.npm || "Unknown Agent";
                  const isCurrentUser = playerName === user.name || playerName === user.npm;

                  return (
                    <div key={i} className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md
                      ${isCurrentUser ? 'bg-emerald-50 border-2 border-emerald-400 shadow-sm z-10 relative' : 'bg-white border border-slate-200 hover:border-slate-300'}`}>
                      <div className="flex items-center gap-5">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg
                          ${i === 0 ? 'bg-amber-400 text-amber-900 shadow-lg shadow-amber-400/30' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-amber-700 text-amber-100' : 'bg-slate-100 text-slate-400'}`}>
                          {i+1}
                        </div>
                        <span className={`text-lg ${isCurrentUser ? 'font-black text-emerald-800' : 'font-bold text-slate-700'}`}>
                          {playerName} 
                          {isCurrentUser && <span className="ml-2 text-[10px] bg-emerald-200 text-emerald-800 px-2 py-1 rounded uppercase tracking-wider">You</span>}
                        </span>
                      </div>
                      <div className={`font-mono text-xl font-black ${i === 0 ? 'text-amber-500' : 'text-emerald-600'}`}>
                        {p.points} <span className="text-xs text-slate-400 font-bold ml-1">PTS</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}