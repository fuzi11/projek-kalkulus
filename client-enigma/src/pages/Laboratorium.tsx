import React, { useState } from 'react';
import Header from '../components/Header';

// --- MESIN KRIPTOGRAFI MODULO 27 ---
const CHAR_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const MOD = 27;

// Fungsi Modulo aman untuk angka negatif (karena JS % bisa error di angka negatif)
const modulo = (n: number, m: number = MOD) => ((n % m) + m) % m;

// Cari Invers Modulo (Angka yang jika dikali 'a' sisa baginya 1 terhadap 'm')
const getModInverse = (a: number, m: number = MOD) => {
  const aMod = modulo(a, m);
  for (let x = 1; x < m; x++) {
    if (modulo(aMod * x, m) === 1) return x;
  }
  return null; // Tidak punya invers (tidak valid)
};

// Hitung Determinan
const getDeterminant = (matrix: number[], size: number) => {
  if (size === 2) {
    return modulo(matrix[0] * matrix[3] - matrix[1] * matrix[2]);
  }
  if (size === 3) {
    return modulo(
      matrix[0] * (matrix[4] * matrix[8] - matrix[5] * matrix[7]) -
      matrix[1] * (matrix[3] * matrix[8] - matrix[5] * matrix[6]) +
      matrix[2] * (matrix[3] * matrix[7] - matrix[4] * matrix[6])
    );
  }
  return 0;
};

// Hitung Matriks Balikan (Invers Matriks)
const getInverseMatrix = (matrix: number[], size: number, detInverse: number) => {
  const inv = new Array(size * size).fill(0);
  if (size === 2) {
    inv[0] = modulo( matrix[3] * detInverse);
    inv[1] = modulo(-matrix[1] * detInverse);
    inv[2] = modulo(-matrix[2] * detInverse);
    inv[3] = modulo( matrix[0] * detInverse);
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
  const [matrixSize, setMatrixSize] = useState<2 | 3>(2);
  const [matrixValues, setMatrixValues] = useState<number[]>([2, 3, 1, 4, 0, 0, 0, 0, 0]); // Default 2x2 yang valid
  const [plainText, setPlainText] = useState('');
  const [visualData, setVisualData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Update ukuran matriks dan berikan nilai awal yang valid (punya invers)
  const handleSizeChange = (size: 2 | 3) => {
    setMatrixSize(size);
    setVisualData(null);
    setErrorMsg('');
    if (size === 2) {
      setMatrixValues([2, 3, 1, 4, 0, 0, 0, 0, 0]); // Det = 5, mod 27 valid
    } else {
      setMatrixValues([1, 2, 1, 0, 1, 1, 1, 1, 2, 0]); // Det = 1, mod 27 valid
    }
  };

  const processCrypto = (mode: 'ENCRYPT' | 'DECRYPT') => {
    setErrorMsg('');
    if (!plainText.trim() && mode === 'ENCRYPT') {
      setErrorMsg('Masukkan teks pesan terlebih dahulu.');
      return;
    }

    const currentDet = getDeterminant(matrixValues, matrixSize);
    const detInv = getModInverse(currentDet);

    // Validasi Mutlak Hill Cipher
    if (detInv === null) {
      setErrorMsg(`GAGAL: Determinan matriks ini adalah ${currentDet}. Angka ini tidak memiliki invers dalam Modulo ${MOD} (Kunci Tidak Valid).`);
      return;
    }

    // Bersihkan teks: Hanya ambil A-Z dan Spasi, ubah ke uppercase
    let textToProcess = plainText.toUpperCase().replace(/[^A-Z ]/g, '');
    
    // Ubah huruf ke angka (0-26)
    let numbers: number[] = [];
    for (const char of textToProcess) {
      numbers.push(CHAR_MAP.indexOf(char));
    }

    // Padding (Tambahkan spasi di akhir jika panjang pesan tidak pas dengan ukuran matriks)
    while (numbers.length % matrixSize !== 0) {
      numbers.push(26); // 26 = Spasi
    }

    let processMatrix = matrixValues;
    
    if (mode === 'DECRYPT') {
      processMatrix = getInverseMatrix(matrixValues, matrixSize, detInv);
    }

    const outputNumbers: number[] = [];
    let outputString = "";
    
    // Perkalian Matriks (Proses Blok demi Blok)
    for (let i = 0; i < numbers.length; i += matrixSize) {
      const block = numbers.slice(i, i + matrixSize);
      for (let row = 0; row < matrixSize; row++) {
        let sum = 0;
        for (let col = 0; col < matrixSize; col++) {
          // Perkalian baris matriks dengan kolom pesan
          sum += processMatrix[row * matrixSize + col] * block[col];
        }
        const valMod = modulo(sum);
        outputNumbers.push(valMod);
        outputString += CHAR_MAP[valMod];
      }
    }

    setVisualData({ 
      mode, 
      inputVec: numbers, 
      outVec: outputNumbers, 
      text: outputString,
      det: currentDet
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-1 pt-10 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Kalkulator Kriptografi</h1>
          <p className="text-slate-500 mt-2">Mode: Hill Cipher Modulo 27 (A=0 ... Z=25, Spasi=26)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PANEL KONTROL (KIRI) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span>🎛️</span> Parameter Mesin
            </h2>
            
            {/* Pemilih Ukuran Matriks */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Ukuran Matriks Kunci</label>
              <div className="flex gap-3">
                {[2, 3].map(size => (
                  <button key={size} onClick={() => handleSizeChange(size as 2|3)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 border-2 
                    ${matrixSize === size ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    {size} &times; {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Matriks */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nilai Matriks Kunci (K)</label>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${getModInverse(getDeterminant(matrixValues, matrixSize)) === null ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  Det: {getDeterminant(matrixValues, matrixSize)}
                </span>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-center">
                <div className="grid gap-3 w-full max-w-[240px]" style={{ gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` }}>
                  {matrixValues.slice(0, matrixSize * matrixSize).map((val, i) => (
                    <input key={i} type="number" value={val} 
                      onChange={(e) => { 
                        const newVals = [...matrixValues]; 
                        newVals[i] = parseInt(e.target.value) || 0; 
                        setMatrixValues(newVals); 
                      }} 
                      className="w-full h-14 text-center bg-white border-2 border-slate-200 rounded-xl font-mono text-lg font-bold outline-none focus:border-emerald-400 transition-all" 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Input Teks */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Teks Pesan</label>
              <textarea rows={3} value={plainText} onChange={(e) => setPlainText(e.target.value)}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-emerald-400 focus:bg-white font-mono uppercase transition-all" 
                placeholder="MASUKKAN TEKS RAHASIA..." />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-sm font-bold flex items-center gap-3">
                <span>⚠️</span> {errorMsg}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button onClick={() => processCrypto('ENCRYPT')} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black tracking-wider hover:bg-slate-800 transition-all active:scale-95 shadow-lg">
                ENKRIPSI
              </button>
              <button onClick={() => processCrypto('DECRYPT')} className="flex-1 bg-emerald-100 text-emerald-800 border-2 border-emerald-200 py-4 rounded-2xl font-black tracking-wider hover:bg-emerald-200 transition-all active:scale-95">
                DEKRIPSI
              </button>
            </div>
          </div>

          {/* TERMINAL VISUALISASI (KANAN) */}
          <div className="lg:col-span-7 bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col relative overflow-hidden group">
            <h2 className="text-2xl font-black mb-8 text-emerald-400 flex items-center gap-3">
              <span className="animate-pulse">_</span> Output Terminal
            </h2>
            
            {visualData ? (
              <div className="flex flex-col gap-6 flex-1 z-10 animate-in fade-in duration-500">
                
                {/* Header Status */}
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Operasi</p>
                    <p className={`font-black text-lg ${visualData.mode === 'ENCRYPT' ? 'text-cyan-400' : 'text-rose-400'}`}>
                      {visualData.mode === 'ENCRYPT' ? 'ENKRIPSI (Pesan -> Sandi)' : 'DEKRIPSI (Sandi -> Pesan)'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Validasi Determinan</p>
                    <p className="font-mono text-emerald-400 font-bold">{visualData.det} (Valid Mod 27)</p>
                  </div>
                </div>

                {/* Vektor Konversi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">1. Vektor Input (Angka)</p>
                    <div className="font-mono text-sm break-all text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                      [{visualData.inputVec.join(', ')}]
                    </div>
                  </div>
                  <div className="bg-emerald-900/20 p-5 rounded-2xl border border-emerald-500/20">
                    <p className="text-xs font-bold text-emerald-500 uppercase mb-2">2. Vektor Output (Mod 27)</p>
                    <div className="font-mono text-sm break-all text-emerald-400 bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50 font-bold">
                      [{visualData.outVec.join(', ')}]
                    </div>
                  </div>
                </div>

                {/* Hasil Akhir */}
                <div className="mt-auto pt-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">3. Hasil Terjemahan Teks</p>
                  <div className="font-mono text-3xl font-black bg-black/50 text-emerald-400 p-6 rounded-2xl border border-slate-700 break-all flex items-center">
                    <span className="opacity-50 mr-4 font-normal select-none">&gt;</span>
                    {visualData.text}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 min-h-[300px]">
                <span className="text-5xl mb-4 opacity-50">📟</span>
                <span className="font-mono text-sm uppercase tracking-widest">Menunggu Input Parameter...</span>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}