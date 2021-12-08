import { Switch, Route, Redirect } from "react-router";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import DetallePelicula from "../paginas/DetallePelicula";
import AdministrarPeliculas from "../paginas/AdministrarPeliculas";
import Login from "../paginas/Login";
import Header from "../componentes/Header";
import { useState } from "react";

export default function Routes(){

    const auth = localStorage.getItem("auth");

    const [usuario, setUsuario] = useState(auth);

    return (
        <Switch>
            <Header usuario={usuario} autenticado={setUsuario}>
                <Route exact path="/" component={ResultadosBusqueda} />
                <Route path="/detalle/:id" component={DetallePelicula} />
                <Route path="/administrar">
                    {
                        usuario ? <AdministrarPeliculas /> : <Redirect to="/login" />
                    }
                </Route>
                <Route path="/login">
                    <Login autenticado={setUsuario} />
                </Route>
            </Header>

        </ Switch>
    );
}