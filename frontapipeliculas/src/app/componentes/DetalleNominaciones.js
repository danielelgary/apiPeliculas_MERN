export default function DetalleNominaciones(props){

    return(
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <ul>
                    {props.datos && props.map((datos, idx) =>
                        (
                            <li key={1}>Cantidad: {props.datos.cantidad}</li>
                        )
                    )}

                </ul>

            </fieldset>
        </>
    )
}