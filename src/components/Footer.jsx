import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconoPowerGYM from "../../public/iconoPowerGym.png";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row pt-1 align-items-center fsfooter">
          <div className="col-12 col-md-6 col-lg-4 text-center mt-2 mb-2">
            <Link to="/" className="text-white fs-6 p-2 footer-link">
              <img src={IconoPowerGYM} alt="LogoPowerGym" width="100" />
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-center mt-2 mb-2">
            <div className="redes">
              <p className="mt-2 mb-2">General Paz 556</p>
              <p className="mb-2">San Miguel de Tucumán, AR</p>
              <div className="Redes d-flex justify-content-center icons">
                <Link
                  to="/error404"
                  className="text-white fs-6 p-2 footer-link"
                >
                  <FaFacebook className="icono-redes" />
                </Link>
                <a
                  href="https://wa.me/3815896119?text=Hola!%20Me%20interesa%20inscribirme%20en%20el%20Plan%20FULL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white fs-6 p-2 footer-link"
                >
                  <FaWhatsapp className="icono-redes" />
                </a>
                <Link
                  to="/error404"
                  className="text-white fs-6 p-2 footer-link"
                >
                  <FaInstagram className="icono-redes" />
                </Link>
                <Link
                  to="/error404"
                  className="text-white fs-6 p-2 footer-link"
                >
                  <FaTwitter className="icono-redes" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-center mt-2 mb-2">
            <div className="informacion-pag text-center mt-4 mb-3">
              <Link to="/principal">Inicio</Link>
              <br />
              <Link to="/sobreNosotros">Sobre Nosotros</Link>
              <br />
              <Link to="/contacto">Contacto</Link>
              <br />
              <Link to="/error404">Preguntas Frecuentes</Link>
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
