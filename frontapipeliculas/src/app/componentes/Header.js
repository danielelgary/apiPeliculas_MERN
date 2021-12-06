import "../estilos/header.css";
import { useHistory } from "react-router";


export default function Header(props){

    let history = useHistory();

    function handleClick(evento){
        evento.preventDefault();
        history.push("/login");

    }

    return (
        <>
            <header className="header"> 
                <button type="button" onClick={handleClick}>Iniciar Sesion</button>
            </header>
            {props.children /* Para saber cual de los hijos renderizar */} 
        </>
    );
}