-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2024 a las 01:27:44
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CheckoutCliente` (IN `RutCliente` VARCHAR(255), IN `NumeroHabitacion` INT, IN `CalificacionCliente` INT, OUT `TotalAPagar` DECIMAL(10,2))   BEGIN
    DECLARE TotalEstancia DECIMAL(10,2);
    DECLARE TotalTours DECIMAL(10,2);
    DECLARE Checkin DATE;
    DECLARE Checkout DATE;
    DECLARE PrecioNoche DECIMAL(10,2);

    -- Obtener fechas de check-in y check-out
    SELECT Fecha_Checkin INTO Checkin
    FROM reservas
    WHERE Rut = RutCliente AND Numero_habitacion = NumeroHabitacion;

    SET Checkout = CURDATE(); -- La fecha de checkout es hoy

    -- Calcular el total de la estancia
    SELECT Precio INTO PrecioNoche
    FROM habitaciones
    WHERE Numero_habitacion = NumeroHabitacion;

    SET TotalEstancia = DATEDIFF(Checkout, Checkin) * PrecioNoche;

    -- Calcular el total de los tours
    SELECT IFNULL(SUM(t.Precio), 0) INTO TotalTours
    FROM tours t
    JOIN reservas_tours rt ON t.id_tour = rt.Id_Tour
    JOIN reservas r ON rt.Id_Reserva = r.Id_Reserva
    WHERE r.Rut = RutCliente AND r.Numero_habitacion = NumeroHabitacion AND r.Fecha_Checkin <= t.Fecha AND r.Fecha_CheckOut >= t.Fecha;

    -- Calcular el total a pagar
    SET TotalAPagar = TotalEstancia + TotalTours;

    -- Actualizar la calificación en el historial (opcionalmente puedes insertar un nuevo registro en el historial aquí)
    UPDATE historial
    SET Calificacion = CalificacionCliente
    WHERE Rut = RutCliente AND Numero_habitacion = NumeroHabitacion;
END$$

DELIMITER ;

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
(101, 'Single', 50, 0),
(102, 'Double', 75, 0),
(103, 'King', 100, 0),
(104, 'Single', 50, 0),
(105, 'King', 100, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `Id_Historial` int(11) NOT NULL,
  `Id_Reserva` int(11) DEFAULT NULL,
  `Rut` varchar(10) DEFAULT NULL,
  `Numero_habitacion` int(11) DEFAULT NULL,
  `Fecha_Checkout` date DEFAULT NULL,
  `Calificacion` int(11) DEFAULT 0,
  `Total_Tours` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`Id_Historial`, `Id_Reserva`, `Rut`, `Numero_habitacion`, `Fecha_Checkout`, `Calificacion`, `Total_Tours`) VALUES
(30, NULL, '11111111', 104, '2024-05-12', 1, NULL),
(31, NULL, '11111111', 101, '2024-05-12', 2, NULL);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas_tours`
--

CREATE TABLE `reservas_tours` (
  `Id_Reserva_Tour` int(11) NOT NULL,
  `Id_Tour` int(11) NOT NULL,
  `Id_Reserva` int(11) NOT NULL COMMENT 'id de reserva de habitacion'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas_tours`
--

INSERT INTO `reservas_tours` (`Id_Reserva_Tour`, `Id_Tour`, `Id_Reserva`) VALUES
(24, 0, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tours`
--

CREATE TABLE `tours` (
  `Id_Tour` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Lugar` varchar(255) NOT NULL,
  `Medio_Transporte` varchar(100) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tours`
--

INSERT INTO `tours` (`Id_Tour`, `Fecha`, `Lugar`, `Medio_Transporte`, `Imagen`, `Precio`) VALUES
(0, '2024-05-20', 'Parque Nacional', 'Autobús', 'imagen_parque_nacional.jpg', 10),
(1, '2024-06-05', 'Museo de Historia', 'Caminando', 'imagen_museo_historia.jpg', 20),
(2, '2024-05-09', 'Playa Los Cocos', 'Barco', 'imagen_playa_los_cocos.jpg', 30),
(3, '2024-08-20', 'Montañas El Gran Pico', 'Teleférico', 'imagen_montanas_gran_pico.jpg', 40),
(4, '2024-09-05', 'Valle de los Reyes', 'Caballo', 'imagen_valle_reyes.jpg', 50);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistadetallestours`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistadetallestours` (
`Id_Tour` int(11)
,`Lugar` varchar(255)
,`Fecha` date
,`Medio_Transporte` varchar(100)
,`Imagen` varchar(255)
,`Precio` int(11)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistadetallestours`
--
DROP TABLE IF EXISTS `vistadetallestours`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistadetallestours`  AS SELECT `tours`.`Id_Tour` AS `Id_Tour`, `tours`.`Lugar` AS `Lugar`, `tours`.`Fecha` AS `Fecha`, `tours`.`Medio_Transporte` AS `Medio_Transporte`, `tours`.`Imagen` AS `Imagen`, `tours`.`Precio` AS `Precio` FROM `tours` WHERE `tours`.`Fecha` >= curdate() OR `tours`.`Fecha` <= curdate() ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Id_Cliente`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`Numero_habitacion`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`Id_Historial`),
  ADD KEY `historial_ibfk_1` (`Id_Reserva`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`Id_Reserva`);

--
-- Indices de la tabla `reservas_tours`
--
ALTER TABLE `reservas_tours`
  ADD PRIMARY KEY (`Id_Reserva_Tour`);

--
-- Indices de la tabla `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`Id_Tour`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `Id_Historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `Id_Reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `reservas_tours`
--
ALTER TABLE `reservas_tours`
  MODIFY `Id_Reserva_Tour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`Id_Reserva`) REFERENCES `reservas` (`Id_Reserva`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
