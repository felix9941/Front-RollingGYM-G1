import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarPage = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="w-100">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src="/public/powerGymLogo.png"
              alt="Logo"
              width="120"
              height="40"
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#sobreNosotros">SOBRE NOSOTROS</Nav.Link>
            <span className="navbar-text">|</span>
            <Nav.Link href="#contacto">CONTACTO</Nav.Link>
            <span className="navbar-text">|</span>
            <Nav.Link href="#Login">INICIAR SESIÓN</Nav.Link>
            <span className="navbar-text">|</span>
            <Nav.Link href="#Socio">¡HASTE SOCIO!</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPage;
