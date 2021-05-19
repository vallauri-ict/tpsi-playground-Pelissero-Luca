-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Creato il: Ott 12, 2016 alle 19:28
-- Versione del server: 10.1.10-MariaDB
-- Versione PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbbanche`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `banche`
--

CREATE TABLE `banche` (
  `cBanca` int(11) NOT NULL,
  `Nome` varchar(40) NOT NULL,
  `cComune` int(11) NOT NULL
);

--
-- Dump dei dati per la tabella `banche`
--

INSERT INTO `banche` (`cBanca`, `Nome`, `cComune`) VALUES
(1, 'SanPaolo', 18),
(2, 'Unicredit', 18),
(3, 'UBI', 18),
(4, 'BRE', 7),
(5, 'Monte dei Paschi', 17),
(6, 'CRF', 8),
(7, 'Popolare di Novara', 12);

-- --------------------------------------------------------

--
-- Struttura della tabella `comuni`
--

CREATE TABLE `comuni` (
  `cComune` int(11) NOT NULL,
  `Nome` varchar(40) NOT NULL
);

--
-- Dump dei dati per la tabella `comuni`
--

INSERT INTO `comuni` (`cComune`, `Nome`) VALUES
(1, 'Alessandria'),
(2, 'Asti'),
(3, 'Biella'),
(4, 'Caraglio'),
(5, 'Centallo'),
(6, 'Cervasca'),
(7, 'Cuneo'),
(8, 'Fossano'),
(9, 'Genola'),
(10, 'Marene'),
(11, 'Mondovì'),
(12, 'Novara'),
(13, 'Racconigi'),
(14, 'S. Albano Stura'),
(15, 'Saluzzo'),
(16, 'Savigliano'),
(17, 'Siena'),
(18, 'Torino'),
(19, 'Vercelli'),
(20, 'Vignolo'),
(21, 'Vottignasco');

-- --------------------------------------------------------

--
-- Struttura della tabella `conti`
--

CREATE TABLE `conti` (
  `cConto` int(11) NOT NULL,
  `cCorrentista` int(11) NOT NULL,
  `cFiliale` int(11) NOT NULL,
  `Saldo` float NOT NULL
);

--
-- Dump dei dati per la tabella `conti`
--

INSERT INTO `conti` (`cConto`, `cCorrentista`, `cFiliale`, `Saldo`) VALUES
(1, 1, 1, 2500),
(2, 2, 1, 2500),
(3, 3, 2, 2500),
(4, 4, 2, 2500),
(5, 5, 3, 2500),
(6, 6, 3, 2500),
(7, 7, 4, 2500),
(8, 8, 4, 2500),
(9, 9, 5, 2500),
(10, 10, 5, 2500),
(11, 11, 6, 2500),
(12, 12, 6, 2500),
(13, 13, 7, 2500),
(14, 14, 7, 2500),
(15, 15, 8, 2500),
(16, 16, 8, 2500),
(17, 17, 9, 2500),
(18, 1, 9, 2500),
(19, 2, 10, 2500),
(20, 3, 10, 2500),
(21, 4, 11, 2500),
(22, 5, 11, 2500),
(23, 6, 12, 2500),
(24, 7, 12, 2500),
(25, 8, 13, 2500),
(26, 9, 13, 2500),
(27, 10, 14, 2500),
(28, 11, 14, 2500),
(29, 12, 1, 2500),
(30, 13, 2, 2500),
(31, 14, 3, 2500),
(32, 15, 4, 2500),
(33, 16, 5, 2500),
(34, 17, 7, 2500);

-- --------------------------------------------------------

--
-- Struttura della tabella `correntisti`
--

CREATE TABLE `correntisti` (
  `cCorrentista` int(11) NOT NULL,
  `Nome` varchar(40) NOT NULL,
  `cComune` int(11) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Pwd` varchar(40) NOT NULL
);

--
-- Dump dei dati per la tabella `correntisti`
--

INSERT INTO `correntisti` (`cCorrentista`, `Nome`, `cComune`, `Telefono`, `Pwd`) VALUES
(1, 'Rossi', 1, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'Verdi', 2, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(3, 'Abbà', 3, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(4, 'Cerrato', 4, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(5, 'Allegri', 5, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(6, 'Berutti', 6, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(7, 'Isaia', 7, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(8, 'Cerutti', 8, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(9, 'Airale', 9, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(10, 'Serra', 10, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(11, 'Demaria', 11, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(12, 'Vettori', 12, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(13, 'Parola', 13, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(14, 'Ferri', 14, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(15, 'Barbero', 15, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(16, 'Bertolino', 16, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(17, 'Allemandi', 17, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(18, 'Gilli', 18, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(19, 'Garello', 19, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(20, 'Oddenino', 20, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(21, 'Marengo', 21, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(22, 'Morielli', 7, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(23, 'Appendino', 7, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99'),
(24, 'Barberis', 18, '0172696469', '5f4dcc3b5aa765d61d8327deb882cf99');

-- --------------------------------------------------------

--
-- Struttura della tabella `filiali`
--

CREATE TABLE `filiali` (
  `cFiliale` int(11) NOT NULL,
  `Nome` varchar(40) NOT NULL,
  `cBanca` int(11) NOT NULL,
  `cComune` int(11) NOT NULL
);

--
-- Dump dei dati per la tabella `filiali`
--

INSERT INTO `filiali` (`cFiliale`, `Nome`, `cBanca`, `cComune`) VALUES
(1, 'Sanpaolo Centallo', 1, 5),
(2, 'Unicredit Cevasca', 2, 6),
(3, 'UBI S. Albano', 3, 14),
(4, 'BRE Saluzzo', 4, 15),
(5, 'Monte dei Paschi Caraglio', 5, 4),
(6, 'CRF Fossano', 6, 8),
(7, 'Popolare di Novara Vignolo', 7, 20),
(8, 'Sanpaolo Cuneo', 1, 7),
(9, 'Unicredit Savigliano', 2, 16),
(10, 'UBI Cuneo', 3, 7),
(11, 'BRE Savigliano', 4, 16),
(12, 'Monte dei Paschi Torino', 5, 18),
(13, 'CRF Saviliano', 6, 16),
(14, 'Popolare di Novara - Asti', 7, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `movimenti`
--

CREATE TABLE `movimenti` (
  `cMov` int(11) NOT NULL,
  `cConto` int(11) NOT NULL,
  `cOperazione` int(11) NOT NULL,
  `Data` varchar(10) NOT NULL,
  `Importo` float NOT NULL
);

--
-- Dump dei dati per la tabella `movimenti`
--

INSERT INTO `movimenti` (`cMov`, `cConto`, `cOperazione`, `Data`, `Importo`) VALUES
(1, 1, 1, '13/03/16', 75.5),
(2, 2, 1, '13/03/16', 75.5),
(3, 3, 2, '13/03/16', 75.5),
(4, 4, 1, '13/03/16', 75.5),
(5, 5, 2, '13/03/16', 75.5),
(6, 6, 1, '13/03/16', 75.5),
(7, 7, 1, '13/03/16', 75.5),
(8, 8, 2, '13/03/16', 75.5),
(9, 9, 2, '13/03/16', 75.5),
(10, 10, 2, '13/03/16', 75.5),
(11, 11, 1, '13/03/16', 75.5),
(12, 12, 2, '13/03/16', 75.5),
(13, 13, 1, '13/03/16', 75.5),
(14, 14, 1, '13/03/16', 75.5),
(15, 15, 1, '13/03/16', 75.5),
(16, 16, 2, '13/03/16', 75.5),
(17, 17, 2, '13/03/16', 75.5),
(18, 18, 1, '13/03/16', 75.5),
(19, 19, 1, '13/03/16', 75.5),
(20, 20, 2, '13/03/16', 75.5),
(21, 21, 1, '13/03/16', 75.5),
(22, 22, 1, '13/03/16', 75.5),
(23, 23, 1, '13/03/16', 75.5),
(24, 24, 2, '13/03/16', 75.5),
(25, 25, 2, '13/03/16', 75.5),
(26, 26, 1, '13/03/16', 75.5),
(27, 27, 2, '13/03/16', 75.5),
(28, 28, 2, '13/03/16', 75.5),
(29, 29, 2, '13/03/16', 75.5),
(30, 30, 1, '13/03/16', 75.5),
(31, 31, 1, '13/03/16', 75.5),
(32, 32, 1, '13/03/16', 75.5),
(33, 1, 2, '21/03/16', 75.5),
(34, 2, 1, '28/03/16', 75.5),
(35, 3, 2, '05/04/16', 75.5),
(36, 4, 2, '08/04/16', 75.5),
(37, 1, 2, '15/04/16', 75.5),
(38, 2, 1, '18/04/16', 75.5),
(39, 3, 1, '22/04/16', 75.5),
(40, 4, 2, '11/05/16', 75.5),
(41, 9, 1, '20/05/16', 75.5),
(42, 21, 1, '30/05/16', 75.5);

-- --------------------------------------------------------

--
-- Struttura della tabella `operazioni`
--

CREATE TABLE `operazioni` (
  `cOperazione` int(11) NOT NULL,
  `descrizione` varchar(20) NOT NULL
);

--
-- Dump dei dati per la tabella `operazioni`
--

INSERT INTO `operazioni` (`cOperazione`, `descrizione`) VALUES
(1, 'prelievo'),
(2, 'versamento');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `banche`
--
ALTER TABLE `banche`
  ADD PRIMARY KEY (`cBanca`);

--
-- Indici per le tabelle `comuni`
--
ALTER TABLE `comuni`
  ADD PRIMARY KEY (`cComune`);

--
-- Indici per le tabelle `conti`
--
ALTER TABLE `conti`
  ADD PRIMARY KEY (`cConto`);

--
-- Indici per le tabelle `correntisti`
--
ALTER TABLE `correntisti`
  ADD PRIMARY KEY (`cCorrentista`);

--
-- Indici per le tabelle `filiali`
--
ALTER TABLE `filiali`
  ADD PRIMARY KEY (`cFiliale`);

--
-- Indici per le tabelle `movimenti`
--
ALTER TABLE `movimenti`
  ADD PRIMARY KEY (`cMov`);

--
-- Indici per le tabelle `operazioni`
--
ALTER TABLE `operazioni`
  ADD PRIMARY KEY (`cOperazione`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `banche`
--
ALTER TABLE `banche`
  MODIFY `cBanca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT per la tabella `comuni`
--
ALTER TABLE `comuni`
  MODIFY `cComune` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT per la tabella `conti`
--
ALTER TABLE `conti`
  MODIFY `cConto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT per la tabella `correntisti`
--
ALTER TABLE `correntisti`
  MODIFY `cCorrentista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT per la tabella `filiali`
--
ALTER TABLE `filiali`
  MODIFY `cFiliale` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT per la tabella `movimenti`
--
ALTER TABLE `movimenti`
  MODIFY `cMov` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT per la tabella `operazioni`
--
ALTER TABLE `operazioni`
  MODIFY `cOperazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
