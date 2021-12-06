import "../estilos/Resultados.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

export default function Resultados(props) {

    let history = useHistory();

    //props son las propiedades del componente que se usan para:
    // -    dar valores iniciales antes del renderizado.
    // -    dar configuraciones antes del renderizado.
    // -    llevar objetos a un lugar especifico del componente antes del renderizado.
    
    //console.log(props);

    //EVENTOS: agregan interactividad y obtencion de valores.
    function handleClick(evento){
        
        history.push("/detalle/" + props.pelicula._id);

        /*
        evento.preventDefault();
        //Parar las propagaciones hacia los eventos padre
        evento.stopPropagation(); //Cuando se tienen varios contenedores y varios tienen el evento click, entonces el evento se propagaria.
        alert("Redireccionar al detalle de la película")
        */
    }
    /*
    function handleClickImg(evento){
        evento.stopPropagation();
        alert("Click en la imagen");
    }
    */

    return (
        <>

            <div className="divPelicula" onClick={handleClick}>
                <div className="divPoster">
                    <img alt="Póster" src={props.pelicula.poster} />

                </div>
                <div className="divTitulo">
                    <h2>{props.pelicula.titulo}</h2>
                </div>
                <div>
                    <p>{props.pelicula.sinopsis}</p>
                </div>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                        {props.pelicula.rating}
                        
                    </span>
                </div>
            </div>
        </>
    );
}