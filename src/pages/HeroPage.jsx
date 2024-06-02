import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import ImgMusculacion from "../../public/musculacion1.jpg";
import ImgPlanClases from "../../public/planClases.jpg";
import ImgFull from "../../public/full.jpg";
import ImgMusculacionMobile from "../../public/musculacionMobile.jpg";
import ImgPlanClasesMobile from "../../public/clasesMobile.jpg";
import ImgFullMobile from "../../public/fullMobile.jpg";
import styles from "../css/HeroPage.module.css";
import "../css/HeroPageG.css";

const HeroPage = () => {
  useEffect(() => {
    document.title = "Hero Page";
  }, []);

  return (
    <div className={styles.fullScreen}>
      <Carousel
        fade
        className={styles.carHero}
        nextIcon={<span className="carousel-control-next-icon changed"></span>}
        prevIcon={<span className="carousel-control-prev-icon changed"></span>}
      >
        <Carousel.Item>
          <Image src={ImgMusculacion} fluid />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>MUSCULACION</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Accede a nuestra completa gama de equipos de musculación para
                potenciar tu entrenamiento de fuerza y resistencia
              </p>
              <NavLink
                className={`${styles.btnHero} fw-lighter`}
                to="/registro"
              >
                HAZTE SOCIO!
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={ImgPlanClases} fluid />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>CLASES</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Participa en todas nuestras clases dirigidas por instructores
                expertos para diversificar tu rutina de ejercicio y alcanzar tus
                objetivos
              </p>
              <NavLink
                className={`${styles.btnHero} fw-lighter`}
                to="/registro"
              >
                HAZTE SOCIO!
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={ImgFull} fluid />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>PLAN FULL</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Disfruta de lo mejor de ambos mundos con acceso ilimitado a
                todos los equipos y clases para maximizar tu experiencia de
                fitness
              </p>
              <NavLink
                className={`${styles.btnHero} fw-lighter`}
                to="/registro"
              >
                HAZTE SOCIO!
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Carousel
        fade
        className={styles.carHeroM}
        nextIcon={<span className="carousel-control-next-icon changed"></span>}
        prevIcon={<span className="carousel-control-prev-icon changed"></span>}
      >
        <Carousel.Item>
          <Image src={ImgMusculacionMobile} fluid className="image-mobile" />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>MUSCULACION</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Accede a nuestra completa gama de equipos de musculación para
                potenciar tu entrenamiento de fuerza y resistencia
              </p>
              <NavLink
                className={`${styles.btnHero} fw-lighter`}
                to="/registro"
              >
                HAZTE SOCIO!
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={ImgPlanClasesMobile} fluid className="image-mobile" />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>CLASES</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Participa en todas nuestras clases dirigidas por instructores
                expertos para diversificar tu rutina de ejercicio y alcanzar tus
                objetivos
              </p>
              <NavLink
                className={`${styles.btnHero} fw-lighter`}
                to="/registro"
              >
                HAZTE SOCIO!
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={ImgFullMobile} fluid className="image-mobile" />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>PLAN FULL</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Disfruta de lo mejor de ambos mundos con acceso ilimitado a
                todos los equipos y clases para maximizar tu experiencia de
                fitness
              </p>
              <NavLink
                className={`${styles.btnHero} fw-lighter`}
                to="/registro"
              >
                HAZTE SOCIO!
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroPage;
