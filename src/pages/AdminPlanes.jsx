import styles from "../css/AdminPages.module.css";

const AdminPlanes = () => {
  useEffect(() => {
    document.title = "Administrar Planes";
  }, []);
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion Planes</h1>
        </div>
      </div>
    </>
  );
};

export default AdminPlanes;
