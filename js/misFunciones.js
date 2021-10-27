
const main = () =>{
    let
    canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    w = window.innerWidth,
    h = window.innerHeight,
    fontSize = 16,
    columns = Math.floor(w / fontSize),
    drops =[],
    str = 'JavaScript Matrix Effect',
    matrix = () => {
        context.fillStyle = 'rgba(0,0,5,.05)';
        context.fillRect(0,0,w,h);
        context.fontSize =`650 ${fontSize}px`;
        context.fillStyle = '#42C920';
        for (let i=0; i< columns; i++){
            let
              j = Math.floor(Math.random()*str.length),
              x = i*fontSize,
              y = drops[i]*fontSize;
            context.fillText(str[j],x,y);
            y >= canvas.height && Math.random() > 0.99
            ? drops[i]=0
            : drops[i]++;  
        };
    };
    canvas.width = w;
    canvas.height =h;
    for (let i=0; i< columns; i++){
        drops.push(0);
    };
    matrix(); setInterval(matrix, 15);
}; document.addEventListener('DOMContentLoaded', main);

//Funciones de la tabla CLiente
function traerInformacionClient(){
    $.ajax({
        url:"http://129.159.54.150:8080/api/Cliente/all", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta)
        }
    });
}
function pintarRespuestaClient(respuesta){
    let myTable="<table>";
    for(i=0; i<respuesta.length; i++){
        myTable += `<tr>
        <td>${respuesta[i].primerNombre}</td>
        <td>${respuesta[i].segundoNombre}</td>
        <td>${respuesta[i].primerApellido}</td>
        <td>${respuesta[i].segundoApellido}</td>
        <td>${respuesta[i].documentoTipo}</td>
        <td>${respuesta[i].documentoNumero}</td>
        <td>${respuesta[i].telefono}</td>
        <td>${respuesta[i].direccion}</td>
        <td>${respuesta[i].correo}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarInformacionClient(${respuesta[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoClient(${respuesta[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </td>`;
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
}

function guardarInformacionClient(){
    let myData={
        primerNombre:$("#primerNombre").val(),
        segundoNombre:$("#segundoNombre").val(),
        primerApellido:$("#primerApellido").val(),
        segundoApellido:$("#segundoApellido").val(),
        documentoTipo:$("#documentoTipo").val(),
        documentoNumero:$("#documentoNumero").val(),
        telefono:$("#telefono").val(),
        direccion:$("#direccion").val(),
        correo:$("#correo").val(),
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        url:"http://129.159.54.150:8080/api/Cliente/save",
       
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
}

function actualizarInformacionClient(idElemento){
    let myData={
        id:idElemento,
        primerNombre:$("#primerNombre").val(),
        segundoNombre:$("#segundoNombre").val(),
        primerApellido:$("#primerApellido").val(),
        segundoApellido:$("#segundoApellido").val(),
        documentoTipo:$("#documentoTipo").val(),
        documentoNumero:$("#documentoNumero").val(),
        telefono:$("#telefono").val(),
        direccion:$("#direccion").val(),
        correo:$("#correo").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.159.54.150:8080/api/Cliente/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            $("#id").val("");
            $("#primerNombre").val("");
            $("#segundoNombre").val("");
            $("#primerApellido").val("");
            $("#segundoApellido").val("");
            $("#documentoTipo").val("");
            $("#documentoNumero").val("");
            $("#telefono").val("");
            $("#direccion").val("");
            $("#correo").val("");
            traerInformacionClient();
            alert("Cliente Actualizado con Exito")            
        }
    });
}

function borrarElementoClient(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.159.54.150:8080/api/Cliente/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            traerInformacionClient();
            alert("Cliente Eliminado con Exito.")
        }
    });
}
