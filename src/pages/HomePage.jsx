import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Card, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import PowerGymPpal from "../../public/POWERGYMPpal.png";
import PesasReservación from "../../public/pesas-reservación.png";
import BoxeoReservación from "../../public/boxeo-reservación.png";
import CrossfitReservación from "../../public/Crossfit-reservación.png";
import MusculaconReservación from "../../public/musculación-reservación.png";
import PilatesReservación from "../../public/pilates-reservación.png";
import CalisteniaReservación from "../../public/calistenia-reservación.png";
import AdvancedWheyProtein from "../../public/Advanced Whey Protein (1000 gr.) (33 sv.).png";
import MancuernaVinilica from "../../public/Mancuerna Vinilica 4kg (por unidad).jpg";
import StarNutritionWhey from "../../public/STAR NUTRITION Whey Platinum Protein (3000 gr.) (100 sv.).png";
import MatYogaColchoneta from "../../public/MAT YOGA COLCHONETA 1 CM BOLSO RANDERS PILATES FITNESS ARG-031A.webp";
import JuanPerez from "../../public/juan-perez-musculacion.png";
import RobertoMayan from "../../public/iconoPowerGym.png";
import MariaSarmiento from "../../public/profe-maria-zumba.png";
import SergioGomez from "../../public/musculación-reservación.png";
import LudmilaDiaz from "../../public/iconoPowerGym.png";
import MarceloPaz from "../../public/enrique-boxeo.png";
import JulianaDiaz from "../../public/profe-pilates.png";
import PubliNike from "../../public/publi-nike.png";
import PubliAdidas from "../../public/publi-adidas.png";
import PubliColegym from "../../public/publi-colegym.png";
import PubliUnderArmour from "../../public/publi-under-armour.png";
import PowerGymLogo from "../../public/powerGymLogo.png";
import InfiniteCarousel from "../components/InifiniteCarousel";
import "../css/HomePage.css";
import clienteAxios from "../helpers/clienteAxios";

const HomePage = () => {
  useEffect(() => {
    document.title = "Pagina Principal";
    getProductos();
  }, []);

  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const response = await clienteAxios.get("/productos/prodHabilitados");
    setProductos(response.data.getAllProducts);
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

  const profesores = [
    {
      nombre: "Juan Perez",
      especialidad: "Musculación",
      imagen: JuanPerez,
    },
    {
      nombre: "Roberto Mayan",
      especialidad: "Crossfit",
      imagen: RobertoMayan,
    },
    {
      nombre: "Maria Sarmiento",
      especialidad: "Zumba",
      imagen: MariaSarmiento,
    },
    {
      nombre: "Sergio Gomez",
      especialidad: "Musculación",
      imagen: SergioGomez,
    },
    {
      nombre: "Ludmila Diaz",
      especialidad: "Zumba",
      imagen: LudmilaDiaz,
    },
    {
      nombre: "Marcelo Paz",
      especialidad: "Boxeo",
      imagen: MarceloPaz,
    },
    {
      nombre: "Juliana Diaz",
      especialidad: "Pilates",
      imagen: JulianaDiaz,
    },
  ];

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
      text: "Tu comentario fue enviado con éxito!",
      icon: "success",
    }).then(() => {
      setComments([...comments, newComment]);
      setNewComment({ autor: "", texto: "" });
    });
  };

  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setNewComment({ ...newComment, [e.target.name]: value });
  };

  const publicidades = [
    { logo: PubliNike },
    { logo: PubliAdidas },
    { logo: PubliColegym },
    { logo: PubliUnderArmour },
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
          <h2 className="reservacion-contentH2">Reserva Tu Clase!</h2>
          <Container>
            <Row>
              <Col xs={6} md={4} lg={4}>
                <Card className="clase">
                  <Link to="/reservarClases">
                    <div className="card-img-container">
                      <Card.Img
                        variant="top"
                        src={PesasReservación}
                        alt="Pesas"
                      />
                      <div className="card-img-overlay">
                        <Card.Title className="reservacion-contentH3">
                          Pesas
                        </Card.Title>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
              <Col xs={6} md={4} lg={4}>
                <Card className="clase">
                  <Link to="/reservarClases">
                    <div className="card-img-container">
                      <Card.Img
                        variant="top"
                        src={BoxeoReservación}
                        alt="Boxeo"
                      />
                      <div className="card-img-overlay">
                        <Card.Title className="reservacion-contentH3">
                          Boxeo
                        </Card.Title>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
              <Col xs={6} md={4} lg={4}>
                <Card className="clase">
                  <Link to="/reservarClases">
                    <div className="card-img-container">
                      <Card.Img
                        variant="top"
                        src={CrossfitReservación}
                        alt="Crossfit"
                      />
                      <div className="card-img-overlay">
                        <Card.Title className="reservacion-contentH3">
                          Crossfit
                        </Card.Title>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4} lg={4}>
                <Card className="clase">
                  <Link to="/reservarClases">
                    <div className="card-img-container">
                      <Card.Img
                        variant="top"
                        src={MusculaconReservación}
                        alt="Musculación"
                      />
                      <div className="card-img-overlay">
                        <Card.Title className="reservacion-contentH3">
                          Musculación
                        </Card.Title>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
              <Col xs={6} md={4} lg={4}>
                <Card className="clase">
                  <Link to="/reservarClases">
                    <div className="card-img-container">
                      <Card.Img
                        variant="top"
                        src={PilatesReservación}
                        alt="Pilates"
                      />
                      <div className="card-img-overlay">
                        <Card.Title className="reservacion-contentH3">
                          Pilates
                        </Card.Title>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
              <Col xs={6} md={4} lg={4}>
                <Card className="clase">
                  <Link to="/reservarClases">
                    <div className="card-img-container">
                      <Card.Img
                        variant="top"
                        src={CalisteniaReservación}
                        alt="Calistenia"
                      />
                      <div className="card-img-overlay">
                        <Card.Title className="reservacion-contentH3">
                          Calistenia
                        </Card.Title>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section id="planes" className="planes">
          <h2 className="planes-contentH2">Elegí tu plan!</h2>
          <div className="planes-container">
            <div className="plan">
              <h3 className="plan-contentH3">Plan Aparatos</h3>
              <p className="plan-contentP">
                Este plan está diseñado para aquellos que prefieren enfocarse en
                el uso de máquinas y equipos de alta calidad para su
                entrenamiento. Con el Plan Aparatos, tendrás acceso ilimitado a
                nuestra zona de pesas y máquinas cardiovasculares, incluyendo
                cintas de correr, elípticas, bicicletas estáticas y mucho más.
                Ideal para quienes desean mejorar su fuerza, resistencia y
                bienestar general a su propio ritmo.
              </p>
              <p className="plan-contentPrecio">$7000/mes</p>
              <a
                href="https://wa.me/3815896119?text=Hola!%20Me%20interesa%20inscribirme%20en%20el%20Plan%20FULL"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-PlanPpal"
              >
                Ver Más
              </a>
            </div>
            <div className="plan">
              <h3 className="plan-contentH3">Plan Full</h3>
              <p className="plan-contentP">
                El Plan FULL es nuestra opción más completa, ideal para quienes
                buscan una experiencia integral en el gimnasio. Este plan
                incluye todos los beneficios del Plan Aparatos, además de acceso
                ilimitado a nuestras diversas clases grupales, zona de
                entrenamiento funcional y otros servicios exclusivos. Es
                perfecto para aquellos que buscan variedad y un enfoque
                holístico en su rutina de ejercicios.
              </p>
              <p className="plan-contentPrecio">$10000/mes</p>
              <a
                href="https://wa.me/3815896119?text=Hola!%20Me%20interesa%20inscribirme%20en%20el%20Plan%20FULL"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-PlanPpal"
              >
                Ver Más
              </a>
            </div>
            <div className="plan">
              <h3 className="plan-contentH3">Plan Clases</h3>
              <p className="plan-contentP">
                El Plan Clases está especialmente diseñado para los amantes de
                las actividades grupales y dirigidas. Con este plan, podrás
                asistir a todas nuestras clases programadas, desde clases de
                alta intensidad como HIIT y CrossFit hasta sesiones más
                relajantes como yoga y pilates. Es perfecto para aquellos que
                disfrutan de la motivación y energía que brinda el entrenamiento
                en grupo.
              </p>
              <p className="plan-contentPrecio">$8000/mes</p>
              <a
                href="https://wa.me/3815896119?text=Hola!%20Me%20interesa%20inscribirme%20en%20el%20Plan%20FULL"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-PlanPpal"
              >
                Ver Más
              </a>
            </div>
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
                                    src={prof.imagen}
                                    alt={prof.nombre}
                                    className="profesor-img"
                                  />
                                </div>
                                <div className="profesor-info">
                                  <h3 className="profes-contentH3">
                                    {prof.nombre}
                                  </h3>
                                  <p className="profes-contentP">
                                    {prof.especialidad}
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
                                        src={prof.imagen}
                                        alt={prof.nombre}
                                        className="profesor-img"
                                      />
                                    </div>
                                    <div className="profesor-info">
                                      <h3 className="profes-contentH3">
                                        {prof.nombre}
                                      </h3>
                                      <p className="profes-contentP">
                                        {prof.especialidad}
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
                          src={profesor.imagen}
                          alt={profesor.nombre}
                          className="profesor-img"
                        />
                      </div>
                      <div className="profesor-info">
                        <h3 className="profes-contentH3">{profesor.nombre}</h3>
                        <p className="profes-contentP">
                          {profesor.especialidad}
                        </p>
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
