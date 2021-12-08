export default function DetalleActores(props){

    return(
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <ul>
                    {props.datos && props.datos.map((datos, idx) =>
                        (
                            <li key={idx}>{datos.nombre} {datos.apellido}</li>
                        )
                    )}
                </ul>
            </fieldset>
        </>
    )
}