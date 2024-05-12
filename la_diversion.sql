-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2024 a las 02:40:51
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
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Id_Cliente` int(11) NOT NULL,
  `Rut` varchar(10) NOT NULL,
  `Numero_habitacion` int(11) NOT NULL,
  `Valor_Acumulado` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Id_Cliente`, `Rut`, `Numero_habitacion`, `Valor_Acumulado`) VALUES
(3, '12983432', 101, 125.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `Numero_habitacion` int(11) NOT NULL,
  `Tipo_habitacion` varchar(11) NOT NULL,
  `Precio` decimal(11,0) NOT NULL,
  `Estado` tinyint(1) NOT NULL COMMENT '0 -> Disponible\r\n1-> Reservada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`Numero_habitacion`, `Tipo_habitacion`, `Precio`, `Estado`) VALUES
(101, 'Single', 50, 1),
(102, 'Double', 75, 1),
(103, 'King', 100, 0),
(104, 'Single', 50, 0),
(105, 'King', 100, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios_diarios`
--

CREATE TABLE `precios_diarios` (
  `Id` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Tipo_habitacion` varchar(255) NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Numero_habitacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `Id_Reserva` int(11) NOT NULL,
  `Rut` int(8) NOT NULL,
  `Numero_habitacion` int(11) DEFAULT NULL,
  `Fecha_Checkin` date NOT NULL,
  `Fecha_CheckOut` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`Id_Reserva`, `Rut`, `Numero_habitacion`, `Fecha_Checkin`, `Fecha_CheckOut`) VALUES
(44, 12983432, 101, '2024-05-17', '2024-05-24'),
(45, 12983432, 102, '2024-05-17', '2024-05-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tours`
--

CREATE TABLE `tours` (
  `Id_Tour` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Lugar` varchar(255) NOT NULL,
  `Medio_Transporte` varchar(100) NOT NULL,
  `Imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tours`
--

INSERT INTO `tours` (`Id_Tour`, `Fecha`, `Lugar`, `Medio_Transporte`, `Imagen`) VALUES
(1, '2024-05-20', 'Parque Nacional', 'Autobús', 'imagen_parque_nacional.jpg'),
(2, '2024-06-15', 'Museo de Historia', 'Caminando', 'imagen_museo_historia.jpg'),
(3, '2024-07-01', 'Playa Los Cocos', 'Barco', 'imagen_playa_los_cocos.jpg'),
(4, '2024-08-20', 'Montañas El Gran Pico', 'Teleférico', 'imagen_montanas_gran_pico.jpg'),
(5, '2024-09-05', 'Valle de los Reyes', 'Caballo', 'imagen_valle_reyes.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Id_Cliente`),
  ADD KEY `Numero_habitacion` (`Numero_habitacion`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`Numero_habitacion`);

--
-- Indices de la tabla `precios_diarios`
--
ALTER TABLE `precios_diarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_numero_habitacion` (`Numero_habitacion`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`Id_Reserva`),
  ADD KEY `Numero Habitacion` (`Numero_habitacion`);

--
-- Indices de la tabla `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`Id_Tour`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `Id_Cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `Numero_habitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `precios_diarios`
--
ALTER TABLE `precios_diarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `Id_Reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `tours`
--
ALTER TABLE `tours`
  MODIFY `Id_Tour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`Numero_habitacion`) REFERENCES `habitaciones` (`Numero_habitacion`);

--
-- Filtros para la tabla `precios_diarios`
--
ALTER TABLE `precios_diarios`
  ADD CONSTRAINT `fk_numero_habitacion` FOREIGN KEY (`Numero_habitacion`) REFERENCES `habitaciones` (`Numero_habitacion`),
  ADD CONSTRAINT `fk_precios_diarios_habitaciones` FOREIGN KEY (`Numero_habitacion`) REFERENCES `habitaciones` (`Numero_habitacion`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `Numero Habitacion` FOREIGN KEY (`Numero_habitacion`) REFERENCES `habitaciones` (`Numero_habitacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
