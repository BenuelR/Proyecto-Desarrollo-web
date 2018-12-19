//var usuarios = [];
var db;

function registrar(){
    var archivo ={
        name: document.getElementById("nombrearchivo").value,
        format: document.getElementById("formato").value
    }
    //usuarios.push(usuario);

    //Guardar objeto en BD
    var transaccion = db.transaction(["archivos"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
    var objectStoreUsuarios = transaccion.objectStore("archivos");
    var solicitud = objectStoreUsuarios.add(archivo);
    solicitud.onsuccess = function(evento){
        console.log("Se agrego un nuevo archivo correctamente");
    }

    solicitud.onerror = function(evento){
        console.log("Ocurrio un error al guardar");
    }

    //console.log(usuarios);
}


(function(){
    if (!('indexedDB' in window)){
        console.error("El navegador no soporta indexedDB");
        return;
    }

    var solicitud = window.indexedDB.open("archivos", 1);//Parametros: nombre, version. La version debe ser entero
    var solicitud1 = window.indexedDB.open("carpetas", 1);
    //Se ejecutara en caso de que pueda abrir la BD sin problemas
    solicitud.onsuccess = function(evento){
        console.log("Se abrio la base de datos");
        db = solicitud.result;
    };
	solicitud1.onsuccess = function(evento){
        console.log("Se abrio la base de datos");
        db = solicitud1.result;
    };

    //Se ejecutar en caso no se pueda abrir la base de datos
    solicitud.onerror = function(evento){
        console.error("No se pudo abrir la base datos");
    };
	
	solicitud1.onerror = function(evento){
        console.error("No se pudo abrir la base datos");
    };

    //Se ejecutara cuando NO exista la base de datos o se necesite actualizar
    solicitud.onupgradeneeded = function(evento){
        console.log("La base de datos se creara o se actualizara");
        db = evento.target.result; //Obteniendo la refencia la base de datos creada (facebook)
        var objectStoreUsuarios = db.createObjectStore("archivos", {keyPath: "codigo", autoIncrement: true});

        objectStoreUsuarios.transaction.oncomplete = function(evento){
            console.log("El object store de usuarios se creo con exito");
        }

        objectStoreUsuarios.transaction.onerror = function(evento){
            console.log("Error al crear el object store de usuarios");
        }
        //En este punto se debe crear la estructura de la base de datos
        //Es necesario crear almacenes de objetos en la base de datos (Object Store)
		
		solicitud1.onupgradeneeded = function(evento){
        console.log("La base de datos se creara o se actualizara");
        db = evento.target.result; //Obteniendo la refencia la base de datos creada (facebook)
        var objectStoreUsuarios = db.createObjectStore("carpetas", {keyPath: "codigo", autoIncrement: true});

        objectStoreUsuarios.transaction.oncomplete = function(evento){
            console.log("El object store de carpetas se creo con exito");
        }

        objectStoreUsuarios.transaction.onerror = function(evento){
            console.log("Error al crear el object store de usuarios");
        }
    }
})();



function registrarcarpeta(){
    var carpeta ={
        name: document.getElementById("nombrearchivo").value,
        format: document.getElementById("formato").value
    }
    //usuarios.push(usuario);

    //Guardar objeto en BD
    var transaccion = db.transaction(["carpetas"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
    var objectStoreUsuarios = transaccion.objectStore("carpetas");
    var solicitud1 = objectStoreUsuarios.add(carpeta);
    solicitud1.onsuccess = function(evento){
        console.log("Se agrego un nuevo archivo correctamente");
    }

    solicitud1.onerror = function(evento){
        console.log("Ocurrio un error al guardar");
    }

    //console.log(usuarios);
}
