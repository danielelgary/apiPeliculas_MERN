//Funcional - Tienen unas mejores capacidades para React, que los hace los mas utilizads
//no dependen tampoco de librerias de terceros.

export default function ComponenteFuncional(props){ //este export es como el module.exports
    return (
        //Para decirle que esos 2 elementos pertenecen a un fragmento de react <React.fragment>
        //Para poder usar las propiedades (props) dentro del html se usan llaves
        <> 
            <h3>Mi primer componente funcional</h3>
            <span> {props.nombre} {props.apellido} </span> 
            <br/>
            <span> {props.nombre + " " + props.apellido} </span> 
        </>
    );
}
