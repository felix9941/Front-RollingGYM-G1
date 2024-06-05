// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import styles from "../css/AdminPages.module.css";
// import Swal from "sweetalert2";
// import fondo from "../../public/fondo_r.png";
// import "../css/Registro.css";

// const AdminAdministradores = () => {
//   useEffect(() => {
//     document.title = "Administrar administradores";
//   }, []);

//   const [formData, setFormData] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     celular: "",
//     pass: "",
//     rpass: "",
//   });

//   const [errors, setErrors] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     celular: "",
//     pass: "",
//     rpass: "",
//   });

//   const cambioDatosUsuario = (ev) => {
//     const { user, pass, rpass } = formData;
//     let newErrors = {};
//     setFormData({ ...formData, [ev.target.name]: ev.target.value });
//     if (formData.user) {
//       newErrors = { ...newErrors, user: user };
//     }
//     if (formData.pass) {
//       newErrors = { ...newErrors, pass: pass };
//     }
//     if (formData.rpass) {
//       newErrors = { ...newErrors, rpass: rpass };
//     }
//     setErrors(newErrors);
//   };

//   const mensajeError = (error) => {
//     switch (error) {
//       case "nombreInvalido":
//         return "Ingresar nombre";
//       case "apellidoInvalido":
//         return "Ingresar apellido";
//       case "celularInvalido":
//         return "Ingresar celular. Ej: 3815896118";
//       case "mailInvalido":
//         return "Ingresar e-mail";
//       case "passVacio":
//         return "Ingresar contraseña";
//       case "passNoCumple":
//         return "La contraseña contener almenos 6 caracteres alfanumericos";
//       case "passNoCoincide":
//         return "La contraseña no coincide";
//       default:
//         break;
//     }
//   };

//   const enviarFormulario = (ev) => {
//     ev.preventDefault();
//     const { user, nombre, apellido, celular, email, pass, rpass } = formData;
//     let newErrors = {};
//     const passExpReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
//     const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;

//     const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const celularExpReg = /^\d{10}$/;

//     if (!nombreApellidoExpReg.test(nombre)) {
//       newErrors = { ...newErrors, nombre: "nombreInvalido" };
//     }

//     if (!nombreApellidoExpReg.test(apellido)) {
//       newErrors = { ...newErrors, apellido: "apellidoInvalido" };
//     }

//     if (!celularExpReg.test(celular)) {
//       newErrors = { ...newErrors, celular: "celularInvalido" };
//     }

//     if (!emailExpReg.test(email)) {
//       newErrors = { ...newErrors, email: "mailInvalido" };
//     }

//     if (!pass) {
//       newErrors = { ...newErrors, pass: "passVacio" };
//     } else if (!passExpReg.test(pass)) {
//       newErrors = { ...newErrors, pass: "passNoCumple" };
//     }
//     if (!rpass) {
//       newErrors = { ...newErrors, rpass: "passVacio" };
//     } else if (!passExpReg.test(rpass)) {
//       newErrors = { ...newErrors, rpass: "passNoCumple" };
//     } else {
//       if (pass !== rpass) {
//         newErrors = { ...newErrors, rpass: "passNoCoincide" };
//       } else {
//         setShow(false);
//         // Swal.fire({
//         //   icon: "success",
//         //   title: "Envío Exitoso",
//         //   text: "Su solicitud de registro se aprobara dentro de las proximas 48hs",
//         // });
//       }
//     }

//     setErrors((prevState) => ({ ...prevState, ...newErrors }));
//     console.log({ ...formData, ...newErrors });
//   };

//   const mostrarMensajeErrorNombre = mensajeError(errors.nombre);
//   const mostrarMensajeErrorApellido = mensajeError(errors.apellido);
//   const mostrarMensajeErrorCelular = mensajeError(errors.celular);
//   const mostrarMensajeErrorMail = mensajeError(errors.email);
//   const mostrarMensajeErrorPass = mensajeError(errors.pass);
//   const mostrarMensajeErrorRpass = mensajeError(errors.rpass);

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <>
//       <div className={styles.contenedorAdmins}>
//         <div className={styles.encabezadoAdministrador}>
//           <h1 className={styles.h1Admins}>Administracion de Administradores</h1>
//           {/* <button className={styles.buttonAdmins}>Nuevo Administrador</button> */}
//           <Button className={styles.buttonAdmins} onClick={handleShow}>
//             Nuevo Administrador
//           </Button>

//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Nuevo Administrador</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <div className="row">
//                   <Form.Group
//                     className=" col-md-6 col-sm-12"
//                     controlId="formBasicNombre"
//                   >
//                     <Form.Control
//                       className={errors.nombre && "is-invalid"}
//                       type="text"
//                       placeholder="Nombre"
//                       onChange={cambioDatosUsuario}
//                       name="nombre"
//                       value={formData.nombre}
//                     />
//                     <div className="error-message_registro">
//                       {mostrarMensajeErrorNombre && (
//                         <p className="text-warning m-0">
//                           {mostrarMensajeErrorNombre}
//                         </p>
//                       )}
//                     </div>
//                   </Form.Group>
//                   <Form.Group
//                     className=" col-md-6 col-sm-12"
//                     controlId="formBasicApellido"
//                   >
//                     <Form.Control
//                       className={errors.apellido && "is-invalid"}
//                       type="text"
//                       placeholder="Apellido"
//                       onChange={cambioDatosUsuario}
//                       name="apellido"
//                       value={formData.apellido}
//                     />
//                     <div className="error-message_registro">
//                       {mostrarMensajeErrorApellido && (
//                         <p className="text-warning m-0">
//                           {mostrarMensajeErrorApellido}
//                         </p>
//                       )}
//                     </div>
//                   </Form.Group>
//                 </div>
//                 <div className="row">
//                   <Form.Group
//                     className="col-md-6 col-sm-12"
//                     controlId="formBasicCelular"
//                   >
//                     <Form.Control
//                       className={errors.celular && "is-invalid"}
//                       type="text"
//                       placeholder="Celular"
//                       onChange={cambioDatosUsuario}
//                       name="celular"
//                       value={formData.celular}
//                     />
//                     <div className="error-message_registro">
//                       {mostrarMensajeErrorCelular && (
//                         <p className="text-warning m-0">
//                           {mostrarMensajeErrorCelular}
//                         </p>
//                       )}
//                     </div>
//                   </Form.Group>
//                   <Form.Group
//                     className="col-md-6 col-sm-12"
//                     controlId="formBasicEmail"
//                   >
//                     <Form.Control
//                       className={errors.email && "is-invalid"}
//                       type="email"
//                       placeholder="E-Mail"
//                       onChange={cambioDatosUsuario}
//                       name="email"
//                       value={formData.email}
//                     />
//                     <div className="error-message_registro">
//                       {mostrarMensajeErrorMail && (
//                         <p className="text-warning m-0">
//                           {mostrarMensajeErrorMail}
//                         </p>
//                       )}
//                     </div>
//                   </Form.Group>
//                 </div>
//                 <div className="row">
//                   <Form.Group
//                     className="col-md-6 col-sm-12"
//                     controlId="formBasicPass"
//                   >
//                     <Form.Control
//                       className={
//                         errors.pass === "passVacio" ||
//                         errors.pass === "passNoCumple"
//                           ? "is-invalid"
//                           : ""
//                       }
//                       type="password"
//                       placeholder="Contraseña"
//                       onChange={cambioDatosUsuario}
//                       name="pass"
//                       value={formData.pass}
//                     />
//                     <div className="error-message_registro">
//                       {mostrarMensajeErrorPass && (
//                         <p className="text-warning m-0">
//                           {mostrarMensajeErrorPass}
//                         </p>
//                       )}
//                     </div>
//                   </Form.Group>
//                   <Form.Group
//                     className="col-md-6 col-sm-12"
//                     controlId="formBasicRpass"
//                   >
//                     <Form.Control
//                       className={
//                         errors.rpass === "passVacio" ||
//                         errors.rpass === "passNoCumple"
//                           ? "is-invalid"
//                           : ""
//                       }
//                       type="password"
//                       placeholder="Repetir Contraseña"
//                       onChange={cambioDatosUsuario}
//                       name="rpass"
//                       value={formData.rpass}
//                     />
//                     <div className="error-message_registro">
//                       {mostrarMensajeErrorRpass && (
//                         <p className="text-warning m-0">
//                           {mostrarMensajeErrorRpass}
//                         </p>
//                       )}
//                     </div>
//                   </Form.Group>
//                 </div>
//               </Form>{" "}
//             </Modal.Body>
//             <Modal.Footer>
//               <Button
//                 variant=""
//                 type="submit"
//                 className="w-100 square-button_registro mt-3 custom-button_registro"
//                 onClick={enviarFormulario}
//               >
//                 Enviar Registro
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminAdministradores;

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "../css/AdminPages.module.css";
import Swal from "sweetalert2";
import fondo from "../../public/fondo_r.png";
import "../css/Registro.css";
import ModalParaAlta from "../components/ModalParaAlta.jsx";

const AdminAdministradores = () => {
  useEffect(() => {
    document.title = "Administrar administradores";
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

  // const mensajeError = (error) => {

  // };

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
        setShow(false);
        // Swal.fire({
        //   icon: "success",
        //   title: "Envío Exitoso",
        //   text: "Su solicitud de registro se aprobara dentro de las proximas 48hs",
        // });
      }
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
          <h1 className={styles.h1Admins}>Administracion de Administradores</h1>
          <Button onClick={handleShow}>Nuevo Administrador</Button>
          <ModalParaAlta
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            errorMessage={errorMessage}
            tipo="cliente"
          />
        </div>
      </div>
    </>
  );
};

export default AdminAdministradores;
