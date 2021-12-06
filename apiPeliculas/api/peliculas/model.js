/*
    El modelo es el unico que tiene la potestad de conectarse a la base de datos

*/
//IMPORTAR BASE DE DATOS
const baseDatos = require('../../database/connection');

//Para crear los Object Id que utiliza Mongo como ID se debe usar el siguiente modulo:
const objectId = require('mongodb').ObjectId;

function findAll(){
    conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Peliculas").find({}).toArray()
        .then(function(data){
            //devolvera la promesa con los datos, lista para ser resuelta
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
}

function findById(id){
    conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Peliculas").findOne({"_id" : objectId(id)})
        .then((data) => data)
        .catch(error => console.log(error));
}

function findByTitulo(nombre){
    conexionMongoDB = baseDatos.obtenerConexion();

    //Se crea la expresino regular para encontrar las coincidencias
    return conexionMongoDB.collection("Peliculas").find({"titulo": new RegExp(nombre, "i")}).toArray()
        .then((data) => data)
        .catch(error => console.log(error));
}

function insertMovie(datosPelicula){
    conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Peliculas").insertOne(datosPelicula)
        .then(function(data){
            //console.log(data);

            return data;
        })
        .catch(error => console.log(error));
}

function updateMovie(id, dataActualizar){
    conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Peliculas").updateOne(
        {
            "_id" : objectId(id)
        },
        {
            "$set" : dataActualizar
        }
    )
        .then((data) => data)
        .catch(error => console.log(error));
}

function deleteMovie(id){
    conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Peliculas").deleteOne(
        {
            "_id" : objectId(id)
        }
    )
        .then((data) => data)
        .catch(error => console.log(error));
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByTitulo = findByTitulo;
module.exports.insertMovie = insertMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;