export default function DetalleNominaciones(props){

    return(
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                {props.datos && 
                    <ul>
                        <li key={1}>Cantidad: {props.datos.cantidad} </li>
                        <li key={2}>Gandas: {props.datos.ganadas} </li>
                    </ul>
                }


            </fieldset>
        </>
    )
}