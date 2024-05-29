import styles from "../css/AdminPages.module.css";

const AdminProductos = () => {
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Productos</h1>
          <button className={styles.buttonAdmins}>Nuevo Productos</button>
        </div>
      </div>
    </>
  );
};

export default AdminProductos;
