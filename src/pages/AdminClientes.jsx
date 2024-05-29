import styles from "../css/AdminPages.module.css";

const AdminClientes = () => {
  return (
    <>
      <div className={styles.encabezadoAdministrador}>
        <h1 className={styles.h1Admins}>Administracion de Clientes</h1>
        <button className={styles.buttonAdmins}>Nuevo Cliente</button>
      </div>
    </>
  );
};

export default AdminClientes;
