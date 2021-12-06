const express = require("express");
const usuariosController = express.Router();

const usuariosService = require('./service');


/*
    POST -> Login
    GET -> Obtener usuario por ID
*/

usuariosController.post("/crearUsuario", async function(request, response){
    
    let datosUsuario = request.body;

    let usuarioCreado = await usuariosService.crearUsuario(datosUsuario);

    response.send(usuarioCreado);
});


usuariosController.get("/iniciarSesion", async function(request, response){
    //Si no le definimos clave al query, no importa el nombre que tenga
    let datos = request.query;
    
    let resultado = await usuariosService.iniciarSesion(datos);

    response.send(resultado);
})

module.exports = usuariosController;