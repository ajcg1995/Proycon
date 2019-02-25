


$(document).ready(function(){
$("#btnLogin").click(function(){
    validarLogin();
});
      $("#txt_password").keypress(function(event) {
       if(event.keyCode == 13) {
            validarLogin();
       }
    });
        
        

});


function validarLogin(){
      if( $("#txt_usuario").val() == ""|| $("#txt_password").val()==""){
         
      $("#txt_usuario").css('border','1px solid red'); 
    }
    else{
        $.ajax({
           data: {"Usuario":$("#txt_usuario").val(),
                   "Pass" :$("#txt_password").val() },
           type: 'POST',
           url: 'BLL/Login.php',
           success: function (respuesta) { 
                if (respuesta == 1) {
                   location.href = "IU/Inicio.php";   
                }
                else{
                   $("#txt_usuario").css('border','1px solid red'); 
                   $("#txt_password").css('border','1px solid red'); 
                }

                 }
       
   }).fail(function(jqXHR, textStatus, errorThrown){
        if (jqXHR.status === 0) {

    alert('No nos pudimos Conectar con el sevidor Verifique su conexion a Internet ');

  } else if (jqXHR.status == 404) {

    alert('Error [404] No se encontro el Archivo');

  } else if (jqXHR.status == 500) {

    alert('Error de conexion con el servidor');

  }
        
    });; 
    
    
    } 
		
	
}





function listarProyectos(){
    var mostrarP = {"mostrarP" : 100};
    $.ajax({
           data: mostrarP,
           type: 'POST',
           url: 'Menu.php',
           success: function (respuesta) {            
                $(".mostrarProyectos").html(respuesta);
                $(".mostrarProyectos").show();
               // $(".menuBotones").css("float","left");
               $(".menuBotones").css("margin-top","5%");
                $(".menuBotones").css("margin-right","4%");
                $(".informacionProyecto").hide();
                 $(".agregarProyecto").hide();
                 }
       
   }); 
}



