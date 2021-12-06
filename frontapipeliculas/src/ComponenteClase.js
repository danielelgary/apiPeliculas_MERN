import React from "react";

export default class ComponenteClase extends React.Component{
    /*
        Aqui van:
            Constructor
            Atributos / estados
            Metodos
             -> Metodo obligatorio (render() que debe retornar codigo JSX)
    */

    render(){
        return(
            <> 
                <h3>Mi componente de clase</h3>
                <span>Autor: Daniel Gaviria</span>
            </>
        );
    };

}