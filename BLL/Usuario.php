<?php
include '..//DATA/Usuarios.php';
include '..//DAL/Interfaces/IUsuarios.php';
include '..//DAL/Metodos/MUsuarios.php';
include '../DAL/Conexion.php';

if (isset($_GET['opc'])) {
    if ($_GET['opc']=='cambioPass') { 
        CambiarPassword($_POST['ID_Usuario'], $_POST['nuevoPass']);
    }
    if($_GET['opc'] == "registrar"){
        registrarUsuario();  
    }else if($_GET['opc'] == "update"){
        actualizarUsuario();
    }else if($_GET['opc'] == "updEstatus"){
        actualizarEstado();
    }
    else if ($_GET['opc']=="cambioNom") {
        CambiarNombre($_POST['ID_Usuario'], $_POST['nuevoNombre']);
    }
}


function ObtenerDatosUsuario($ID_Usuario){
    $bdUsuario = new MUsuarios();
    $result = $bdUsuario->ObtenerDatosUsuario($ID_Usuario);
    if ($result != null)  {
        $fila = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $ID = $fila['ID_Usuario'];
        $Rol =$fila['Rol'];
        $Nombre = $fila['Nombre'];
        $Usuario = $fila['Usuario'];
        $Pass = $fila['Pass'];
        
        $concatenar = "<span id='ID_UsuarioCuenta' style='display:none'>".$ID."</span>            
                     <div class='contieneDatos'>
                        <div class='flotarIz tma'><h3>Nombre</h3></div>
                         <div class='flotarIz'><h3 id='NombreCuenta'>".$Nombre."</h3></div>
                          <div class='flotarIz'><h3><a href='#' onclick='abrirModalCambiarNombre()' >Editar</a></h3></div>
                    </div> 
                    <div class='contieneDatos'>
                        <div class='flotarIz tma'><h3>Usuario</h3></div>
                         <div class='flotarIz'><h3 id='NombreCuenta'>".$Usuario."</h3></div>
                    </div>
                    <div class='contieneDatos'>
                        <div class='flotarIz tma'><h3>Contraseña</h3></div>
                         <div class='flotarIz'><h3 id='PassCuenta'>".$Pass."</h3></div>
                          <div class='flotarIz'><h3><a href='#' data-toggle='modal' data-target='#ModalCambioPassword' >Editar</a></h3></div>
                    </div>  
                    <div class='contieneDatos'>
                        <div class='flotarIz tma'><h3>Rol</h3></div>
                         <div class='flotarIz'><h3 id='id='PassCuenta>".$Rol."</h3></div>
                         
                    </div> 

                                ";
        
        echo $concatenar;
        
    }   
}
 function CambiarPassword($ID_Usuario, $ContraNueva) {
    $bdUsuarios = new MUsuarios();
    $result = $bdUsuarios->CambiarPassword($ID_Usuario, $ContraNueva);
    echo $result;
 }
 function CambiarNombre($ID_Usuario,$NomNuevo){
        $bdUsuarios = new MUsuarios();
        $result =  $bdUsuarios->CambiarNombre($ID_Usuario, $NomNuevo);
        if ($result == 1) {
            $_SESSION["Nombre"] = $NomNuevo;
        }
         $_SESSION["Nombre"] = $NomNuevo;
        echo $result;  
 }
 function actualizarUsuario(){
    $Usuarios = new Usuarios();
    $bdUsuarios = new MUsuarios();
    $Usuarios->ID_Usuarios = $_POST['id'];
    $Usuarios->Nombre = $_POST['nombre'];
    $Usuarios->Usuario = $_POST['usuario'];
    $Usuarios->Password = $_POST['pass'];
    $Usuarios->ID_Rol = $_POST['rol'];
    $Usuarios->Estado = $_POST['status'];
    
    $bdUsuarios->ModificarUsuario($Usuarios);  
    crearTabla();
}

function actualizarEstado(){
    
    $bdUsuarios = new MUsuarios();
    $estado =  $_POST['estado'];
    
    $id =  $_POST['id'];
    
    if($estado== '0'){
        $estado = '1';
    }else{
        $estado = '0';
    }
  
    $bdUsuarios->DesactivarUsuario($estado, $id);
    crearTabla();
}


function registrarUsuario(){
   
    $Usuarios = new Usuarios();
    $bdUsuarios = new MUsuarios();
    
    $Usuarios->Nombre = $_POST['nombre'];
    $Usuarios->Usuario = $_POST['usuario'];
    $Usuarios->Password = $_POST['pass'];
    $Usuarios->ID_Rol = $_POST['rol'];
    $Usuarios->Estado = $_POST['status'];
    $result = $bdUsuarios ->ValidarUsuarioRegistro( $Usuarios->Usuario);
    if (mysqli_num_rows($result)> 0 ) {
       return 0; 
    }else{
    $bdUsuarios->RegistrarUsuario($Usuarios);
    
    crearTabla();
}

    }

function crearTabla(){ 
    $bdUsuarios = new MUsuarios();
    $usuarios = $bdUsuarios->ListarUsuarios();
    $concatenar = '';
    if($usuarios != NULL){
        while ($fila = mysqli_fetch_array($usuarios, MYSQLI_ASSOC)){
            $CheckStatus = '';
            if($fila['Estado'] == 1){
                if ($fila['rol'] == "Administrador") {
                    $CheckStatus = ' <img class="imgEstado" src="../resources/imagenes/correcto.png" width="25px" alt="" onclick="updateEstado(this,1)" />';
                    
                    //<input onclick="updateEstado(this)" disabled ="true" type="checkbox"  checked name="" value="1" />
                }else{
                $CheckStatus = ' <img class="imgEstado" src="../resources/imagenes/correcto.png" width="25px" alt="" onclick="updateEstado(this,1)" />';
                }
                $concatenar  .=
                "<tr>"
                    . "<td>".$fila['ID_Usuario'] . "</td>"
                    . "<td>".$fila['Usuario'] . "</td>"
                    . "<td>".$fila['Nombre'] . "</td>"
                    . "<td>".$fila['rol'] . "</td>"
                    . "<td>".$CheckStatus. "</td>"
                    . "<td>".'<a href="javascript:void(0);" onclick="MostrarFormUsuario(this,1)"> <img src="../resources/imagenes/Editar.png" width="25px"/></a>'."</td>"
               ."</tr>"; 
                      
            
                
            }else if($fila['Estado'] == 0){
                
                  if ($fila['rol'] == "Administrador") {
                    $CheckStatus = ' <img class="imgEstado" src="../resources/imagenes/Malo.png" width="25px" alt="" onclick="updateEstado(this,0)" />';
                }else{
                $CheckStatus = ' <img class="imgEstado" src="../resources/imagenes/Malo.png" width="25px" alt="" onclick="updateEstado(this,0)" />';
                }
          $concatenar  .=
                "<tr>"
                    . "<td class='usuarioBolqueado'>".$fila['ID_Usuario'] . "</td>"
                    . "<td class='usuarioBolqueado'>".$fila['Usuario'] . "</td>"
                    . "<td class='usuarioBolqueado'>".$fila['Nombre'] . "</td>"
                    . "<td class='usuarioBolqueado'>".$fila['rol'] . "</td>"
                    . "<td class='usuarioBolqueado'>".$CheckStatus. "</td>"
                    . "<td class='usuarioBolqueado'>".'<a href="#" onclick="MostrarFormUsuario(this,0)"> <img src="../resources/imagenes/Editar.png" width="25px"/></a>'."</td>"
               ."</tr>"; 
                
                
            }
            
        }       
    }
    print $concatenar;
    
}

function cargarComboBox(){
    //cargar el combobox del modal
    $bdUsuarios = new MUsuarios();
    $datosRoles =  $bdUsuarios->ComboBox();
    
     if($datosRoles != NULL){
        while($fila = mysqli_fetch_array ($datosRoles, MYSQLI_ASSOC)){
           echo "<option value=".$fila['ID_Rol'].">".$fila['Nombre'] . "</option>";            
        }
    }
    
}



