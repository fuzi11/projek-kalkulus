import React from 'react';
import Header from '../components/Header';

export default function Panduan() {
  return (
    <div className="min-h-screen bg-[#1D123A] flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-12 px-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        
        <div className="max-w-4xl mx-auto bg-[#f8f8fb] p-10 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] border border-slate-200">

          {/* Title */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-3 text-[#1a1333]">
              Panduan Agen Enigma
            </h2>
            <p className="text-slate-500 text-lg">
              Pelajari dasar matematika kriptografi ini untuk menyelesaikan Tantangan CTF.
            </p>
          </div>

          <div className="space-y-12">

            {/* ================= SECTION 1 ================= */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#2a1f5c] text-white w-10 h-10 flex justify-center items-center rounded-full font-semibold">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-[#1a1333]">
                  Sistem Modulo 27 & Vektor Karakter
                </h3>
              </div>

              <div className="pl-12 space-y-5">
                <p className="text-slate-600 leading-relaxed">
                  Komputer tidak mengerti huruf, ia hanya mengerti angka. Dalam sistem ini, kita menggunakan 26 abjad bahasa Inggris ditambah satu spasi. Karena ada 27 karakter, kita menggunakan operasi hitung{" "}
                  <strong className="text-[#2a1f5c]">Modulo 27</strong>.
                </p>

                {/* Mapping Box */}
                <div className="relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-purple-400 blur-xl opacity-30 rounded-full"></div>

                  <div className="relative bg-white border border-[#d6d3f0] rounded-xl p-5 text-sm font-mono">
                    <p className="mb-2">
                      A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11, M=12, N=13
                    </p>
                    <p>
                      O=14, P=15, Q=16, R=17, S=18, T=19, U=20, V=21, W=22, X=23, Y=24, Z=25, [Spasi]=26
                    </p>
                  </div>
                </div>

                {/* Tip Box */}
                <div className="bg-[#ede9fe] border border-[#c4b5fd] rounded-xl p-5 flex items-start gap-3 text-[#3b2f7f]">

                  {/* Doodle Lamp */}
                  <svg
                    className="w-6 h-6 text-[#7c6ee6] mt-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"/>
                    <path d="M9 18h6"/>
                    <path d="M10 22h4"/>
                    <line x1="12" y1="0" x2="12" y2="-1"/>
                    <line x1="4.5" y1="3.5" x2="3.5" y2="2.5"/>
                    <line x1="19.5" y1="3.5" x2="20.5" y2="2.5"/>
                    <line x1="2" y1="11" x2="1" y2="11"/>
                    <line x1="23" y1="11" x2="22" y2="11"/>
                  </svg>

                  <p>
                    <strong>Aturan Emas Modulo Angka Negatif:</strong> Jika hasil hitunganmu minus
                    (contoh: -10), ubah ke Modulo 27 dengan cara{" "}
                    <code className="bg-[#DDD9EA] text-[#2a1f5c] px-2 py-1 rounded font-mono text-sm">
                      -10 + 27 = 17
                    </code>.
                  </p>
                </div>
              </div>
            </section>

            {/* ================= SECTION 2 ================= */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#2a1f5c] text-white w-10 h-10 flex justify-center items-center rounded-full font-semibold">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-[#1a1333]">
                  Enkripsi (Matriks × Vektor)
                </h3>
              </div>

              <div className="pl-12">
                <p className="text-slate-600 mb-5 leading-relaxed">
                  Enkripsi Hill Cipher dilakukan dengan mengalikan Vektor Pesan Asli (P) dengan Matriks Kunci (K).
                  Rumus dasarnya adalah{" "}
                  <code className="bg-[#DDD9EA] px-2 py-1 rounded text-[#2a1f5c] font-semibold">
                    C = P × K mod 27
                  </code>.
                </p>

                <div className="border border-[#e0dcf5] rounded-2xl p-6 bg-white shadow-sm">
                  <h4 className="font-semibold text-[#1a1333] mb-4 border-b pb-2">
                    Contoh Matriks 2x2
                  </h4>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#f3f0ff] p-3 rounded-xl">
                      <span className="text-xs text-slate-400 block mb-1">Pesan</span>
                      <span className="font-mono font-semibold">"HI" → P = [7, 8]</span>
                    </div>
                    <div className="bg-[#f3f0ff] p-3 rounded-xl">
                      <span className="text-xs text-slate-400 block mb-1">Kunci</span>
                      <span className="font-mono font-semibold">K = [[3, 3], [2, 5]]</span>
                    </div>
                  </div>

                  <ul className="text-sm font-mono text-[#3b2f7f] space-y-2 bg-[#ede9fe] border border-[#c4b5fd] p-4 rounded-xl">
                    <li>▶ C₁ = (7×3) + (8×2) = 37</li>
                    <li>
                      ↳ C₁ mod 27 ={" "}
                      <span className="bg-[#DDD9EA] text-[#2a1f5c] px-2 py-0.5 rounded font-semibold">
                        10 (K)
                      </span>
                    </li>
                    <li>▶ C₂ = (7×3) + (8×5) = 61</li>
                    <li>
                      ↳ C₂ mod 27 ={" "}
                      <span className="bg-[#DDD9EA] text-[#2a1f5c] px-2 py-0.5 rounded font-semibold">
                        7 (H)
                      </span>
                    </li>
                  </ul>

                </div>
              </div>
            </section>
            {/* ================= SECTION 3 ================= */}
<section>
  <div className="flex items-center gap-4 mb-4">
    <div className="bg-[#2a1f5c] text-white w-10 h-10 flex justify-center items-center rounded-full font-semibold">
      3
    </div>
    <h3 className="text-2xl font-semibold text-[#1a1333]">
      Dekripsi Hill Cipher
    </h3>
  </div>

  <div className="pl-12 space-y-5">
    <p className="text-slate-600 leading-relaxed">
      Dekripsi hill chipher digunakan untuk mengembalikan ciphertext menjadi plaintext semula.
      Proses ini menggunakan invers dari matriks kunci.
    </p>

    {/* Rumus */}
    <div className="bg-[#ede9fe] border border-[#c4b5fd] rounded-xl p-5 text-[#3b2f7f] font-mono text-sm">
      <p className="mb-2">
        <strong>Rumus:</strong>
      </p>
      <p className="bg-[#DDD9EA] text-[#2a1f5c] px-3 py-2 rounded inline-block font-semibold">
        P = K⁻¹ × C (mod 26)
      </p>
    </div>

    {/* Keterangan */}
    <div className="bg-white border border-[#e0dcf5] rounded-xl p-5 text-sm text-slate-700 space-y-2">
      <p><strong>P</strong> = plaintext (hasil dekripsi)</p>
      <p><strong>C</strong> = ciphertext</p>
      <p><strong>K⁻¹</strong> = invers matriks kunci</p>
      <p><strong>mod 26</strong> = jumlah huruf alfabet (A=0 sampai Z=25)</p>
    </div>

    {/* Langkah */}
    <div className="bg-[#ede9fe] border border-[#c4b5fd] rounded-xl p-5">
      <h4 className="font-semibold text-[#1a1333] mb-3">
        Langkah-langkah:
      </h4>

      <ol className="list-decimal pl-5 space-y-2 text-[#3b2f7f] text-sm leading-relaxed">
        <li>Ubah ciphertext menjadi angka (A=0, B=1, ..., Z=25)</li>
        <li>Kelompokkan sesuai ukuran matriks (misal 2x2 → 2 huruf)</li>
        <li>
          Hitung invers matriks kunci (K⁻¹):
          <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
            <li>Cari determinan</li>
            <li>Cari invers determinan (mod 26)</li>
            <li>Hitung adjoint matriks</li>
          </ul>
        </li>
        <li>Kalikan K⁻¹ dengan vektor ciphertext</li>
        <li>Ambil hasil mod 26</li>
        <li>Ubah angka kembali menjadi huruf → plaintext</li>
      </ol>
    </div>

  </div>
</section>

          </div>
        </div>
      </main>
    </div>
  );
}