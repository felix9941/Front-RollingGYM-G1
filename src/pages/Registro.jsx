import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2"; // para instalar la libreria poner npm install sweetalert2

const RegisterPage = () => {
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

  const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  const cambioDatosUsuario = (ev) => {
    const { user, pass, rpass } = formData; //Desestructuramiento
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    /* Creo que error deberia estar en cambio de datos porque trabajaria con el onchange y se podria hacer una validacion en tiempo real */
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

  const mensajeError = (error) => {
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

  const enviarFormulario = (ev) => {
    ev.preventDefault();
    const { user, nombre, apellido, celular, email, pass, rpass } = formData;
    let newErrors = {};
    const passExpReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const nombreApellidoExpReg = /^(?=.*[a-zA-Z\s])[A-Za-z]{3,}$/;
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
      }
    }

    // const userExist = usersLocalStorage.find(
    //   (userLS) => userLS.userName === user
    // );

    // if (userExist) {
    //   return alert("Usuario no disponible");
    // }

    // if (user && pass && rpass) {
    //   if (pass === rpass) {
    //     //Si length es >0 se ejecuta lo primero si length es 0 se ejecuta la segunda parte de la ternaria
    //     const idUser = usersLocalStorage.length
    //       ? usersLocalStorage[usersLocalStorage.length - 1].id + 1
    //       : 1;
    //     const roleUser = usersLocalStorage.length ? "user" : "admin";

    //     const newUser = {
    //       id: idUser,
    //       userName: user,
    //       pass: pass,
    //       cart: [],
    //       fav: [],
    //       role: roleUser,
    //       delete: false,
    //       login: true,
    //     };
    //     usersLocalStorage.push(newUser);
    //     localStorage.setItem("users", JSON.stringify(usersLocalStorage));
    //     localStorage.setItem("user", JSON.stringify(newUser));
    //     Swal.fire({
    //       title: "Good job!",
    //       text: "Registro exitoso!",
    //       icon: "success",
    //     });
    //     setTimeout(() => {
    //       location.href = "/home-userLog";
    //     }, 1000);
    //     /* Cuando haya transcurrido el tiempo especificado (1000 milisegundos o 1 segundo), se
    //     ejecutará la función de callback. setTimeout espera el tiempo especificado y luego ejecuta la
    //     función que se le pasa como argumento (en este caso, la arrow function). Por lo tanto, después de
    //     1 segundo, la página se redirigirá a "/home - userLog" debido a la ejecución de la función de
    //     callback en setTimeout. */

    //     // Limpiar los campos del formulario
    //     //setFormData({ user: "", pass: "", rpass: "" });
    //   } else {
    //     newErrors = { ...newErrors, rpass: "errorRpass" };
    //   }
    // }
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    //toma un estado anterior y con newErrors actualiza de ser necesario lo que no conbine
    console.log({ ...formData, ...newErrors });
  };

  const mostrarMensajeErrorNombre = mensajeError(errors.nombre);
  const mostrarMensajeErrorApellido = mensajeError(errors.apellido);
  const mostrarMensajeErrorCelular = mensajeError(errors.celular);
  const mostrarMensajeErrorMail = mensajeError(errors.email);
  const mostrarMensajeErrorPass = mensajeError(errors.pass);
  const mostrarMensajeErrorRpass = mensajeError(errors.rpass);

  return (
    <div className="d-flex justify-content-center pt-5 mt-5">
      {/* Muy importante el h-100 que es equivalente a poner height de 100% para centrar verticalmente
      "d-flex justify-content-center align-items-center h-100"*/}
      <Form>
        <div className="row">
          <Form.Group
            className="mb-3 col-md-6 col-sm-12"
            controlId="formBasicNombre"
          >
            <Form.Control
              className={errors.nombre && "is-invalid"}
              type="text"
              placeholder="Nombre"
              onChange={cambioDatosUsuario}
              name="nombre"
              value={formData.nombre}
            />
            {mostrarMensajeErrorNombre && (
              <p className="text-danger">{mostrarMensajeErrorNombre}</p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3 col-md-6 col-sm-12"
            controlId="formBasicApellido"
          >
            <Form.Control
              className={errors.apellido && "is-invalid"}
              type="text"
              placeholder="Apellido"
              onChange={cambioDatosUsuario}
              name="apellido"
              value={formData.apellido}
            />
            {mostrarMensajeErrorApellido && (
              <p className="text-danger">{mostrarMensajeErrorApellido}</p>
            )}
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group
            className="mb-3 col-md-6 col-sm-12"
            controlId="formBasicCelular"
          >
            <Form.Control
              className={errors.celular && "is-invalid"}
              type="text"
              placeholder="Celular"
              onChange={cambioDatosUsuario}
              name="celular"
              value={formData.celular}
            />
            {mostrarMensajeErrorCelular && (
              <p className="text-danger">{mostrarMensajeErrorCelular}</p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3 col-md-6 col-sm-12"
            controlId="formBasicEmail"
          >
            <Form.Control
              className={errors.email && "is-invalid"}
              type="email"
              placeholder="E-Mail"
              onChange={cambioDatosUsuario}
              name="email"
              value={formData.email}
            />
            {mostrarMensajeErrorMail && (
              <p className="text-danger">{mostrarMensajeErrorMail}</p>
            )}
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group
            className="mb-3 col-md-6 col-sm-12"
            controlId="formBasicPass"
          >
            <Form.Control
              className={
                errors.pass === "passVacio" || errors.pass === "passNoCumple"
                  ? "is-invalid"
                  : ""
              }
              type="password"
              placeholder="Contraseña"
              onChange={cambioDatosUsuario}
              name="pass"
              value={formData.pass}
            />
            {mostrarMensajeErrorPass && (
              <p className="text-danger">{mostrarMensajeErrorPass}</p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3 col-md-6 col-sm-12"
            controlId="formBasicRpass"
          >
            <Form.Control
              className={
                errors.rpass === "passVacio" || errors.rpass === "passNoCumple"
                  ? "is-invalid"
                  : ""
              }
              type="password"
              placeholder="Repetir Contraseña"
              onChange={cambioDatosUsuario}
              name="rpass"
              value={formData.rpass}
            />
            {mostrarMensajeErrorRpass && (
              <p className="text-danger">{mostrarMensajeErrorRpass}</p>
            )}
          </Form.Group>
        </div>

        <Button
          variant="success"
          type="submit"
          className="w-100"
          onClick={enviarFormulario}
        >
          Enviar Formulario
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
