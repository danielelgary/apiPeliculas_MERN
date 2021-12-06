import Resultados from "../componentes/Resultados";
import "../estilos/ResultadosBusqueda.css";
import { useState, useEffect } from "react"; 
//import peliculasDB from "../../peliculas150.json";
import * as PeliculasService from "../servicios/PeliculasService"

export default function ResultadosBusqueda() {

    //DECLARANDO EL ESTADO:
    const [busqueda, setBusqueda] = useState(""); //valor inicial es la cadena vacia

    //Este estado es para poder que cada que cambia el estado del cuadro de busqueda
    //deben cambiar las peliculas llamadas en los componentes.
    //ESTADO: como la interactividad va a realizar que el componente se actualice y renderice nuevamente
    const [peliculaBuscada, setPeliculaBuscada] = useState([]);

    /*
        HOOKS
        1. SIEMPRE SE EJECUTA LA PRIMERA VEZ -> MONTAJE
        2. OOIR CADA CAMBIO DE ESTADO, DESPUES DE RENDERIZAR SE EJECUTA -> ACTUALIZACION
            Se controla colocando la condicion que nos dice si no ha cambio para poder actualizar
        3. ADICIONAR UN RETURN -> DESMONTAJE
    */


    useEffect
    (
        () =>
        {
            if(busqueda.length >= 4){
                PeliculasService.servicioBusquedaTitulo(busqueda)
                .then(function(resultadosBusqueda){
                    setPeliculaBuscada(resultadosBusqueda.data);
                });
            }
            else{
                setPeliculaBuscada([]);
            }
                    
            //let resultadosBusqueda = peliculasDB.slice(0, busqueda.length);
            //setPeliculaBuscada(resultadosBusqueda);
            
            return () => 
            {
                //Acciones de desmontaje
            }
        },
        [busqueda]
    );


    //Para llamar con los className se suele usar -> tipo de elemento - responsabilidad(funcionalidad) - id (opcional)
    //dv-busqueda-xxxx -> formato muy utilizado.


    //En programacion de eventos se recomienda usar la convencion handle como prefijo + Funcionalidad +id (opcional)
    //handleSubmit

    //CONTROLANDO ELEMENTOS EN REACT A TRAVES DE SUS EVENTOS

    function handleSubmit(evento){ //Recibe el contenedor del evento como parametro de la funcion
        evento.preventDefault();
    }

    function handleChange(evento){ //Control de elementos
        //console.log(evento);
        //console.log(evento.target);
        //console.log(evento.target.value);
        let tituloPelicula = evento.target.value;
        //uno de los puntos de entrada para modificar los estados son los eventos


        /*if(tituloPelicula.length > 3){
            let resultadosBusqueda = new Array(tituloPelicula.length).fill(0);
            setPeliculaBuscada(resultadosBusqueda);
        }
        else{
            setPeliculaBuscada([]);
        }
        */

        setBusqueda(tituloPelicula);
    }


    return (
        <>
            <div className="divBusqueda">
                <form onSubmit={handleSubmit}>
                    <fieldset>

                        <legend>Buscar Peliculas</legend>

                        <input type="text" id="busqueda" name="busqueda" onChange={handleChange} placeholder="Titulo de la pelicula"></input>

                    </fieldset>
                </form>
            </div>

            <div>
                <fieldset>

                    <legend>Listado Peliculas</legend>
                    <div> 
                        <span>Mostrando resultado para: {busqueda}</span>
                    </div>
                    <div className="divResultados">
                        {
                            peliculaBuscada && peliculaBuscada.length > 0 && peliculaBuscada.map(pelicula => (
                                <Resultados pelicula={pelicula}/>
                            ))
                        }
                    </div>

                </fieldset>
            </div>
        </>
    );
}