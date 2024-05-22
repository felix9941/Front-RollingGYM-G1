import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Contacto.css";
import Swal from "sweetalert2";

const Contacto = () => {
  useEffect(() => {
    document.title = "Contacto";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Perfecto!",
      text: "Tu mensaje fue enviado con éxito!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text">CONTACTANOS</h2>
      <p className="text">
        No dudes en consultar más sobre nuestros servicios, horarios y
        promociones! Estamos aquí para ayudarte
      </p>
      <div className="row justify-content-between">
        <div className="col-12 col-md-5 mb-4">
          <h5>Horarios de atención al cliente</h5>
          <p>Lunes a Viernes 8:00hs – 20:00hs</p>
          <div className="telefono-mail">
            <div>
              <h5>Celular</h5>
              <p>+54 (381) 5656591</p>
            </div>
            <div>
              <h5>Email</h5>
              <p>powergym@gmail.com</p>
            </div>
          </div>
          <div id="map" className="mt-2 mb-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949466!2d-65.2097419248374!3d-26.836578490026547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1715820552427!5m2!1ses-419!2sar"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <h5 className="mt-4">Dirección</h5>
          <p>General Paz 556, San Miguel de Tucumán, Argentina</p>
        </div>
        <div className="col-12 col-md-5">
          <h5>Escribenos! responderemos a la brevedad</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Telefono"
                  required
                  minLength={10}
                />
              </div>
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Escribe aquí tu mensaje..."
                required
                minLength={10}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-block mt-2 mb-4">
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
