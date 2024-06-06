import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaNuevo from "../components/ModalParaNuevo.jsx";
import styles from "../css/AdminPages.module.css";

const AdminClases = () => {
  useEffect(() => {
    document.title = "Administrar Clases";
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    capacidad: "",
    categoria: {
      Boxeo: false,
      Crossfit: false,
      Zumba: false,
    },
    dia: "",
    hora: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    capacidad: "",
    categoria: {
      Boxeo: false,
      Crossfit: false,
      Zumba: false,
    },
    dia: "",
    hora: "",
  });

  const handleChange = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { nombre, apellido, capacidad, categoria, dia, hora } = formData;
    let newErrors = {};

    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;
    const capacidadExpReg = /^[0-9]+$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    }

    if (!nombreApellidoExpReg.test(apellido)) {
      newErrors = { ...newErrors, apellido: "apellidoInvalido" };
    }

    if (!capacidadExpReg.test(capacidad)) {
      newErrors = { ...newErrors, capacidad: "capacidadInvalido" };
    }

    // if (!categoria) {
    //   newErrors = { ...newErrors, categoria: "categoriaInvalido" };
    // }

    if (!dia) {
      newErrors = { ...newErrors, dia: "diaInvalido" };
    }

    if (!hora) {
      newErrors = { ...newErrors, hora: "horaInvalido" };
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    console.log({ ...formData, ...newErrors });
  };

  const errorMessage = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      case "apellidoInvalido":
        return "Ingresar apellido";
      case "capacidadInvalido":
        return "Ingresar capacidad";
      case "categoriaInvalido":
        return "Seleccionar categoria";
      case "diaInvalido":
        return "Ingresar dia";
      case "horaInvalido":
        return "Ingresar hora";
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Clases</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Nueva Clase
          </Button>
          <ModalParaNuevo
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            errorMessage={errorMessage}
            tipo="clase"
          />
        </div>
      </div>
    </>
  );
};

export default AdminClases;
