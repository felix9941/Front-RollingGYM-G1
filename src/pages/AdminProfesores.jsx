import styles from "../css/AdminPages.module.css";

const AdminProfesores = () => {
  return (
    <>
      <div className={styles.encabezadoAdministrador}>
        <h1 className={styles.h1Admins}>Administracion de Profesores</h1>
        <button className={styles.buttonAdmins}>Nuevo Profesor</button>
      </div>
    </>
  );
};

export default AdminProfesores;
