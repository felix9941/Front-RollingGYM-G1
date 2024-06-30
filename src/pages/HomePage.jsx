import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import PowerGymPpal from "../../public/POWERGYMPpal.png";
import PubliBunker from "../../public/bunkerSuplementos.png";
import PubliEna from "../../public/enaSuplementos.png";
import PubliGatorade from "../../public/gatorade.png";
import PubliGaceta from "../../public/gaceta.png";
import PubliPalpitos from "../../public/palpitos24.jpg";
import PowerGymLogo from "../../public/powerGymLogo.png";
import InfiniteCarousel from "../components/InifiniteCarousel";
import "../css/HomePage.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [plan, setPlan] = useState("");
  const [id, setId] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [mensajeVencimiento, setMensajeVencimiento] = useState("");

  useEffect(() => {
    document.title = "Pagina Principal";
    getProductos();
    getProfesores();
    getCategorias();
    getPlanes();
    getDatos();
  }, []);

  useEffect(() => {
    controlVencimiento();
  }, [plan]);

  const getProductos = async () => {
    const response = await clienteAxios.get("/productos/prodHabilitados");
    setProductos(response.data.productosHabilitados);
  };

  const role = sessionStorage.getItem("role");

  const controlVencimiento = async () => {
    const today = Date.now();
    if (vencimiento === "") {
      return;
    }
    const diferenciaMilisegundos = vencimiento - today;
    let mensajeVencimiento;
    if (diferenciaMilisegundos <= 0) {
      mensajeVencimiento = "vencido";
    } else {
      const diferenciaDias = Math.ceil(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24)
      );
      mensajeVencimiento = `vence en ${diferenciaDias} días`;
    }
    setMensajeVencimiento(mensajeVencimiento);
    if (mensajeVencimiento === "vencido") {
      try {
        const response = await clienteAxios.put(
          `/clientes/vencimiento/${id}`,
          {}
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDatos = async () => {
    if (role === "cliente") {
      try {
        const response = await clienteAxios.get("/clientes/datos", config);
        setId(response.data.id);
        setVencimiento(response.data.vencimiento);
        setPlan(response.data.plan);
      } catch (error) {
        console.error("error al obtener los datos", error);
      }
    }
  };

  const getCategorias = async () => {
    if (role === "cliente") {
      try {
        const response = await clienteAxios.get(
          "/categorias/categoriasPlan",
          config
        );
        setCategorias(response.data.categoria);
      } catch (error) {
        console.error("error al obtener las categorias", error);
      }
    } else if (role === "administrador" || role === "profesor") {
      try {
        const response = await clienteAxios.get(
          "/categorias/categoriasHabilitadas"
        );
        setCategorias(response.data.categoria);
      } catch (error) {
        console.error("error al obtener las categorias", error);
      }
    }
  };

  const getPlanes = async () => {
    try {
      const response = await clienteAxios.get("/planes/planesHabilitados");
      setPlanes(response.data.planesHabilitados);
    } catch (error) {
      console.log("error al obtener los planes", error);
    }
  };

  const productSlidesLarge = [];
  for (let i = 0; i < productos.length; i += 3) {
    const items = productos.slice(i, i + 3).map((producto, index) => (
      <Col key={index} md={4} className="producto">
        <div className="producto-img-container">
          <img src={producto.foto} alt={producto.nombre} />
          <div className="producto-img-overlay">
            <h3 className="productos-contentH3">{producto.nombre}</h3>
          </div>
        </div>
      </Col>
    ));

    while (items.length < 3) {
      const producto = productos[items.length % productos.length];
      items.push(
        <Col key={`${i}-${items.length}`} md={4} className="producto">
          <div className="producto-img-container">
            <img src={producto.foto} alt={producto.nombre} />
            <div className="producto-img-overlay">
              <h3 className="productos-contentH3">{producto.nombre}</h3>
            </div>
          </div>
        </Col>
      );
    }

    productSlidesLarge.push(
      <Carousel.Item key={i}>
        <Row>{items}</Row>
      </Carousel.Item>
    );
  }
  const productSlidesSmall = productos.map((producto, index) => (
    <Carousel.Item key={index}>
      <div className="producto">
        <div className="producto-img-container">
          <img src={producto.foto} alt={producto.nombre} />
          <div className="producto-img-overlay">
            <h3 className="productos-contentH3">{producto.nombre}</h3>
          </div>
        </div>
      </div>
    </Carousel.Item>
  ));

  const getProfesores = async () => {
    const response = await clienteAxios.get("/profesores/habilitados");
    setProfesores(response.data.profesores);
  };

  const [comments, setComments] = useState([
    { autor: "Jeffrey Brown", texto: "El mejor Gym que conoci, buen ambiente" },
    {
      autor: "María Chen",
      texto: "A los mejores profes de pilates los encuentras en powerGYM",
    },
    {
      autor: "Juan Chen",
      texto:
        "Cuentan con todo lo necesario para hacer musculación, recomendado",
    },
  ]);

  const [newComment, setNewComment] = useState({ autor: "", texto: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Perfecto!",
      text: "Tu comentario sera revisado por un administrador antes de ser publicado",
      icon: "success",
    });
  };

  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setNewComment({ ...newComment, [e.target.name]: value });
  };

  const publicidades = [
    { logo: PubliBunker },
    { logo: PubliGaceta },
    { logo: PubliGatorade },
    { logo: PubliPalpitos },
    { logo: PubliEna },
    { logo: PowerGymLogo },
  ];

  return (
    <>
      <div className="container-Ppal">
        <section className="inicio">
          <div className="inicio-content">
            <h1 className="inicio-contentH1">Tu Cuerpo Primero</h1>
            <img className="logoTitulo" src={PowerGymPpal} alt="logo" />
            <p className="inicio-contentP">Acompañándote en el proceso</p>
            <a href="#planes" className="btn-PlanPpal">
              Ver Planes
            </a>
          </div>
        </section>

        <section className="reservacion">
          <h2
            className={`reservacion-contentH2 ${
              categorias.length <= 0 ? "d-none" : ""
            }`}
          >
            Reserva Tu Clase!
          </h2>
          <h2
            className={`reservacion-contentH2 ${
              categorias.length > 0 ? "d-none" : ""
            }`}
          >
            No Hay Clases Disponibles
          </h2>
          <h5 className="text-white">
            {mensajeVencimiento === "vencido"
              ? `Su plan esta vencido`
              : `Su plan es ${plan} y ${mensajeVencimiento}`}
          </h5>
          <Container>
            <Row>
              {mensajeVencimiento != "vencido"
                ? categorias.map((cat, index) => (
                    <Col xs={12} sm={6} lg={4} key={index}>
                      <Card className="clase">
                        <Link to={`/reservarClases?nombre=${cat.nombre}`}>
                          <div className="card-img-container">
                            <Card.Img
                              className="categoria-image"
                              variant="top"
                              src={cat.foto}
                              alt={cat.nombre}
                            />
                            <div className="card-img-overlay">
                              <Card.Title className="reservacion-contentH3">
                                {cat.nombre}
                              </Card.Title>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    </Col>
                  ))
                : null}
            </Row>
          </Container>
        </section>

        <section id="planes" className="planes">
          <h2 className="planes-contentH2">Elegí tu plan!</h2>
          <div className="planes-container">
            {planes.map((plan, index) => (
              <div className="plan" key={index}>
                <h3 className="plan-contentH3">{plan.nombre}</h3>
                <p className="plan-contentP">{plan.descripcion}</p>
                <p className="plan-contentPrecio">{`$${plan.precio}/mes`}</p>
                <Link to={`/detallePlan/${plan._id}`} className="btn-PlanPpal">
                  Ver Más
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="productos">
          <h2 className="productos-contentH2">
            Productos que podes adquirir en nuestro PowerGym
          </h2>
          <Container>
            {/* Carrusel para pantallas grandes */}
            <div className="d-none d-md-block">
              <Carousel
                prevIcon={
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                }
                nextIcon={
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                }
              >
                {productSlidesLarge}
              </Carousel>
            </div>
            {/* Carrusel para pantallas pequeñas */}
            <div className="d-md-none">
              <Carousel
                prevIcon={
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                }
                nextIcon={
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                }
              >
                {productSlidesSmall}
              </Carousel>
            </div>
          </Container>
        </section>
        <section className="profesores">
          <h2 className="profes-contentH2">Nuestros Profes</h2>
          <Container>
            {/* Carrusel para pantallas grandes */}
            <div className="d-none d-md-block">
              <Carousel>
                {profesores.map(
                  (profesor, index) =>
                    index % 3 === 0 && (
                      <Carousel.Item key={index}>
                        <Row>
                          {profesores.slice(index, index + 3).map((prof, i) => (
                            <Col key={i} md={4}>
                              <div className="profesor">
                                <div className="profesor-img-container">
                                  <img
                                    src={prof.foto}
                                    alt={prof.nombre}
                                    className="profesor-img"
                                  />
                                </div>
                                <div className="profesor-info">
                                  <h3 className="profes-contentH3">
                                    {prof.nombre}
                                  </h3>
                                  <p className="profes-contentP">
                                    {prof.apellido}
                                  </p>
                                </div>
                              </div>
                            </Col>
                          ))}
                          {/* Repetir profesores si no hay suficientes para completar el slide */}
                          {profesores.slice(index, index + 3).length < 3 &&
                            profesores
                              .slice(
                                0,
                                3 - profesores.slice(index, index + 3).length
                              )
                              .map((prof, i) => (
                                <Col key={i + 3} md={4}>
                                  <div className="profesor">
                                    <div className="profesor-img-container">
                                      <img
                                        src={prof.foto}
                                        alt={prof.nombre}
                                        className="profesor-img"
                                      />
                                    </div>
                                    <div className="profesor-info">
                                      <h3 className="profes-contentH3">
                                        {prof.nombre}
                                      </h3>
                                      <p className="profes-contentP">
                                        {prof.apellido}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                        </Row>
                      </Carousel.Item>
                    )
                )}
              </Carousel>
            </div>
            {/* Carrusel para pantallas pequeñas */}
            <div className="d-md-none">
              <Carousel>
                {profesores.map((profesor, index) => (
                  <Carousel.Item key={index}>
                    <div className="profesor">
                      <div className="profesor-img-container">
                        <img
                          src={profesor.foto}
                          alt={profesor.nombre}
                          className="profesor-img"
                        />
                      </div>
                      <div className="profesor-info">
                        <h3 className="profes-contentH3">{profesor.nombre}</h3>
                        <p className="profes-contentP">{profesor.apellido}</p>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Container>
        </section>
        {/*Comentarios */}
        <section className="comentarios">
          <h2 className="comentarios-contentH2">
            Lo que dicen nuestros clientes
          </h2>
          <div className="comments-container">
            {comments.map((comment, index) => (
              <div className="comment" key={index}>
                <p className="comentarios-contentP">{comment.texto}</p>
                <h3 className="comentarios-contentH3">- {comment.autor}</h3>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="formContacto">
            <input
              type="text"
              name="autor"
              placeholder="Tu nombre"
              pattern="[A-Za-z\s]*"
              value={newComment.autor}
              onChange={handleNameInput}
              required
              minLength={2}
              maxLength={30}
            />
            <textarea
              name="texto"
              placeholder="Tu comentario"
              value={newComment.texto}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={50}
            ></textarea>
            <button type="submit" className="btn-ComentarioPpal">
              Agregar Comentario
            </button>
          </form>
        </section>
        {/*Publicidad */}
        <section className="publicidades d-none d-md-block">
          <h2 className="publi-contentH2">Marcas que nos respaldan</h2>
          <InfiniteCarousel autoPlaySpeed={2000}>
            {publicidades.map((publicidad, index) => (
              <div className="publicidad" key={index}>
                <img src={publicidad.logo} alt={`Publicidad ${index + 1}`} />
              </div>
            ))}
          </InfiniteCarousel>
        </section>
      </div>
    </>
  );
};

export default HomePage;
