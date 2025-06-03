-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: bgthgvow9xzo8lhzktej-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 03-06-2025 a las 11:43:28
-- Versión del servidor: 8.0.22-13
-- Versión de PHP: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bgthgvow9xzo8lhzktej`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `idcalificacion` double NOT NULL,
  `puntuacion` double NOT NULL,
  `comentario` text,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_id_rollo` int NOT NULL,
  `fk_id_cliente` double NOT NULL
) ;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`idcalificacion`, `puntuacion`, `comentario`, `fecha`, `fk_id_rollo`, `fk_id_cliente`) VALUES
(8, 5, 'Muy rico el shusi', '2025-06-02 00:30:55', 2, 7),
(9, 4.5, 'Esta delicioso', '2025-06-02 00:31:27', 10, 7),
(10, 4.5, 'Muy bueno', '2025-06-03 15:00:00', 2, 1),
(11, 5, 'No me gusto para nada', '2025-06-03 08:46:23', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idcategoria` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idcategoria`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'HomeMakis', '\r\nMakis creates- IKI\r\n\r\n\r\n', 1),
(2, 'TradicionalMakis', 'Makis tradicionales', 1),
(3, 'TempuraMakis', 'Makis Apanados & Fritos', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Promociones`
--

CREATE TABLE `Promociones` (
  `idPromociones` double NOT NULL,
  `nombre` text NOT NULL,
  `descripcion` text,
  `imagen` text NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Promociones`
--

INSERT INTO `Promociones` (`idPromociones`, `nombre`, `descripcion`, `imagen`, `precio`) VALUES
(1, 'Sushi + Cervezas', '\n¡Disfruta de nuestra promoción especial! De edicion limitada aprovecha hoy \n\n\n\n\n\n', 'sushi_cervesa_promo1.jpeg', 15000),
(2, 'Combo Pareja', 'Perfecto para compartir con esa persona especial', 'Combo_pareja_promo2.jpeg', 90000),
(3, 'Combo Cerveza', 'La combinación perfecta', 'Combo_servesa_promo3.jpeg', 14000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rollos`
--

CREATE TABLE `rollos` (
  `idrollos` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripccion` text NOT NULL,
  `ingredientes` text NOT NULL,
  `cantidad` int NOT NULL,
  `calificacion` double NOT NULL,
  `precio` double NOT NULL,
  `id_categoria` int DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rollos`
--

INSERT INTO `rollos` (`idrollos`, `nombre`, `descripccion`, `ingredientes`, `cantidad`, `calificacion`, `precio`, `id_categoria`, `imagen`) VALUES
(1, 'Philadelphia', '\n\n\n\n\n\n\n\nClásico rollo fresco con salmón muy rico y deliciosos.\n\n\n\n\n\n\n\n', '\n\n\n\n\n\n\n\nSalmón, aguacate, queso crema, ajonjolín\n\n\n\n\n\n\n\n', 10, 5, 37250, 1, 'Philadelphia.jpg'),
(2, 'California', 'Rollito fresco y cremoso.', 'Cangrejo, aguacate, pepino, queso crema, masago, ajonjolí', 8, 4.3, 40000, 1, 'California.jpg'),
(3, 'Alaska', 'Sabor equilibrado con salmón y cangrejo.', 'Salmón, aguacate, cangrejo, queso crema, ajonjolí', 8, 4.4, 41000, 1, 'Alaska.jpg'),
(4, 'Dinamita', 'Explosión de sabor con masago.', 'Crema de cangrejo, aguacate, masago', 8, 4.2, 39500, 1, 'Dinamita.jpg'),
(5, 'Veggie', 'Opción vegetariana ligera.', 'Queso crema, croqueta de kakiage, aguacate, wakame', 8, 4, 39000, 1, 'Veggie.jpg'),
(6, 'Tiger Roll', 'Rollo crujiente con salsa teriyaki.', 'Masago, queso crema, aguacate, salmón, teriyaki', 8, 4.6, 42000, 2, 'TigerRoll.jpg'),
(8, 'Essential', 'Rollo sin arroz con base de maduro.', 'Maduro, salmón, queso crema, cangrejo, aguacate, teriyaki', 6, 4.4, 43000, 2, 'Essential.jpg'),
(9, 'Katana', 'Rollo con calamar y toque picante.', 'Calamar, pepino, aguacate, ensalada Kani crunch, atomic', 8, 4.3, 44000, 2, 'Katana.jpg'),
(10, 'Euphoria', 'Ganador Sushi Master 2023.', 'Salmón, aguacate, queso crema, camarones flake, salsa iki', 8, 5, 45000, 3, 'Euphoria.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` double NOT NULL,
  `cedula` varchar(200) DEFAULT NULL,
  `nombre_completo` text,
  `correo` varchar(300) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `numero` varchar(15) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `roles` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `cedula`, `nombre_completo`, `correo`, `contraseña`, `numero`, `estado`, `roles`) VALUES
(1, '1096063266', 'Juan Manuel Simales Perez', 'juan@iki.com', 'juan123', '3001234111', 1, 'admin'),
(2, '1096063377', 'Juan Fernando Perezas', 'FernandosJuan@gmail.com', 'Fernando123', '3001234663', 1, 'cliente'),
(7, '1116777187', 'Manuel Isaac Gomez Galvis', 'manuelisac2005@gmail.com', 'M@nueleichon36', '3204675256', 1, 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`idcalificacion`),
  ADD KEY `fk_calificacion_rollo` (`fk_id_rollo`),
  ADD KEY `fk_calificacion_cliente` (`fk_id_cliente`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `Promociones`
--
ALTER TABLE `Promociones`
  ADD PRIMARY KEY (`idPromociones`);

--
-- Indices de la tabla `rollos`
--
ALTER TABLE `rollos`
  ADD PRIMARY KEY (`idrollos`),
  ADD KEY `fk_categoria_rollo` (`id_categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `idcalificacion` double NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idcategoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `Promociones`
--
ALTER TABLE `Promociones`
  MODIFY `idPromociones` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `rollos`
--
ALTER TABLE `rollos`
  MODIFY `idrollos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `fk_calificacion_cliente` FOREIGN KEY (`fk_id_cliente`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_calificacion_rollo` FOREIGN KEY (`fk_id_rollo`) REFERENCES `rollos` (`idrollos`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rollos`
--
ALTER TABLE `rollos`
  ADD CONSTRAINT `fk_categoria_rollo` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`idcategoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
