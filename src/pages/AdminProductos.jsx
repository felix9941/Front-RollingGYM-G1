import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaNuevo from "../components/ModalParaNuevo";
import styles from "../css/AdminPages.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const AdminProductos = () => {
  useEffect(() => {
    document.title = "Administrar Productos";
  }, []);

  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
    setFormData({ ...formData, foto: ev.target.files[0] });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { nombre, foto } = formData;
    let newErrors = {};

    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    } else {
      if (foto) {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("foto", foto);

        const cargarProducto = await fetch(
          "http://localhost:3002/api/productos",
          {
            method: "POST",
            body: formData,
          }
        );
        console.log("Producto cargado?", cargarProducto);
      }
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    console.log({ ...formData, ...newErrors });

    console.log(foto);
  };

  const errorMessage = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      case "fotoInvalido":
        return "Ingresar foto";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administración de Productos</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Nuevo Producto
          </Button>
        </div>
      </div>
      <ModalParaNuevo
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        errorMessage={errorMessage}
        tipo="producto"
      />
    </>
  );
};

export default AdminProductos;
