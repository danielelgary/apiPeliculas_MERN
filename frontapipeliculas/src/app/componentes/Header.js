import "../estilos/header.css";
import { useHistory } from "react-router";


export default function Header(props){

    let history = useHistory();

    function handleClick(evento){
        evento.preventDefault();
        if(evento.target.value === "iniciar"){
            history.push("/login");
        }
        else{
            localStorage.removeItem("auth");
            props.autenticado(null);
            history.push("/");
        }
    }

    return (
        <>
            <header className="header"> 
                {
                    props.usuario && //Es como decirle, si existe este, haga el que sigue
                    <button type="button" onClick={handleClick} value="cerrar">Cerrar Sesion</button>
                }
                {
                    !props.usuario &&
                    <button type="button" onClick={handleClick} value="iniciar">Iniciar Sesion</button>

                }
            </header>
            {props.children /* Para saber cual de los hijos renderizar */} 
        </>
    );
}