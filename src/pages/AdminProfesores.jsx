import styles from "../css/AdminPages.module.css";

const AdminProfesores = () => {
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Profesores</h1>
          <button className={styles.buttonAdmins}>Nuevo Profesor</button>
        </div>
      </div>
    </>
  );
};

export default AdminProfesores;
