import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "../css/Contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  useEffect(() => {
    document.title = "Contacto";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setFormData({ ...formData, telefono: value });
  };

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
    <div className="containerContacto my-5">
      <div className="container mx-auto">
        <div className="row justify-content-between gap-5">
          <div className="col-12 d-flex flex-column">
            <h1 className="textContactoH1">CONTÁCTANOS</h1>
            <p className="textContactoP">
              No dudes en consultar más sobre nuestros servicios, horarios y
              promociones! Estamos aquí para ayudarte
            </p>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <h5 className="textContactoH5">Horarios de atención al cliente</h5>
            <p className="textContactoP">Lunes a Viernes 8:00hs – 20:00hs</p>
            <div className="telefono-mail">
              <div>
                <h5 className="textContactoH5">Celular</h5>
                <p className="textContactoP">+54 (381) 5656591</p>
              </div>
              <div>
                <h5 className="textContactoH5">Email</h5>
                <p className="textContactoP">powergym@gmail.com</p>
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
            <h5 className="textContactoH5 mt-3">Dirección</h5>
            <p className="textContactoP">
              General Paz 556, San Miguel de Tucumán, Argentina
            </p>
          </div>
          <div className="col-12 col-md-5">
            <h5 className="textContactoH5">
              Escríbenos! responderemos a la brevedad
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleNameInput}
                    pattern="[A-Za-z\s]*"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleNameInput}
                    pattern="[A-Za-z\s]*"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handlePhoneInput}
                    pattern="\+?\d*"
                    required
                    minLength={10}
                    maxLength={15}
                  />
                </div>
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Escribe aquí tu mensaje..."
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
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
    </div>
  );
};

export default Contacto;
