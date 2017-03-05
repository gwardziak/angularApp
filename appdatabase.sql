-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Mar 2017, 23:16
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
-- Struktura tabeli dla tabeli `offergallery`
--

CREATE TABLE `offergallery` (
  `id` int(10) NOT NULL,
  `offerId` int(10) NOT NULL,
  `image` varchar(150) CHARACTER SET utf16 COLLATE utf16_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(80) NOT NULL,
  `userStatus` varchar(30) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `userStatus`) VALUES
(1, 'grzybek', 'tomek', 'admin'),
(2, 'jarek', 'dupa', 'user'),
(3, 'jarekskwarek', 'dupa', ''),
(4, 'jarekskwareks', 'dupa', ''),
(5, 'jarekskwarekss', 'dupa', ''),
(6, 'jarekskwarekssk', 'dupa', ''),
(7, 'jarekskwareksskl', 'dupa', ''),
(8, 'jarekskwareksskls', 'dupa', ''),
(9, 'jarekskwarekssklss', 'dupa', ''),
(11, 'hashtest', 'dupa', ''),
(12, 'hashtest2', 'dupa', ''),
(13, 'hashtest3', 'dupa', ''),
(14, 'hashtest4', '$2a$10$.1yEh5LOYP54/Wk5AefNYu5qjYxY0R3qy41IjtY70PC//rKoY0hc6', ''),
(15, 'aleJaja', '$2a$10$J4RAlhUEnb2PRfBQJJVFB.YWZZgF60Os23Z6do/Pf5P2Zv7PFf9Ti', ''),
(16, 'test1', '$2a$10$8g6QwM/V4eUh99XoM5vjquB/zUQ7clPn1CWMtjY8gwXJDrdSHzRnK', ''),
(17, 'test2', '$2a$10$/RKLHQ/Pl238OFTz1fXR9eUAsmy9S78aTl4WNxLv2p/vw1TtJS21O', ''),
(18, 'test3', '$2a$10$pOWy0AM5IoNK8rKYIYiM1OeqABI6qcVK/yNdDD.TXfzUg96gRxa.q', ''),
(19, 'test4', '$2a$10$dPwuFC7.NhXDvQp4VEyHyO9xsnCZ8WKiEeJzKMrgInEoMFi98/hJS', ''),
(20, 'test5', '$2a$10$stYhzc5GftHoBSzr1MVjSuIxNsrGZjgC3ruL1zcr71Nn8nhbayXqm', ''),
(21, 'test6', '$2a$10$wr31Kw2pa9EO7V/HtYssX.QQutxHuydDzxVIGXWC.eW3Jh/hzez9G', ''),
(22, 'test7', '$2a$10$Bz/ClgJWJyHrZQXGBjhZHeNrKSxfO7WwNW1WbZtahdYoazw8lyoiu', ''),
(23, 'test8', '$2a$10$Igf6jvhaT31BQ1XJoR.mVu40NFxLt3M3/1MvGD3o59MU8cf6ICaby', ''),
(24, 'halo', '$2a$10$bAPn0.lgCKs4os3Nw84sLu0rg.lLYJvrMJw9q/wgYDh.CIgvN0XGm', ''),
(25, 'halo2', '$2a$10$yUJwiw29wAitTReNZD/x6OIUzmsr.HIiPJRgywA6ezy7qJdoomQfC', ''),
(26, 'halo3', '$2a$10$OitfRKlWjzd2THefAf7IpO5AmT9IM6YdqRje34LrD0Cnn7LuDJ4Xu', ''),
(27, 'halo4', '$2a$10$PJmpISbYm/psPlqugxl4o.jc2SkMrIEiVOO8NAl.XRQi2G9gKXByq', ''),
(28, 'skurwysyn', '$2a$10$ut/mhA6qhn5Kg3wsnJZpROTpA7ZDlOCVPDb7bebAayN1do.4HWlGC', 'user'),
(29, 'seps', '$2a$10$c/QmEDpKJUAzZHXXnNfBPO7Y.RE9r1U8QjerK0QuTyp35QAAvvcyq', 'user'),
(30, 'sepss', '$2a$10$T0A2.QYYNW7ovbd81MNgyeBXDASnNoQz2iaj8q90SI05K99l7B/lK', 'user'),
(31, 'krecik', '$2a$10$BPQdQmt1Cj89RDgLAIJbMOcPzQ4uJMFVMZeMcGcdW12/AiqF6GkrO', 'user');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `offergallery`
--
ALTER TABLE `offergallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `offerId` (`offerId`),
  ADD KEY `offerId_2` (`offerId`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `offergallery`
--
ALTER TABLE `offergallery`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `offers`
--
ALTER TABLE `offers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `offergallery`
--
ALTER TABLE `offergallery`
  ADD CONSTRAINT `offergallery_ibfk_1` FOREIGN KEY (`offerId`) REFERENCES `offers` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
