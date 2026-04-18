CryptoMath Enigma: The Matrix Challenge

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

├── cryptomath_db.sql             File .sql untuk skema database dan soal CTF

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
    
Buka terminal atau cmd dan unduh proyek ini:

git clone https://github.com/fuzi11/projek-kalkulus.git

cd projek-kalkulus

3. Setup Database (MySQL)

Buka aplikasi XAMPP dan klik Start pada modul Apache dan MySQL.
   
Buka browser dan akses: http://localhost/phpmyadmin
   
Buat database baru dengan nama persis: cryptomath_db
   
Pilih database tersebut, masuk ke tab Import, lalu pilih dan unggah file cryptomath_db.sql yang ada di dalam folder proyek ini.
   
Klik Go / Import.

 4. Setup & Menyalakan Server (Backend)
    
Buka terminal baru di VS Code (Ctrl + ~), lalu jalankan perintah berurutan ini:

bash

cd server-enigma

Install library utama dan tipe data TypeScript (wajib agar tidak error merah)
    
npm install express cors mysql2 socket.io

npm install savedev typescript @types/express @types/cors @types/node tsx

Inisialisasi konfigurasi TypeScript
    
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

cd client-enigma

npm install

npm run dev -- --host

(Aplikasi web sudah siap dimainkan! Tahan tombol Ctrl lalu klik link http://localhost:5173 di terminal untuk membuka browser).

 ateri Pembelajaran Terkait
Aplikasi ini secara native mengimplementasikan teori dari mata kuliah Kalkulus Lanjut:
 Operasi Baris Elementer (OBE)
 Determinan Matriks (Metode Sarrus & Kofaktor)
 Adjoin & Invers Matriks Modulo 27
 Aritmatika Modulo (n \pmod{27})


