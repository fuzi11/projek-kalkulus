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


INSERT INTO users (npm, name) VALUES
('257006111066', 'Fazlee Khayru Aozora'),
('257006111109', 'Fauzi Firmansyah'),
('257006111085', 'Muhammad Alfarizi Hudmawan'),
('257006111092', 'Azizah Dwi Suryaningtyas'),
('257006111107', 'Diwanti Najma Tsaqib'),
('257006111065', 'Salwa Salsabila');


   TRUNCATE TABLE challenges;

INSERT INTO challenges (level, title, description, question, answer, points) VALUES

(1, 'Vector Karakter (MOD 27)',
'Konversi teks ke angka',
'Ubah "DATA SCIENCE" ke vektor angka. Format jawaban: angka dipisah spasi (contoh: 1 2 3)',
'3 0 19 0 26 18 2 8 4 13 2 4',
10),

(2, 'Determinan Matriks',
'Hitung determinan',
'K=[[5,2],[3,7]]. Format jawaban: det=..., mod27=..., invertible/tidak (contoh: det=10, mod27=10, invertible)',
'det=29, mod27=2, invertible',
15),

(3, 'Enkripsi 2x2',
'Hill Cipher dasar',
'K=[[3,3],[2,5]], plaintext HI. Format jawaban: huruf kapital tanpa spasi (contoh: AB)',
'TC',
20),

(4, 'Enkripsi HELLOWORLD',
'Enkripsi blok',
'K=[[7,8],[11,11]], plaintext HELLOWORLD. Format: huruf kapital tanpa spasi',
'ZEBBWGABEX',
25),

(5, 'Dekripsi 2x2',
'Dekripsi',
'K=[[3,3],[2,5]], ciphertext ZEBB. Format: huruf kapital tanpa spasi',
'HELP',
30),

(6, 'Cari Matriks Kunci',
'Sistem persamaan',
'HI → XP. Format jawaban: a b c d (contoh: 1 2 3 4)',
'23 23 15 20',
40),

(7, 'Enkripsi 3x3',
'Hill Cipher lanjut',
'K=[[2,4,5],[9,2,1],[3,17,7]], plaintext CATDOG. Format: huruf kapital tanpa spasi',
'FINVYB',
45),

(8, 'Dekripsi + Cari Matriks 3x3',
'Key finding',
'ACT → POH, dekripsi POHPOH. Format: huruf kapital tanpa spasi',
'ACTACT',
50),

(9, 'Enkripsi Berlapis',
'Double cipher',
'K1 dan K2 diberikan. Format jawaban: huruf kapital tanpa spasi',
'HASILVALID',
50),

(10, 'Dekripsi Berlapis',
'Double dekripsi',
'Dekripsi hasil soal 9. Format: huruf kapital tanpa spasi',
'DATA',
50),

(11, 'Matriks Tidak Invertible',
'Analisis',
'Perbaiki K. Format jawaban: a b c d',
'7 9 3 12',
35),

(12, 'Known Plaintext Attack',
'Cari kunci',
'HE → XM. Format jawaban: a b c d',
'7 8 11 11',
45),

(13, 'Multi Blok + Padding',
'Enkripsi panjang',
'CRYPTOGRAPHY. Format: huruf kapital tanpa spasi',
'CIPHERTEXTVALID',
55),

(14, 'Determinan 3x3',
'Analisis matriks',
'Tentukan apakah invertible. Format: invertible / tidak',
'invertible',
40),

(15, 'Enkripsi 3x3 + Noise',
'Tambahan noise',
'SECURITY. Format: huruf kapital tanpa spasi',
'CIPHERTEXTNOISE',
60),

(16, 'Dekripsi Noise',
'Noise removal',
'Dekripsi hasil soal 15. Format: huruf kapital tanpa spasi',
'SECURITY',
60),

(17, 'Sistem Persamaan',
'Constraint',
'HI → AB. Format jawaban: tulis "banyak solusi"',
'banyak solusi',
65),

(18, 'Hill Cipher + Permutasi',
'Enkripsi + shuffle',
'DATA. Format: huruf kapital tanpa spasi',
'CIPHERTEXTPERM',
50),

(19, 'Reverse Permutasi',
'Dekripsi',
'Balikkan soal 18. Format: huruf kapital tanpa spasi',
'DATA',
50),

(20, 'Kombinasi 2x2 dan 3x3',
'Hybrid',
'HELLOCRYPTO. Format: huruf kapital tanpa spasi',
'CIPHERTEXTKOMBINASI',
70);
   >>>>>>> 94ace3f45d923078e7d7494ddd88c2cb153a5193
