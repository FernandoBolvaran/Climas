import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //state del formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const { ciudad, pais } = busqueda;
  //controlar la consulta a la API
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        //funcion que consulta a la API

        const appId = "2bac1102e1a562b0d0cccf858ca08959";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);

        //Validar si no existe la ciudad a consultar
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultarAPI();
    //para sacar ele warning que nos marca la dependencia de pais y ciudad.
    //eslint-disable-next-line
  }, [consultar]);

  //crear una variable para detectar el error; //carga condicional de componentes
  let componente;

  if (error) {
    componente = <Error mensaje="No hay resultados en tu búsqueda" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
