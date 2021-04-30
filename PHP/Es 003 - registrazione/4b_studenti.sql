-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 24, 2021 alle 11:38
-- Versione del server: 10.4.6-MariaDB
-- Versione PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4b_studenti`
--
CREATE DATABASE IF NOT EXISTS `4b_studenti` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `4b_studenti`;

-- --------------------------------------------------------

--
-- Struttura della tabella `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `valore` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `media`
--

INSERT INTO `media` (`id`, `valore`) VALUES
(1, 'Giornali'),
(2, 'Amici'),
(3, 'Web'),
(4, 'Altro');

-- --------------------------------------------------------

--
-- Struttura della tabella `residenze`
--

CREATE TABLE `residenze` (
  `id` int(11) NOT NULL,
  `valore` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `residenze`
--

INSERT INTO `residenze` (`id`, `valore`) VALUES
(1, 'Fossano'),
(2, 'Cuneo'),
(3, 'Torino'),
(4, 'Alba'),
(5, 'Genola');

-- --------------------------------------------------------

--
-- Struttura della tabella `studenti`
--

CREATE TABLE `studenti` (
  `id` int(11) NOT NULL,
  `nome` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `settore` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hobbies` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenza` int(11) NOT NULL,
  `segni` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `media` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `residenze`
--
ALTER TABLE `residenze`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `studenti`
--
ALTER TABLE `studenti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `residenze`
--
ALTER TABLE `residenze`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `studenti`
--
ALTER TABLE `studenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
