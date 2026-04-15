CryptoMath Enigma: The Matrix Challenge

![Technology](https://img.shields.io/badge/TechMERN_Stackemerald)
![Course](https://img.shields.io/badge/CourseKalkulus_Lanjutblue)
![Status](https://img.shields.io/badge/StatusDevelopmentorange)

CryptoMath Enigma adalah aplikasi Capture The Flag (CTF) berbasis web yang menggabungkan konsep Kriptografi Klasik (Hill Cipher) dengan materi Kalkulus Lanjut & Aljabar Linear. Proyek ini dikembangkan oleh mahasiswa Informatika Universitas Siliwangi angkatan 2025 sebagai tugas besar mata kuliah Kalkulus Lanjut.
 Fitur Utama
 24 Level Tantangan: Dari pengenalan vektor dasar hingga dekripsi matriks 3x3 yang kompleks.
 RealTime Leaderboard: Papan peringkat yang diperbarui secara instan menggunakan Socket.io saat pemain berhasil menjawab soal.
 Laboratory Visualizer: Alat bantu interaktif untuk menghitung perkalian matriks, determinan, dan invers dalam Modulo 27.
 Level Locking System: Pemain tidak dapat mengakses level tinggi sebelum menyelesaikan level dasar.
 Smart Validator: Sistem cerdas yang memvalidasi jawaban meskipun terdapat perbedaan spasi atau kapitalisasi.



Struktur Folder (Monorepo)

text
cryptomathenigma/
├── database/             File .sql untuk skema database dan soal CTF
├── serverenigma/        Backend Node.js (API & WebSocket)
└── clientenigma/        Frontend React (UI & Logic)




 Panduan Instalasi & Eksekusi Lokal (Wajib Dibaca Tim)

Bagi anggota tim yang baru melakukan clone repositori ini, silakan ikuti langkahlangkah berikut agar aplikasi bisa berjalan tanpa error di laptop masingmasing:

 1. Prasyarat Sistem
Pastikan laptop Anda sudah terinstal:
 Node.js (Versi LTS)
 Git
 XAMPP (Untuk menjalankan server MySQL lokal)

 2. Kloning Repositori
Buka terminal dan unduh proyek ini:
bash
git clone https://github.com/fuzi11/projek-kalkulus.git
cd cryptomathenigma
 3. Setup Database (MySQL)
1. Buka aplikasi XAMPP dan klik Start pada modul Apache dan MySQL.
2. Buka browser dan akses: http://localhost/phpmyadmin
3. Buat database baru dengan nama persis: cryptomath_db
4. Pilih database tersebut, masuk ke tab Import, lalu pilih dan unggah file database/cryptomath_db.sql yang ada di dalam folder proyek ini.
5. Klik Go / Import.

 4. Setup & Menyalakan Server (Backend)
Buka terminal baru di VS Code (Ctrl + ~), lalu jalankan perintah berurutan ini:
bash
cd serverenigma

 1. Install library utama dan tipe data TypeScript (wajib agar tidak error merah)
npm install express cors mysql2 socket.io
npm install savedev typescript @types/express @types/cors @types/node tsx

 2. Inisialisasi konfigurasi TypeScript
npx tsc init


Konfigurasi Shortcut:
Buka file serverenigma/package.json dan tambahkan script ini agar server otomatis merestart saat kode diubah:
json
"scripts": {
  "dev": "tsx watch server.ts"
}


Nyalakan Server:
bash
npx tsx server.ts

(Jika berhasil, akan muncul tulisan Engine Enigma Aktif di Port 3001 di terminal).

 5. Setup & Menyalakan Antarmuka (Frontend)
Buka terminal BARU lagi (biarkan terminal backend tetap menyala), lalu jalankan:
bash
cd clientenigma
npm install
npm run dev

(Aplikasi web sudah siap dimainkan! Tahan tombol Ctrl lalu klik link http://localhost:5173 di terminal untuk membuka browser).

 ateri Pembelajaran Terkait
Aplikasi ini secara native mengimplementasikan teori dari mata kuliah Kalkulus Lanjut:
 Operasi Baris Elementer (OBE)
 Determinan Matriks (Metode Sarrus & Kofaktor)
 Adjoin & Invers Matriks Modulo 27
 Aritmatika Modulo (n \pmod{27})


