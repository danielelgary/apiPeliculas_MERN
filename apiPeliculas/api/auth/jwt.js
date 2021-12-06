const jwt = require('jsonwebtoken');
require('dotenv').config();

//Se llamara desde la funcion de iniciar sesion
function crearToken(usuario){
    /*
        DATOS A ENCRIPTAR EN EL TOKEN
        id,
        nombre,
        roles
    */

    //payload: cuerpo de nuestro token
    const payload = {
        "id" : usuario._id,
        "nombre" : usuario.nombre,
        "roles" : usuario.roles
    };

    const token = jwt.sign(payload, process.env.JWT_CLAVE, {expiresIn: process.env.JWT_EXPIRES});

    //token enviado en las respuestas de las peticiones para validar las autorizaciones de los endpoints a proteger
    return token;
}

//MIDDLEWARE -> Antes de la accion de la ruta. Captura la peticion y la respuesta, para validar
//los permisos de autorizacion.

function validarToken(request, response, next){
    let token = undefined;

    if(request.headers['authorization']){
        //Si esta cabecera existe, extraemos el token para luego verificar que concuerda

        //convierte en array los elementos para botar lso espacios
        //el pop() coge la ultima posicion de ese array, que seria el token
        token = request.headers['authorization'].split(" ").pop();
    }

    if(token){
        //Verificar que el token es valido
        //Resolvemos la promesa con la funcion de callback
        jwt.verify(token, process.env.JWT_CLAVE, function(error, tokenDesencriptado){
            if(error){
                //Si el token ya expiro o si se presento algun error en la verificacion
                response.status(401).send(
                    {
                        "mensaje" : "Token no valido"
                    });
            }
            else{
                request.tokenDesencriptado = tokenDesencriptado;

                next();
            }
        })
    }
    else{
        response.status(403).send(
            {
                "mensaje" : "No esta autorizado"
            }
        )
    }

}

module.exports.crearToken = crearToken;
module.exports.validarToken = validarToken;