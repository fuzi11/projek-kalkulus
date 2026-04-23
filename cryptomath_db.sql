<<<<<<< HEAD
-- Membangun Database
CREATE DATABASE IF NOT EXISTS cryptomath_db;
USE cryptomath_db;

-- Menghapus tabel lama jika sudah ada (mencegah error saat import ulang/update)
DROP TABLE IF EXISTS user_solved;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS users;

-- 1. Membuat tabel agen/pengguna
CREATE TABLE users (
    npm VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    points INT DEFAULT 0
);

-- 2. Membuat tabel bank soal/tantangan
CREATE TABLE challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level INT NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    points INT NOT NULL
);

-- 3. Membuat tabel riwayat penyelesaian (mencegah eksploitasi poin ganda)
CREATE TABLE user_solved (
    npm VARCHAR(20),
    challenge_id INT,
    solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (npm, challenge_id),
    FOREIGN KEY (npm) REFERENCES users(npm) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

-- ==========================================================
-- SEEDING DATA (MEMASUKKAN DATA AWAL)
-- ==========================================================

-- 4. Memasukkan Data Tim (Silakan tambahkan anggota ke-7 jika belum ada di list ini)
INSERT INTO users (npm, name) VALUES
('257006111066', 'Fazlee Khayru Aozora'),
('257006111109', 'Fauzi Firmansyah'),
('257006111085', 'Muhammad Alfarizi Hudmawan'),
('257006111092', 'Azizah Dwi Suryaningtyas'),
('257006111107', 'Diwanti Najma Tsaqib'),
('257006111065', 'Salwa Salsabila');

-- 5. Memasukkan 24 Level Tantangan Kriptografi (Modulo 27)
    INSERT INTO challenges (level, title, description, question, answer, points) VALUES
(1, 'Vector Karakter (MOD 27)', 'Representasi teks ke dalam bentuk matriks angka.', 'Ubah teks "DATA SCIENCE" menjadi vektor angka dengan aturan: A=0, B=1, ..., Z=25, spasi=26!', '3 0 19 0 26 18 2 8 4 13 2 4', 10),

(2, 'Determinan Matriks', 'Kalkulasi nilai determinan orde 2x2.', 'Hitung determinan dari matriks: [[4, 7], [2, 5]]!', '6', 15),

(3, 'Enkripsi Matriks Kunci 2x2', 'Perkalian matriks kunci dengan vektor pesan (MOD 27).', 'Gunakan matriks kunci K = [[2, 3], [1, 4]]. Enkripsi vektor: [1, 2] (mod 27)!', '[8, 9]', 20),

(4, 'Enkripsi Hill Cipher 2x2', 'Enkripsi blok pesan teks ke teks sandi.', 'Gunakan kunci K = [[3, 2], [2, 5]]. Plaintext: HELLOWORLD. Tuliskan Ciphertext-nya!', 'CH BX FD WF MK', 25),

(5, 'Dekripsi Hill Cipher 2x2', 'Pengembalian teks sandi ke pesan asli (MOD 27).', 'Diketahui ciphertext: LWLPJJTR. Gunakan kunci K = [[3, 2], [2, 5]]. Cari plaintext!', 'BERHASIL', 35),

(6, 'Hill Cipher + Deret Tak Hingga', 'Kombinasi deret geometri dengan matriks kriptografi.', 'Diketahui K = [[a, b], [c, d]]. a = deret (a=2, r=1/2), b = deret (a=3, r=1/3), c = deret (a=4, r=1/2), d = deret (a=5, r=1/5). Enkripsi vektor [1,2] (mod 27)!', '[14, 20]', 40),

(7, 'Enkripsi Hill Cipher 3x3', 'Enkripsi pesan dengan matriks tingkat lanjut.', 'Gunakan K = [[2, 2, 1], [1, 2, 1], [1, 1, 2]]. Plaintext: CAT. Tulis huruf hasil enkripsinya!', 'X V N', 45),

(8, 'Dekripsi Hill Cipher 3x3 + Deret', 'Dekripsi tingkat tinggi dengan pemecahan matriks deret.', 'K = [[a, 1, 1], [1, b, 1], [1, 1, c]]. a = deret(2, 1/2), b = deret(3, 1/3), c = deret(4, 1/2). Ciphertext: ZVN (mod 27). Cari plaintext!', 'COD', 50),

(9, 'Validasi Matriks Hill Cipher', 'Verifikasi eksistensi invers matriks (MOD 27).', 'Apakah matriks K = [[1, 2], [3, 5]] valid untuk Hill Cipher (mod 27)? (Ketik: VALID / TIDAK VALID)', 'VALID', 25),

(10, 'Invers Matriks Modulo 27', 'Kalkulasi matriks kunci balikan.', 'Tentukan invers dari matriks K = [[3, 2], [2, 5]] (mod 27)!', '[[25, 17], [17, 15]]', 30),

(11, 'Dekripsi Vektor 2x2', 'Translasi matriks invers dengan vektor angka.', 'Gunakan Invers K = [[25, 17], [17, 15]]. Dekripsi ciphertext [9, 3] dan ubah ke huruf!', 'G J', 30),

(12, 'Protokol Dekripsi Final', 'Pengembalian blok ciphertext ke plaintext pesan utama.', 'Gunakan Invers K = [[25, 17], [17, 15]]. Dekripsi ciphertext berikut (mod 27) lalu ubah ke huruf: [2, 7] [9, 3] [3, 7] [20, 1]!', 'HE GJ FV EE', 60);
>>>>>>> 94ace3f45d923078e7d7494ddd88c2cb153a5193
