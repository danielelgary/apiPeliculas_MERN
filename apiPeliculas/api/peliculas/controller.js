/*
    En el controlador es donde definimos las rutas de endpoints
    El controlador llama el servicio y devuelve las respuestas (datos)
    El controlador tambien captura los datos desde el request (cuando se requiere)
*/
const express = require("express");
const rutaProtegida = require('../auth/jwt').validarToken;

//CREAR CONTROLADOR
const peliculasController = express.Router(); //Permite crear controladores en un archivo diferente al archivo principal

//IMPORTAR SERVICIO
const peliculasService = require('./service');

/*
    GET -> Obtener las peliculas (/obtenerPeliculas) - ok
    GET -> Obtener 1 pelicula por ID (/) - ok
    GET -> Buscar 1 pelicula por Titulo (/) - ok
    POST -> Crear pelicula - ok
    PUT -> Actualizar pelicula (combinar la recepcion de datos entre parametros y cuerpo)
    DELETE -> Eliminar pelicula
*/

//Buscar todas las peliculas
peliculasController.get("/obtenerPeliculas", rutaProtegida, async function(request, response){
    let peliculas = await peliculasService.obtenerPeliculas();

    response.send(
        //Objeto de la respuesta
        {
            "mensaje" : "Listado actual de peliculas",
            "data" : peliculas
        }
    )

});

//Buscar una pelicula por el ID (pasado en los parametros)
peliculasController.get("/obtenerPelicula/:id", rutaProtegida, async function(request, response){

    let id = request.params.id;
    let pelicula = await peliculasService.obtenerPelicula(id);

    response.send(
        {
            "mensaje" : "Pelicula requerida...",
            "data" : pelicula
        }
    )

});

peliculasController.get("/obtenerPeliculaPorTitulo/:nombre", async function(request, response){
    let nombre = request.params.nombre;
    let pelicula = await peliculasService.obtenerPeliculaPorTitulo(nombre);

    response.send(
        {
            "mensaje" : "Pelicula requerida: " + nombre,
            "data" : pelicula
        }
    )
});


peliculasController.post("/crearPelicula", rutaProtegida, async function(request, response){
    //Los datos del metodo post deben ir en el cuerpo
    //Los datos deberian venir de algun formulario
    let datosPelicula = request.body;

    //console.log(datosPelicula);
    let pelicula = await peliculasService.crearPelicula(datosPelicula);

    response.send(
        {
            "mensaje" : "Creando la pelicula ",
            "data" : pelicula
        }
    )
});

peliculasController.put("/actualizarPelicula/:id", rutaProtegida, async function(request, response){
    let id = request.params.id;
    let dataActualizar = request.body;

    let peliculaModificada = await peliculasService.actualizarPelicula(id, dataActualizar);

    response.send(
        {
            "mensaje" : "Actualizando pelicula...",
            "data" : peliculaModificada
        }
    )
})

peliculasController.delete("/eliminarPelicula", rutaProtegida, async function(request, response){
    //El id llega por el query string para efectos de aprender
    //Se debe llamar igual que como se llama en el query
    let id = request.query.id;

    //console.log(id);

    let peliculaEliminada = await peliculasService.eliminarPelicula(id);

    response.send(
        {
            "mensaje" : "Eliminando pelicula...",
            "data" : peliculaEliminada
        }
    )
})

//Esto es para poderlo utilizar en el archivo principal app.js
module.exports = peliculasController; 