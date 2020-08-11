import React, { useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  //state del formulario
  //   const [busqueda, setBusqueda] = useState({
  //     ciudad: "",
  //     pais: "",
  //   });

  //extraer ciudad y pais
  const { ciudad, pais } = busqueda;

  //funcion de error
  const [error, setError] = useState(false);

  //fucntion que coloca los elementos en un state

  const handleChange = (e) => {
    //actualizar el state
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario presione el bton para hacer el submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    //pasar la informacion del submit a un componente principal para consultarlo a la API
    setConsultar(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad"> Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">-- Seleccione un país </option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="CL">Chile</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
          <option value="AU">Autralia</option>
          <option value="BE">Bélgica</option>
          <option value="EA">Emiratos Árabes Unidos</option>
        </select>
        <label htmlFor="pais"> País: </label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired,
};
export default Formulario;
