import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "../css/HeroPage.css";

const HeroPage = () => {
  useEffect(() => {
    document.title = "Hero Page";
  }, []);

  return (
    <div className="full-screen">
      <Carousel
        fade
        className="car-hero"
        /* indicators={false} */
        nextIcon={<span className="carousel-control-next-icon changed"></span>}
        prevIcon={<span className="carousel-control-prev-icon changed"></span>}
        /* nextIcon={false}
        prevIcon={false} */
      >
        <Carousel.Item>
          <Image src="../../public/musculacion1.jpg" fluid />
          <Carousel.Caption className="custom-caption">
            <div className="hero-text-box">
              <h3 className="fs-1">MUSCULACION</h3>
              <p>
                Accede a nuestra completa gama de equipos de musculación para
                potenciar tu entrenamiento de fuerza y resistencia
              </p>
              <a
                className="btn-hero fw-lighter"
                href="https://www.google.com/?authuser=0"
              >
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="../../public/planClases.jpg" fluid />
          <Carousel.Caption className="custom-caption">
            <div className="hero-text-box">
              <h3 className="fs-1">CLASES</h3>
              <p>
                Participa en todas nuestras clases dirigidas por instructores
                expertos para diversificar tu rutina de ejercicio y alcanzar tus
                objetivos
              </p>
              <a className="btn-hero fw-lighter">HAZTE SOCIO!</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="../../public/full.jpg" fluid />
          <Carousel.Caption className="custom-caption">
            <div className="hero-text-box">
              <h3 className="fs-1">PLAN FULL</h3>
              <p>
                Disfruta de lo mejor de ambos mundos con acceso ilimitado a
                todos los equipos y clases para maximizar tu experiencia de
                fitness
              </p>
              <a className="btn-hero fw-lighter">HAZTE SOCIO!</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Carousel
        fade
        className="car-hero-m"
        /* indicators={false} */
        nextIcon={<span className="carousel-control-next-icon changed"></span>}
        prevIcon={<span className="carousel-control-prev-icon changed"></span>}
        /* nextIcon={false}
        prevIcon={false} */
      >
        <Carousel.Item>
          <Image
            src="../../public/musculacionMobile.jpg"
            fluid
            className="image-mobile"
          />
          <Carousel.Caption className="custom-caption">
            <div className="hero-text-box">
              <h3 className="fs-1">MUSCULACION</h3>
              <p>
                Accede a nuestra completa gama de equipos de musculación para
                potenciar tu entrenamiento de fuerza y resistencia
              </p>
              <a
                className="btn-hero fw-lighter"
                href="https://www.google.com/?authuser=0"
              >
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="../../public/clasesMobile.jpg"
            fluid
            className="image-mobile"
          />
          <Carousel.Caption className="custom-caption">
            <div className="hero-text-box">
              <h3 className="fs-1">CLASES</h3>
              <p>
                Participa en todas nuestras clases dirigidas por instructores
                expertos para diversificar tu rutina de ejercicio y alcanzar tus
                objetivos
              </p>
              <a className="btn-hero fw-lighter">HAZTE SOCIO!</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="../../public/fullMobile.jpg"
            fluid
            className="image-mobile"
          />
          <Carousel.Caption className="custom-caption">
            <div className="hero-text-box">
              <h3 className="fs-1">PLAN FULL</h3>
              <p>
                Disfruta de lo mejor de ambos mundos con acceso ilimitado a
                todos los equipos y clases para maximizar tu experiencia de
                fitness
              </p>
              <a className="btn-hero fw-lighter">HAZTE SOCIO!</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroPage;
