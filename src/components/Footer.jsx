import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import "../css/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row pt-1 align-items-center fsfooter">
          <div className="col-12 col-md-6 col-lg-4 text-center mt-2 mb-2">
            <a href="#page">
              <img
                src="/public/iconoPowerGym.png"
                alt="LogoPowerGym"
                width="100"
              />
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-center mt-2 mb-2">
            <div className="redes">
              <p className="mt-2 mb-2">Av. General Paz, Piso 9, Of 2</p>
              <p className="mb-2">San Miguel de Tucumán, AR</p>
              <div className="Redes d-flex justify-content-center icons">
                <a href="#error404" className="text-white fs-6 p-2 footer-link">
                  <FaFacebook className="icono-redes" />
                </a>
                <a href="#error404" className="text-white fs-6 p-2 footer-link">
                  <FaWhatsapp className="icono-redes" />
                </a>
                <a href="#error404" className="text-white fs-6 p-2 footer-link">
                  <FaInstagram className="icono-redes" />
                </a>
                <a href="#error404" className="text-white fs-6 p-2 footer-link">
                  <FaTwitter className="icono-redes" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-center mt-2 mb-2">
            <div className="informacion-pag text-center mt-4 mb-3">
              <a href="#Inicio">Inicio</a>
              <br />
              <a href="#SN">Sobre nosotros</a>
              <br />
              <a href="#C">Contacto</a>
              <br />
              <a href="#PF">Preguntas Frecuentes</a>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-inf">
        <div className="container-fluid">
          <div className="row">
            <h6 className="text-center mt-3">
              &copy; 2024 PowerGym Grupo 2 . Todos los derechos reservados.
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
