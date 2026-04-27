Cara set up CryptoMath Enigma

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
    
Buka terminal baru (disarankan cmd)

bash/cmd

cd server-enigma

Install library utama dan tipe data TypeScript (wajib agar tidak error merah)

npm install
    
npm install express cors mysql2 socket.io

npm install --save-dev typescript @types/express @types/cors @types/node tsx

Nyalakan Server:

npx tsx server.ts


 5. Setup & Menyalakan Antarmuka (Frontend)
    
Buka terminal BARU lagi (biarkan terminal backend tetap menyala), lalu jalankan:

bash/cmd

cd client-enigma

npm install react-router-dom
 
npm install

npm run dev -- --host

(Aplikasi web sudah siap dimainkan! Tahan tombol Ctrl lalu klik link http://localhost:5173 di terminal untuk membuka browser).


