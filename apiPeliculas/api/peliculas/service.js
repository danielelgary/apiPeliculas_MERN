/*
    El servicio sera un intermediario entre el controlador y la base de datos
*/
//IMPORTAR EL MODELO PARA SU USO
const { response } = require('express');
const peliculasModel = require('./model');

async function obtenerPeliculas(){
    let peliculas = await peliculasModel.findAll();

    return peliculas;
}

async function obtenerPelicula(id){
    let pelicula = await peliculasModel.findById(id);
    //Si se desea realizar validaciones u operaciones con el objeto obtenido
    //se debe realizar aqui y no en el controlador.


    return pelicula;
}

async function obtenerPeliculaPorTitulo(nombre){
    let pelicula = await peliculasModel.findByTitulo(nombre);

    return pelicula;
}

/*
    Las validaciones y modificaciones de data se realizan en el servicio
    antes de enviar a la base de datos.
*/
async function crearPelicula(datosPelicula){
    let resultado = {};

    //Busca las claves (de CLAVE y valor) dentro de un objeto JSON y crea un array con ellas
    let llavesPresentes = Object.keys(datosPelicula);
    console.log(llavesPresentes);

    if(datosPelicula && llavesPresentes.length > 0){
        //Si datosPelicula es !== null, undefined, vacio
        if(datosPelicula.titulo && datosPelicula.titulo !== ""){
            //Validar si la pelicula si contiene titulo
            let pelicula = await peliculasModel.insertMovie(datosPelicula);
            if(pelicula && pelicula.acknowledged == true){
                //acknowledged = true (si creo correctamente el objeto)
                //insertedId = objectId() (devuelve el id proporcionado a dicha pelicula)
                resultado.mensaje = "Pelicula " + pelicula.titulo + " creada correctamente";
                resultado.datos = pelicula;

                return resultado;
            }
            else{
                resultado.mensaje = "Error en la creacion de la pelicula";
                resultado.datos = datosPelicula;

                return resultado;
            }
        }
        else{
            resultado.mensaje = "Titulo debe existir / No debe estar vacio";
            resultado.datos = datosPelicula;

            return resultado;
        }
    }
    else{
        resultado.mensaje = "No existen datos";
        resultado.datos = datosPelicula;

        return resultado;
    }
}

async function actualizarPelicula(id, dataActualizar){
    /*
        MongoDB valida lo siguiente en sus ID
        1. Su longitud es de 24 caracteres.
        2. Solo acepta notacion HEX es decir, numeros 0-9 y letras de A-F
    */
    let resultado = {};

    /*
        Expresion regular -> /^[0-9a-f]+$/i 
        ^ -> Valores de inicio de la cadena pueden ser cualquier de esos caracteres.
        + -> Valores se pueden repetir n veces esos caracteres
        $ -> Valores de fin de la cadena pueden ser cualquier de esos caracteres.
        i -> ignora las mayusculas

        Es buena practica envolver la expresion regular en parentesis 
        para luego usar sus metodos y que sea mas legible
    */
    if(id.length == 24 && (/^[0-9a-f]+$/i).test(id)){
        //Si el ID ccumple con las especificaciones de MongoDB
        if(dataActualizar){
            //Si los datos no vienen vacios
            if(dataActualizar.titulo && dataActualizar.titulo !== ""){
                //Si el titulo no viene vacio o no existe
                let respuesta = await peliculasModel.updateMovie(id, dataActualizar);


                //Respuesta obtendra la respuesta a la promesa realizada en el update
                //el cual es el objeto que envia MongoDB diciendo en un JSON
                //que fue actualizado con exito, cuantas llaves se afectaron, etc...
                //console.log(respuesta);

                if(respuesta && respuesta.acknowledged == true){
                    //Si hay respuesta de la base de datos y es OK su actualizacion
                    resultado.mensaje = "Pelicula " + dataActualizar.titulo + " actualizada correctamente";
                    resultado.datos = dataActualizar;
    
                    return resultado;
                }
                else{
                    resultado.mensaje = "Error en la actualizacion de la pelicula";
                    resultado.datos = dataActualizar;
    
                    return resultado;
                }
            }
            else{
                resultado.mensaje = "Titulo debe existir / No debe estar vacio";
                resultado.datos = dataActualizar;
    
                return resultado;
            }
        }
        else{
            resultado.mensaje = "No existen datos";
            resultado.datos = dataActualizar;
    
            return resultado;
        }
    }
    else{
        resultado.mensaje = "No tiene un Id valido dentro de los parametros";
        resultado.datos = id;

        return resultado;
    }
}

async function eliminarPelicula(id){
    let devolverResultado = {};

    if(id.length == 24 && (/^[0-9a-f]+$/i).test(id)){

        let respuesta = await peliculasModel.deleteMovie(id);

        console.log(respuesta);

        if(respuesta && respuesta.acknowledged == true){
            //Si hay respuesta de la base de datos y es OK su actualizacion
            devolverResultado.mensaje = "Pelicula " + " eliminada correctamente";
            devolverResultado.datos = respuesta;

            return devolverResultado;
        }
        else{
            devolverResultado.mensaje = "Error en la eliminacion de la pelicula";
            devolverResultado.datos = id;

            return devolverResultado;
        }
    }
    else{
        devolverResultado.mensaje = "No tiene un Id valido dentro de los parametros";
        devolverResultado.datos = id;

        return devolverResultado;
    }
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.obtenerPeliculaPorTitulo = obtenerPeliculaPorTitulo;
module.exports.crearPelicula = crearPelicula;
module.exports.actualizarPelicula = actualizarPelicula;
module.exports.eliminarPelicula = eliminarPelicula;