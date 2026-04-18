import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const SERVER_URL = 'http://localhost:3001';

export default function Challenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (user) fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/challenges/${user.npm}`);
      const data = await res.json();
      if (data.success) setChallenges(data.challenges);
    } catch (e) {}
  };

  const submitChallenge = async (id: number) => {
    const res = await fetch(`${SERVER_URL}/api/submit-answer`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ npm: user.npm, challenge_id: id, answer: answers[id] })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) {
      const updatedUser = {...user, points: user.points + data.points_added};
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('storage'));
      fetchChallenges(); 
      setAnswers({...answers, [id]: ''});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-1 pt-10 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        <div className="max-w-5xl mx-auto pb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Operasi Pemecahan Sandi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {challenges.map(c => {
              const prevChallenge = challenges.find(prev => prev.level === c.level - 1);
              const isLocked = c.level > 1 && (!prevChallenge || !prevChallenge.is_solved);

              return (
                <div key={c.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col relative group
                  ${isLocked ? 'bg-slate-100 border-slate-200 opacity-80 cursor-not-allowed' : c.is_solved ? 'bg-emerald-50/50 border-emerald-200 hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1'}`}>
                  
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-10 transition-all group-hover:bg-slate-900/10">
                      <div className="bg-white/90 text-slate-700 px-5 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg border border-slate-200 transform transition-transform group-hover:scale-105">
                        <span className="text-xl">🔒</span> Selesaikan Lvl {c.level - 1}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors ${isLocked ? 'bg-slate-300 text-slate-600' : 'bg-slate-900 text-emerald-400 shadow-sm'}`}>
                      LVL {c.level}
                    </span>
                    <span className="text-sm font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">{c.points} PTS</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{c.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-3 leading-relaxed">{c.description}</p>
                  <div className={`p-4 rounded-xl font-mono text-sm mb-5 border border-dashed transition-colors ${isLocked ? 'bg-slate-200/50 text-slate-500 border-slate-300' : 'bg-slate-50 text-slate-700 border-slate-300 group-hover:border-emerald-300 group-hover:bg-emerald-50/30'}`}>
                    <span className="font-bold text-slate-400 mr-2">Q:</span>{c.question}
                  </div>
                  
                  {c.is_solved ? (
                    <div className="text-center font-bold text-emerald-600 bg-emerald-100 py-3 rounded-xl border border-emerald-200 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      MISI TUNTAS
                    </div>
                  ) : (
                    <div className="flex gap-3 mt-auto">
                      <input type="text" value={answers[c.id] || ''} onChange={(e) => setAnswers({...answers, [c.id]: e.target.value})} disabled={isLocked}
                        className="flex-1 px-4 py-3 text-sm border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 disabled:bg-slate-100 transition-all duration-300 font-mono" 
                        placeholder="Masukkan flag/jawaban..." />
                      <button onClick={() => submitChallenge(c.id)} disabled={isLocked} 
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-500 disabled:bg-slate-300 disabled:text-slate-500 transition-all duration-300 active:scale-95 shadow-md hover:shadow-emerald-600/30">
                        KIRIM
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}