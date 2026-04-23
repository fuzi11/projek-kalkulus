import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const SERVER_URL = 'http://localhost:3001';

export default function Challenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ npm: user.npm, challenge_id: id, answer: answers[id] })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) {
      const updatedUser = { ...user, points: user.points + data.points_added };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('storage'));
      fetchChallenges();
      setAnswers({ ...answers, [id]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#050505] to-[#050505] -z-10" />
      
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-10 py-16 animate-in fade-in duration-700">
        <header className="mb-20">
          <h1 className="text-6xl font-black italic tracking-tighter text-center uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Operasi Pemecahan Sandi
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {challenges.map((c) => {
            const prevChallenge = challenges.find((prev) => prev.level === c.level - 1);
            const isLocked = c.level > 1 && (!prevChallenge || !prevChallenge.is_solved);

            return (
              <div
                key={c.id}
                className={`relative group bg-[#1a0b2e]/60 backdrop-blur-md rounded-xl p-8 border-2 transition-all duration-300 flex flex-col
                  ${isLocked 
                    ? 'border-gray-800 opacity-50' 
                    : c.is_solved 
                      ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                      : 'border-purple-500/30 hover:border-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1'
                  }`}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-20">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">🔒</span>
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Locked</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-purple-400 tracking-tighter uppercase font-bold">
                    LVL {c.level} | {c.points} PTS
                  </span>
                  {c.is_solved && (
                    <div className="text-cyan-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mt-2 mb-4 italic tracking-tight uppercase">
                  {c.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic line-clamp-3">
                  {c.description}
                </p>

                <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[11px] text-gray-200 mb-8 border-dashed">
                  <span className="text-purple-400 mr-2 font-bold uppercase tracking-tight">System Inquiry:</span>
                  {c.question}
                </div>

                {c.is_solved ? (
                  <div className="mt-auto w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold text-white text-center text-sm italic uppercase shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                    Misi Tuntas ✓
                  </div>
                ) : (
                  <div className="mt-auto flex flex-col gap-3">
                    <input
                      type="text"
                      value={answers[c.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [c.id]: e.target.value })}
                      disabled={isLocked}
                      className="bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-400 focus:outline-none transition-all font-mono placeholder:text-gray-600"
                      placeholder="Masukkan flag/jawaban..."
                    />
                    <button
                      onClick={() => submitChallenge(c.id)}
                      disabled={isLocked}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full font-bold text-white text-sm italic uppercase shadow-[0_0_15px_rgba(192,38,211,0.4)] hover:brightness-110 active:scale-95 transition-all"
                    >
                      Kirim Jawaban
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}