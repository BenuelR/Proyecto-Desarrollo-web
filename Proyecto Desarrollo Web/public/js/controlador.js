$("#btn-login").click(function(){
    console.log($("#formulario").serialize());
    $.ajax({
        url:"/login",
        method:"POST",
        data:$("#formulario").serialize(),
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            if (respuesta.length == 1)
                window.location.href = "/editor.html";
            else 
                alert("Credenciales invalidas");
        },
        error:function(error){
            console.error(error);
        }
    });
});

$("#btn-adduser").click(function(){
	$.ajax({
		url:"/adduser",
		data:`nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&edad=${$("#edad").val()}&bday=${$("#bday").val()}&email=${$("#email").val()}&password=${$("#password").val()}`,
		dataType:"json",
		method:"POST",
		success:function(res){
			console.log(res);
			if (res.affectedRows==1){
					consolelog("exito");
			}else{
				alert("Error al guardar mensaje");
			}
		},
		error:function(error){
			console.log(error);
		}
	});
});

$("#btn-addarchi").click(function(){
	$.ajax({
		url:"/addarchi",
		data:`nombre=${$("#nombrearchivo").val()}&apellido=${$("#formato").val()}`,
		dataType:"json",
		method:"POST",
		success:function(res){
			console.log(res);
			if (res.affectedRows==1){
					consolelog("exito");
			}else{
				alert("Error al guardar mensaje");
			}
		},
		error:function(error){
			console.log(error);
		}
	});
});

$("#btn-addcarp").click(function(){
	$.ajax({
		url:"/addcarp",
		data:`nombre=${$("#nombrearchivo").val()}&apellido=${$("#formato").val()}`,
		dataType:"json",
		method:"POST",
		success:function(res){
			console.log(res);
			if (res.affectedRows==1){
					consolelog("exito");
			}else{
				alert("Error al guardar mensaje");
			}
		},
		error:function(error){
			console.log(error);
		}
	});
});