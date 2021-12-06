export default function DetalleGeneral(props){

    return(
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <ul>
                    
                    {props.datos && props.datos.map(
                        (datos, idx) => 
                        (
                            <li key={idx}> {datos}  </li>
                        )
                    )}
                </ul>
            </fieldset>
        </>
    )
}