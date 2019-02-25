-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 28, 2018 at 02:20 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id5497459_proycon`
--

DELIMITER $$
--
-- Procedures
--
CREATE  PROCEDURE `spFinalizarProyecto` (IN `IDProyecto` INT)  BEGIN
DELETE FROM tbl_devolucionmateriales WHERE ID_Proyecto = IDProyecto;
DELETE FROM tbl_pedidoherramientasproveeduria WHERE Consecutivo = any (SELECT Consecutivo FROM tbl_pedidoproveeduria where ID_Proyecto = IDProyecto);
DELETE FROM tbl_pedidomaterialesproveeduria WHERE Consecutivo = any (SELECT Consecutivo FROM tbl_pedidoproveeduria where ID_Proyecto = IDProyecto);
DELETE FROM tbl_pedidoproveeduria where ID_Proyecto = IDProyecto;
DELETE FROM tbl_prestamoherramientas WHERE NBoleta = any (SELECT Consecutivo FROM tbl_boletaspedido WHERE ID_Proyecto = IDProyecto);
DELETE FROM tbl_prestamomateriales  WHERE NBoleta = any (SELECT Consecutivo FROM tbl_boletaspedido WHERE ID_Proyecto = IDProyecto );
DELETE FROM tbl_boletaspedido WHERE ID_Proyecto = IDProyecto;
UPDATE tbl_proyectos SET Estado = 0 WHERE ID_Proyecto = IDProyecto;
END$$

CREATE  PROCEDURE `SP_ANULARBOLETAMATERIAL` (IN `Boleta` INT)  BEGIN
  DECLARE Cod VARCHAR(6);
  DECLARE Cant BIGINT;
  DECLARE P INTEGER DEFAULT 1 ;
  
  DECLARE fin INTEGER DEFAULT 0;

  DECLARE runners_cursor CURSOR FOR
    SELECT tpm.ID_Material,tpm.Cantidad from  tbl_prestamomateriales tpm
    WHERE tpm.NBoleta= Boleta;
 DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
  OPEN runners_cursor;
  get_runners: LOOP
    FETCH runners_cursor INTO Cod,Cant ;
    IF fin = 1 THEN
       LEAVE get_runners;
    END IF;
          

 UPDATE tbl_materiales SET Cantidad = (Cantidad+Cant) WHERE codigo = Cod;
       DELETE FROM tbl_prestamomateriales WHERE NBoleta = Boleta;
  	  DELETE from tbl_boletaspedido WHERE Consecutivo = Boleta;
 SELECT 1;
  END LOOP get_runners;

  CLOSE runners_cursor;
  


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_actividadesbitacora`
--

CREATE TABLE `tbl_actividadesbitacora` (
  `ID_Actividad` int(11) NOT NULL,
  `Nombre` varchar(80) NOT NULL,
  `Descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bitacoras`
--

CREATE TABLE `tbl_bitacoras` (
  `ID_Bitacora` int(11) NOT NULL,
  `ID_Activadad` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Usuario` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_boletareparacion`
--

CREATE TABLE `tbl_boletareparacion` (
  `NumBoleta` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `ID_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_boletaspedido`
--

CREATE TABLE `tbl_boletaspedido` (
  `Consecutivo` int(11) NOT NULL,
  `ID_Proyecto` int(11) DEFAULT NULL,
  `TipoPedido` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_devolucionmateriales`
--

CREATE TABLE `tbl_devolucionmateriales` (
  `ID_Devolucion` int(11) NOT NULL,
  `Codigo` varchar(6) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `NBoleta` int(11) DEFAULT NULL,
  `ID_Proyecto` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_herramientaelectrica`
--

CREATE TABLE `tbl_herramientaelectrica` (
  `ID_Herramienta` int(11) NOT NULL,
  `Codigo` varchar(6) NOT NULL,
  `ID_Tipo` int(11) NOT NULL,
  `Marca` varchar(15) NOT NULL,
  `Descripcion` varchar(80) NOT NULL,
  `FechaIngreso` date DEFAULT NULL,
  `Estado` tinyint(1) NOT NULL,
  `Disposicion` int(2) NOT NULL,
  `Procedencia` varchar(80) NOT NULL,
  `Ubicacion` int(11) NOT NULL DEFAULT '1',
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_historialherramientas`
--

CREATE TABLE `tbl_historialherramientas` (
  `ID_Historial` int(11) NOT NULL,
  `Codigo` varchar(6) COLLATE utf8_spanish2_ci NOT NULL,
  `Ubicacion` int(11) NOT NULL,
  `Destino` int(11) NOT NULL,
  `NumBoleta` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_materiales`
--

CREATE TABLE `tbl_materiales` (
  `ID_Material` int(11) NOT NULL,
  `Codigo` varchar(15) NOT NULL,
  `Nombre` varchar(80) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Disponibilidad` tinyint(1) NOT NULL,
  `Devolucion` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notificaciones`
--

CREATE TABLE `tbl_notificaciones` (
  `UsuarioBodega` int(11) DEFAULT NULL,
  `UsuarioProveduria` int(11) DEFAULT NULL,
  `ID_Proyecto` int(11) NOT NULL,
  `NBoleta` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pedidoherramientasproveeduria`
--

CREATE TABLE `tbl_pedidoherramientasproveeduria` (
  `ID` int(11) NOT NULL,
  `Consecutivo` int(11) DEFAULT NULL,
  `CodigoHerramienta` int(11) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pedidomaterialesproveeduria`
--

CREATE TABLE `tbl_pedidomaterialesproveeduria` (
  `ID` int(11) NOT NULL,
  `Consecutivo` int(11) DEFAULT NULL,
  `CodigoMaterial` varchar(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pedidoproveeduria`
--

CREATE TABLE `tbl_pedidoproveeduria` (
  `Consecutivo` int(11) NOT NULL,
  `ID_Proyecto` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Comentarios` varchar(1000) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prestamoherramientas`
--

CREATE TABLE `tbl_prestamoherramientas` (
  `ID_Prestamo` int(11) NOT NULL,
  `NBoleta` int(11) NOT NULL,
  `ID_Proyecto` int(11) DEFAULT NULL,
  `Codigo` varchar(6) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL,
  `FechaSalida` date DEFAULT NULL,
  `ID_Tipo` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Triggers `tbl_prestamoherramientas`
--
DELIMITER $$
CREATE TRIGGER `tb_prestamoHerramientas_AU` AFTER INSERT ON `tbl_prestamoherramientas` FOR EACH ROW BEGIN


INSERT tbl_historialherramientas(Codigo,Ubicacion,Destino,NumBoleta,Fecha) VALUES(new.Codigo,(SELECT ubicacion FROM tbl_herramientaelectrica WHERE Codigo = new.Codigo),new.ID_Proyecto,new.NBoleta,new.FechaSalida);

	UPDATE tbl_herramientaelectrica set Ubicacion = NEW.ID_Proyecto, 		Disposicion = 0 WHERE Codigo = NEW.CODIGO;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prestamomateriales`
--

CREATE TABLE `tbl_prestamomateriales` (
  `ID_Prestamo` int(11) NOT NULL,
  `ID_Material` varchar(6) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Pendiente` int(11) DEFAULT NULL,
  `Devolver` tinyint(1) DEFAULT NULL,
  `NBoleta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `tbl_prestamomateriales`
--
DELIMITER $$
CREATE TRIGGER `tbl_materiales_UA` AFTER INSERT ON `tbl_prestamomateriales` FOR EACH ROW UPDATE tbl_materiales set Cantidad = Cantidad - new.Cantidad WHERE 
Codigo = new.ID_Material
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_proyectos`
--

CREATE TABLE `tbl_proyectos` (
  `ID_Proyecto` int(11) NOT NULL,
  `Nombre` varchar(80) NOT NULL,
  `DirectorProyecto` varchar(80) NOT NULL,
  `FechaCreacion` date DEFAULT NULL,
  `FechaCierre` date DEFAULT NULL,
  `Estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_proyectos`
--

INSERT INTO `tbl_proyectos` (`ID_Proyecto`, `Nombre`, `DirectorProyecto`, `FechaCreacion`, `FechaCierre`, `Estado`) VALUES
(1, 'BODEGA', 'Ruddy Rodriguez Lopez', '2018-05-27', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reparacionherramienta`
--

CREATE TABLE `tbl_reparacionherramienta` (
  `ID_Reparacion` int(11) NOT NULL,
  `Codigo` varchar(6) NOT NULL,
  `MontoReparacion` int(11) DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `FechaSalida` date NOT NULL,
  `FechaEntrada` date DEFAULT NULL,
  `NumBoleta` int(11) NOT NULL,
  `ID_FacturaReparacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rol`
--

CREATE TABLE `tbl_rol` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(25) NOT NULL,
  `Descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_rol`
--

INSERT INTO `tbl_rol` (`ID_Rol`, `Nombre`, `Descripcion`) VALUES
(1, 'Administrador', 'Se encarga de dar acceso a los de mas usuarios al sistema'),
(2, 'Proveeduria', 'Recive el pedido y lo envia a bodega'),
(3, 'Direcctor de Proyecto', ''),
(4, 'Bodega', 'Controla todo el inventario');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tempoherramientareparacion`
--

CREATE TABLE `tbl_tempoherramientareparacion` (
  `ID` int(11) NOT NULL,
  `Codigo` varchar(6) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha` date NOT NULL,
  `Boleta` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tipoherramienta`
--

CREATE TABLE `tbl_tipoherramienta` (
  `ID_Tipo` int(11) NOT NULL,
  `Descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tipopedido`
--

CREATE TABLE `tbl_tipopedido` (
  `ID_Tipo` int(11) NOT NULL,
  `Tipo` varchar(15) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trasladotemporal`
--

CREATE TABLE `tbl_trasladotemporal` (
  `Codigo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `idTrasladoT` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(80) NOT NULL,
  `Usuario` varchar(40) NOT NULL,
  `Pass` varchar(40) NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  `Adjuntarcorreo` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`ID_Usuario`, `ID_Rol`, `Nombre`, `Usuario`, `Pass`, `Estado`, `Adjuntarcorreo`) VALUES
(1, 1, 'Andrey Corrales', 'admin', 'admin', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_actividadesbitacora`
--
ALTER TABLE `tbl_actividadesbitacora`
  ADD PRIMARY KEY (`ID_Actividad`);

--
-- Indexes for table `tbl_bitacoras`
--
ALTER TABLE `tbl_bitacoras`
  ADD PRIMARY KEY (`ID_Bitacora`);

--
-- Indexes for table `tbl_boletareparacion`
--
ALTER TABLE `tbl_boletareparacion`
  ADD PRIMARY KEY (`NumBoleta`);

--
-- Indexes for table `tbl_boletaspedido`
--
ALTER TABLE `tbl_boletaspedido`
  ADD PRIMARY KEY (`Consecutivo`);

--
-- Indexes for table `tbl_devolucionmateriales`
--
ALTER TABLE `tbl_devolucionmateriales`
  ADD PRIMARY KEY (`ID_Devolucion`);

--
-- Indexes for table `tbl_herramientaelectrica`
--
ALTER TABLE `tbl_herramientaelectrica`
  ADD PRIMARY KEY (`ID_Herramienta`);

--
-- Indexes for table `tbl_historialherramientas`
--
ALTER TABLE `tbl_historialherramientas`
  ADD PRIMARY KEY (`ID_Historial`);

--
-- Indexes for table `tbl_materiales`
--
ALTER TABLE `tbl_materiales`
  ADD PRIMARY KEY (`ID_Material`);

--
-- Indexes for table `tbl_pedidoherramientasproveeduria`
--
ALTER TABLE `tbl_pedidoherramientasproveeduria`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_pedidomaterialesproveeduria`
--
ALTER TABLE `tbl_pedidomaterialesproveeduria`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_pedidoproveeduria`
--
ALTER TABLE `tbl_pedidoproveeduria`
  ADD PRIMARY KEY (`Consecutivo`);

--
-- Indexes for table `tbl_prestamoherramientas`
--
ALTER TABLE `tbl_prestamoherramientas`
  ADD PRIMARY KEY (`ID_Prestamo`);

--
-- Indexes for table `tbl_prestamomateriales`
--
ALTER TABLE `tbl_prestamomateriales`
  ADD PRIMARY KEY (`ID_Prestamo`);

--
-- Indexes for table `tbl_proyectos`
--
ALTER TABLE `tbl_proyectos`
  ADD PRIMARY KEY (`ID_Proyecto`);

--
-- Indexes for table `tbl_reparacionherramienta`
--
ALTER TABLE `tbl_reparacionherramienta`
  ADD PRIMARY KEY (`ID_Reparacion`);

--
-- Indexes for table `tbl_rol`
--
ALTER TABLE `tbl_rol`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indexes for table `tbl_tempoherramientareparacion`
--
ALTER TABLE `tbl_tempoherramientareparacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_tipoherramienta`
--
ALTER TABLE `tbl_tipoherramienta`
  ADD PRIMARY KEY (`ID_Tipo`);

--
-- Indexes for table `tbl_tipopedido`
--
ALTER TABLE `tbl_tipopedido`
  ADD PRIMARY KEY (`ID_Tipo`);

--
-- Indexes for table `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`ID_Usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_devolucionmateriales`
--
ALTER TABLE `tbl_devolucionmateriales`
  MODIFY `ID_Devolucion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_herramientaelectrica`
--
ALTER TABLE `tbl_herramientaelectrica`
  MODIFY `ID_Herramienta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_historialherramientas`
--
ALTER TABLE `tbl_historialherramientas`
  MODIFY `ID_Historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_materiales`
--
ALTER TABLE `tbl_materiales`
  MODIFY `ID_Material` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pedidoherramientasproveeduria`
--
ALTER TABLE `tbl_pedidoherramientasproveeduria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pedidomaterialesproveeduria`
--
ALTER TABLE `tbl_pedidomaterialesproveeduria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pedidoproveeduria`
--
ALTER TABLE `tbl_pedidoproveeduria`
  MODIFY `Consecutivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_prestamoherramientas`
--
ALTER TABLE `tbl_prestamoherramientas`
  MODIFY `ID_Prestamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_prestamomateriales`
--
ALTER TABLE `tbl_prestamomateriales`
  MODIFY `ID_Prestamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_proyectos`
--
ALTER TABLE `tbl_proyectos`
  MODIFY `ID_Proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_reparacionherramienta`
--
ALTER TABLE `tbl_reparacionherramienta`
  MODIFY `ID_Reparacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tempoherramientareparacion`
--
ALTER TABLE `tbl_tempoherramientareparacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tipoherramienta`
--
ALTER TABLE `tbl_tipoherramienta`
  MODIFY `ID_Tipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tipopedido`
--
ALTER TABLE `tbl_tipopedido`
  MODIFY `ID_Tipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
