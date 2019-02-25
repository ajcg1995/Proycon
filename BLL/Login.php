<?php
require_once '..//DAL/Interfaces/IUsuarios.php';
require_once '..//DAL/Metodos/MUsuarios.php';
require_once '../DAL/Conexion.php';

if (isset($_POST['Usuario'])) {
   ValidarLogin($_POST['Usuario'],$_POST['Pass']); 
}

function ValidarLogin($Usuario,$Pass){
    $usuario = new MUsuarios();
    $result = $usuario->ValidarLogin($Usuario, $Pass);
    
    if (mysqli_num_rows($result)>0) {
        //Select Nombre,,Usuario,Pass, 
        $fila = mysqli_fetch_array($result,MYSQLI_ASSOC);
        
        session_start();
        $_SESSION['Usuario']=$fila['Usuario'];
	$_SESSION['Nombre']=$fila["Nombre"];
	$_SESSION['ID_Usuario']=$fila["ID_Usuario"];
	$_SESSION['ID_ROL']=$fila["ID_ROL"];
        
        echo 1;
    }
    else{
        echo 0;
    }
    
}

