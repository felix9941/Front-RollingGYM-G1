import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaNuevo from "../components/ModalParaNuevo.jsx";
import styles from "../css/AdminPages.module.css";

const AdminPlanes = () => {
  useEffect(() => {
    document.title = "Administrar Planes";
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    nombre: "FULL",
    precio: "8000",
    descripcion: "Este plan contiene todas las categorias",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
  });

  const handleChange = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { nombre, precio, descripcion } = formData;
    let newErrors = {};

    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;
    const precioExpReg = /^[0-9]+$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    }

    if (!nombreApellidoExpReg.test(descripcion)) {
      newErrors = { ...newErrors, descripcion: "descripcionInvalido" };
    }

    if (!precioExpReg.test(precio)) {
      newErrors = { ...newErrors, precio: "precioInvalido" };
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    console.log({ ...formData, ...newErrors });
  };

  const errorMessage = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      case "precioInvalido":
        return "Ingresar precio";
      case "descripcionInvalido":
        return "Ingresar descripcion";
      default:
        break;
    }
  };
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Planes</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Editar Plan
          </Button>
          <ModalParaNuevo
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            errorMessage={errorMessage}
            tipo="plan"
          />
        </div>
      </div>
    </>
  );
};

export default AdminPlanes;
