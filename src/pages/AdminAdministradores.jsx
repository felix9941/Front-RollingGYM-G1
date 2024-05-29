import styles from "../css/AdminPages.module.css";

const AdminAdministradores = () => {
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Administradores</h1>
          <button className={styles.buttonAdmins}>Nuevo Administrador</button>
        </div>
      </div>
    </>
  );
};

export default AdminAdministradores;
