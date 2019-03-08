<?php

class Conexion {

    function CrearConexion() {
        //$connect = new mysqli("localhost", "proycon", "S0p0rt32018+", "proycon_BODEGA");
        $connect = new mysqli("localhost", "root", "", "proycon");
        if($connect->connect_error || $connect->error ){
          echo "<script>alert('Error de Conexion con la base de datos ".
                  $connect->connect_error." ERROR ".$connect->error."')</script>";
           exit();      
        }
        else{
        return $connect;
        }
    }

}
