-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 16 Lut 2017, 18:41
-- Wersja serwera: 10.1.21-MariaDB
-- Wersja PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `appdatabase`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `offers`
--

CREATE TABLE `offers` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Country` varchar(30) CHARACTER SET utf32 COLLATE utf32_polish_ci DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `Rating` float DEFAULT NULL,
  `Photo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `offers`
--

INSERT INTO `offers` (`Id`, `Name`, `Price`, `Country`, `City`, `Rating`, `Photo`) VALUES
(1, 'Super okazja bułgaria ', 1000, 'Bułgaria', 'Kraków', 3, '120.png'),
(3, 'Mickey', NULL, NULL, NULL, NULL, '120.png'),
(4, 'Okazja', 800, 'Bułgaria', 'Kraków', 2, '120.png'),
(5, 'Polska Okazja', 100, 'Poland', 'Warszawa', 5, '120.png'),
(6, 'wyśmienita okazja', 1500, 'Węgry', 'Budapeszt', 2, 'krol hero.png'),
(7, 'wyśmienita okazja', 1500, 'Słowacja', 'Praga', 4, 'krol hero.png'),
(8, 's', NULL, NULL, NULL, NULL, 'krol hero.png'),
(9, 'd', NULL, NULL, NULL, NULL, NULL),
(10, 'f', NULL, NULL, NULL, NULL, NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `offers`
--
ALTER TABLE `offers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
