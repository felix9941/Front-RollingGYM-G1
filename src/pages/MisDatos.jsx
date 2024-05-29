import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2"; // para instalar la libreria poner npm install sweetalert2
import "../css/MisDatos.css";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const MisDatos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    pass: "",
    rpass: "",
    textArea: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    pass: "",
    rpass: "",
    textArea: "",
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
      } else {
        //Envio exitoso - Sweet alert - Podria aplicar un trycach
        Swal.fire({
          icon: "success",
          title: "Envío Exitoso",
          text: "Su solicitud de registro se aprobara dentro de las proximas 48hs",
        });
      }
    }

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

  //Sweet
  const handleSubmit = (e) => {
    e.preventDefault();
    enviarFormulario();
    Swal.fire({
      icon: "success",
      title: "Envío Exitoso",
      text: "El formulario se ha enviado correctamente.",
    });
  };
  return (
    <div className="fondo-mis-datos ">
      <div className="tamanio row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Form>
            <div className="row">
              <Form.Group
                className=" col-md-6 col-sm-12"
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
                <div className="error-message_registro">
                  {mostrarMensajeErrorNombre && (
                    <p className="text-danger m-0">
                      {mostrarMensajeErrorNombre}
                    </p>
                  )}
                </div>
              </Form.Group>
              <Form.Group
                className=" col-md-6 col-sm-12"
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
                <div className="error-message_registro">
                  {mostrarMensajeErrorApellido && (
                    <p className="text-danger m-0">
                      {mostrarMensajeErrorApellido}
                    </p>
                  )}
                </div>
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col-12" controlId="formBasicCelular">
                <Form.Control
                  className={errors.celular && "is-invalid"}
                  type="text"
                  placeholder="Celular"
                  onChange={cambioDatosUsuario}
                  name="celular"
                  value={formData.celular}
                />
                <div className="error-message_registro">
                  {mostrarMensajeErrorCelular && (
                    <p className="text-danger m-0">
                      {mostrarMensajeErrorCelular}
                    </p>
                  )}
                </div>
              </Form.Group>
            </div>
            <div className="row">
              {" "}
              <Form.Group className="col-12" controlId="formBasicEmail">
                <Form.Control
                  className={errors.email && "is-invalid"}
                  type="email"
                  placeholder="E-Mail"
                  onChange={cambioDatosUsuario}
                  name="email"
                  value={formData.email}
                />
                <div className="error-message_registro">
                  {mostrarMensajeErrorMail && (
                    <p className="text-danger m-0">{mostrarMensajeErrorMail}</p>
                  )}
                </div>
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col-12" controlId="formBasicPass">
                <Form.Control
                  className={
                    errors.pass === "passVacio" ||
                    errors.pass === "passNoCumple"
                      ? "is-invalid"
                      : ""
                  }
                  type="password"
                  placeholder="Contraseña"
                  onChange={cambioDatosUsuario}
                  name="pass"
                  value={formData.pass}
                />
                <div className="error-message_registro">
                  {mostrarMensajeErrorPass && (
                    <p className="text-danger m-0">{mostrarMensajeErrorPass}</p>
                  )}
                </div>
              </Form.Group>
            </div>
            <Button
              variant=""
              type="submit"
              className="w-100 square-button_registro mt-5 custom-button_registro"
              onClick={enviarFormulario}
            >
              Enviar Registro
            </Button>
          </Form>
        </div>
        <div className="tamanio col-lg-6 col-md-12 col-sm-12 ">
          <img src="../../public/circulo.png" alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default MisDatos;
