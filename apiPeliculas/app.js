//IMPORTAR MODULOS REQUERIDOS
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');


//INSTANCIAS DE CONTROLADORES:
const peliculasController = require("./api/peliculas/controller");
const usuariosController = require("./api/usuarios/controller");

////INSTANCIA DE CONEXION BASE DATOS
const conexionMongoDB = require("./database/connection");

/*
    PROCESS -> OBJETOS GLOBAL DE NODE: es el que controla el proceso de ejecucion de la API
        Dentro encontraremos un archivo (una llave) de configuracion llamado process.env
        Lo que hara el archivo (.env) creado, es adicionarle estos parametros al entorno de NODE
        Luego se recurriran a las variables alli creadas para su modificacion y/o uso
*/

//INSTANCIA DEL ARCHIVO DE CONFIGURACION
//se puede crear la instancia dentro de una variable y configurar la variable
//se puede hacer la configuracion directamente desde el require para no generar variables
require('dotenv').config();

/*
    INICIAR EXPRESS
    crear la instancia de inicializacion de la app manejada por express
*/
const app = express();

/*
    INICIAR CONFIGURACION 
    1. Puerto por el cual estara funcionando (generalmente en el rango de los 3000)
    2. Body parser para poder convertir el cuerpo en JSON
*/
const puerto = process.env.PORT;
//Se puede pasar como parametro un objeto Json con algunas opciones de configuracion especifica
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //Para poder tomar el formato de formularios y convertirlo en JSON
app.use(morgan(process.env.MORGAN_MODE));

/*
    1. Peticion -> envia/solicita informacion al servidor, a traves de los metodos
        ->Metodos:
            *   Get -> Solicitar un recurso (Usa el query string) /PARAMS/QUERY
            *   Post -> Envia informacion para crear una entidad de una recurso /PARAMS/QUERY/BODY
            *   Put -> Envia informacion para actualizar un recurso (Usa el query string) /PARAMS/QUERY/BODY
            *   Delete -> Elimina un recurso. (Usa el query string) /PARAMS/QUERY
            
    2. Respuesta -> devuelve/crea/edita el recurso solicitado ó informa el estado
                    de la peticion a traves de los codigos de respuesta:
        -> Codigos de respuesta:
            *   100-199 -> Mensajes informativos
            *   200-299 -> Mensajes de exito
            *   300-399 -> Mensajes de redireccionamiento
            *   400-499 -> Mensajes de error en cliente (Asociados a la programacion)
            *   500-599 -> Mensajes de error en servidor
    
    3. URL -> Universal Resource Location, tiene:
        *   HTTP:// -> Protocolo
        *   Localhost -> Host/Servidor
        *   Puerto -> Direccion en el servidor donde buscara la peticion
        *   Path Resource -> El camino de los endpoints para saber que se esta buscando
        *   Query -> La parte de la ruta en donde podemos enviar o capturar informacion.


    OJO MUY IMPORTANTE!!!
    FORMAS PARA CAPTURAR LA INFO DE UNA PETICION
        -Parametros ->  GET/POST/PUT/DELETE
        -Query (?clave:valor&clave=valor) ->    GET/POST/PUT/DELETE
        -Body (json) ->    POST/PUT
*/

/*
    INICIAR LAS RUTAS/CONTROLADORES
    Ruta por defecto -> localhost:3000/

    Se importan los controladores:
*/

//El metodo use de EXPRESS es para que use ese EndPoint sumado
//a los Endpoints complementarios definidos en el controlador asignado
app.use("/api/peliculas", peliculasController);
app.use("/api/usuarios", usuariosController);

//Conectar devuelve una promesa, por lo que hay que saber como se resuelve (.then)
conexionMongoDB.conectar()
    .then(function(){
        //SI LA PROMESA SE EJECUTA CORRECTAMENTE, SE PUEDE INICIAR LA API
        //Para que se inicie en el puerto configurado
        //Es el iniciador del API y la funcion de callback es la respuesta al iniciar el API
        app.listen(puerto, function(){
            console.log("API ejecutandose en el puerto " + puerto);
            //Si queremos saber si hay conexion:
            //console.log(conexionMongoDB.obtenerConexion());
        });
    })
    .catch(function(error){
        console.log(error);
    })
