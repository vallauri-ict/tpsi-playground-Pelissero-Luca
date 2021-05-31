-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 28, 2021 alle 10:25
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4b_borsa`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `dettagli`
--

CREATE TABLE `dettagli` (
  `id` int(11) NOT NULL,
  `nomeAzienda` varchar(32) NOT NULL,
  `descrizione` text NOT NULL,
  `fatturato` int(11) NOT NULL,
  `indirizzo` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `dettagli`
--

INSERT INTO `dettagli` (`id`, `nomeAzienda`, `descrizione`, `fatturato`, `indirizzo`) VALUES
(1, 'FIAT', 'Lorem ipsum FIAT dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 2700000, 'Torino corso giovanni agnelli 200'),
(2, 'unicredit', 'Lorem ipsum UNICREDIT dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 1900000, 'Milano Piazza Gae Aulenti, 3 '),
(3, 'Poste Italiane', 'Lorem ipsum POSTE ITALIANE dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 1450000, 'Roma Viale Europa, 190'),
(4, 'eni', 'Lorem ipsum ENI dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 2125000, 'Roma Piazzale Enrico Mattei, 1');

-- --------------------------------------------------------

--
-- Struttura della tabella `titoli`
--

CREATE TABLE `titoli` (
  `id` int(11) NOT NULL,
  `titolo` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `ultimoContratto` double NOT NULL,
  `volumi` int(11) NOT NULL,
  `codDettagli` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `titoli`
--

INSERT INTO `titoli` (`id`, `titolo`, `ultimoContratto`, `volumi`, `codDettagli`) VALUES
(1, 'fiat 2023', 95.5, 200000, 1),
(2, 'fiat 2014', 101, 350000, 1),
(3, 'fiat 2025', 87.9, 500000, 1),
(7, 'unicredit 2022', 90.6, 1000000, 2),
(8, 'unicredit 2024', 92.35, 207000, 2),
(9, 'poste italiane 2023', 102.4, 57000, 3),
(10, 'poste italiane 2026', 100, 320000, 3),
(11, 'eni 2025', 102.7, 135000, 4),
(12, 'eni 2030', 98.7, 90000, 4);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `dettagli`
--
ALTER TABLE `dettagli`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `titoli`
--
ALTER TABLE `titoli`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `dettagli`
--
ALTER TABLE `dettagli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `titoli`
--
ALTER TABLE `titoli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
