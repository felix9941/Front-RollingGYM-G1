import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
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
        /* indicators={false} */
        nextIcon={<span className="carousel-control-next-icon changed"></span>}
        prevIcon={<span className="carousel-control-prev-icon changed"></span>}
        /* nextIcon={false}
        prevIcon={false} */
      >
        <Carousel.Item>
          <Image src="/public/musculacion1.jpg" fluid />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>MUSCULACION</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Accede a nuestra completa gama de equipos de musculación para
                potenciar tu entrenamiento de fuerza y resistencia
              </p>
              <a className={`${styles.btnHero} fw-lighter`} href="/registro">
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="../../public/planClases.jpg" fluid />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>CLASES</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Participa en todas nuestras clases dirigidas por instructores
                expertos para diversificar tu rutina de ejercicio y alcanzar tus
                objetivos
              </p>
              <a className={`${styles.btnHero} fw-lighter`} href="/registro">
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="../../public/full.jpg" fluid />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>PLAN FULL</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Disfruta de lo mejor de ambos mundos con acceso ilimitado a
                todos los equipos y clases para maximizar tu experiencia de
                fitness
              </p>
              <a className={`${styles.btnHero} fw-lighter`} href="/registro">
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Carousel
        fade
        className={styles.carHeroM}
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
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>MUSCULACION</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Accede a nuestra completa gama de equipos de musculación para
                potenciar tu entrenamiento de fuerza y resistencia
              </p>
              <a className={`${styles.btnHero} fw-lighter`} href="/registro">
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
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>CLASES</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Participa en todas nuestras clases dirigidas por instructores
                expertos para diversificar tu rutina de ejercicio y alcanzar tus
                objetivos
              </p>
              <a className={`${styles.btnHero} fw-lighter`} href="/registro">
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="../../public/fullMobile.jpg"
            fluid
            className="image-mobile"
          />
          <Carousel.Caption className={styles.customCaption}>
            <div className={styles.heroTextBox}>
              <h3 className={`fs-1 mb-2 ${styles.h3HP}`}>PLAN FULL</h3>
              <p className={`mb-4 ${styles.pHP}`}>
                Disfruta de lo mejor de ambos mundos con acceso ilimitado a
                todos los equipos y clases para maximizar tu experiencia de
                fitness
              </p>
              <a className={`${styles.btnHero} fw-lighter`} href="/registro">
                HAZTE SOCIO!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroPage;
