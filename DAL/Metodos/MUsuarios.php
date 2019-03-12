<?php


class MUsuarios implements IUsuarios {
    var $conn;
    
    function MUsuarios(){          
    $conexion = new Conexion();
    $this-> conn=$conexion->CrearConexion();        
    }

    public function ObtenerDatosUsuario($ID_Usuario) {
        $sql ="SELECT u.ID_Usuario,r.Nombre as Rol,u.Nombre,u.Usuario,u.Pass from tbl_usuario u , tbl_rol r
                WHERE u.ID_Usuario = $ID_Usuario and u.ID_Rol=r.ID_Rol; ";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
    }

    public function CambiarPassword($ID_Usuario, $ContraNueva) {
        $sql ="UPDATE tbl_usuario set Pass = '".$ContraNueva."' where ID_Usuario = $ID_Usuario;";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;  
    }
    
     public function RegistrarUsuario(Usuarios $usuarios) {
        $sql = "insert into tbl_usuario(Nombre,ID_Rol,Usuario,Pass,Estado) values ('$usuarios->Nombre','$usuarios->ID_Rol','$usuarios->Usuario','$usuarios->Password','$usuarios->Estado')";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
    }
    
    public function DesactivarUsuario($estado,$idUsuario) {
        $sql = "update tbl_usuario set Estado = '$estado' where ID_Usuario = '$idUsuario'";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
    }

    public function ListarUsuarios() {
        $sql = "select u.ID_Usuario,u.Nombre, u.Usuario, u.Pass, u.Estado, a.Nombre as rol from tbl_usuario u , tbl_rol a WHERE u.ID_Rol = a.ID_Rol ";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
    }
    
    // Reivsar metodo
    public function ModificarUsuario(Usuarios $usuarios) {
        if ($usuarios->Password != "") {
           $sql = "update tbl_usuario set Nombre = '$usuarios->Nombre',Usuario = '$usuarios->Usuario',Pass = '$usuarios->Password',ID_Rol ='$usuarios->ID_Rol',Estado ='$usuarios->Estado' where ID_Usuario = '$usuarios->ID_Usuarios'";  
        }
        else{
             $sql = "update tbl_usuario set Nombre = '$usuarios->Nombre',Usuario = '$usuarios->Usuario',ID_Rol ='$usuarios->ID_Rol',Estado ='$usuarios->Estado' where ID_Usuario = '$usuarios->ID_Usuarios'";
        }
       
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
    }
 

    public function ComboBox() {
        $sql = "SELECT * FROM tbl_rol";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;
    }

    public function ValidarLogin($Usuario, $Pass) {
        try {
         $sql = "Select Nombre,ID_Usuario,Usuario,Pass,ID_ROL from tbl_usuario where Usuario ='$Usuario' and Pass ='$Pass'  and Estado = 1";
        $result =$this->conn->query($sql);
        $this->conn->close();
        return $result;        
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }

  
    }

    public function CambiarNombre($ID_Usuario, $NuevoNombre) {
        $sql ="UPDATE tbl_usuario set Nombre = '".$NuevoNombre."' where ID_Usuario = $ID_Usuario;";
        $result =  $this-> conn->query($sql);
        $this-> conn->close();
        return $result;     
    }

    public function ValidarUsuarioRegistro($Usuario) {
        $sql = "Select ID_Usuario from tbl_usuario where Usuario ='$Usuario'";
        $result =$this->conn->query($sql);
        return $result;   
    }

}
