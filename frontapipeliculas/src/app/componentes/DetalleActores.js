export default function DetalleActores(props){

    return(
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <ul>
                    {props.datos && props.map((datos, idx) =>
                        (
                            <li key={idx}>{props.datos.name}</li>
                        )
                    )}
                </ul>
            </fieldset>
        </>
    )
}