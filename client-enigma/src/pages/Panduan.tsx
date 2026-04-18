import React from 'react';
import Header from '../components/Header';

export default function Panduan() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-1 pt-10 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
          <div className="mb-10">
            <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tight">Panduan Agen Enigma</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mb-4"></div>
            <p className="text-slate-500 text-lg">Pelajari dasar matematika kriptografi ini untuk menyelesaikan Tantangan CTF.</p>
          </div>

          <div className="space-y-12">
            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-900 text-emerald-400 w-12 h-12 flex justify-center items-center rounded-2xl font-black text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">1</div>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">Sistem Modulo 27 & Vektor Karakter</h3>
              </div>
              <div className="pl-16">
                <p className="text-slate-600 mb-5 leading-relaxed text-lg">
                  Komputer tidak mengerti huruf, ia hanya mengerti angka. Dalam sistem ini, kita menggunakan 26 abjad bahasa Inggris ditambah satu spasi. Karena ada 27 karakter, kita menggunakan operasi hitung <strong className="text-emerald-600">Modulo 27</strong> (Sisa hasil bagi dari 27).
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 font-mono text-sm overflow-x-auto shadow-inner hover:bg-slate-100 transition-colors">
                  <p className="text-emerald-700 font-bold mb-2">A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11, M=12, N=13</p>
                  <p className="text-emerald-700 font-bold">O=14, P=15, Q=16, R=17, S=18, T=19, U=20, V=21, W=22, X=23, Y=24, Z=25, [Spasi]=26</p>
                </div>
                <div className="mt-5 text-sm bg-blue-50/80 border border-blue-100 text-blue-800 p-4 rounded-2xl flex gap-3 items-start">
                  <span className="text-blue-500 text-xl">💡</span>
                  <p><strong>Aturan Emas Modulo Angka Negatif:</strong> Jika hasil hitunganmu minus (contoh: -10), cara mengubahnya ke Modulo 27 adalah: <code className="bg-white/60 px-2 py-0.5 rounded font-mono font-bold shadow-sm">-10 + 27 = 17</code>.</p>
                </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-900 text-emerald-400 w-12 h-12 flex justify-center items-center rounded-2xl font-black text-2xl shadow-lg transform group-hover:-rotate-12 transition-transform duration-300">2</div>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">Enkripsi (Matriks &times; Vektor)</h3>
              </div>
              <div className="pl-16">
                <p className="text-slate-600 mb-5 leading-relaxed text-lg">
                  Enkripsi Hill Cipher dilakukan dengan mengalikan Vektor Pesan Asli (P) dengan Matriks Kunci (K). Rumus dasarnya adalah <code className="bg-slate-100 px-2 py-1 rounded-lg text-emerald-600 font-bold">C = P &times; K mod 27</code>.
                </p>
                <div className="border-2 border-slate-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-800 mb-4 text-lg border-b pb-2">Contoh Matriks 2x2</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1 font-bold uppercase">Pesan</span>
                      <span className="font-mono font-bold text-slate-700">"HI" &rarr; P = [7, 8]</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1 font-bold uppercase">Kunci</span>
                      <span className="font-mono font-bold text-slate-700">K = [[3, 3], [2, 5]]</span>
                    </div>
                  </div>
                  <ul className="text-sm font-mono text-slate-600 space-y-2 bg-slate-900 p-4 rounded-xl shadow-inner">
                    <li className="flex items-center gap-2"><span className="text-emerald-400">▶</span> C₁ = (7&times;3) + (8&times;2) = 21 + 16 = 37</li>
                    <li className="flex items-center gap-2 pb-2 border-b border-slate-700"><span className="text-cyan-400">↳</span> C₁ Mod 27 &rarr; 37 mod 27 = <strong className="text-white bg-emerald-600/30 px-2 py-0.5 rounded">10 (K)</strong></li>
                    <li className="flex items-center gap-2 pt-2"><span className="text-emerald-400">▶</span> C₂ = (7&times;3) + (8&times;5) = 21 + 40 = 61</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">↳</span> C₂ Mod 27 &rarr; 61 mod 27 = <strong className="text-white bg-emerald-600/30 px-2 py-0.5 rounded">7 (H)</strong></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}