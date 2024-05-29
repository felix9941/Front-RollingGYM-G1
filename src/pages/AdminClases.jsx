import styles from "../css/AdminPages.module.css";

const AdminClases = () => {
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Clases</h1>
          <button className={styles.buttonAdmins}>Nueva Clase</button>
        </div>
      </div>
    </>
  );
};

export default AdminClases;
