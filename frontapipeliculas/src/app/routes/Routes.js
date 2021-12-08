import { Switch, Route, Redirect } from "react-router";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import DetallePelicula from "../paginas/DetallePelicula";
import AdministrarPeliculas from "../paginas/AdministrarPeliculas";
import Login from "../paginas/Login";

export default function Routes(){

    const usuario = localStorage.getItem("auth");

    return (
        <Switch>
            <Route exact path="/" component={ResultadosBusqueda} />
            <Route path="/detalle/:id" component={DetallePelicula} />
            <Route path="/administrar">
                {
                    usuario ? <AdministrarPeliculas /> : <Redirect to="/login" />
                }
            </Route>
            <Route path="/login" component={Login} />
        </ Switch>
    );
}