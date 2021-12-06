//Para hacer los llamados a la API
import { URL_API_PELICULAS } from "../config/config";

export function servicioBusquedaTitulo(titulo){

    const path = "/peliculas/obtenerPeliculaPorTitulo/" + titulo;

    /*
        FETCH -> Cargar por HTTP recursos externos
            - APIS
            - ARCHIVOS
            - MICROSERVICIOS

        Necesita:
         - URL
         - Ruta del recurso a cargar
         - Configuracion:
            - Method
            - Mode -> CORS
            - HEADERS -> Info adicional de cabeceras
            - BODY -> POST / PUT
    */

    //No se necesita HEADERS porque no usa tokens que se mandan por header
    //No se necesita cuerpo porque es un metodo GET
    const config = 
    {
        method: "GET",
        mode: "cors"
    }

    return fetch(URL_API_PELICULAS + path, config)
        .then(function(respuestaServidor){
            if(respuestaServidor.status === 200){
                //Respondio OK
                return respuestaServidor.json();
            }
            else{
                Promise.reject(respuestaServidor.statusText);
            }
        })
        .catch((error) => console.log(error));

}

export function servicioBusquedaID(id){

    const path = "/peliculas/obtenerPelicula/" + id;

    const config =
    {
        method: "GET",
        mode: "cors"
    }

    return fetch(URL_API_PELICULAS + path, config)
                .then(function(respuesta){
                    if(respuesta.ok){
                        return respuesta.json();
                    }
                    else{
                        return Promise.reject(respuesta.statusText);
                    }
                })
                .catch((error) => console.log(error));
}