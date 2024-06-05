import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaAlta from "../components/ModalParaAlta.jsx";
import styles from "../css/AdminPages.module.css";

const AdminProfesores = () => {
  useEffect(() => {
    document.title = "Administrar Profesores";
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    pass: "",
    rpass: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    pass: "",
    rpass: "",
  });

  const handleChange = (ev) => {
    const { user, pass, rpass } = formData;
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    if (formData.user) {
      newErrors = { ...newErrors, user: user };
    }
    if (formData.pass) {
      newErrors = { ...newErrors, pass: pass };
    }
    if (formData.rpass) {
      newErrors = { ...newErrors, rpass: rpass };
    }
    setErrors(newErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { user, nombre, apellido, celular, email, pass, rpass } = formData;
    let newErrors = {};
    const passExpReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;

    const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celularExpReg = /^\d{10}$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    }

    if (!nombreApellidoExpReg.test(apellido)) {
      newErrors = { ...newErrors, apellido: "apellidoInvalido" };
    }

    if (!celularExpReg.test(celular)) {
      newErrors = { ...newErrors, celular: "celularInvalido" };
    }

    if (!emailExpReg.test(email)) {
      newErrors = { ...newErrors, email: "mailInvalido" };
    }

    if (!pass) {
      newErrors = { ...newErrors, pass: "passVacio" };
    } else if (!passExpReg.test(pass)) {
      newErrors = { ...newErrors, pass: "passNoCumple" };
    }
    if (!rpass) {
      newErrors = { ...newErrors, rpass: "passVacio" };
    } else if (!passExpReg.test(rpass)) {
      newErrors = { ...newErrors, rpass: "passNoCumple" };
    } else {
      if (pass !== rpass) {
        newErrors = { ...newErrors, rpass: "passNoCoincide" };
      } else {
        // Swal.fire({
        //   icon: "success",
        //   title: "Envío Exitoso",
        //   text: "Su solicitud de registro se aprobara dentro de las proximas 48hs",
        // });
      }
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    console.log({ ...formData, ...newErrors });

    // UNA VEZ CARGADO CON EXITO EJECUTAR LA FUNCION
    //  handleClose(); O SOLAMENTE setShow(false);
  };

  const errorMessage = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      case "apellidoInvalido":
        return "Ingresar apellido";
      case "celularInvalido":
        return "Ingresar celular. Ej: 3815896118";
      case "mailInvalido":
        return "Ingresar e-mail";
      case "passVacio":
        return "Ingresar contraseña";
      case "passNoCumple":
        return "La contraseña contener almenos 6 caracteres alfanumericos";
      case "passNoCoincide":
        return "La contraseña no coincide";
      default:
        break;
    }
  };
  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Profesores</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Nuevo Profesor
          </Button>
          <ModalParaAlta
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            errorMessage={errorMessage}
            tipo="profesor"
          />
        </div>
      </div>
    </>
  );
};

export default AdminProfesores;
