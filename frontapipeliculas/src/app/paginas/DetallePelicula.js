import { useParams } from "react-router";
import DetalleActores from "../componentes/DetalleActores";
import DetalleNominaciones from "../componentes/DetalleNominaciones";
import DetalleGeneral from "../componentes/DetalleGeneral";
import "../estilos/DetallePelicula.css";
import { useState, useEffect } from "react";
import * as PeliculasService from "../servicios/PeliculasService";



export default function DetallePelicula(){

    const { id } = useParams();
    const [pelicula, setPelicula] = useState({});

    useEffect(  
        () => {
            PeliculasService.servicioBusquedaID(id)
                .then(function(respuesta){
                    setPelicula(respuesta.data);
                })
    },[id]);
    /*
        Que necesitamos para construir la interfaz?
        1. Datos externos:
            - Id de la Pelicula -> Extraerlos de los Params de la URL
        2. Definir si necesitamos los estados / Propiedades:
            - Pelicula
        3. Definir si se necesitan efectos:
            - Solo montaje
        4. Componentes que se necesitan? Cuales y Cuantos?
            - Detalle Actores -> Array de objetos
            - Detalle Nominaciones -> Objeto
            - Detalles Generales : Generos/Idiomas/Paises... -> Array
    */

    return (
        <>
            <div className="DivDetalleDetalle">
                <fieldset>
                    <legend>Detalle Pelicula </legend>
                    <h2> {pelicula.titulo} </h2>
                    <div className="DivMainDetalle">
                        
                        <div className="DivPosterDetalle">
                            <img alt="Poster" src="{pelicula.poster}"/>
                        </div>

                        <div>
                            <fieldset>
                                <legend>Año</legend>
                                <span>{pelicula.ano}</span>
                            </fieldset>

                            <fieldset>
                                <legend>Rating</legend>
                                <span>{pelicula.rating}</span>
                            </fieldset>

                            <fieldset>
                                <legend>Clasificacion</legend>
                                <span>{pelicula.clasificacion}</span>
                            </fieldset>
                        </div>

                        <div> 
                            <fieldset>
                                <legend>Sinopsis</legend>
                                <p>{pelicula.sinopsis}</p>
                            </fieldset>
                        </div>


                    </div>
                </ fieldset>
            </div>
                 
            <div>
                <fieldset>
                    <legend>Detalle</legend>
                    <DetalleActores titulo="Actores" datos={pelicula.actores} />
                    <div className="DivDatosDetalle">
                        <DetalleGeneral titulo="Generos" datos={pelicula.generos} />
                        <DetalleGeneral titulo="Idiomas" datos={pelicula.idiomas} />
                        <DetalleGeneral titulo="Paises" datos={pelicula.paises}/>
                        <DetalleNominaciones titulo="Nominaciones" datos={pelicula.nominaciones} />
                    </div>
                    <DetalleGeneral titulo="Directores"  datos={pelicula.directores}/>
                </fieldset>
            </div>
        </>
    );
}