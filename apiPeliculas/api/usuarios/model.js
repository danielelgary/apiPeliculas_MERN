const baseDatos = require('../../database/connection');

function insertUser(datosUsuario){
    let conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Usuarios").insertOne(datosUsuario)
        .then((data) => data)
        .catch(error => console.log(error));
}

function findByUser(usuario){
    let conexionMongoDB = baseDatos.obtenerConexion();

    return conexionMongoDB.collection("Usuarios").findOne({"usuario" : usuario})
        .then((data) => data)
        .catch(error => console.log(error));
}

module.exports.insertUser = insertUser;
module.exports.findByUser = findByUser;