-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2024 a las 03:25:55
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
-- Base de datos: `la_diversion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `Id_habitacion` int(11) NOT NULL,
  `Numero_habitacion` int(11) NOT NULL,
  `Tipo_habitacion` varchar(11) NOT NULL,
  `Precio` decimal(11,0) NOT NULL,
  `Estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`Id_habitacion`, `Numero_habitacion`, `Tipo_habitacion`, `Precio`, `Estado`) VALUES
(1, 101, 'Single', 50, 0),
(2, 102, 'Double', 75, 0),
(3, 103, 'King', 100, 0),
(4, 104, 'Single', 50, 0),
(5, 105, 'King', 100, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `Id_reserva` int(5) NOT NULL,
  `Rut` int(8) NOT NULL,
  `Numero_habitacion` enum('Single','Double','King') NOT NULL,
  `Fecha_Checkin` date NOT NULL,
  `Fecha_CheckOut` date NOT NULL,
  `Precio_por_noche` int(10) NOT NULL,
  `Dias` int(10) NOT NULL,
  `Tipo_habitacion` varchar(10) NOT NULL,
  `Estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`Id_reserva`, `Rut`, `Numero_habitacion`, `Fecha_Checkin`, `Fecha_CheckOut`, `Precio_por_noche`, `Dias`, `Tipo_habitacion`, `Estado`) VALUES
(1, 29384758, '', '2024-05-08', '2024-05-11', 24, 0, 'Double', 0),
(2, 29384758, '', '2024-05-08', '2024-05-11', 24, 0, 'Double', 0),
(3, 28347583, '', '2024-05-09', '2024-05-25', 23, 0, 'Double', 0),
(4, 28347583, '', '2024-05-09', '2024-05-25', 23, 0, 'King', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`Id_habitacion`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`Id_reserva`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `Id_habitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `Id_reserva` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
