import { useState } from "react";
import logo from "../assets/logoPragma.svg";
import CrearAdmon from "./CrearAdmon";

function CrearPartida() {
  const [nombrePartida, setNombrePartida] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [createGame, setCreateGame] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();
    if (
      validMinMaxCharacters(nombrePartida, 5, 20) &&
      noCharacterSpecials(nombrePartida) &&
      maxLengthNumbersInCharacters(nombrePartida, 3) &&
      !noOnlyNumbers(nombrePartida)
    ) {
      console.log("Nombre válido. Creando partida...");
      setErrorInput(false);
      setCreateGame(true)
    } else {
       // Mostrar mensaje error
      console.log("Nombre inválido");
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
    setNombrePartida(event.target.value);
  };

  // Simulamos un loader
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <section className="container">
      {isLoading === true && <img className="loaderLogo" src={logo} />}

      {isLoading === false && createGame === false && (
        <form onSubmit={validateForm}>
          <div className="form-control">
            <label>Nombra la partida:</label>
            <input
              type="text"
              value={nombrePartida}
              onChange={handleInputChange}
            />
          </div>
          {errorInput === true && <span>Nombre no válido</span>}
          <button>Crear partida</button>
        </form>
      )}

      {createGame === true && <CrearAdmon/>}
    </section>
  );
}

export default CrearPartida;
