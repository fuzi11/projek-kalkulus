<<<<<<< HEAD
CREATE DATABASE IF NOT EXISTS cryptomath_db;
USE cryptomath_db;

CREATE TABLE users (
    npm VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    points INT DEFAULT 0
);

CREATE TABLE challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level INT NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    points INT NOT NULL
);

CREATE TABLE user_solved (
    npm VARCHAR(20),
    challenge_id INT,
    solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (npm, challenge_id),
    FOREIGN KEY (npm) REFERENCES users(npm) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

INSERT INTO users (npm, name) VALUES
('257006111066', 'Fazlee Khayru Aozora'),
('257006111109', 'Fauzi Firmansyah'),
('257006111085', 'Muhammad Alfarizi Hudmawan'),
('257006111092', 'Azizah Dwi Suryaningtyas'),
('257006111107', 'Diwanti Najma Tsaqib'),
('257006111065', 'Salwa Salsabila');

-- 5. Memasukkan 24 Level Tantangan Kriptografi (Modulo 27)
INSERT INTO challenges (level, title, description, question, answer, points) VALUES
(1, 'Inisiasi Vektor', 'Dalam Sandi Hill Modulo 27, teks diubah menjadi angka (A=0, B=1... Z=25, Spasi=26).', 'Ubah teks "FUZI" menjadi vektor angka (pisahkan dengan spasi)!', '5 20 25 8', 50),
(2, 'Determinan 2x2', 'Determinan matriks 2x2 [[a, b], [c, d]] adalah (a*d) - (b*c).', 'Hitung determinan dari matriks kunci: Baris 1 [5, 2], Baris 2 [3, 4].', '14', 100),
(3, 'Syarat Dekripsi Modulo 27', 'Matriks bisa digunakan untuk dekripsi HANYA jika determinannya BUKAN kelipatan 3.', 'Berdasarkan Level 2 (Det=14), apakah matriks tersebut bisa dibalik? (Jawab YA atau TIDAK)', 'YA', 150),
(4, 'Operasi Matriks 3x3 (Tutorial)', 'Gunakan K = [[1,2,1],[0,1,1],[1,1,2]]. Pesan = "HAC".', 'Hitung enkripsi C = P x K mod 27. Masukkan 3 angka hasilnya!', '9 16 11', 200),
(5, 'Aritmatika Modulo Dasar', 'Semua angka hasil perkalian matriks harus di-modulo 27.', 'Berapakah hasil dari 45 Modulo 27?', '18', 250),
(6, 'Modulo Angka Negatif', 'Cara menghitung modulo negatif: (-x mod 27) = 27 - (x mod 27).', 'Berapakah hasil dari -10 Modulo 27?', '17', 250),
(7, 'Pemetaan Vektor Spasi', 'Ingat, spasi juga dihitung sebagai karakter bernilai 26.', 'Ubah teks "A B" menjadi vektor 3 angka! (pisahkan spasi)', '0 26 1', 300),
(8, 'Determinan 2x2 Lanjutan', 'Matriks K = [[5, 3], [2, 4]].', 'Hitung determinan matriks tersebut dan pastikan hasilnya Modulo 27!', '14', 350),
(9, 'Mencari Invers Modulo', 'Invers modulo adalah angka yang jika dikalikan D lalu dimodulo 27 hasilnya 1.', 'Jika determinan = 2, berapakah invers modulonya?', '14', 400),
(10, 'Matriks Adjoin 2x2', 'Adjoin dari K=[[3, 2], [1, 4]] adalah [[4, -2], [-1, 3]].', 'Berapa elemen baris 1 kolom 2 (-2) setelah di-modulo 27?', '25', 450),
(11, 'Determinan 3x3 Dasar', 'Matriks Identitas 3x3 I = [[1,0,0], [0,1,0], [0,0,1]].', 'Berapakah determinan dari Matriks Identitas 3x3?', '1', 300),
(12, 'Perkalian Vektor x Matriks (2x2)', 'P = [1, 2]. K = [[2, 1], [3, 4]].', 'Hitung C = P x K. Masukkan 2 angka hasilnya (sudah dimodulo 27)!', '8 9', 450),
(13, 'Validasi Gembok (Syarat Invers)', 'Syarat matriks bisa dibalik modulo 27 adalah determinan TIDAK Boleh habis dibagi 3.', 'Apakah matriks dengan determinan 9 memiliki invers modulo 27? (Jawab YA atau TIDAK)', 'TIDAK', 400),
(14, 'Enkripsi 1 Blok (2 Karakter)', 'Pesan "HI" (H=7, I=8). Matriks K = [[3, 3], [2, 5]].', 'Lakukan enkripsi P x K modulo 27. Apa 2 angka hasilnya?', '10 8', 500),
(15, 'Membaca Sandi (2 Angka)', 'Melanjutkan level 14, ubah hasil angka "10 8" kembali menjadi huruf.', 'Apa huruf dari 10 dan 8? (Gabungkan tanpa spasi)', 'KI', 500),
(16, 'Dekripsi Blok', 'C = "KI" [10, 8]. Invers dari matriks Level 14 adalah K^-1 = [[15, 18], [12, 9]].', 'Kalikan vektor C dengan K^-1 modulo 27. Berapa 2 angka hasilnya?', '7 8', 600),
(17, 'Determinan 3x3 Kompleks', 'Matriks K = [[1, 2, 1], [0, 1, 1], [1, 1, 2]].', 'Berapakah determinan matriks tersebut?', '1', 600),
(18, 'Enkripsi 3 Karakter (Teks ke Vektor)', 'Ubah kata "BOS" menjadi vektor.', 'Sebutkan 3 angkanya! (Pisahkan spasi)', '1 14 18', 350),
(19, 'Enkripsi 3x3 (Tahap Perkalian)', 'Gunakan K = [[1, 2, 1], [0, 1, 1], [1, 1, 2]]. Pesan = [1, 14, 18].', 'Hitung C1 (elemen pertama vektor hasil PxK) mod 27!', '19', 650),
(20, 'Enkripsi 3x3 (Hasil Penuh)', 'Lanjutkan perkalian dari level 19.', 'Masukkan 3 angka lengkapnya hasil P x K mod 27!', '19 7 24', 700),
(21, 'Pesan Terselubung 3x3', 'Ubah hasil dari level 20 (19, 7, 24) menjadi huruf.', 'Apa kata sandi yang terbentuk?', 'THY', 700),
(22, 'Padding / Penambahan Karakter', 'Jika kamu mengenkripsi kata "HALO" dengan matriks 3x3, jumlah hurufnya kurang 2.', 'Berapa total huruf yang akan diproses sistem setelah menambah Spasi (padding)?', '6', 400),
(23, 'Hack The System: Determinan Genap', 'Di Modulo 27, bilangan genap memiliki aturan berbeda dibanding Modulo 26.', 'Apakah matriks dengan determinan bernilai 2 bisa dibalik dalam Modulo 27? (Jawab YA atau TIDAK)', 'YA', 800),
--(24, 'Final Boss: Decode The Message', 'Pesan angka: 17 4 3. Matriks K adalah matriks identitas 3x3.', 'Apa pesan aslinya dalam bentuk teks?', 'RED', 1000);
=======
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
(1, 'Inisiasi Vektor', 'Dalam Sandi Hill Modulo 27, teks diubah menjadi angka (A=0, B=1... Z=25, Spasi=26).', 'Ubah teks "FUZI" menjadi vektor angka (pisahkan dengan spasi)!', '5 20 25 8', 50),
(2, 'Determinan 2x2', 'Determinan matriks 2x2 [[a, b], [c, d]] adalah (a*d) - (b*c).', 'Hitung determinan dari matriks kunci: Baris 1 [5, 2], Baris 2 [3, 4].', '14', 100),
(3, 'Syarat Dekripsi Modulo 27', 'Matriks bisa digunakan untuk dekripsi HANYA jika determinannya BUKAN kelipatan 3.', 'Berdasarkan Level 2 (Det=14), apakah matriks tersebut bisa dibalik? (Jawab YA atau TIDAK)', 'YA', 150),
(4, 'Operasi Matriks 3x3 (Tutorial)', 'Gunakan K = [[1,2,1],[0,1,1],[1,1,2]]. Pesan = "HAC".', 'Hitung enkripsi C = P x K mod 27. Masukkan 3 angka hasilnya!', '9 16 11', 200),
(5, 'Aritmatika Modulo Dasar', 'Semua angka hasil perkalian matriks harus di-modulo 27.', 'Berapakah hasil dari 45 Modulo 27?', '18', 250),
(6, 'Modulo Angka Negatif', 'Cara menghitung modulo negatif: (-x mod 27) = 27 - (x mod 27).', 'Berapakah hasil dari -10 Modulo 27?', '17', 250),
(7, 'Pemetaan Vektor Spasi', 'Ingat, spasi juga dihitung sebagai karakter bernilai 26.', 'Ubah teks "A B" menjadi vektor 3 angka! (pisahkan spasi)', '0 26 1', 300),
(8, 'Determinan 2x2 Lanjutan', 'Matri K = [[5, 3], [2, 4]].', 'Hitung determinan matriks tersebut dan pastikan hasilnya Modulo 27!', '14', 350),
(9, 'Mencari Invers Modulo', 'Invers modulo adalah angka yang jika dikalikan D lalu dimodulo 27 hasilnya 1.', 'Jika determinan = 2, berapakah invers modulonya?', '14', 400),
(10, 'Matriks Adjoin 2x2', 'Adjoin dari K=[[3, 2], [1, 4]] adalah [[4, -2], [-1, 3]].', 'Berapa elemen baris 1 kolom 2 (-2) setelah di-modulo 27?', '25', 450),
(11, 'Determinan 3x3 Dasar', 'Matriks Identitas 3x3 I = [[1,0,0], [0,1,0], [0,0,1]].', 'Berapakah determinan dari Matriks Identitas 3x3?', '1', 300),
(12, 'Perkalian Vektor x Matriks (2x2)', 'P = [1, 2]. K = [[2, 1], [3, 4]].', 'Hitung C = P x K. Masukkan 2 angka hasilnya (sudah dimodulo 27)!', '8 9', 450),
(13, 'Validasi Gembok (Syarat Invers)', 'Syarat matriks bisa dibalik modulo 27 adalah determinan TIDAK Boleh habis dibagi 3.', 'Apakah matriks dengan determinan 9 memiliki invers modulo 27? (Jawab YA atau TIDAK)', 'TIDAK', 400),
(14, 'Enkripsi 1 Blok (2 Karakter)', 'Pesan "HI" (H=7, I=8). Matriks K = [[3, 3], [2, 5]].', 'Lakukan enkripsi P x K modulo 27. Apa 2 angka hasilnya?', '10 8', 500),
(15, 'Membaca Sandi (2 Angka)', 'Melanjutkan level 14, ubah hasil angka "10 8" kembali menjadi huruf.', 'Apa huruf dari 10 dan 8? (Gabungkan tanpa spasi)', 'KI', 500),
(16, 'Dekripsi Blok', 'C = "KI" [10, 8]. Invers dari matriks Level 14 adalah K^-1 = [[15, 18], [12, 9]].', 'Kalikan vektor C dengan K^-1 modulo 27. Berapa 2 angka hasilnya?', '7 8', 600),
(17, 'Determinan 3x3 Kompleks', 'Matriks K = [[1, 2, 1], [0, 1, 1], [1, 1, 2]].', 'Berapakah determinan matriks tersebut?', '1', 600),
(18, 'Enkripsi 3 Karakter (Teks ke Vektor)', 'Ubah kata "BOS" menjadi vektor.', 'Sebutkan 3 angkanya! (Pisahkan spasi)', '1 14 18', 350),
(19, 'Enkripsi 3x3 (Tahap Perkalian)', 'Gunakan K = [[1, 2, 1], [0, 1, 1], [1, 1, 2]]. Pesan = [1, 14, 18].', 'Hitung C1 (elemen pertama vektor hasil PxK) mod 27!', '19', 650),
(20, 'Enkripsi 3x3 (Hasil Penuh)', 'Lanjutkan perkalian dari level 19.', 'Masukkan 3 angka lengkapnya hasil P x K mod 27!', '19 7 24', 700),
(21, 'Pesan Terselubung 3x3', 'Ubah hasil dari level 20 (19, 7, 24) menjadi huruf.', 'Apa kata sandi yang terbentuk?', 'THY', 700),
(22, 'Padding / Penambahan Karakter', 'Jika kamu mengenkripsi kata "HALO" dengan matriks 3x3, jumlah hurufnya kurang 2.', 'Berapa total huruf yang akan diproses sistem setelah menambah Spasi (padding)?', '6', 400),
(23, 'Hack The System: Determinan Genap', 'Di Modulo 27, bilangan genap memiliki aturan berbeda dibanding Modulo 26.', 'Apakah matriks dengan determinan bernilai 2 bisa dibalik dalam Modulo 27? (Jawab YA atau TIDAK)', 'YA', 800),
(24, 'Final Boss: Decode The Message', 'Pesan angka: 17 4 3. Matriks K adalah matriks identitas 3x3.', 'Apa pesan aslinya dalam bentuk teks?', 'RED', 1000);
>>>>>>> 94ace3f45d923078e7d7494ddd88c2cb153a5193
