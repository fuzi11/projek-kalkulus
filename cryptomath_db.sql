-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2026 at 04:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cryptomath_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `level`, `title`, `description`, `question`, `answer`, `points`) VALUES
(16, 1, 'Vector Karakter (MOD 27)', 'Konversi teks ke angka', 'Ubah \"DATA SCIENCE\" ke vektor angka. Format jawaban: angka dipisah spasi (contoh: 1 2 3)', '3 0 19 0 26 18 2 8 4 13 2 4', 10),
(17, 2, 'Determinan Matriks', 'Hitung determinan', 'K=[[5,2],[3,7]]. Format jawaban: det=..., mod27=..., invertible/tidak (contoh: det=10, mod27=10, invertible)', 'det=29, mod27=2, invertible', 15),
(18, 3, 'Enkripsi 2x2', 'Hill Cipher dasar', 'K=[[3,2],[2,5]], plaintext HI. Format jawaban: huruf kapital tanpa spasi (contoh: AB)', 'KA', 20),
(19, 4, 'Enkripsi HELLOWORLD', 'Enkripsi blok', 'K=[[7,8],[11,11]], plaintext HELLOWORLD. Format: huruf kapital tanpa spasi', 'AND ESSRUT', 25),
(20, 5, 'Dekripsi 2x2', 'Dekripsi', 'K=[[2,1],[5,3]], ciphertext SUKT. Format: huruf kapital tanpa spasi', 'HELP', 30),
(21, 6, 'Pencarian Elemen Matriks Kunci 2x2', 'Hitung Deret Tahingga', 'Tentukan nilai elemen-elemen untuk menyusun matriks kunci K = [[a, b], [c, d]] dengan cara menghitung jumlah deret geometri tak hingga  bagi setiap variabel, di mana nilai a berasal dari deret dengan suku awal a_1 = 2 dan rasio r = 1/2, nilai b berasal dari deret dengan suku awal a_1 = 3 and rasio r = 1/4, nilai c berasal dari deret dengan suku awal a_1 = 1 dan rasio r = 1/2, serta nilai d berasal dari deret dengan suku awal a_1 = 6 dan rasio r = 1/3\r\n(contoh jawaban : 1 2 3 4)\r\n', '4 4 2 9', 40),
(22, 7, 'Enkripsi 3x3', 'Hill Cipher lanjut', 'K=[[2,4,6],[8,2,1],[3,17,7]], plaintext CATDOG. Format: huruf kapital tanpa spasi', 'KIERET', 45),
(23, 8, 'Enkripsi Hill Cipher 2x2 (MOD 27)', 'Enkripsi', ' Lakukan enkripsi terhadap plaintext GO menggunakan matriks kunci K = [[a, b], [c, d]] yang elemen-elemennya harus kamu temukan terlebih dahulu melalui perhitungan deret tak hingga dengan ketentuan elemen a memiliki suku awal 1 dan rasio 1/2, elemen b memiliki suku awal 1 dan rasio 2/3, elemen c memiliki suku awal 4 dan rasio 1/2, serta elemen d memiliki suku awal 1 dan rasio 3/4.', 'AX', 50),
(24, 9, 'Dekripsi Hill Cipher 2x2 (MOD 27)', 'Dekripsi', 'Sebuah ciphertext UK terdeteksi oleh sistem keamanan, temukan plaintext aslinya dengan menggunakan matriks kunci K = [[a, b], [c, d]] yang elemen-elemennya berasal dari jumlah deret tak hingga berikut: elemen a (a_1=3, r=1/2), elemen b (a_1=1, r=1/2), elemen c (a_1=1, r=1/2), dan elemen d (a_1=5, r=1/2), pastikan kamu mencari matriks invers K^{-1} dalam MOD 27 sebelum melakukan proses dekripsi.', 'JK', 50),
(25, 10, 'Enkripsi Hill Cipher 3x3 (MOD 27)', 'Enkripsi', 'Enkripsikan kata \"BUS\" menjadi ciphertext menggunakan matriks kunci K = [[a, b, c], [d, e, f], [g, h, i]] di mana elemen-elemennya dicari dari deret geometri tak hingga dengan konfigurasi sebagai berikut: baris pertama terdiri dari a(a_1=1, r=1/2), b(a_1=0, r=0), c(a_1=1, r=2/3), baris kedua terdiri dari d(a_1=0, r=0), e(a_1=1, r=1/2), f(a_1=0, r=0), dan baris ketiga terdiri dari g(a_1=1, r=1/2), h(a_1=1, r=1/2), i(a_1=2, r=1/2).', 'CNG', 50),
(26, 11, 'Dekripsi Hill Cipher 3x3 (MOD 27)', 'Dekripsi', 'Pecahkan kode rahasia dari ciphertext \"D K\" (huruf D, karakter Spasi, dan huruf K) menggunakan matriks kunci 3 \\times 3 yang elemen-elemennya didefinisikan sebagai K = [[a, b, c], [d, e, f], [g, h, i]] dengan nilai deret tak hingga baris pertama (a_1=1, r=1/2), (a_1=1, r=2/3), (a_1=0, r=0), baris kedua (a_1=0, r=0), (a_1=1, r=1/2), (a_1=0, r=0), dan baris ketiga (a_1=0, r=0), (a_1=0, r=0), (a_1=1, r=1/2), lalu hitunglah matriks inversnya untuk mendapatkan pesan awal.', 'JNF', 35),
(27, 12, 'Enkripsi Berlapis 2x2 dan 3x3', 'Enkripsi', 'Kirimkan pesan aman \"ICE\" melalui dua tahap enkripsi berlapis di mana tahap pertama menggunakan kunci K_1 = [[a, b], [c, d]] dengan elemen a(a_1=1, r=1/2), b(a_1=1, r=1/2), c(a_1=0, r=0), d(a_1=1, r=1/2) (tambahkan spasi jika jumlah karakter ganjil), kemudian hasil enkripsi tersebut diproses kembali menggunakan kunci K_2 = [[1, 0, 1], [0, 1, 0], [0, 0, 1]] dalam sistem MOD 27 untuk menghasilkan ciphertext final.', ' EGY  ', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `npm` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `points` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`npm`, `name`, `points`) VALUES
('257006111065', 'Salwa Salsabila', 0),
('257006111066', 'Fazlee Khayru Aozora', 0),
('257006111085', 'Muhammad Alfarizi Hudmawan', 0),
('257006111092', 'Azizah Dwi Suryaningtyas', 0),
('257006111107', 'Diwanti Najma Tsaqib', 0),
('257006111109', 'Fauzi Firmansyah', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_solved`
--

CREATE TABLE `user_solved` (
  `npm` varchar(20) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `solved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`npm`);

--
-- Indexes for table `user_solved`
--
ALTER TABLE `user_solved`
  ADD PRIMARY KEY (`npm`,`challenge_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
