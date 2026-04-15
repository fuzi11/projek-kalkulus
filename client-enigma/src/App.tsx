import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; // Ganti ke IP kamu jika pakai HP
const socket: Socket = io(SERVER_URL);

const CHAR_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const MOD = 27;

const modulo = (n: number, m: number = MOD) => ((n % m) + m) % m;

const getDeterminant = (matrix: number[], size: number) => {
  if (size === 2) return modulo(matrix[0] * matrix[3] - matrix[1] * matrix[2]);
  if (size === 3) return modulo(
      matrix[0] * (matrix[4] * matrix[8] - matrix[5] * matrix[7]) -
      matrix[1] * (matrix[3] * matrix[8] - matrix[5] * matrix[6]) +
      matrix[2] * (matrix[3] * matrix[7] - matrix[4] * matrix[6])
  );
  return 0;
};

const getModInverse = (a: number, m: number = MOD) => {
  const aMod = modulo(a, m);
  for (let x = 1; x < m; x++) if (modulo(aMod * x, m) === 1) return x;
  return null;
};

const getInverseMatrix = (matrix: number[], size: number, detInverse: number) => {
  const inv = new Array(size * size).fill(0);
  if (size === 2) {
    inv[0] = modulo(matrix[3] * detInverse);
    inv[1] = modulo(-matrix[1] * detInverse);
    inv[2] = modulo(-matrix[2] * detInverse);
    inv[3] = modulo(matrix[0] * detInverse);
  } else if (size === 3) {
    inv[0] = modulo((matrix[4] * matrix[8] - matrix[5] * matrix[7]) * detInverse);
    inv[1] = modulo(-(matrix[1] * matrix[8] - matrix[2] * matrix[7]) * detInverse);
    inv[2] = modulo((matrix[1] * matrix[5] - matrix[2] * matrix[4]) * detInverse);
    inv[3] = modulo(-(matrix[3] * matrix[8] - matrix[5] * matrix[6]) * detInverse);
    inv[4] = modulo((matrix[0] * matrix[8] - matrix[2] * matrix[6]) * detInverse);
    inv[5] = modulo(-(matrix[0] * matrix[5] - matrix[2] * matrix[3]) * detInverse);
    inv[6] = modulo((matrix[3] * matrix[7] - matrix[4] * matrix[6]) * detInverse);
    inv[7] = modulo(-(matrix[0] * matrix[7] - matrix[1] * matrix[6]) * detInverse);
    inv[8] = modulo((matrix[0] * matrix[4] - matrix[1] * matrix[3]) * detInverse);
  }
  return inv;
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loginNpm, setLoginNpm] = useState('');
  const [activeTab, setActiveTab] = useState<'lab' | 'challenges' | 'leaderboard' | 'tutorial'>('challenges'); // Buka di tab challenges
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  
  const [matrixSize, setMatrixSize] = useState<2 | 3>(3);
  const [matrixValues, setMatrixValues] = useState<number[]>([1,2,1, 0,1,1, 1,1,2]);
  const [plainText, setPlainText] = useState('');
  const [visualData, setVisualData] = useState<any>(null);

  const [challenges, setChallenges] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});

  useEffect(() => {
    socket.on('update_leaderboard', (data) => setLeaderboard(data));
    if (user && activeTab === 'challenges') fetchChallenges();
  }, [user, activeTab]);

  const fetchChallenges = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/challenges/${user.npm}`);
      const data = await res.json();
      if (data.success) setChallenges(data.challenges);
    } catch (e) { console.error(e); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/api/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ npm: loginNpm })
      });
      const data = await response.json();
      if (data.success) setUser(data.user); else alert(data.message);
    } catch { alert('Gagal terhubung ke server'); }
  };

  const processCrypto = (mode: 'ENCRYPT' | 'DECRYPT') => {
    if (!plainText) return;
    const textToProcess = plainText.toUpperCase();
    let numbers: number[] = [];
    for (const char of textToProcess) {
      const idx = CHAR_MAP.indexOf(char);
      if (idx !== -1) numbers.push(idx);
    }
    while (numbers.length % matrixSize !== 0) numbers.push(26);

    const det = getDeterminant(matrixValues, matrixSize);
    let processMatrix = matrixValues;
    
    if (mode === 'DECRYPT') {
      const detInv = getModInverse(det);
      if (detInv === null) {
        alert(`DEKRIPSI GAGAL: Matriks tidak memiliki invers dalam Modulo ${MOD}!`); return;
      }
      processMatrix = getInverseMatrix(matrixValues, matrixSize, detInv);
    }

    const outputNumbers: number[] = [];
    let outputString = "";
    for (let i = 0; i < numbers.length; i += matrixSize) {
      const block = numbers.slice(i, i + matrixSize);
      for (let col = 0; col < matrixSize; col++) {
        let sum = 0;
        for (let row = 0; row < matrixSize; row++) sum += block[row] * processMatrix[row * matrixSize + col];
        const valMod = modulo(sum);
        outputNumbers.push(valMod);
        outputString += CHAR_MAP[valMod];
      }
    }
    setVisualData({ mode, inputVec: numbers, outVec: outputNumbers, text: outputString });
  };

  const submitChallenge = async (id: number) => {
    const res = await fetch(`${SERVER_URL}/api/submit-answer`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ npm: user.npm, challenge_id: id, answer: answers[id] })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) { setUser({...user, points: user.points + data.points_added}); fetchChallenges(); setAnswers({...answers, [id]: ''});}
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 border border-slate-700">
          <h1 className="text-3xl font-black text-center text-emerald-400 mb-2 tracking-widest">ENIGMA</h1>
          <p className="text-center text-xs text-slate-500 mb-6 uppercase tracking-widest">Secure Access Protocol</p>
          <input type="text" value={loginNpm} onChange={(e) => setLoginNpm(e.target.value)}
            className="w-full p-3 rounded bg-slate-900 border border-slate-600 mb-4 text-emerald-400 font-mono outline-none text-center" placeholder="Masukan NPM..." required />
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded font-bold transition">LOGIN</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 text-white shadow-md z-10">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-black text-emerald-400">CRYPTOMATH ENIGMA</h1>
          <div className="flex items-center gap-4">
            <span className="font-mono bg-slate-800 px-3 py-1 rounded text-sm text-emerald-300">
              {user.name.split(' ')[0]} | {user.points} PTS
            </span>
            <button onClick={() => {setUser(null); setLoginNpm('');}} className="bg-red-600 text-xs px-3 py-1 rounded font-bold hover:bg-red-700">LOGOUT</button>
          </div>
        </div>
        <nav className="flex px-4 gap-2 bg-slate-800 pt-2 overflow-x-auto">
          {['challenges', 'lab', 'tutorial', 'leaderboard'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold rounded-t-lg transition capitalize whitespace-nowrap ${activeTab === tab ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-emerald-300'}`}>
              {tab === 'challenges' ? '⚔️ Tantangan (CTF)' : tab === 'lab' ? '🔬 Laboratorium' : tab === 'tutorial' ? '📖 Buku Panduan' : '🏆 Peringkat'}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* TAB TANTANGAN (Dengan Level Lock) */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto pb-12">
            <h2 className="text-2xl font-black mb-6 text-slate-800">Operasi Pemecahan Sandi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map(c => {
                // LOGIKA KUNCI LEVEL: Jika level soal ini > 1, cek apakah soal dengan level di bawahnya sudah diselesaikan
                const prevChallenge = challenges.find(prev => prev.level === c.level - 1);
                const isLocked = c.level > 1 && (!prevChallenge || !prevChallenge.is_solved);

                return (
                  <div key={c.id} className={`p-5 rounded-xl border-2 transition-all flex flex-col relative ${isLocked ? 'bg-slate-200 border-slate-300 grayscale' : c.is_solved ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 shadow-sm'}`}>
                    
                    {/* Overlay jika terkunci */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center rounded-xl z-10">
                        <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                          <span>🔒</span> TERKUNCI (Selesaikan Lvl {c.level - 1})
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-black px-2 py-1 rounded uppercase ${isLocked ? 'bg-slate-400 text-white' : 'bg-slate-800 text-emerald-400'}`}>LVL {c.level}</span>
                      <span className="text-xs font-bold text-slate-500">{c.points} PTS</span>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">{c.title}</h3>
                    <p className="text-xs text-slate-500 mb-3 flex-1">{c.description}</p>
                    <div className={`p-3 rounded font-mono text-xs mb-4 ${isLocked ? 'bg-slate-300 text-slate-500' : 'bg-slate-100 text-slate-700'}`}>Q: {c.question}</div>
                    
                    {c.is_solved ? (
                      <div className="text-center font-bold text-emerald-600 bg-emerald-100 py-2 rounded">✅ TUNTAS</div>
                    ) : (
                      <div className="flex gap-2 mt-auto">
                        <input type="text" value={answers[c.id] || ''} onChange={(e) => setAnswers({...answers, [c.id]: e.target.value})} disabled={isLocked}
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-emerald-500 disabled:bg-slate-200" placeholder="Jawaban..." />
                        <button onClick={() => submitChallenge(c.id)} disabled={isLocked} className="bg-emerald-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-emerald-700 disabled:bg-slate-400">KIRIM</button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB BUKU PANDUAN (Tutorial Super Rinci) */}
        {activeTab === 'tutorial' && (
           <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             <h2 className="text-3xl font-black mb-2 text-slate-900 border-b-4 border-emerald-400 pb-2 inline-block">Panduan Agen Enigma</h2>
             <p className="text-slate-500 mb-8">Pelajari dasar matematika kriptografi ini untuk menyelesaikan Tantangan CTF.</p>

             <div className="space-y-10">
               {/* Sesi 1 */}
               <section>
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-slate-900 text-emerald-400 w-8 h-8 flex justify-center items-center rounded-lg font-black text-xl">1</div>
                   <h3 className="text-xl font-bold text-slate-800">Sistem Modulo 27 & Vektor Karakter</h3>
                 </div>
                 <p className="text-slate-600 mb-4 leading-relaxed">
                   Komputer tidak mengerti huruf, ia hanya mengerti angka. Dalam sistem ini, kita menggunakan 26 abjad bahasa Inggris ditambah satu spasi. Karena ada 27 karakter, kita menggunakan operasi hitung <strong>Modulo 27</strong> (Sisa hasil bagi dari 27).
                 </p>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm overflow-x-auto">
                   <p className="text-emerald-700 font-bold mb-2">A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11, M=12, N=13</p>
                   <p className="text-emerald-700 font-bold">O=14, P=15, Q=16, R=17, S=18, T=19, U=20, V=21, W=22, X=23, Y=24, Z=25, [Spasi]=26</p>
                 </div>
                 <p className="mt-4 text-sm bg-blue-50 text-blue-800 p-3 rounded">
                   <strong>Aturan Emas Modulo Angka Negatif:</strong> Jika hasil hitunganmu minus (contoh: -10), cara mengubahnya ke Modulo 27 adalah: <code className="bg-white px-1 rounded">-10 + 27 = 17</code>.
                 </p>
               </section>

               {/* Sesi 2 */}
               <section>
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-slate-900 text-emerald-400 w-8 h-8 flex justify-center items-center rounded-lg font-black text-xl">2</div>
                   <h3 className="text-xl font-bold text-slate-800">Enkripsi (Matriks &times; Vektor)</h3>
                 </div>
                 <p className="text-slate-600 mb-4 leading-relaxed">
                   Enkripsi Hill Cipher dilakukan dengan mengalikan Vektor Pesan Asli (P) dengan Matriks Kunci (K). Rumus dasarnya adalah <code>C = P &times; K mod 27</code>.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                     <h4 className="font-bold text-slate-700 mb-2">Contoh Matriks 2x2</h4>
                     <p className="text-sm text-slate-600 mb-2">Pesan: "HI" &rarr; P = [7, 8]</p>
                     <p className="text-sm text-slate-600 mb-2">Kunci K = [[3, 3], [2, 5]]</p>
                     <ul className="text-sm font-mono text-slate-700 list-disc pl-5 space-y-1">
                       <li>C₁ = (7&times;3) + (8&times;2) = 21 + 16 = 37</li>
                       <li>C₁ Modulo 27 &rarr; 37 mod 27 = <strong>10 (K)</strong></li>
                       <li>C₂ = (7&times;3) + (8&times;5) = 21 + 40 = 61</li>
                       <li>C₂ Modulo 27 &rarr; 61 mod 27 = <strong>7 (H)</strong></li>
                     </ul>
                   </div>
                 </div>
               </section>

               {/* Sesi 3 */}
               <section>
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-slate-900 text-emerald-400 w-8 h-8 flex justify-center items-center rounded-lg font-black text-xl">3</div>
                   <h3 className="text-xl font-bold text-slate-800">Menghitung Determinan Matriks</h3>
                 </div>
                 <p className="text-slate-600 mb-4 leading-relaxed">
                   Determinan sangat penting untuk memeriksa apakah matriks yang dibuat bisa digunakan untuk Dekripsi (memutar balik pesan).
                 </p>
                 <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-4">
                    <h4 className="font-bold text-amber-800 mb-2">Untuk Matriks 2x2: K = [[a, b], [c, d]]</h4>
                    <p className="font-mono text-amber-900 bg-amber-100 p-2 rounded inline-block">Det = (a &times; d) - (b &times; c)</p>
                 </div>
                 <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                    <h4 className="font-bold text-emerald-800 mb-2">Untuk Matriks 3x3 (Aturan Sarrus):</h4>
                    <p className="text-sm text-emerald-700 mb-2">Misal Matriks K memiliki baris: B1[a,b,c], B2[d,e,f], B3[g,h,i]</p>
                    <p className="font-mono text-emerald-900 text-sm">Det = (a&middot;e&middot;i + b&middot;f&middot;g + c&middot;d&middot;h) - (c&middot;e&middot;g + a&middot;f&middot;h + b&middot;d&middot;i)</p>
                 </div>
               </section>

               {/* Sesi 4 */}
               <section>
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-slate-900 text-emerald-400 w-8 h-8 flex justify-center items-center rounded-lg font-black text-xl">4</div>
                   <h3 className="text-xl font-bold text-slate-800">Mencari Invers Modulo & Syarat Mutlak</h3>
                 </div>
                 <p className="text-slate-600 mb-4 leading-relaxed">
                   Agar sandi bisa dibuka, Matriks Kunci harus dibalik (Invers). Langkah pertama mencari invers matriks adalah mencari <strong>Invers Modulo dari Determinan-nya</strong>.
                 </p>
                 <div className="bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-200 mb-4">
                   <strong>HUKUM MUTLAK:</strong> Dalam Modulo 27, matriks <strong>TIDAK BISA DIBALIK</strong> jika nilai determinannya adalah 0, atau bilangan kelipatan 3 (seperti 3, 6, 9, 12, 15...).
                 </div>
                 <p className="text-slate-600 mb-2">
                   Jika determinan sah (contoh Det = 2), kita cari angka (X) yang jika dikalikan 2 lalu dimodulo 27 hasilnya adalah 1. <br/>
                   <code>(2 &times; X) mod 27 = 1</code>. Karena <code>2 &times; 14 = 28</code>, dan <code>28 mod 27 = 1</code>, maka nilai Invers Modulo-nya adalah <strong>14</strong>.
                 </p>
               </section>
             </div>
           </div>
        )}

        {/* TAB LABORATORY (Sama dengan sebelumnya) */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">🔬 Engine Control</h2>
              </div>
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-400 uppercase">Matrix Size</label>
                <div className="flex gap-2 mt-2">
                  {[2, 3].map(size => (
                    <button key={size} onClick={() => { setMatrixSize(size as any); setVisualData(null); }}
                      className={`px-4 py-2 rounded font-bold transition ${matrixSize === size ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{size}x{size}</button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Key Matrix Values</label>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${getDeterminant(matrixValues, matrixSize) === 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                    Det: {getDeterminant(matrixValues, matrixSize)}
                  </span>
                </div>
                <div className={`grid gap-2 w-48`} style={{ gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` }}>
                  {matrixValues.slice(0, matrixSize * matrixSize).map((val, i) => (
                    <input key={i} type="number" value={val} onChange={(e) => {
                      const newVals = [...matrixValues]; newVals[i] = parseInt(e.target.value) || 0; setMatrixValues(newVals);
                    }} className="w-full h-12 text-center bg-slate-50 border border-slate-300 rounded font-mono outline-none focus:border-emerald-500" />
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Input Text</label>
                <textarea rows={3} value={plainText} onChange={(e) => setPlainText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded outline-none focus:border-emerald-500 font-mono resize-none" placeholder="Masukkan teks (contoh: RAHASIA)..." />
              </div>
              <div className="flex gap-2">
                <button onClick={() => processCrypto('ENCRYPT')} className="flex-1 bg-emerald-600 text-white py-3 rounded font-bold hover:bg-emerald-700 shadow">ENCRYPT</button>
                <button onClick={() => processCrypto('DECRYPT')} className="flex-1 bg-slate-800 text-emerald-400 py-3 rounded font-bold hover:bg-slate-700 shadow">DECRYPT</button>
              </div>
            </div>

            {/* Visualizer Panel */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-6">📊 Output Terminal</h2>
              {visualData ? (
                <div className="flex flex-col gap-6">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Process Type</p>
                    <p className="font-black text-slate-700">{visualData.mode === 'ENCRYPT' ? 'Encryption (Locking)' : 'Decryption (Unlocking)'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Input Vector (Numbers)</p>
                    <div className="font-mono text-sm break-all bg-slate-100 p-3 rounded border text-slate-600">[{visualData.inputVec.join(', ')}]</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Output Vector (Calculated)</p>
                    <div className="font-mono text-sm break-all bg-emerald-50 p-3 rounded border border-emerald-200 text-emerald-700">[{visualData.outVec.join(', ')}]</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Final Text Result</p>
                    <div className="font-mono text-2xl font-black bg-slate-900 text-emerald-400 p-4 rounded shadow-inner break-all">
                      {visualData.text.replace(/ /g, '␣')}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">Jalankan proses untuk melihat hasil visual.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB LEADERBOARD (Sama) */}
        {activeTab === 'leaderboard' && (
           <div className="max-w-xl mx-auto bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
             <div className="bg-slate-900 p-6 text-center text-emerald-400 font-black text-xl tracking-widest">LEADERBOARD</div>
             <div className="p-4">
               {leaderboard.map((p, i) => (
                 <div key={i} className={`flex items-center justify-between p-4 rounded-lg mb-2 ${p.name === user.name ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50'}`}>
                   <div className="flex items-center gap-3"><span className="font-black text-slate-400">{i+1}</span> <span className="font-bold text-slate-700">{p.name}</span></div>
                   <span className="font-mono font-bold text-emerald-600">{p.points} PTS</span>
                 </div>
               ))}
             </div>
           </div>
        )}

      </main>
    </div>
  );
}