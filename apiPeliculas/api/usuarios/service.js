const bcrypt = require('bcrypt');
const crearToken = require('../auth/jwt').crearToken; //Solo importamos esta funcion de la libreria
require('dotenv').config();

const usuariosModel = require('./model');

async function crearUsuario(datosUsuario){
    let resultado = {};

    //console.log(datosUsuario);

    if(datosUsuario && Object.keys(datosUsuario).length > 0 && datosUsuario.usuario && datosUsuario.clave){
        //Si existe el objeto, posee datos, tiene una clave llamada usuario y otra llamada clave.
        let claveEncriptada = bcrypt.hashSync(datosUsuario.clave, parseInt(process.env.ENC_SALT_ROUNDS));
        datosUsuario.clave = claveEncriptada;

        //Cuando se crea el registro en Mongo, actualiza el objeto metiendole el ID que mongo le genero.
        let respuestaCrear = await usuariosModel.insertUser(datosUsuario);

        if(respuestaCrear && respuestaCrear.acknowledged){
            //console.log(datosUsuario);

            resultado.mensaje = "usuario creado correctamente";
            resultado.datos = datosUsuario;

            return resultado;
        }
        else{
            resultado.mensaje = "no se pudo crear el usuario";
            resultado.datos = datosUsuario;

            return resultado;
        }
    }
    else{
        resultado.mensaje = "Datos invalidos";
        resultado.datos = datosUsuario;

        return resultado;
    }
}

async function iniciarSesion(usuario){
    let resultado = {};

    if(usuario && usuario.usuario && usuario.clave && Object.keys(usuario).length > 0){

        let respuestaUsuario = await usuariosModel.findByUser(usuario.usuario);

        if(respuestaUsuario){
            let claveEncriptada = respuestaUsuario.clave;
            let esValida = bcrypt.compareSync(usuario.clave, claveEncriptada);

            if(esValida){
                resultado.mensaje = "Inicio de sesion correcto";

                console.log(respuestaUsuario);

                const token = crearToken(respuestaUsuario);

                delete respuestaUsuario.clave;
                resultado.datos = respuestaUsuario;
                resultado.token = token;

                return resultado;
            }
            else{
                resultado.mensaje = "Contraseña invalida";
                resultado.datos = usuario;

                return resultado;
            }
        }
        else{
            resultado.mensaje = "Usuario no existe";
            resultado.datos = usuario;

            return resultado;
        }
    }
    else{
        resultado.mensaje = "Datos de usuario no validos o estan errados";
        resultado.datos = usuario;

        return resultado;
    }
}

module.exports.crearUsuario = crearUsuario;
module.exports.iniciarSesion = iniciarSesion;