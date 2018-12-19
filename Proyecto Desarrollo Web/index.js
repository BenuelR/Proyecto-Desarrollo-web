/*var express = require ('express'); // Importar el framework express
var app = express (); // Inicializar la aplicación con expreso
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use (express.static ('public')); // Publicar un directorio de archivos estaticos
app.listen (8001,function () {
  console.log('Example app listening on port 3000!');
}); // Levantar el servidor y escuchar en el puerto indicado*/

var express = require("express"); //Importar el framework express
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express(); //Inicializar la aplicacion con express
var credenciales ={
  user:"root",
  password:"",
  database:"db_web",
  host:"localhost",
  port:"3306"  
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static("public")); //Publicar un directorio de archivos estaticos
//app.listen(8001);//Levantar el servidor y escuchar en el puerto indicadass
app.use(session({secret:"ASDFSDF$%%aasdera", resave: true, saveUninitialized:true}));

app.get("/almacenar-sesion/:usuario",function(req, res){
    req.session.usuario = req.params.usuario;
    res.send("Se guardo la sesion");
    res.end();
});


app.post("/login",function(req, res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "SELECT id_usuario,correo FROM tbl_usuarios WHERE contrasena=? and correo=?",
        [req.body.email, req.body.password],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                if (data.length==1){
                    req.session.codigoUsuario = data[0].id_usuario;
                    req.session.correoUsuario = data[0].correo
                }
                res.send(data);
                res.end();
            }
        }
    )
});

app.get("/obtener-session",function(req,res){
    res.send("Id Usuario: " + req.session.codigoUsuario+
            ", Correo: " + req.session.correoUsuario 
    );
    res.end();
});

app.get("/cerrar-sesion",function(req,res){
    req.session.destroy();
    res.send("Sesion eliminada");
    res.end();
});




app.post("/adduser",function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "INSERT INTO tbl_usuarios(correo,contrasena,p_nombre, s_nombre, p_apellido, s_apellido, fecha_nac, genero, foto, fecha_creacion_cta) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
		[
            req.body.nombre,
            req.body.apellido,
            req.body.edad,
            req.body.bday,
			req.body.email,
			req.body.password
        ],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    );
});

app.post("/addarchi",function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "INSERT INTO tbl_archivos(nombre_archivo, formato, fechacreacion, id_usuario) VALUES (?,?,?,?,?)",
		[
            req.body.nombrearchivo,
            req.body.formato,
            req.body.nombrearchivo,
            req.body.formato
        ],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    );
});

app.post("/addcarp",function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "INSERT INTO tbl_carpeta(nombre_carpeta, num_archivos, fecha_creacion) VALUES (?,?,?,?)",
		[
            req.body.nombrearchivo,
            req.body.formato,
            req.body.nombrearchivo
        ],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    );
});


app.listen (8001,function () {
  console.log('Servidor Iniciado');
});