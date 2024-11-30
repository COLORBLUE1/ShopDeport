-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2024 a las 02:02:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `shopsport`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(255) DEFAULT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `PRECIO` decimal(10,2) DEFAULT NULL,
  `UNIDADES` int(11) DEFAULT NULL,
  `MARCA` varchar(100) DEFAULT NULL,
  `DISTRIBUIDOR` varchar(255) DEFAULT NULL,
  `URLIMAGEN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID`, `NOMBRE`, `DESCRIPCION`, `PRECIO`, `UNIDADES`, `MARCA`, `DISTRIBUIDOR`, `URLIMAGEN`) VALUES
(10, 'Guantes de Boxeo con amor', 'Guantes de entrenamiento para boxeo romper caras feas', 60.90, 100, 'Everlast 30', 'Everlast Sports 30', 'https://st4.depositphotos.com/41691762/41882/v/450/depositphotos_418821124-stock-illustration-black-fiber-texture-wallpaper-abstract.jpg'),
(12, 'Gorra de messi', 'no tiene', 1000.00, 1, 'Nike', 'Camilo', 'no ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provedores`
--

CREATE TABLE `provedores` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(255) DEFAULT NULL,
  `TELEFONO` varchar(15) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `DIRECCION` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provedores`
--

INSERT INTO `provedores` (`ID`, `NOMBRE`, `TELEFONO`, `EMAIL`, `DIRECCION`) VALUES
(3, 'Sony Electronics', '654321987', 'soporte@sony.com', 'Paseo de la Industria 789, Ciudad C'),
(4, 'Under Armour Distributors', '123123123', 'ventas@underarmour.com', 'Calle Principal 101, Ciudad D'),
(5, 'Samsung Electronics', '321654987', 'info@samsung.com', 'Av. Innovación 202, Ciudad E'),
(7, 'Puma Sports', '789123456', 'soporte@puma.com', 'Boulevard Deportivo 404, Ciudad G');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `provedores`
--
ALTER TABLE `provedores`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `provedores`
--
ALTER TABLE `provedores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
