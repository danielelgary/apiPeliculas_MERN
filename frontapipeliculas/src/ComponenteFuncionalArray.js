//Funcional - Tienen unas mejores capacidades para React, que los hace los mas utilizads
//no dependen tampoco de librerias de terceros.

export default function ComponenteFuncionalArray(props){ //este export es como el module.exports
    return (
        //Para decirle que esos 2 elementos pertenecen a un fragmento de react <React.fragment>
        //Para poder usar las propiedades (props) dentro del html se usan llaves
        <> 
            {
                props.personas.map(persona => (
                    <>
                        <h3>Componente funcional en array</h3>
                        <span> {persona.nombre} {persona.apellido} </span> 
                    </>
                    )
                )
            }


        </>
    );
}
