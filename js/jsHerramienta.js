
function FiltrosHerramientas() {
    var Filtro = $("#cboFiltroHerramienta").val();
    switch (Filtro) {
        case "0":
            $.ajax({
                type: 'POST',
                url: '../BLL/Herramientas.php?opc=FiltrosHerramientas0',
                success: function (result) {
                    $('#listadoHerramientas').html(result);
                }
            });
            break;
        case "1":
            $.ajax({
                type: 'POST',
                url: '../BLL/Herramientas.php?opc=FiltrosHerramientas1',
                success: function (result) {
                    $('#listadoHerramientas').html(result);
                }
            });
            break;
        case "2":
            $.ajax({
                type: 'POST',
                url: '../BLL/Herramientas.php?opc=FiltrosHerramientas2',
                success: function (result) {
                    $('#listadoHerramientas').html(result);
                }
            });
            break;
        case "3":
            $.ajax({
                type: 'POST',
                url: '../BLL/Herramientas.php?opc=FiltrosHerramientas3',
                success: function (result) {
                    $('#listadoHerramientas').html(result);
                }
            });
            break;
        case "4":
            $.ajax({
                type: 'POST',
                url: '../BLL/Herramientas.php?opc=FiltrosHerramientas4',
                success: function (result) {
                    $('#listadoHerramientas').html(result);
                }
            });
            break;
    }
}
function AtrasH() {
    if ($("#BoletaReparacionHerramienta").is(":visible")) {
        $("#reparaciones").show();
        $("#BoletaReparacionHerramienta").hide();
        return;
    }
    if ($("#reparaciones").is(":visible")) {
        $(".MostrarBusquedaHerramienta").show();
        $("#reparaciones").hide();
        return;

    }
    if ($(".MostrarHistorialHerramienta").is(":visible")) {
        $("#reparaciones").show();
        $("#btnreparaciones").show();
        $(".MostrarHistorialHerramienta").hide();
        return;
    }
    if ($(".MostrarTransladoHerramienta").is(":visible")) {
        $(".MostrarBusquedaHerramienta").show();
        $(".MostrarTransladoHerramienta").hide();
        return;
    }

    //slistarTotalHerramientas();
}
function Atras() {
    if ($("#BoletaReparacionHerramienta").is(":visible")) {
        $("#reparaciones").show();
        $("#BoletaReparacionHerramienta").hide();
        return;
    }
    if ($("#reparaciones").is(":visible")) {
        $(".MostrarBusquedaHerramienta").show();
        $("#reparaciones").hide();
        return;

    }
    if ($(".MostrarHistorialHerramienta").is(":visible")) {
        $("#reparaciones").show();
        $("#btnreparaciones").show();
        $(".MostrarHistorialHerramienta").hide();
        return;
    }
    if ($(".MostrarTransladoHerramienta").is(":visible")) {
        $(".MostrarBusquedaHerramienta").show();
        $(".MostrarTransladoHerramienta").hide();
        return;
    }

    //slistarTotalHerramientas();
}
// FILTRO DE LA HERRAMIENTA EN REPARACION

function FiltroInicio2() {
    var inicio = $("#CodHerramientaReparacion").val();
    if (inicio == "") {
        MostrarListaReparaciones();
    }
}


// FILTRO DE LA HERRAMIENTA TRASLADO PARA LIMPIAR TODO

function FiltroInicio() {
    var inicio = $("#txtTrasladoCodigo").val();
    if (inicio == "") {

        $.ajax({
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=listarTranslado',
            success: function (respuesta) {

                if (respuesta == -1) {
                    alert("error");
                } else {
                    $('#listadoTransladoHerramienta').html(respuesta);

                }
            }
        });
    }
}

// FILTRO DE LA HERRAMIENTA EN EL TRASLADO TIPO

function FiltroTipoHerramientasT() {
    var tipo = $("#cboTipoHerramientaT").val();
    if (tipo != "0") {

        $.ajax({
            data: {"tipo": tipo},
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=FiltroTipoHerramientasT',
            success: function (result) {

                $('#listadoTransladoHerramienta').html(result);
            }
        });

    } else {

        $.ajax({
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=listarTranslado',
            success: function (respuesta) {

                if (respuesta == -1) {
                    alert("error");
                } else {
                    $('#listadoTransladoHerramienta').html(respuesta);

                }
            }
        });
    }
}

// FILTRO DE LA HERRAMIENTA EN EL TRASLADO UBICACIÓN

function FiltrosHerramientasU() {
    var ubicacion = $("#cboFiltroHerramientaU").val();
    if (ubicacion != "0") {

        $.ajax({
            data: {"ubicacion": ubicacion},
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=FiltrosHerramientasU',
            success: function (result) {

                $('#listadoTransladoHerramienta').html(result);
            }
        });

    } else {

        $.ajax({
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=listarTranslado',
            success: function (respuesta) {

                if (respuesta == -1) {
                    alert("error");
                } else {
                    $('#listadoTransladoHerramienta').html(respuesta);

                }
            }
        });
    }
}
function FiltroReparacionTipoc() {
    $("#txtCodigoVista").val("");
    $("#CodHerramientaReparacion").val("");

}

function FiltroReparacionTipo() {

    var tipo = $("#cbofiltrotipo").val();

    if (tipo == '0') {
        $.ajax({
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=totalReparaciones',
            success: function (respuesta) {

                if (respuesta == -1) {
                    alert("error");
                } else {
                    $('#HerramientasEnReparacion').html(respuesta);
                }
            }
        })


    } else {

        $.ajax({
            data: {"tipo": tipo},
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=FiltroReparacionTipo',
            success: function (result) {
                $('#HerramientasEnReparacion').html(result);
            }
        });
    }
}

function soloLetras(evt) {

    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
            ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 64 || charCode > 90) && (charCode < 97 || charCode > 122))
    {
        return false;
    }
    return true;

}



function soloNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8)
        return true;
    else if (tecla == 0 || tecla == 9)
        return true;
    patron = /[0-9\s]/;// -> solo numeros
    te = String.fromCharCode(tecla);
    return patron.test(te);
}



function LimpiarBoletaFactura() {

    $('#txtNunFactura').val("");
    $('#txtFechaFactura').val("");
    $('#txtDescripcionFactura').val("");
    $('#txtCantidadFactura').val("");
    $("#txtNunFactura").css('border', '1px solid Gainsboro');
    $("#txtFechaFactura").css('border', '1px solid Gainsboro');
    $("#txtDescripcionFactura").css('border', '1px solid Gainsboro');
    $("#txtCantidadFactura").css('border', '1px solid Gainsboro');
}

function FiltroReparacionboleta() {
    var boleta = $("#cbofiltroboleta").val();

    $.ajax({
        data: {"boleta": boleta},
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=FiltroReparacionboleta',
        success: function (result) {

            $('#HerramientasEnReparacion').html(result);
        }
    });
}


function FiltroReparacionfecha() {
    var fecha = $("#cbofiltrofecha").val();

    $.ajax({
        data: {"fecha": fecha},
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=FiltroReparacionfecha',
        success: function (result) {

            $('#HerramientasEnReparacion').html(result);
        }
    });
}


// MUESTRA LA LISTA TOTAL DE HERRAMIENTAS

function listarTotalHerramientas() {
    $("#txtCodigo").val("");
    $("#txtCodigoHerra").val("");
    $("#cboFiltroHerramienta").val(0);
    $(".MostrarHistorialHerramienta").hide();
    $("#BoletaReparacionHerramienta").hide();
    $(".MostrarTransladoHerramienta").hide();
    $(".formHerramientas").hide();
    $(".historialreparaciones").hide();
    $(".MostrarBusquedaHerramienta").show();
    $(".MostrarBusquedaHerramienta").css("top", "-50px");
    if ($("#reparaciones").is(":visible")) {
        $("#reparaciones").hide();
    }

    $.ajax({
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=listar',
        success: function (respuesta) {

            if (respuesta == -1) {
                alert("error");
            } else {
                $('#listadoHerramientas').html(respuesta);

            }
        }
    })
}

function LimpiarColorHerramienta() {
    $("#txtDescripcionH").css('border', '1px solid Gainsboro');
    $("#txtMarcaH").css('border', '1px solid Gainsboro');
    $("#txtProcedenciaH").css('border', '1px solid Gainsboro');
    $("#txtFechaRegistroH").css('border', '1px solid Gainsboro');
    $("#comboHerramientaTipoH").css('border', '1px solid Gainsboro');
    $("#txtCodigoH2").css('border', '1px solid Gainsboro');
    $("#txtPrecioH").css('border', '1px solid Gainsboro');

    $("#txtDescripcionH").val("");
    $("#txtMarcaH").val("");
    $("#txtProcedenciaH").val("");
    $("#txtFechaRegistroH").val("");
    $("#txtCodigoH2").val("");
    $("#comboHerramientaTipoH").val(0);
    $("#txtPrecioH").val("");


}

//Guardar Herramientas

function GuardarHerramienta() {
    var consecutivoHerramienta = $('#txtCodigoH2').val()
    var validaciones = 7;
    var validardescripcion = $('#txtDescripcionH').val()
    var validarmarca = $('#txtMarcaH').val()
    var validarprocedencia = $('#txtProcedenciaH').val()
    var validarfecha = $('#txtFechaRegistroH').val()
    var validartipo = $('#comboHerramientaTipoH').val()
    var validarprecio = $('#txtPrecioH').val()
    var datos = {
        "Codigo": $('#txtCodigoH2').val(),
        "Descripcion": $('#txtDescripcionH').val(),
        "Marca": $('#txtMarcaH').val(),
        "Procedencia": $('#txtProcedenciaH').val(),
        "Fecha": $('#txtFechaRegistroH').val(),
        "Tipo": $('#comboHerramientaTipoH').val(),
        "Precio": $('#txtPrecioH').val()
    };

    // Valida el campo de la Descripcion

    if (consecutivoHerramienta == "") {
        $("#txtCodigoH2").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtCodigoH2").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }


    if (validardescripcion == "") {
        $("#txtDescripcionH").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtDescripcionH").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    if (validarprecio == "") {
        $("#txtPrecioH").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtPrecioH").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }


    // Valida el campo Marca

    if (validarmarca == "") {
        $("#txtMarcaH").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtMarcaH").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;

    }

    // Valida el campo Procedencia

    if (validarprocedencia == "") {
        $("#txtProcedenciaH").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtProcedenciaH").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    // Valida el campo Fecha

    if (validarfecha == "") {
        $("#txtFechaRegistroH").css('border', '1px solid red');
        validaciones = validaciones + 1;

    } else {
        $("#txtFechaRegistroH").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    // Valida campo Tipo

    if (validartipo == 0) {
        $("#comboHerramientaTipoH").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#comboHerramientaTipoH").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    if (validaciones == 0) {

        $.ajax({
            data: datos,
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=guardar',
            success: function (respuesta) {

                if (respuesta != 0) {

                    $("#modalheaderAgregarHerramienta").addClass("mensajeCorrecto");
                    $("#tituloModalAgregarHerramienta").html("<strong>Se Guardo Correctamente la Herramienta </strong>");
                    limpiarFormHerramienta(consecutivoHerramienta);
                    listarTotalHerramientas();
                    setTimeout(function () {
                        $('#ModalAgregarHerramienta').modal('hide');
                    }, 3000);
                } else {
                    $("#modalheaderAgregarHerramienta").addClass("mensajeError");
                    $("#tituloModalAgregarHerramienta").html("<strong>El Codigo ya fue ingresado</strong>");
                }
            }


        })
    } else {
        $("#modalheaderAgregarHerramienta").addClass("mensajeError");
        $("#tituloModalAgregarHerramienta").html("<strong>Debes llenar todos los campos del Formulario</strong>");
    }

    setTimeout(function () {
        $("#modalheaderAgregarHerramienta").removeClass("mensajeCorrecto");
        $("#modalheaderAgregarHerramienta").removeClass("mensajeError");
        $("#tituloModalAgregarHerramienta").html("Registrar Herramientas");
    }, 3000);


}

// Editar el Tipo de las Herramientas

function LimpiarColorTipoHerramienta() {
    $("#txtnombreTipoHerramienta").val("");
    $("#txtnombreTipoHerramienta").css('border', '1px solid Gainsboro');
    var EditarconsecutivoTipo = $('#txtIDTipoHerramienta2').val()
    $('#txtIDTipoHerramienta').val(EditarconsecutivoTipo);

}

function CambiarTipoHerramienta() {
    var ID_Tipo = $("#txtIDTipoHerramienta").val();
    var DescripcionTipo = $("#txtnombreTipoHerramienta").val();
    var validaciones = 1;

    if (DescripcionTipo == "") {
        $("#txtnombreTipoHerramienta").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtnombreTipoHerramienta").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    if (validaciones == 0) {

        $.ajax({
            data: {ID_Tipo: ID_Tipo, DescripcionTipo: DescripcionTipo},
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=cambiarTipo',
            success: function (respuesta) {
                $("#modalTipo").addClass("mensajeCorrecto");
                $("#tituloModalAgregarTipo").html("<strong>Se Edito Correctamente el Tipo de Herramienta </strong>");
                EditarlimpiarFormTipo();
                listarTipoHerramientas();
            }
        })
    } else {
        $("#modalTipo").addClass("mensajeError");
        $("#tituloModalAgregarTipo").html("<strong>Debes llenar la Descripcion del Tipo Herramienta</strong>");
    }
    setTimeout(function () {
        $("#modalTipo").removeClass("mensajeCorrecto");
        $("#modalTipo").removeClass("mensajeError");
        $("#tituloModalAgregarTipo").html("Agregar Nuevo Tipo De Herramientas");

    }, 3000);
}

// GUARDAR TIPO HERRAMIENTA

function GuardarTipoHerramienta() {
    var consecutivoTipo = $('#txtIDTipoHerramienta').val()
    var validaciones = 1;
    var validardescripcion = $('#txtnombreTipoHerramienta').val()

    var datos = {
        "ID_Tipo": $('#txtIDTipoHerramienta').val(),
        "DescripcionTipo": $('#txtnombreTipoHerramienta').val()
    };


    if (validardescripcion == "") {
        $("#txtnombreTipoHerramienta").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtnombreTipoHerramienta").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    if (validaciones == 0) {

        $.ajax({
            data: datos,
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=guardarTipo',
            success: function (respuesta) {
                $("#modalTipo").addClass("mensajeCorrecto");
                $("#tituloModalAgregarTipo").html("<strong>Se Guardo Correctamente el Tipo de Herramienta </strong>");
                limpiarFormTipo(consecutivoTipo);
                listarTipoHerramientas();
                setTimeout(function () {
                    $('#ModalAgregarTipoHerramienta').modal('hide');
                }, 3000);
            }
        })

    } else {
        $("#modalTipo").addClass("mensajeError");
        $("#tituloModalAgregarTipo").html("<strong>Debes llenar la Descripcion del Tipo Herramienta</strong>");
    }
    setTimeout(function () {
        $("#modalTipo").removeClass("mensajeCorrecto");
        $("#modalTipo").removeClass("mensajeError");
        $("#tituloModalAgregarTipo").html("Agregar Nuevo Tipo De Herramientas");
    }, 3000);

}


function listarTipoHerramientas() {
    $("#btnEditarTipo").hide();
    $("#btnGuardarTipo").show();
    $.ajax({
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=listarTipo',
        success: function (respuesta) {

            if (respuesta == -1) {
                alert("error")
            } else {

                $('#listadoTipoHerramientas').html(respuesta);
            }
        }
    })
}

function limpiarFormTipo(consecutivoTipo) {
    var num2 = 1;
    var suma = parseInt(consecutivoTipo) + parseInt(num2);
    $('#txtnombreTipoHerramienta').val(""),
            $('#txtIDTipoHerramienta').val(suma);
    $('#txtIDTipoHerramienta2').val(suma);
}
function EditarlimpiarFormTipo() {
    var EditarconsecutivoTipo = $('#txtIDTipoHerramienta2').val()
    $('#txtnombreTipoHerramienta').val(""),
            $('#txtIDTipoHerramienta').val(EditarconsecutivoTipo);
}

function limpiarFormFactura() {
    $('#txtNunFactura').val(""),
            $('#txtFechaFactura').val(""),
            $('#txtDescripcionFactura').val(""),
            $('#txtCantidadFactura').val("")
}

function limpiarFormHerramienta(consecutivoHerramienta) {
    var codigoHerramienta = consecutivoHerramienta
    $('#txtCodigoH').val(codigoHerramienta),
            $('#txtCodigoH2').val(""),
            $('#txtDescripcionH').val(""),
            $('#txtPrecioH').val(""),
            $('#txtMarcaH').val(""),
            $('#txtProcedenciaH').val(""),
            $('#txtFechaRegistroH').val(""),
            $('#comboHerramientaTipoH').val("0")
}

function MostrarFormReparaciones() {
    $("#mostrarTablaReparaciones").hide();
    $("#MostrarHistorialHerramienta").hide();
    $("#btnreparaciones").hide();
    $("#btnRegresar").show("slow");
    $(".nuevoPedido").show("slow");
    $("#EnviarHerramienta").show();

}

// MUESTRA LA LISTA DE HERRAMIENTAS EN TRASLADO

function MostrarTransladoHerramienta() {
    $("#txtCodigo").val("");
    $("#txtTrasladoCodigo").val("");
    $("#cboFiltroHerramientaU").val(0);
    $("#cboTipoHerramientaT").val(0);
    $(".MostrarHistorialHerramienta").hide();
    $("#BoletaReparacionHerramienta").hide();
    $(".formHerramientas").hide();
    $(".historialreparaciones").hide();
    $(".MostrarBusquedaHerramienta").hide();
    $(".MostrarTransladoHerramienta").show("slow");
    $(".MostrarTransladoHerramienta").css("top", "-50px");
    if ($("#reparaciones").is(":visible")) {
        $("#reparaciones").hide();
    }

    $.ajax({
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=listarTranslado',
        success: function (respuesta) {

            if (respuesta == -1) {
                alert("error");
            } else {
                $('#listadoTransladoHerramienta').html(respuesta);

            }
        }
    })
}

function LimpiarBusquedaHerramienta() {

    $("#txtCodigoHerramientaBuscar").val("");

    var numFilas = $("#tbl_R_Herramientas tbody tr").length;
    for (i = 0; i < numFilas; i++) {
        $("#tbl_R_Herramientas tbody tr").remove();

    }

}



/////// CARGA EL TOTAL DE REPARACIONES Y HISTORIAL DE TRASLADO DE LAS HERRAMIENTAS

function MostrarHistorial()
{
    var codigo = $("#txtCodigoVista").val();
    $("#codigo").val(codigo);
    $("#reparaciones").hide();
    $("#btnreparaciones").hide();
    $(".MostrarHistorialHerramienta").show("slow");
    $("#EnviarHerramienta").hide();
    $(".MostrarTransladoHerramienta").hide();
    $("#BoletaReparacionHerramienta").hide();
    $("#mostrarTablaReparaciones").hide();
    $("#reparaciones").hide();
    if ($(".MostrarBusquedaHerramienta").is(":visible")) {
        $(".MostrarBusquedaHerramienta").hide();
    }



    // ME LLENA LOS CAMPOS DEL TOTAL DE REPARACIONES DE LA HERRAMIENTA
    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=reparacionesTotales&codigo=" + codigo,
        success: function (respuesta) {
            if (respuesta != "") {

                $('#tablareparacionestotales').html(respuesta);
            }
        }
    })

    // ME LLENA LOS CAMPOS DEL TOTAL DE TRASLADOS DE LA Herramienta
    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=trasladosTotales&codigo=" + codigo,
        success: function (respuesta) {
            if (respuesta != "") {

                $('#tablatrasladostotales').html(respuesta);
            }
        }
    })

    // ME LLENA LOS CAMPOS DEL HISTORIAL DE LA Herramienta

    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=InfoHerramienta&codigo=" + codigo,
        success: function (respuesta) {
            var informacion = respuesta;
            var Cadena = informacion.split(";");
            var Codigo = Cadena[0];
            var Marca = Cadena[3];
            ;
            var Descripcion = Cadena[1];
            var Fecha = Cadena[4];
            var Procedencia = Cadena[2];

            $("#NombreHerramienta").html(Codigo);
            $("#FechaAdquisicion").html(Marca);
            $("#HerramientaMarca").html(Descripcion);
            $("#ProcedenciaHerramienta").html(Fecha);
            $("#DescripcionHerramienta").html(Procedencia);

        }
    })


}
function AnularBoletaMaterial() {
    var eliboleta = $("#consecutivoBoletaSeleccionado").html();
    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=eliminarBoletaR&eliboleta=" + eliboleta,
        success: function (respuesta) {
            $("#voletaVista").addClass("mensajeCorrecto");
            $("#tituloBoletaV").html("<strong>Boleta Eliminada Correctamente</strong>")
            MostraBoletasReparaciones();
            setTimeout(function () {
                $('#ModalVerBoletaReparacion').modal('hide');
            }, 3000);
        }
    })

    setTimeout(function () {
        $("#voletaVista").removeClass("mensajeCorrecto");
        $("#tituloBoletaV").html("Boleta de Reparación de la Herramienta");
    }, 3000);

}

function LimpiarRegistroReparaciones() {
    $("#CodHerramientaReparacion").val("");
    $("#cbofiltrotipo").val(0);
    $("#txtCodigo").val("");

}


function MostrarListaReparaciones() {

    $("#txtCodigo").val("");
    $("#cbofiltrotipo").val("0");
    $("#CodHerramientaReparacion").val("");
    $("#txtCodigoVista").val("");



    $(".MostrarHistorialHerramienta").hide();
    $("#EnviarHerramienta").hide();
    $(".MostrarTransladoHerramienta").hide();
    $("#reparaciones").show("slow");
    $("#btnreparaciones").show("slow");
    $("#BoletaReparacionHerramienta").hide();
    $("#mostrarTablaReparaciones").show("slow");


    if ($(".MostrarBusquedaHerramienta").is(":visible")) {
        $(".MostrarBusquedaHerramienta").hide();
    }

    $.ajax({
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=totalReparaciones',
        success: function (respuesta) {

            if (respuesta == -1) {
                alert("error");
            } else {
                $('#HerramientasEnReparacion').html(respuesta);
            }
        }
    })


}


function listaEnviadas() {


    var datos = {
        "codigo": $("#txtCodigoHerramientaBuscar").val()
    };

    $.ajax({
        data: datos,
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=listaEnviadas',
        success: function (resultado) {
            if (resultado == null) {
                alert("El valor ya se encuenta en base");
                alert(resultado);
            } else {
                alert("El valor se puede usar");
                alert(resultado);
            }
        }
    })
}



function BuscarHerramientaNombre() {
    var descripcion = $("#txtCodigoHerramientaBuscar").val();


    $.ajax({
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=descripcion&Descripcion=' + descripcion + '',
        success: function (respuesta) {
            if (respuesta == "") {

                $("#modalBoletaReparacionHerramienta").addClass("mensajeError");
                $("#mensajeBoletaReparacion").html("<strong>Digite una Herramienta Valida</strong>");

            } else {
                $("#ContenidoReparaciones").append(respuesta);
                $("#txtCodigoHerramientaBuscar").val("");
            }

        }
    });


    setTimeout(function () {
        $("#modalBoletaReparacionHerramienta").removeClass("mensajeError");
        $("#mensajeBoletaReparacion").html("Salida De Herramienta Ha Reparación");

    }, 3000);
}

// JALA VALORES DE LA HERRAMIENTA Y LOS MUESTRA EN LA FACTURA DE REPARACION

function FacturaReparacion(evento) {
    var id_reparacion = $(evento).parents("tr").find("td").eq(0).html();
    var nombre = $(evento).parents("tr").find("td").eq(2).html();
    var Codigo = $(evento).parents("tr").find("td").eq(1).html();
    var numBoleta = $(evento).parents("tr").find("td").eq(6).html();
    $("#NomHerramienta").html(nombre);
    $("#NumReparacion").html(id_reparacion);
    $("#CodHerramienta").html(Codigo);
    $("#NumBoletaF").html(numBoleta);
    $("#ModalRegistrarGastos").modal("show");

}
function EliminarLista(evento) {
    $(evento).parents("tr").remove();
}

// JALA LOS VALORES DE LA HERRAMIENTA Y MUESTRA VENTANA DE TRASLADO DE Herramientas

function TransladoHerramienta(evento) {


    var CodigoT = $(evento).parents("tr").find("td").eq(0).html();

    $.ajax({
        data: {"CodigoT": CodigoT},
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=GuardarTrasladoT',
        success: function (resultado) {
            if (resultado = '1') {
                $(evento).parents("tr").find("td").addClass('trasladoT');
            } else {


            }
        }

    })
}

function ListarTrasladoMo() {

    $("#DestinoTrasl").html("");
    $("#cboFiltroTipoHerramientaT").val(0);
    $("#txtCodigo").val("");
    $("#txtTrasladoCodigo").val("");
    $("#cboFiltroHerramientaU").val(0);
    $("#cboTipoHerramientaT").val(0);

    $("#cboFiltroTipoHerramientaT").css('border', '1px solid Gainsboro');
    var Dia = $('#idDia').html();
    var dt = new Date();
    var mes = dt.getMonth() + 1;
    var FechaFinal = dt.getFullYear() + '-' + mes + '-' + dt.getDate();
    $("#FechaFinal").html(FechaFinal);

    $.ajax({
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=ListarTrasladoMo',
        success: function (respuesta) {

            if (respuesta == -1) {
                alert("error")
            } else {
                $("#ModalTranslado").modal("show");
                $('#tablaMostrarTraslado').html(respuesta);
            }
        }
    })
}

function EliminarTraslado(evento) {


    var CodigoTH = $(evento).parents("tr").find("td").eq(0).html();
    $.ajax({
        data: {"CodigoTH": CodigoTH},
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=EliminarTraslado',
        success: function (resultado) {
            if (resultado = '1') {
                $(evento).parents("tr").remove();
            } else {


            }
        }

    })
}
// GUARDA LA FACTURA DE LA REPARACION DE LA HERRAMIENTA Y VALIDA SUS CAMPOS

function ElaborarFactura() {

    var validaciones = 4;
    var validarFactura = $('#txtNunFactura').val();
    var validarFecha = $('#txtFechaFactura').val();
    var validarDescripcion = $('#txtDescripcionFactura').val();
    var validarCosto = $('#txtCantidadFactura').val();

    // Valida el campo Factura

    if (validarFactura == "") {
        $("#txtNunFactura").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtNunFactura").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;

    }

    // Valida el campo Fecha

    if (validarFecha == "") {
        $("#txtFechaFactura").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtFechaFactura").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    // Valida el campo Descripcion

    if (validarDescripcion == "") {
        $("#txtDescripcionFactura").css('border', '1px solid red');
        validaciones = validaciones + 1;

    } else {
        $("#txtDescripcionFactura").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;
    }

    // Valida campo Costo

    if (validarCosto == "") {
        $("#txtCantidadFactura").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#txtCantidadFactura").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;


    }

    if (validaciones == 0) {

        var datos = {
            "Codigo": $("#CodHerramienta").html(),
            "ID_Reparacion": $('#NumReparacion').html(),
            "NumFactura": $('#txtNunFactura').val(),
            "FechaEntrada": $('#txtFechaFactura').val(),
            "DescripcionFactura": $('#txtDescripcionFactura').val(),
            "NumBoleta": $('#NumBoletaF').html(),
            "CostoFactura": $('#txtCantidadFactura').val()
        };

        $.ajax({
            data: datos,
            type: 'POST',
            url: '../BLL/Herramientas.php?opc=guardarFactura',
            success: function (resultado) {

                $("#headermodalRegistroGastos").addClass("mensajeCorrecto");
                $("#tituloRegistrarGasto").html("<strong>Factura registrada correctamente</strong>")
                limpiarFormFactura();
                MostrarListaReparaciones();
                setTimeout(function () {
                    $('#ModalRegistrarGastos').modal('hide');
                }, 3000);

            }
        })
    } else {
        $("#headermodalRegistroGastos").addClass("mensajeError");
        $("#tituloRegistrarGasto").html("<strong>Debes llenar todos los campos del Formulario</strong>");
    }

    setTimeout(function () {
        $("#headermodalRegistroGastos").removeClass("mensajeCorrecto");
        $("#headermodalRegistroGastos").removeClass("mensajeError");
        $("#tituloRegistrarGasto").html("Factura de la Reparación");
    }, 3000);

}

function guardarNombreDestino() {
    var nuevoD = $('#cboFiltroTipoHerramientaT option:selected').html();
    $("#DestinoTrasl").html(nuevoD);
}

// SE ENCARGAR DE VALIDAR CAMPOS Y ENVIAR LOS DATOS DEL TRASLADO 

function ElaborarTranslado() {
    var cambio = $('#ConsecutivoPedidoHerramientaF').html();
    var validaciones = 1;
    var validarDestino = $('#cboFiltroTipoHerramientaT').val();

    // Valida el campo Destino

    if (validarDestino == "0") {
        $("#cboFiltroTipoHerramientaT").css('border', '1px solid red');
        validaciones = validaciones + 1;
    } else {
        $("#cboFiltroTipoHerramientaT").css('border', '1px solid Gainsboro');
        validaciones = validaciones - 1;

    }
    if (validaciones == 0) {
        var Destino = $('#cboFiltroTipoHerramientaT').val();
        var NumBoleta = $('#ConsecutivoPedidoHerramientaF').html();
        var FechaFinal = $('#FechaFinal').html();

        var datos = {
            "Destino": Destino,
            "NumBoleta": NumBoleta,
            "FechaFinal": FechaFinal
        };
        $.ajax({
            data: datos,
            type: "POST",
            url: "../BLL/Herramientas.php?opc=guardarTranslado",
            success: function (respuesta) {
                if (respuesta != cambio) {
                    $("#ConsecutivoPedidoHerramientaF").html(respuesta);
                    $("#modalTransladoBoleta").addClass("mensajeCorrecto");
                    $("#mensajeTranslado").html("<strong>Traslado Guardado Correctamente</strong>");
                    $.ajax({
                        type: 'POST',
                        url: '../BLL/Herramientas.php?opc=listarTranslado',
                        success: function (respuesta) {

                            if (respuesta == -1) {
                                alert("error");
                            } else {
                                $('#listadoTransladoHerramienta').html(respuesta);
                                $('#cboFiltroTipoHerramientaT').val(0);
                                setTimeout(function () {
                                    $('#ModalTranslado').modal('hide');
                                }, 3000);
                            }
                        }
                    })

                } else {
                    $("#modalTransladoBoleta").addClass("mensajeError");
                    $("#mensajeTranslado").html("<strong>Debes Seleccionar las Herramientas a Trasladar</strong>");

                }
            }

        })

    } else {
        $("#modalTransladoBoleta").addClass("mensajeError");
        $("#mensajeTranslado").html("<strong>Debes Seleccionar un Destino</strong>");
    }

    setTimeout(function () {
        $("#modalTransladoBoleta").removeClass("mensajeCorrecto");
        $("#modalTransladoBoleta").removeClass("mensajeError");
        $("#mensajeTranslado").html("Traslado de Herramienta");

    }, 3000);

}

function EditarTipoHerramienta(evento) {

    var id = $(evento).parents("tr").find("td").eq(0).html();
    var tipo = $(evento).parents("tr").find("td").eq(1).html();
    $('#txtIDTipoHerramienta').val(id),
            $('#txtnombreTipoHerramienta').val(tipo);
    $("#btnEditarTipo").show();
    $("#btnGuardarTipo").hide();
}

function AgregarHerramientaBuscadoPNombre(evento) {


    var cod = $(evento).parents("tr").find("td").eq(0).html();
    var descripcion = $(evento).parents("tr").find("td").eq(1).html();
    var marca = $(evento).parents("tr").find("td").eq(2).html();
    var estado = $(evento).parents("tr").find("td").eq(3).html();
    var ubicacion = $(evento).parents("tr").find("td").eq(4).html();

    var nuevaFila = "<tr>" +
            "<td>" + cod + "</td>" +
            "<td>" + descripcion + "</td>" +
            "<td>" + marca + "</td>" +
            "<td>" + estado + "</td>" +
            "<td>" + ubicacion + "</td>" +
            "<td>" +
            "<button title='Quitar Fila' class='btnRemoverFila' type='button'  onclick='Remover(this)'>" +
            "<img title='Eliminar Fila' src='../resources/imagenes/remove.png' alt='' width='20px'/>" +
            "</button>" +
            "</td>" +
            "</tr>";
    $("#ContenidoReparaciones").append(nuevaFila);

}



function Remover(evento) {
    $(evento).parents("tr").remove();
}


//GUARDARRRRRRRRRRRRRR BOLESTASSSSSSSSSSSSSSSSSSSSS 


function GuardarBoletaReparaciones() {

    var dt = new Date();
    var mes = dt.getMonth() + 1;
    var fecha = dt.getFullYear() + '-' + mes + '-' + dt.getDate();
    var numFilas = $("#tbl_R_Herramientas tbody tr").length;
    var consecutivo = $("#ConsecutivoPedidoHerramienta").html();
    var totalHerramientas = new Array(numFilas);
    var cont = 1;
    var i;

    if (numFilas > 0 && $('#provedorReparacion').val()!= "" ) {
        for (i = 0; i < numFilas; i++) {

            totalHerramientas [i] = document.getElementById("tbl_R_Herramientas").rows[cont].cells[0].innerHTML
            cont++;
        }
        var datos = {
            "consecutivo": consecutivo,
            "fecha": fecha,
            "arreglo": JSON.stringify(totalHerramientas),
            "proveedorReparacion":$('#provedorReparacion').val()

        };

        AjaxRegistroBolestasReparaciones(datos);
    }


}

function AjaxRegistroBolestasReparaciones(datos) {

    $.ajax({
        data: datos,
        type: "POST",
        url: "../BLL/Herramientas.php?opc=registrarReparacion",
        success: function (respuesta) {
            if (respuesta != 0) {

                $("#ConsecutivoPedidoHerramienta").html(" " + respuesta);
                $("#modalBoletaReparacionHerramienta").addClass("mensajeCorrecto");
                $("#mensajeBoletaReparacion").html("<strong>La Boleta se ha generado correctamente</strong>")
                $("#tbl_R_Herramientas tbody tr").remove();
                $("#tablaherramientas tbody tr").remove();
                setTimeout(function () {
                    $('#ModalEnviarReparacion').modal('hide');
                }, 2000);
            }



        }


    });

    setTimeout(function () {
        $("#modalBoletaReparacionHerramienta").removeClass("mensajeCorrecto");
        $("#mensajeBoletaReparacion").html("<strong>Salida de Herramienta ha Reparación</strong>")
        MostrarListaReparaciones();

    }, 2000);
}

//      MOSTRA LA LISTA DE BOLETAS DISPONIBLES

function MostraBoletasReparaciones() {
    $.ajax({
        url: "../BLL/Herramientas.php?opc=listarBoletasReparacion",
        success: function (respuesta) {
            $("#contenidoBoletasReparacion").html(respuesta);
            $("#BoletaReparacionHerramienta").show();
            $(".MostrarTransladoHerramienta").hide();
            $(".formHerramientas").hide();
            $(".historialreparaciones").hide();

            if ($("#reparaciones").is(":visible")) {
                $("#reparaciones").hide();
            }

        }
    });
}




function VerBoletaReparacion(evento) {

    var fecha = $(evento).parents("tr").find("td").eq(1).html();
    var Usuario = $(evento).parents("tr").find("td").eq(2).html();
    $("#consecutivoBoletaSeleccionado").html($(evento).parents("tr").find("td").eq(0).html());
    var arregloFecha = fecha.split("-");
    $("#dia").html(arregloFecha[2]);
    $("#mes").html(arregloFecha[1]);
    $("#anno").html(arregloFecha[0]);
    $("#generadaPor").html(Usuario);
    $("#ModalVerBoletaReparacion").modal("show");
    $.ajax({
        url: "../BLL/Herramientas.php?opc=VerBoletaReparacion&NumBoleta=" + $(evento).parents("tr").find("td").eq(0).html(),
        success: function (respuesta) {
            $("#contenidoBoletaReparacion").html(respuesta);
        }
    });


}

function AgregarGastos() {
    $(".agregarGasto").toggle("slow");
}
function ActualizarTipoHerramienta(event) {
    if (event != null) {
        $("#btnActualizarTipoH").show();
        $("#btnAddTipo").hide();
        var id = $(event).parents("tr").find("td").eq(0).html();
        var tipo = $(event).parents("tr").find("td").eq(1).html();
        $("#txtnombreTipoHerramienta").val(tipo);
    } else {
        $("#btnActualizarTipoH").hide();
        $("#btnAddTipo").show();
    }
}
function RegistrarGasto(evento) {
    if (evento != null)
    {
        $("#ModalRegistrarGastos").modal();
        var codigo = $(evento).parents("tr").find("td").eq(0).html();
        var tipo = $(evento).parents("tr").find("td").eq(1).html();
        var fecha = $(evento).parents("tr").find("td").eq(2).html();
        $("#Tipoherramienta").html(tipo + ": " + codigo);
        $("#fechaSalida").html(fecha);

    }

}
function MostrarBolestasReparacion() {
    $("#tablaReparaciones").hide();
    $("#BoletasReparacion").show();
}

function Regrasar() {
    $("#reparaciones").show()
    var boletas = $("#BoletasReparacion").is(":visible");
    var tablaReparacion = $("#tablaReparaciones").is(":visible");
    var HistorialHerramiennas = $("#MostrarHistorialHerramienta").is(":visible")
    var buscador = $("#buscarHerrmientas").is(":visible");
    if (boletas)
    {
        $("#tablaReparaciones").show();

        $("#BoletasReparacion").hide();
        $("#MostrarHistorialHerramienta").hide();


    } else if (HistorialHerramiennas)
    {
        $("#tablaReparaciones").show("slow");

        $("#BoletasReparacion").hide();
        $("#MostrarHistorialHerramienta").hide();
        // $("#buscarHerrmientas").hide();  
    } else if (tablaReparacion)
    {
        //$("#buscarHerrmientas").show();   
        $("#tablaReparaciones").hide();
        $("#BoletasReparacion").hide();
        $("#MostrarHistorialHerramienta").hide();
        //$("#buscarHerrmientas").hide();    
    }


}

function Regrasar2() {
    MostrarListaReparaciones();

}

function LimpiarTodo() {

    $("#txtCodigoHerra").val("");
    $("#cboFiltroHerramienta").val(0);
    $("#cbofiltrotipo").val("0");
    $("#CodHerramientaReparacion").val("");
    $("#txtCodigoVista").val("");
    $("#txtTrasladoCodigo").val("");
    $("#cboFiltroHerramientaU").val(0);
    $("#cboTipoHerramientaT").val(0);


}

// busca la herramienta en reparacion apartir del CODIGO DADO

function BuscarHerramientaTablaReparaciones() {

    var codigo = $("#CodHerramientaReparacion").val();
    $.ajax({
        data: {"codigo": codigo},
        type: 'POST',
        url: '../BLL/Herramientas.php?opc=FiltroReparacionCodigo',
        success: function (result) {
            $('#HerramientasEnReparacion').html(result);

        }

    });
}

function Exportar_Excel(ID_Tabla) {

    $("#" + ID_Tabla).table2excel({
        filename: "Reporte"
    });

}

function BuscarTHerramienta() {
    var codigo = $("#txtTrasladoCodigo").val();
    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=buscarTraslado&codigo=" + codigo,
        success: function (respuesta) {
            $("#listadoTransladoHerramienta").html(respuesta);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('No nos pudimos Conectar con el sevidor Verifique su conexion a Internet ');

        } else if (jqXHR.status == 404) {

            alert('Error [404] No se encontro el Archivo');

        } else if (jqXHR.status == 500) {

            alert('Error de conexion con el servidor');

        }

    });


}
function LimpiarBusquedaTipo() {
    $("#cbofiltrotipo").val("0");
    $("#txtCodigoVista").val("");

}
function LimpiarComboTraslado1() {
    $("#cboTipoHerramientaT").val("0");
    $("#txtTrasladoCodigo").val("");
}
function LimpiarComboTraslado2() {
    $("#cboFiltroHerramientaU").val("0");
    $("#txtTrasladoCodigo").val("");

}
function LimpiarComboTraslado3() {
    $("#cboFiltroHerramientaU").val("0");
    $("#cboTipoHerramientaT").val("0");

}
function LimpiarListadoCombo() {
    $("#cboFiltroHerramienta").val("0");
    $("#txtCodigo").val("");

}
function LimpiarCampoCodigo() {
    $("#txtCodigoHerra").val("");
    $("#txtCodigo").val("");
}
function FiltroInicioL() {

    var inicio = $("#txtCodigoHerra").val();
    if (inicio == "") {
        listarTotalHerramientas();
    }

}

function BuscarHerramientasPorCodigo() {
    var codigo = $("#txtCodigoHerra").val();
    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=buscarherramienCodigo&codigo=" + codigo,
        success: function (respuesta) {
            $("#listadoHerramientas").html(respuesta);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('No nos pudimos Conectar con el sevidor Verifique su conexion a Internet ');

        } else if (jqXHR.status == 404) {

            alert('Error [404] No se encontro el Archivo');

        } else if (jqXHR.status == 500) {

            alert('Error de conexion con el servidor');

        }

    });
}

$(BuscarTiempoRealHerramienta());
function  BuscarTiempoRealHerramienta(consulta) {


    $(".MostrarHistorialHerramienta").hide();
    $("#EnviarHerramienta").hide();
    $(".MostrarTransladoHerramienta").hide();
    $("#reparaciones").hide();
    $("#btnreparaciones").hide();
    $("#BoletaReparacionHerramienta").hide();
    $("#mostrarTablaReparaciones").hide();

    $.ajax({
        type: "POST",
        url: "../BLL/Herramientas.php?opc=buscarTiempoReal",
        data: {"consulta": consulta},
        beforeSend: function () {
            $("#ResultadoBusqudaHerramienta").html("<div style='margin:auto;width:200px'><img src='../resources/imagenes/loanding.gif'  width='100px'/></div>");
        },
        success: function (respuesta) {
            $(".MostrarBusquedaHerramienta").show();
            $("#listadoHerramientas").html(respuesta);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('No nos pudimos Conectar con el sevidor Verifique su conexion a Internet ');

        } else if (jqXHR.status == 404) {

            alert('Error [404] No se encontro el Archivo');

        } else if (jqXHR.status == 500) {

            alert('Error de conexion con el servidor');

        }

    });

}

$(document).on('keyup', '#txtCodigo', function () {
    var valor = $(this).val();
    if (valor != "") {
        BuscarTiempoRealHerramienta(valor);
    }
});







