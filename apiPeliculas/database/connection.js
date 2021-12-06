//Se importa el modulo de mongo, para usar su cliente
const mongoClient = require('mongodb').MongoClient;

//Cargamos las variables de entorno
require('dotenv').config();

let conexion;

//Estoy creando la funcion CONECTAR que le prometera al que pida conexion
//que podra establecer un vinculo y conectar a la base de datos
const conectar = function(){
    //Devuelve una promesa
    //Toda promesa recibe una funcion
    //Toda funcion de promesa o resuelve algo o rechaza algo
    //por eso sus 2 variables de entrada son resolve, reject
    return new Promise(function(resolve, reject){
        //Para cumplir con el patron SINGLETON debemos asegurarnos 
        //que la conexion no exista
        if(conexion){
            //Si ya existe, resuelve la promesa con dicha conexion
            resolve();
        }
        else{
            //sino existe, llamamos el cliente (devuelve una promesa) y nos conectamos
            //El objeto de configuracion useNewUrlParser es porque mongo
            //le hace a la URL una transformacion para su entendimiento

            mongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
                .then(function(cliente){ //cliente es el que esta conectado a la base de datos
                    conexion = cliente.db(process.env.MONGODB_DB);
                    resolve();
                })
                .catch(function(error){
                    reject(error);
                })
        }
    });
} 

const obtenerConexion = function(){
    return conexion;
}

module.exports = {conectar, obtenerConexion}