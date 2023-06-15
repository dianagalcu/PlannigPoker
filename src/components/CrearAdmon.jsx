import { useState } from "react";
import VisualizarMesa from "./VisualizarMesa";

function CrearAdmon() {
  const [nombreAdmon, setNombreAdmon] = useState("");
  const [selectView, setSelectView] = useState("Spectator");
  const [errorInput, setErrorInput] = useState(false);
  const [createTable, setCreateTable] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();
    if (
      validMinMaxCharacters(nombreAdmon, 5, 20) &&
      noCharacterSpecials(nombreAdmon) &&
      maxLengthNumbersInCharacters(nombreAdmon, 3) &&
      !noOnlyNumbers(nombreAdmon)
    ) {
      console.log("Nombre válido. Creando administrador...");
      setErrorInput(false);
      setCreateTable(true);
    } else {
      console.log("Nombre inválido");
      // Mostrar mensaje error
      setErrorInput(true);
    }
  };

  const validMinMaxCharacters = (texto, min, max) => {
    if (texto.length >= min && texto.length <= max) return true;
  };

  const noCharacterSpecials = (texto) => {
    if (texto.match(/\W/) === null) return true;
  };

  const maxLengthNumbersInCharacters = (texto) => {
    let cantNumber = 0;
    for (let i = 0; i < texto.length; i++) {
      if (Number.isInteger(parseInt(texto.charAt(i)))) {
        cantNumber++;
      }
    }
    if (cantNumber <= 3) return true;
  };

  const noOnlyNumbers = (texto) => {
    if (/^([0-9])*$/.test(texto)) return true;
  };

  const handleInputChange = (event) => {
    setNombreAdmon(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectView(event.target.value);
  };

  return (
    <section>
      {createTable === false && (
        <form className="adminForm" onSubmit={validateForm}>
          <div className="form-control">
            <label>Tu nombre:</label>
            <input
              type="text"
              value={nombreAdmon}
              onChange={handleInputChange}
            />
          </div>
         
          <div className="form-control horizontal">
            <label htmlFor="playerView">
              Jugador
              <input
                name="viewType"
                id="playerView"
                type="radio"
                value="Player"
                checked={selectView === "Player"}
                onChange={handleRadioChange}
              />
            </label>

            <label htmlFor="spectatorView">
              Espectador
              <input
                name="viewType"
                id="spectatorView"
                type="radio"
                value="Spectator"
                checked={selectView === "Spectator"}
                onChange={handleRadioChange}
              />
            </label>
          </div>
          {errorInput === true && <span>Nombre no válido</span>}
          <button>Continuar</button>
        </form>
      )}

      {createTable === true && <VisualizarMesa />}
    </section>
  );
}

export default CrearAdmon;
