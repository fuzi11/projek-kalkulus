import React, { useState } from 'react';
import Header from '../components/Header';

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

export default function Laboratorium() {
  const [matrixSize, setMatrixSize] = useState<2 | 3>(3);
  const [matrixValues, setMatrixValues] = useState<number[]>([1,2,1, 0,1,1, 1,1,2]);
  const [plainText, setPlainText] = useState('');
  const [visualData, setVisualData] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-1 pt-10 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <span className="text-3xl">🔬</span> Engine Control
              </h2>
            </div>

            <div className="mb-6">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Matrix Size</label>
              <div className="flex gap-3">
                {[2, 3].map(size => (
                  <button key={size} onClick={() => { setMatrixSize(size as any); setVisualData(null); }}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${matrixSize === size ? 'bg-slate-900 text-emerald-400 shadow-lg scale-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 active:scale-95'}`}>
                    {size} &times; {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Key Matrix Values</label>
                <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors duration-300
                  ${getDeterminant(matrixValues, matrixSize) === 0 ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                  Det: {getDeterminant(matrixValues, matrixSize)}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-center">
                <div className={`grid gap-3 w-full max-w-[240px]`} style={{ gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` }}>
                  {matrixValues.slice(0, matrixSize * matrixSize).map((val, i) => (
                    <input key={i} type="number" value={val} onChange={(e) => {
                      const newVals = [...matrixValues]; newVals[i] = parseInt(e.target.value) || 0; setMatrixValues(newVals);
                    }} 
                    className="w-full h-14 text-center bg-white border-2 border-slate-200 rounded-xl font-mono text-lg font-bold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-200 shadow-sm hover:border-slate-300" />
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Input Text</label>
              <textarea rows={3} value={plainText} onChange={(e) => setPlainText(e.target.value)}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10 font-mono resize-none transition-all duration-300 text-slate-700 placeholder-slate-400" 
                placeholder="Masukkan teks (contoh: RAHASIA)..." />
            </div>

            <div className="flex gap-4">
              <button onClick={() => processCrypto('ENCRYPT')} 
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black tracking-wider hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all duration-300 transform active:scale-95 flex flex-col items-center justify-center gap-1">
                <span>ENCRYPT</span>
                <span className="text-[10px] font-normal opacity-80 uppercase tracking-widest">Kunci Pesan</span>
              </button>
              <button onClick={() => processCrypto('DECRYPT')} 
                className="flex-1 bg-slate-800 text-emerald-400 py-4 rounded-2xl font-black tracking-wider hover:bg-slate-700 shadow-lg shadow-slate-900/20 transition-all duration-300 transform active:scale-95 flex flex-col items-center justify-center gap-1 border border-slate-700">
                <span>DECRYPT</span>
                <span className="text-[10px] font-normal opacity-60 uppercase tracking-widest text-slate-300">Buka Pesan</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 font-mono text-[10rem] font-black leading-none pointer-events-none select-none transition-opacity duration-1000 group-hover:opacity-10">
              {visualData ? (visualData.mode === 'ENCRYPT' ? '🔒' : '🔓') : '</>'}
            </div>

            <h2 className="text-2xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center gap-3">
              <span className="text-emerald-400 animate-pulse">_</span> Output Terminal
            </h2>
            
            {visualData ? (
              <div className="flex flex-col gap-6 flex-1 z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 shadow-inner">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Process Type</p>
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${visualData.mode === 'ENCRYPT' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}></span>
                    <p className="font-black text-white text-lg tracking-wide">{visualData.mode === 'ENCRYPT' ? 'ENCRYPTION (Locking Protocol)' : 'DECRYPTION (Unlocking Protocol)'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 transition-all hover:bg-slate-800/80">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex justify-between items-center">
                      Input Vector 
                      <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px]">RAW</span>
                    </p>
                    <div className="font-mono text-sm break-all text-slate-300 leading-relaxed">
                      [{visualData.inputVec.join(', ')}]
                    </div>
                  </div>
                  
                  <div className="bg-emerald-900/20 p-5 rounded-2xl border border-emerald-500/20 transition-all hover:bg-emerald-900/40">
                    <p className="text-xs font-bold text-emerald-500/70 uppercase tracking-widest mb-3 flex justify-between items-center">
                      Output Vector
                      <span className="bg-emerald-900 text-emerald-400 px-2 py-0.5 rounded text-[10px] border border-emerald-700/50">CALCULATED</span>
                    </p>
                    <div className="font-mono text-sm break-all text-emerald-400 leading-relaxed font-bold">
                      [{visualData.outVec.join(', ')}]
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Final Text Result</p>
                  <div className="font-mono text-3xl md:text-4xl font-black bg-black/50 text-emerald-400 p-6 rounded-2xl border border-slate-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] break-all relative group-hover:border-emerald-500/50 transition-colors duration-500 flex items-center">
                    <span className="opacity-50 mr-4 font-normal select-none">&gt;</span>
                    {visualData.text.replace(/ /g, '␣')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 min-h-[300px]">
                <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="font-mono text-sm uppercase tracking-widest">Menunggu Input Modul...</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}