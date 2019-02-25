<?php


class MMaterial implements IMateriales {
    
    var $conn;
    
    function MMaterial() {
        $conexion = new Conexion();
        $this->conn = $conexion->CrearConexion();
    }

    
    
   
    public function BuscarMaterial($idMaterial,$cant) {
         $conexion = new Conexion();
        $conn=$conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
        else{
            $sqlselect ="select Codigo,Nombre,Cantidad,Disponibilidad from tbl_materiales where Codigo = '".$idMaterial."'";
            $result=$conn->query($sqlselect); 
            $conn->close();
            return $result;
        }
    }

    public function BuscarMaterialNombre($nombre) {
        $conexion = new Conexion();
        $conn=$conexion->CrearConexion();
        if ($conn->connect_errno) {
            return -1;
        }
 else { 
            $sql ="SELECT * FROM tbl_materiales WHERE Nombre LIKE '%".$nombre."%' ";
            $result=$conn->query($sql); 
            $conn->close();
            return $result;
      }
       
    }

    public function AgregarMateriales(Materiales $Materiales) {
        
       
        $Codigo = $Materiales->getCodigo();
        $Nombre = $Materiales->getNombre();
        $Cantidad = $Materiales->getCantidad();
        $Disponibilidad = $Materiales->getDisponibilidad();
        $Devolucion = $Materiales->getDevolucion();
        
        $sql ="SELECT Codigo FROM tbl_materiales WHERE Codigo ='$Codigo'";
        $result =  $this-> conn->query($sql);
        
        
        if(mysqli_num_rows($result)>0){    // si el resultado es 1 quiere decir que si existe, por lo tanto no entra a insertar el registro 
            $this-> conn->close(); 
            return 0;
             
        }else{
            $sqlInsert ="INSERT INTO tbl_materiales (Codigo, Nombre, Cantidad, Disponibilidad, Devolucion) VALUES ('$Codigo', '$Nombre', $Cantidad, $Disponibilidad, $Devolucion)";
            $resultInsert =  $this-> conn->query($sqlInsert);      
             $this-> conn->close();
            return $resultInsert;
           
        }
        
        
        
      
        
    }

    public function VerificarDisponibilidad($codigo) {
        
        $sql = "SELECT * FROM tbl_materiales WHERE Codigo ='$codigo'";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        
        if(mysqli_num_rows($result)>0){     
            return $result;
        }else{
            return 0;
        }
       
    }

    public function UpdateMateriales(\Materiales $Materiales) {
        $idHerramienta = $Materiales->getIdHerramienta();
        $Codigo = $Materiales->getCodigo();
        $Nombre = $Materiales->getNombre();
        $Cantidad = $Materiales->getCantidad();
        $Devolucion = $Materiales->getDevolucion();
        $stock=$Materiales->getStock();
        
        $sql = $stock == 0?"UPDATE tbl_materiales SET Codigo = '$Codigo', Nombre = '$Nombre', Cantidad = Cantidad + $Cantidad, Devolucion = $Devolucion WHERE ID_Material = $idHerramienta":
        "UPDATE tbl_materiales SET Codigo = '$Codigo', Nombre = '$Nombre', Devolucion = $Devolucion,Cantidad=$stock WHERE ID_Material = $idHerramienta";
        $result =  $this-> conn->query($sql);
            $this-> conn->close();
            return $result;
        
    }

    public function listarTotalMateriales() {
        $sql ="SELECT codigo,nombre,cantidad FROM tbl_materiales ORDER by nombre ASC ";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
        
    }
    
    public function BuscarTiempoRealHerramienta($consulta){
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT codigo,nombre,cantidad FROM tbl_materiales where Nombre LIKE '%".$consulta."%'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;   
        
    }

    public function BuscarMaterialCodigo($Codigo) {
        $conexion = new Conexion();
        $conn = $conexion->CrearConexion();
        $sql = "SELECT codigo,nombre,cantidad FROM tbl_materiales where Codigo = '$Codigo'";
        $resultado = $conn->query($sql);
        $conn->close();
        return $resultado;    
    }

}
