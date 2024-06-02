import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Asegúrate de importar Link
import styles from "../css/NavbarPage.module.css";
import axios from "axios";

const NavbarPage = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleResponsiveChange = () => {
    setIsResponsive(window.innerWidth <= 999);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsiveChange);
    handleResponsiveChange();
    return () => {
      window.removeEventListener("resize", handleResponsiveChange);
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=-26.82414&lon=-65.2226&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) =>
        console.error("Error al obtener datos meteorológicos:", error)
      );
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <Navbar
      expand="lg"
      className={`sticky-top ${
        isScrolling ? styles.navbarScrolling : styles.navbarInitial
      }`}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {" "}
          {/* Usa Link para la navegación interna */}
          <img
            src="/public/powerGymLogo.png"
            alt="LogoPowerGYM"
            width="100"
            height="40"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={
            isScrolling
              ? styles.navbarScrollingToggler
              : styles.navbarInitialToggler
          }
        >
          <FontAwesomeIcon icon={faBars} style={{ color: "#ff6600" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={isResponsive ? "ms-auto" : "ms-auto align-items-center"}
          >
            <Nav.Link
              as={Link}
              to="/sobreNosotros"
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
            >
              SOBRE NOSOTROS
            </Nav.Link>
            {!isResponsive && <span className={styles.navbarText}>|</span>}
            <Nav.Link
              as={Link}
              to="/contacto"
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
            >
              CONTACTO
            </Nav.Link>
            {!isResponsive && <span className={styles.navbarText}>|</span>}
            <Nav.Link
              as={Link}
              to="/iniciarSesion"
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
            >
              INICIAR SESIÓN
            </Nav.Link>
            {!isResponsive && <span className={styles.navbarText}>|</span>}
            <Nav.Link
              as={Link}
              to="/registro"
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
            >
              ¡HACETE SOCIO!
            </Nav.Link>
            {weather && weather.weather && weather.weather.length > 0 && (
              <span className={styles.navbarText}>
                <img
                  src={getWeatherIconUrl(weather.weather[0].icon)}
                  alt="weather icon"
                  width="30"
                  height="30"
                />
                {`${weather.name}: ${weather.main.temp}°C`}
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
