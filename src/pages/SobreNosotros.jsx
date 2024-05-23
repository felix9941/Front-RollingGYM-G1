import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../css/SobreNosotros.module.css";
import { useEffect } from "react";

const SobreNosotros = () => {
  useEffect(() => {
    document.title = "Power Gym";
  }, []);
  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src="../../public/snDesktop.jpg"
          className={`${styles.imageD} ${styles.backgroundImage}`}
        />
        <img
          src="../../public/snMobile.jpg"
          className={`${styles.imageM} ${styles.backgroundImage}`}
        />
        <div className={styles.textOverlay}>
          <h1 className={`mb-sm-3 mt-5 ${styles.h1SN}`}>
            ¡Bienvenidos a Power Gym!
          </h1>
          <h4 className={styles.h4SN}>
            En Power Gym transformamos el ejercicio en una experiencia única y
            revitalizante. Nuestro objetivo es ayudarte a alcanzar tus metas de
            bienestar físico y mental a través de una combinación perfecta de
            clases energizantes y equipos de última generación.
          </h4>
          <h1 className={`mt-sm-1 ${styles.fundD} ${styles.h1SN}`}>
            Fundadores
          </h1>
        </div>
      </div>
      <h1 className={`${styles.fundM} ${styles.h1SN} text-center`}>
        Fundadores
      </h1>
      <Row
        xs={1}
        sm={2}
        lg={3}
        className={`g-3 ms-5 me-5 ${styles.cardContainer}`}
      >
        <Col key={1}>
          <div className={styles.card}>
            <h2 className={styles.h2SN}>Ignacio Duarte</h2>
            <h3 className={styles.h3SN}>Co-Fundador y Entrenador Principal</h3>
            <img src="../../public/nachooo.png" alt="Juan Pérez" />
            <p className={styles.pSN}>
              Con más de 15 años de experiencia en fitness, Nacho es experto en
              entrenamiento personal y nutrición deportiva, comprometido a
              ayudar a los miembros a alcanzar sus metas.
            </p>
          </div>
        </Col>
        <Col key={2}>
          <div className={styles.card}>
            <h2 className={styles.h2SN}>Javier Isasmendi</h2>
            <h3 className={styles.h3SN}>
              Co-Fundador y Especialista en Clases
            </h3>
            <img src="../../public/nachooo.png" alt="Juan Pérez" />
            <p className={styles.pSN}>
              Certificado en yoga, pilates y Zumba, aporta su energía y pasión
              por el fitness, haciendo que cada clase sea divertida y accesible
              para todos.
            </p>
          </div>
        </Col>
        <Col key={3}>
          <div className={styles.card}>
            <h2 className={styles.h2SN}>Felix Figueroa</h2>
            <h3 className={styles.h3SN}>
              Co-Fundador y Director de Operaciones
            </h3>
            <img src="../../public/nachooo.png" alt="Juan Pérez" />
            <p className={styles.pSN}>
              Con experiencia en administración y gestión deportiva, Felix
              asegura una operación perfecta del gimnasio, enfocándose en
              ofrecer la mejor experiencia a nuestros miembros.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SobreNosotros;
