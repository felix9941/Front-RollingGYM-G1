import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LogoPowerGYM from "../../public/powerGymLogo.png";
import styles from "../css/NavbarPage.module.css";
import axios from "axios";

const NavbarPage = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [expanded, setExpanded] = useState(false);

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

  useEffect(() => {
    const role =
      sessionStorage.getItem("role") || localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setUserRole(null);
    navigate("/iniciarSesion");
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const handleNavLinkClick = (e) => {
    if (isResponsive && expanded) {
      e.preventDefault();
      setExpanded(false);
    }
  };

  return (
    <Navbar
      expand="lg"
      className={`sticky-top ${
        isScrolling ? styles.navbarScrolling : styles.navbarInitial
      }`}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
          <img src={LogoPowerGYM} alt="LogoPowerGYM" width="100" height="40" />
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
            {userRole && (
              <>
                <Nav.Link
                  as={Link}
                  to={
                    userRole === "administrador"
                      ? "/principalAdmin"
                      : userRole === "profesor"
                      ? "/misClases"
                      : "/principal"
                  }
                  className={`${styles.navLink} ${
                    isScrolling ? styles.navbarScrollingNavLink : ""
                  }`}
                >
                  INICIO
                </Nav.Link>
                {!isResponsive && <span className={styles.navbarText}>|</span>}
              </>
            )}
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
            {userRole === "administrador" && (
              <>
                <NavDropdown
                  title={
                    <span className={styles.navbarScrollingDropdown}>
                      ADMINISTRACIÓN ↓
                    </span>
                  }
                  id="admin-nav-dropdown"
                  className={styles.navbarDropdown}
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/principalAdmin"
                    className={styles.navbarDropdownItem}
                  >
                    Menú de Administrador
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/principal"
                    className={styles.navbarDropdownItem}
                  >
                    Home Page POWERGYM
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminAdmins"
                    className={styles.navbarDropdownItem}
                  >
                    Admin de Administradores
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminCategorias"
                    className={styles.navbarDropdownItem}
                  >
                    Admin Categorias
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminClases"
                    className={styles.navbarDropdownItem}
                  >
                    Admin de Clases
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminClientes"
                    className={styles.navbarDropdownItem}
                  >
                    Admin de Clientes
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminProfesores"
                    className={styles.navbarDropdownItem}
                  >
                    Admin de Profesores
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminPlanes"
                    className={styles.navbarDropdownItem}
                  >
                    Admin de Planes
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/adminProductos"
                    className={styles.navbarDropdownItem}
                  >
                    Admin Productos
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/misDatos"
                    className={styles.navbarDropdownItem}
                  >
                    Mis Datos Admin
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to="/logout"
                  className={`${styles.navLink} ${
                    isScrolling ? styles.navbarScrollingNavLink : ""
                  }`}
                  onClick={handleLogout}
                >
                  CERRAR SESIÓN
                </Nav.Link>
              </>
            )}
            {userRole === "profesor" && (
              <>
                <NavDropdown
                  title={
                    <span className={styles.navbarScrollingDropdown}>
                      MI CUENTA ↓
                    </span>
                  }
                  id="user-nav-dropdown"
                  className={styles.navbarDropdown}
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/misClases"
                    className={styles.navbarDropdownItem}
                  >
                    Mis Clases
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/misDatos"
                    className={styles.navbarDropdownItem}
                  >
                    Mis Datos
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to="/logout"
                  className={`${styles.navLink} ${
                    isScrolling ? styles.navbarScrollingNavLink : ""
                  }`}
                  onClick={handleLogout}
                >
                  CERRAR SESIÓN
                </Nav.Link>
              </>
            )}
            {userRole === "cliente" && (
              <>
                <NavDropdown
                  title={
                    <span className={styles.navbarScrollingDropdown}>
                      MI CUENTA ↓
                    </span>
                  }
                  id="user-nav-dropdown"
                  className={styles.navbarDropdown}
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/misDatos"
                    className={styles.navbarDropdownItem}
                  >
                    Mis Datos
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/misReservas"
                    className={styles.navbarDropdownItem}
                  >
                    Mis Reservas
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/reservarClases"
                    className={styles.navbarDropdownItem}
                  >
                    Reservar una Clase
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to="/logout"
                  className={`${styles.navLink} ${
                    isScrolling ? styles.navbarScrollingNavLink : ""
                  }`}
                  onClick={handleLogout}
                >
                  CERRAR SESIÓN
                </Nav.Link>
              </>
            )}
            {!userRole && (
              <>
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
              </>
            )}
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
