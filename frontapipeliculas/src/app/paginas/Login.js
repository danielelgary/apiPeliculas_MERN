import { useState } from "react";
import Resultados from "../componentes/Resultados";
import * as UsuariosService from "../servicios/UsuariosService";
import { useHistory } from "react-router";

export default function Login(){
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    let history = useHistory();

    function handleChange(evento){
        if(evento.target.name === "usuario"){
            setUsuario(evento.target.value);
        }
        else if(evento.target.name === "clave"){
            setClave(evento.target.value);
        }
    }

    function handleClick(evento){
        evento.preventDefault();
        UsuariosService.servicioIniciarSesion(usuario, clave)
            .then(function(respuesta){
                //validar la info del usuario
                if(respuesta.token){
                    const datosUsuario = 
                    {
                        token: respuesta.token,
                        nombre: respuesta.datos.nombre,
                        roles: respuesta.datos.roles
                    }
                    //investigar sessionStorage
                    //investigar setCookie
                    
                    localStorage.setItem("auth", JSON.stringify(datosUsuario));

                    history.push("/administrar");
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <div>
                <fieldset>
                    <legend>Iniciar Sesion</legend>
                    <form>
                        <div>
                            <label for="usuario">Usario: </label>
                            <input type="text" id="usuario" name="usuario" value={usuario} onChange={handleChange}></input>
                        </div>
                        <div>
                            <label for="clave">Contraseña: </label>
                            <input type="password" id="clave" name="clave" value={clave} onChange={handleChange}></input>
                        </div>

                        <div>
                            <button type="button" onClick={handleClick}>Iniciar Sesion</button>
                        </div>

                    </form>
                </fieldset>

            </div>
        </>
    );
}