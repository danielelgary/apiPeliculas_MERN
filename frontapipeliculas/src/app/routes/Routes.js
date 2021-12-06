import { Switch, Route } from "react-router";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import DetallePelicula from "../paginas/DetallePelicula";
import AdministrarPeliculas from "../paginas/AdministrarPeliculas";
import Login from "../paginas/Login";

export default function Routes(){

    return (
        <Switch>
            <Route exact path="/" component={ResultadosBusqueda} />
            <Route path="/detalle/:id" component={DetallePelicula} />
            <Route path="/administrar" component={AdministrarPeliculas} />
            <Route path="/login" component={Login} />
        </ Switch>
    );
}