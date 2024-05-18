import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/NavbarPage.css";
import axios from "axios";

const NavbarPage = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [weather, setWeather] = useState(null);
  //SCroll
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
        setIsTop(false);
      } else {
        setIsScrolling(false);
        setIsTop(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Fin scroll
  const handleResponsiveChange = () => {
    setIsResponsive(window.innerWidth <= 999);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsiveChange);
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
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={`sticky-top ${isScrolling ? "navbar-scrolling" : ""}`}
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={
                isResponsive ? "ms-auto" : "ms-auto align-items-center"
              }
            >
              <Nav.Link href="#sobreNosotros">SOBRE NOSOTROS</Nav.Link>
              {!isResponsive && <span className="navbar-text">|</span>}
              <Nav.Link href="#contacto">CONTACTO</Nav.Link>
              {!isResponsive && <span className="navbar-text">|</span>}
              <Nav.Link href="#Login">INICIAR SESIÓN</Nav.Link>
              {!isResponsive && <span className="navbar-text">|</span>}
              <Nav.Link href="#Socio">¡HACETE SOCIO!</Nav.Link>
              {weather && weather.weather && weather.weather.length > 0 && (
                <span className="navbar-text">
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
    </>
  );
};

export default NavbarPage;
