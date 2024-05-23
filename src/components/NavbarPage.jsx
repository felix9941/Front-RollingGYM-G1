import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
        <Navbar.Brand href="#home">
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
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={isResponsive ? "ms-auto" : "ms-auto align-items-center"}
          >
            <Nav.Link
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
              href="/sobreNosotros"
            >
              SOBRE NOSOTROS
            </Nav.Link>
            {!isResponsive && <span className={styles.navbarText}>|</span>}
            <Nav.Link
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
              href="/contacto"
            >
              CONTACTO
            </Nav.Link>
            {!isResponsive && <span className={styles.navbarText}>|</span>}
            <Nav.Link
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
              href="#Login"
            >
              INICIAR SESIÓN
            </Nav.Link>
            {!isResponsive && <span className={styles.navbarText}>|</span>}
            <Nav.Link
              className={`${styles.navLink} ${
                isScrolling ? styles.navbarScrollingNavLink : ""
              }`}
              href="/registro"
            >
              ¡HACETE SOCIO!
            </Nav.Link>
            {weather && weather.weather && weather.weather.length > 0 && (
              <span className={styles.navbarText}>
                <img
                  src={getWeatherIconUrl(weather.weather[0].icon)}
                  alt="weather icon"
                  width="20"
                  height="20"
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
