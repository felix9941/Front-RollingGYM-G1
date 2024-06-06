import Button from "react-bootstrap/Button";
import React from "react";
import Error404Img from "../../public/error404.svg";
import "../css/Error404.css";

function atras() {
  window.history.back(-1);
}

const Error404 = () => {
  return (
    <div className="fondo-blanco">
      <div className="tamanio d-flex flex-column">
        <img src={Error404Img} alt="" className="img-tamanio mt-5" />

        <div>
          <Button
            variant=""
            type="submit"
            className=" square-button_e my-5 custom-button_e"
            onClick={atras}
          >
            VOLVER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
