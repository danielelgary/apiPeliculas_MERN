import ComponenteFuncional from "./ComponenteFuncional";
import ComponenteFuncionalArray from "./ComponenteFuncionalArray";
import ComponenteClase from "./ComponenteClase";
import ResultadosBusqueda from "./app/paginas/ResultadosBusqueda";
import Routes from "./app/routes/Routes";
import Header from "./app/componentes/Header";

function App() {

  let datos = [
    {
      "nombre" : "Daniel",
      "apellido" : "Gaviria"
    },
    {
      "nombre" : "Camila",
      "apellido" : "Foronda"
    }
  ];

  return (
    <>

      <h1>CREANDO COMPONENETES CON REACT</h1>
      
      {/*
      <ComponenteFuncional nombre="Daniel" apellido="Gaviria"/>
      <ComponenteFuncional nombre="Camila" apellido="Foronda"/>
      <ComponenteFuncional nombre="Sara" apellido="Gaviria"/>

      <ComponenteFuncionalArray personas = {datos} />

      <ComponenteClase />
      */}
      
      <Header>
        <Routes />

      </Header>
    </>
  );
}

export default App;
