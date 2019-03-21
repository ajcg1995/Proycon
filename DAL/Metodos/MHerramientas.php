<?php

class MHerramientas implements IHerrramientas {

    public function FacturacionReparacion(Herramientas $Facturacion) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "UPDATE tbl_reparacionherramienta SET 
		ID_FacturaReparacion=".$Facturacion->NumFactura.",
		Descripcion='".$Facturacion->DescripcionFactura."', 
		FechaEntrada='".$Facturacion->FechaEntrada."', 
		MontoReparacion=".$Facturacion->CostoFactura."
		where Codigo = '$Facturacion->Codigo'
		and NumBoleta = '$Facturacion->NumBoleta'";
	
		$sql2 = "UPDATE tbl_herramientaelectrica SET Disposicion = 0,Estado = 1 
		WHERE Codigo = '$Facturacion->Codigo'";

        $sql3 = "Delete from tbl_tempoherramientareparacion where Codigo = '$Facturacion->Codigo'";
        
        
        // Insetar el transtalo de Bodega al proyecto 
        
        $sql4 = "select Ubicacion from tbl_herramientaelectrica where Codigo = '$Facturacion->Codigo'";
        $ubi = $conn->query($sql4);
        
        if ($ubi <> null) {
            while ($fila = mysqli_fetch_array($ubi, MYSQLI_ASSOC)) {
                $ubicacion = $fila['Ubicacion'];
            }
        }
        
        //Insertar en el historial
        if($sql4 <> null){
            $sql5 = "Insert into tbl_historialherramientas (Codigo,Ubicacion,Destino,NumBoleta,Fecha) values ('" . $Facturacion->Codigo . "','" . "1000" . "','" . $ubicacion . "','" . $Facturacion->NumBoleta . "'," ."'$Facturacion->FechaEntrada');";
            $conn->query($sql5);
        }
                
        $conn->query($sql2);
        $conn->query($sql3);
		
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }


    
	public function listaEnviadas($codigo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "select a.ID_FacturaReparacion from tbl_reparacionherramienta a, tbl_herramientaelectrica b where a.Codigo = b.Codigo and a.Codigo = '$codigo';";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }

    public function BuscarHerramientaPorCodigo($codigo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT tt.ID_Tipo,Codigo, tt.Descripcion,th.Descripcion AS DesH,Marca,th.Precio,th.Procedencia,th.FechaIngreso from tbl_herramientaelectrica th, tbl_tipoherramienta tt
                where th.Codigo= '" . $codigo . "' AND th.ID_Tipo = tt.ID_Tipo;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    public function RegistrarTipoHerramienta(Herramientas $Tipo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
        $sql = "Insert into tbl_tipoherramienta(ID_Tipo,Descripcion) values ('"
                . $Tipo->ID_Tipo . "','"
                . $Tipo->DescripcionTipo . "')";

        $resultadotipo = $conn->query($sql);
        $conn->close();
        return $resultadotipo;
    }
	
	// LISTADO DEL TIPO DE HERRAMIENTAS

    public function listarTipoHerramientas() {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
        $sql = "select ID_Tipo, Descripcion from tbl_tipoherramienta";

        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }
	
	// OBTENER EL CONSECUTIVO EN EL TIPO DE HERRAMIENTA
	
	 public function ObtenerConsecutivoTipo(){
		$conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Select ID_Tipo from tbl_tipoherramienta order by ID_Tipo desc limit 1";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
		
	}
	
	// JALA TODOS LOS VALORES DE LAS HERRAMIENTAS

    public function listarTotalHerramientas() {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "select Codigo, b.Descripcion as Tipo,a.Descripcion, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado,Precio from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto";
		$resultado = $conn->query($sql);
		$sql2 = "Delete from tbl_trasladotemporal where idTrasladoT = '1'";
		$conn->query($sql2);
        $conn->close();
        return $resultado;
    }
	
	// JALA TODOS LOS VALORES DE LAS HERRAMIENTAS MENOS LOS QUE ESTAN DAÑADOS
	
	 public function listarTotalHerramientasTranslado() {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Select Codigo, b.Descripcion as Tipo, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and a.Estado = 1 and Codigo = '0' ";
        $resultado = $conn->query($sql);
		$sql2 = "Delete from tbl_trasladotemporal where idTrasladoT = '1'";
		$conn->query($sql2);
        $conn->close();
        return $resultado;
    }
	
	//  FILTRO DE TRASLADO DE HERRAMIENTAS POR TIPO
	
	public function FiltroTrasladoTipo($tipo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Select Codigo, b.Descripcion as Tipo, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,c.ID_Proyecto,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and a.Estado = 1 
		and b.ID_Tipo = '$tipo';";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }
	
	//  FILTRO DE TRASLADO DE HERRAMIENTAS POR UBICACION
	
	public function FiltrosHerramientasU($ubicacion){
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Select Codigo, b.Descripcion as Tipo, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,c.ID_Proyecto,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and a.Estado = 1 
		and a.Ubicacion = '$ubicacion';";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }
	
    public function totalReparaciones() {

        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
        //$sql = "SELECT tr.ID,tr.Codigo,tt.Descripcion,tr.Fecha,(CURDATE()- tr.Fecha) as Dias, tr.Boleta  from tbl_tempoherramientareparacion tr,tbl_tipoherramienta tt, tbl_herramientaelectrica th WHERE tr.Codigo = th.Codigo and th.ID_Tipo = tt.ID_Tipo;";
       $sql ="SELECT tr.ID,tr.Codigo,tt.Descripcion,tr.Fecha,DATEDIFF(CURDATE(),tr.Fecha) as Dias, tr.Boleta  ,tb.ProveedorReparacion from tbl_tempoherramientareparacion tr,tbl_tipoherramienta tt, tbl_herramientaelectrica th ,tbl_boletareparacion tb WHERE tr.Codigo = th.Codigo and tr.Boleta = tb.NumBoleta and  th.ID_Tipo = tt.ID_Tipo;";
        $resultado = $conn->query($sql);
		$sql2 = "Delete from tbl_trasladotemporal where idTrasladoT = '1'";
		$conn->query($sql2);
        $conn->close();
        return $resultado;
    }

    public function cambiarTipo($ID_Tipo, $DescripcionTipo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
        $sql = "UPDATE tbl_tipoherramienta SET Descripcion='$DescripcionTipo' WHERE ID_Tipo='$ID_Tipo'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }

    public function FacturaReparacion($idReparacion) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
        $sql = "UPDATE tbl_reparacionherramienta SET Descripcion='$DescripcionTipo' WHERE ID_Tipo='$ID_Tipo'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;
    }

   // <!--Agregar una Nueva Herramienta -->
   
   public function RegistrarHerramientas(Herramientas $Herramientas) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
		
		$sql ="SELECT Codigo FROM tbl_herramientaelectrica WHERE Codigo ='". $Herramientas->Codigo . "'";
        $result = $conn->query($sql);
        
        if(mysqli_num_rows($result)>0){    // si el resultado es 1 quiere decir que si existe, por lo tanto no entra a insertar el registro 
          $conn->close();
		return 0;
		} else {
		
        $sql = "Insert into tbl_herramientaelectrica(ID_Tipo,Codigo,Marca,Descripcion,FechaIngreso,Estado,Disposicion,Procedencia,Ubicacion,Precio,NumFactura) values(
		
		'"
		. $Herramientas->Tipo . "','"
                . $Herramientas->Codigo . "','"
                . $Herramientas->Marca . "','"
                . $Herramientas->Descripcion . "','"
                . $Herramientas->Fecha . "','"
                . $Herramientas->Estado . "','"
                . $Herramientas->Disposicion . "','"
                . $Herramientas->Procedencia . "','"
                . $Herramientas->Ubicacion . "','"
                . $Herramientas->Precio . "','"
                . $Herramientas->NumFactura . "')"
                ;
       
        $result = $conn->query($sql);
       
		
		$conn->close();
        //return $result;
                return $sql;
		}
		
		
    }

	// <!--Agregar el consecutivo de la Nueva Herramienta -->
  
	
	 public function ObtenerConsecutivoHerramienta(){
		$conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT MAX(SUBSTRING(Codigo, 2,6) + 0) AS mayor from tbl_herramientaelectrica;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
		
	}
	
	
	
    public function ObternerCosecutivoReparacion() {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = " select NumBoleta from tbl_boletareparacion order by NumBoleta desc limit 1;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
       public function ObternerCosecutivoPedido() {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = " select Consecutivo from tbl_boletaspedido order by Consecutivo desc limit 1;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    public function BuscarHerramientaNombre($descripcion) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        } else {
            $sql = "SELECT a.Codigo,tt.Descripcion,a.Marca, b.Nombre,IF(a.Estado = '1','Buena','Mala')as Estado FROM tbl_herramientaelectrica a, tbl_proyectos b, tbl_tipoherramienta tt where a.Ubicacion = b.ID_Proyecto and a.ID_Tipo = tt.ID_Tipo  and  a.Codigo = '" . $descripcion . "' ";
            $result = $conn->query($sql);
            $conn->close();
            return $result;
        }
    }

    public function RegistrarReparacion($consecutivo, $fecha, $ID_Usuario,$provedorReparacion) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql =  "Insert into tbl_boletareparacion(Numboleta,Fecha,ID_Usuario,ProveedorReparacion) values ($consecutivo,'" . $fecha . "','" . $ID_Usuario . "','$provedorReparacion');";
        
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    public function RegistrarReparacionHerramienta($consecutivo, $codigoHerramienta, $fecha) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Insert into tbl_reparacionherramienta (Codigo,FechaSalida,NumBoleta) values ('" . $codigoHerramienta . "','" . $fecha . "',$consecutivo);";
        $sql3 = "Insert into tbl_tempoherramientareparacion(Codigo,Fecha,Boleta) values('$codigoHerramienta','$fecha',$consecutivo)";
        $sql2 = "UPDATE tbl_herramientaelectrica SET Disposicion = 0, Estado = 0 WHERE Codigo='$codigoHerramienta'";
        
        
        // validar para insertar en el historial
        
        $sql4 = "select Ubicacion from tbl_herramientaelectrica where Codigo = '$codigoHerramienta'";
        $ubi = $conn->query($sql4);
        
        if ($ubi <> null) {
            while ($fila = mysqli_fetch_array($ubi, MYSQLI_ASSOC)) {
                $ubicacion = $fila['Ubicacion'];
            }
        }
        
        //Insertar en el historial
        if($sql4 <> null){
            $sql5 = "Insert into tbl_historialherramientas (Codigo,Ubicacion,Destino,NumBoleta,Fecha) values ('" . $codigoHerramienta . "','" . $ubicacion . "','" . "1000" . "','" . $consecutivo . "'," ."'$fecha');";
            $conn->query($sql5);
        }
        
        
        $result = $conn->query($sql);
        $conn->query($sql2);
        $conn->query($sql3);
        $conn->close();
        return $result;
    }

    public function listarBoletasReparacion() {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.NumBoleta,a.Fecha,b.Nombre FROM tbl_boletareparacion a, tbl_usuario b where b.ID_Usuario = a.ID_Usuario order by NumBoleta DESC";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
	public function eliminarBoletaR($eliboleta){
		
		$conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "delete from tbl_boletareparacion where NumBoleta = '$eliboleta';";
        $result = $conn->query($sql);
		$sql2= "select * from tbl_reparacionherramienta where NumBoleta = '$eliboleta';";
		$rs_cambio = mysqli_query($conn,$sql2);
	    while ($row = mysqli_fetch_array($rs_cambio))
	    {
		$Codigo = $row['Codigo'];
		$sql3 = "UPDATE tbl_herramientaelectrica SET Disposicion = 1, Estado = 1 WHERE Codigo= '$Codigo'";
		$result = $conn->query($sql3);
		}
			
		$sql4 = "delete from tbl_reparacionherramienta where NumBoleta = '$eliboleta';";
		$conn->query($sql4);
        
		$sql5 = "delete from tbl_tempoherramientareparacion where Boleta = '$eliboleta';";
		$conn->query($sql5);
	
		
		
        $conn->close();
        return $result;
		
		
		
	}
	
	public function EliminarTraslado($CodigoTH){
		
		$conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Delete from tbl_trasladotemporal where Codigo = '$CodigoTH';";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
		
	}
	
	
	public function ListarTrasladoMo() {
		
		$conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.Codigo,c.Nombre as Ubicacion,a.FechaIngreso,a.Marca,a.Descripcion FROM tbl_herramientaelectrica a, tbl_trasladotemporal b,tbl_proyectos c WHERE a.Codigo = b.Codigo and a.Ubicacion = c.ID_Proyecto;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
	
   }
   
	
	
	public function GuardarTrasladoT($CodigoT){
            try {
      $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql1 = "SELECT Codigo FROM tbl_trasladotemporal WHERE Codigo = '$CodigoT' ";
         $result = $conn->query($sql1);
        if (mysqli_num_rows($result)> 0) {
          $sqldelte="DELETE FROM tbl_trasladotemporal WHERE Codigo ='$CodigoT'";
          $conn->query($sqldelte);                     
        $result = 0; 
        }
        else
         {
        $sql = "INSERT INTO tbl_trasladotemporal (Codigo, idTrasladoT) VALUES ('$CodigoT','1');";
        $conn->query($sql); 
        $result = 1;
         }    
        $conn->close();
        return $result;   
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
            }		
	}
	
	
	
	
	
    public function VerBoletaReparacion($NumBoleta) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT tr.Codigo,tt.Descripcion,th.Marca from tbl_reparacionherramienta tr, tbl_herramientaelectrica th, tbl_tipoherramienta tt
				WHERE tr.Codigo = th.Codigo and th.ID_Tipo = tt.ID_Tipo and NumBoleta = $NumBoleta ;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
	// FILTROS QUE ORDENAN EL TOTAL DE HERRAMIENTAS
	
	public function FiltrosHerramientas0() {

        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.Codigo,b.Descripcion,a.Descripcion as descr,a.FechaIngreso,IF(a.Disposicion  = '1','Disponible','No Disponible') as Disposicion,c.Nombre,IF(a.Estado  = '1','Buena','En Reparación') as Estado,a.Estado as numEstado,Precio
		from tbl_herramientaelectrica a, tbl_tipoherramienta b,tbl_proyectos c WHERE a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
   }

    public function FiltrosHerramientas1() {

        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.Codigo,b.Descripcion,a.Descripcion as descr,a.FechaIngreso,IF(a.Disposicion  = '1','Disponible','No Disponible') as Disposicion,c.Nombre,IF(a.Estado  = '1','Buena','En Reparación') as Estado,a.Estado as numEstado,Precio
	    from tbl_herramientaelectrica a, tbl_tipoherramienta b,tbl_proyectos c WHERE a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto ORDER BY b.ID_Tipo;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
	public function FiltrosHerramientas2() {

        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.Codigo,b.Descripcion,a.Descripcion as descr,a.FechaIngreso,IF(a.Disposicion  = '1','Disponible','No Disponible') as Disposicion,c.Nombre,IF(a.Estado  = '1','Buena','En Reparación') as Estado,a.Estado as numEstado,Precio
		from tbl_herramientaelectrica a, tbl_tipoherramienta b,tbl_proyectos c WHERE a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto ORDER BY Disposicion;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
	public function FiltrosHerramientas3() {

        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.Codigo,b.Descripcion,a.Descripcion as descr,a.FechaIngreso,IF(a.Disposicion = '1','Disponible','No Disponible') as Disposicion,c.Nombre,IF(a.Estado = '1','Buena','En Reparación') as Estado,a.Estado as numEstado,Precio from tbl_herramientaelectrica a, tbl_tipoherramienta b,tbl_proyectos c WHERE a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto ORDER BY a.Ubicacion,b.Descripcion ;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
	public function FiltrosHerramientas4() {

        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT a.Codigo,b.Descripcion,a.Descripcion as descr,a.FechaIngreso,IF(a.Disposicion  = '1','Disponible','No Disponible') as Disposicion,c.Nombre,IF(a.Estado  = '1','Buena','En Reparación') as Estado,a.Estado as numEstado,Precio
		from tbl_herramientaelectrica a, tbl_tipoherramienta b,tbl_proyectos c WHERE a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto ORDER BY a.Estado;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
    public function FiltroReparacionfecha($fecha) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "select ID_Reparacion,a.Codigo,b.Descripcion ,FechaSalida,FechaEntrada,NumBoleta from tbl_reparacionherramienta a, tbl_tipoherramienta b,  tbl_herramientaelectrica c where c.Codigo = a.Codigo and c.ID_Tipo = b.ID_Tipo and a.FechaSalida = '$fecha';";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    public function FiltroReparacionTipo($tipo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
		
        $sql =  "SELECT tr.ID,tr.Codigo,tt.Descripcion,tr.Fecha,DATEDIFF(CURDATE(),tr.Fecha) as Dias,r.ProveedorReparacion ,tr.Boleta from tbl_tempoherramientareparacion tr,tbl_tipoherramienta tt, tbl_herramientaelectrica th, tbl_boletareparacion r WHERE tr.Codigo = th.Codigo and th.ID_Tipo = tt.ID_Tipo and tr.Boleta=r.NumBoleta and tt.ID_Tipo = $tipo;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
	
	 public function FiltroReparacionCodigo($codigo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql =  "SELECT tr.ID,tr.Codigo,tt.Descripcion,tr.Fecha,(CURDATE()- tr.Fecha) as Dias, tr.Boleta,re.ProveedorReparacion from tbl_tempoherramientareparacion tr,tbl_tipoherramienta tt, tbl_herramientaelectrica th,tbl_boletareparacion re WHERE tr.Codigo = th.Codigo and th.ID_Tipo = tt.ID_Tipo and tr.Boleta= re.NumBoleta and th.Codigo = '$codigo' ";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    public function FiltroReparacionboleta($boleta) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "select ID_Reparacion,a.Codigo,b.Descripcion ,FechaSalida,FechaEntrada,NumBoleta from tbl_reparacionherramienta a, tbl_tipoherramienta b,  tbl_herramientaelectrica c where c.Codigo = a.Codigo and c.ID_Tipo = b.ID_Tipo and a.NumBoleta = $boleta;";
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    public function buscarherramienCodigo($Cod) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "select Codigo, b.Descripcion as Tipo,a.Descripcion, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado,Precio from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and a.Codigo = '$Cod' ";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;  
    }

	// FILTRO POR CODIGO PARA TRASLADO
     public function buscarTraslado($Cod) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "Select Codigo, b.Descripcion as Tipo, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,c.ID_Proyecto,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and a.Estado = 1 
		and  a.Codigo = '$Cod' ";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;  
    }
	// FILTRO PARA EL TOTAL DE REPARACIONES DE LA HERRAMIENTA HISTORIAL
    public function reparacionesTotales($codigo){
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT DISTINCT FechaEntrada,ID_FacturaReparacion,Descripcion,MontoReparacion from tbl_reparacionherramienta where Codigo = '$codigo' ";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;  
    }
	// FILTRO PARA EL TOTAL DE TRASLADOS DE LA HERRAMIENTA HISTORIAL
    public function trasladosTotales($codigo){
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT x.NumBoleta, x.Fecha,(SELECT b.Nombre from tbl_proyectos b where x.Ubicacion = b.ID_Proyecto) as Ubicacion,(SELECT b.Nombre from tbl_proyectos b where x.Destino = b.ID_Proyecto) as Destino FROM tbl_historialherramientas x where x.Codigo = '$codigo' ";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;  
    }
	
	  public function InfoHerramienta($codigo){
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "select Codigo, Marca,Descripcion, FechaIngreso, Procedencia, Precio, NumFactura from tbl_herramientaelectrica where Codigo = '$codigo' ";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;  
    }
	
	
	
    public function BuscarTiempoRealHerramienta($consulta) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        
        session_start();
        if($_SESSION['ID_ROL'] == '4'){
        $sql = "select Codigo, b.Descripcion as Tipo,a.Descripcion, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado,Precio from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and b.Descripcion LIKE '%".$consulta."%'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;     
            
        }else{
        $sql = "select Codigo, b.Descripcion as Tipo,a.Descripcion, FechaIngreso, IF(Disposicion = '1','Disponible','No Disponible')as Disposicion, c.Nombre,IF(a.Estado = '1','Buena','En Reparacion')as Estado,a.Estado as numEstado,Precio from tbl_herramientaelectrica a, tbl_tipoherramienta b, tbl_proyectos c where a.ID_Tipo = b.ID_Tipo and a.Ubicacion = c.ID_Proyecto and a.Disposicion = 1 and a.Estado = 1 and b.Descripcion LIKE '%".$consulta."%'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;             
        }
                
    }

    public function FiltrosHerramientas($Tipo, $Disposicion, $Estado, $Ubicacion) {
        
    }

    public function ActualizarHerramienta(\Herramientas $herramienta) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "UPDATE tbl_herramientaelectrica set Codigo ='".$herramienta->codigo."', Descripcion='".$herramienta->descripcion."',Marca='".$herramienta->marca."',FechaIngreso='".$herramienta->fechaIngreso."',Procedencia='".$herramienta->procedencia."',Precio=$herramienta->precio,ID_Tipo=$herramienta->tipo where Codigo='".$herramienta->codigo."'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;    
    }

}
