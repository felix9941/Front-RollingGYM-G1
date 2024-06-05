import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaNuevo from "../components/ModalParaNuevo";
import styles from "../css/AdminPages.module.css";

const AdminProductos = () => {
  useEffect(() => {
    document.title = "Administrar Productos";
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
  });

  const handleChange = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { nombre } = formData;
    let newErrors = {};

    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    console.log({ ...formData, ...newErrors });
  };

  const errorMessage = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Productos</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Nuevo Producto
          </Button>
          <ModalParaNuevo
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            errorMessage={errorMessage}
            tipo="producto"
          />
        </div>
      </div>
    </>
  );
};

export default AdminProductos;
