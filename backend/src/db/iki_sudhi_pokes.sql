-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2025 at 03:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iki_sudhi_pokes`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `idcategoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`idcategoria`, `nombre`, `descripcion`) VALUES
(1, 'Homemakis', 'sas'),
(2, 'Tradicional makisa', 'asas'),
(3, 'TempuramMakis', 'sa'),
(4, 'Makis Frescos', 'Rollos de sushi frescos sin freír, con ingredientes como salmón, cangrejo y aguacate.'),
(5, 'Makis Tempurizados', 'Rollos tempurizados con una capa crujiente, combinando ingredientes clásicos y tropicales.'),
(6, 'Makis Especiales', 'Rollos de autor con combinaciones creativas y salsas especiales.');

-- --------------------------------------------------------

--
-- Table structure for table `rollos`
--

CREATE TABLE `rollos` (
  `idrollos` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripccion` text NOT NULL,
  `ingredientes` text NOT NULL,
  `cantidad` int(11) NOT NULL,
  `calificacion` double NOT NULL,
  `precio` double NOT NULL,
  `idenc` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `rollos`
--

INSERT INTO `rollos` (`idrollos`, `nombre`, `descripccion`, `ingredientes`, `cantidad`, `calificacion`, `precio`, `idenc`, `imagen`) VALUES
(1, 'Philadelphia', 'Clásico rollo fresco con salmón.', 'Salmón, aguacate, queso crema, ajonjolí', 8, 4.5, 22000, 1, 'Philadelphia.jpg'),
(2, 'California', 'Rollito fresco y cremoso.', 'Cangrejo, aguacate, pepino, queso crema, masago, ajonjolí', 8, 4.3, 21000, 1, 'California.jpg'),
(3, 'Alaska', 'Sabor equilibrado con salmón y cangrejo.', 'Salmón, aguacate, cangrejo, queso crema, ajonjolí', 8, 4.4, 23000, 1, 'Alaska.jpg'),
(4, 'Dinamita', 'Explosión de sabor con masago.', 'Crema de cangrejo, aguacate, masago', 8, 4.2, 20000, 1, 'Dinamita.jpg'),
(5, 'Veggie', 'Opción vegetariana ligera.', 'Queso crema, croqueta de kakiage, aguacate, wakame', 8, 4, 19000, 1, 'Veggie.jpg'),
(6, 'Tiger Roll', 'Rollo crujiente con salsa teriyaki.', 'Masago, queso crema, aguacate, salmón, teriyaki', 8, 4.6, 24000, 2, 'TigerRoll.jpg'),
(8, 'Essential', 'Rollo sin arroz con base de maduro.', 'Maduro, salmón, queso crema, cangrejo, aguacate, teriyaki', 6, 4.4, 25000, 2, 'Essential.jpg'),
(9, 'Katana', 'Rollo con calamar y toque picante.', 'Calamar, pepino, aguacate, ensalada Kani crunch, atomic', 8, 4.3, 23000, 2, 'Katana.jpg'),
(11, 'Euphoria', 'Ganador Sushi Master 2023.', 'Salmón, aguacate, queso crema, camarones flake, salsa iki', 8, 4.9, 28000, 3, 'Euphoria.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` double NOT NULL,
  `correo` varchar(300) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `estado` int(11) NOT NULL,
  `numero` varchar(15) NOT NULL,
  `rol` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `correo`, `contraseña`, `estado`, `numero`, `rol`) VALUES
(1, 'admin@iki.com', 'admin123', 1, '3001234567', 'admin'),
(2, 'cliente@iki.com', 'cliente123', 1, '3017654321', 'cliente');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indexes for table `rollos`
--
ALTER TABLE `rollos`
  ADD PRIMARY KEY (`idrollos`),
  ADD KEY `fk_categoria_rollo` (`idenc`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rollos`
--
ALTER TABLE `rollos`
  MODIFY `idrollos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rollos`
--
ALTER TABLE `rollos`
  ADD CONSTRAINT `fk_categoria_rollo` FOREIGN KEY (`idenc`) REFERENCES `categorias` (`idcategoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
