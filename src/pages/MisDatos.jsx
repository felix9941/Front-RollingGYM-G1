import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "../css/MisDatos.css";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import clienteAxios, { config } from "../helpers/clienteAxios";

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

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
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

  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  const obtenerDatosUsuario = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");

      if (!token) {
        throw new Error("No se encontró el token en el sessionStorage");
      }

      if (!role) {
        throw new Error("No se encontró el rol en el sessionStorage");
      }

      let url = "";
      switch (role) {
        case "administrador":
          url = "/administradores/datosUsuario";
          break;
        case "profesor":
          url = "/profesores/datosUsuario";
          break;
        case "cliente":
          url = "/clientes/datosUsuario";
          break;
        default:
          throw new Error("Rol desconocido");
      }

      const response = await clienteAxios.get(url, config);
      console.log(response.data.usuario);
    } catch (error) {
      console.log("Error al obtener datos usuario", error);
    }
  };

  if (role === "administrador") {
    console.log("El rol del usuario es:", role);
    obtenerDatosUsuario();
  }

  return (
    <div className="contenedor-md">
      <div className="contenedor-hijo-md">
        <div className="formulario">
          <h3 className="pb-4">Mis Datos</h3>
          <div>
            {" "}
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
                      <p className="text-danger m-0">
                        {mostrarMensajeErrorMail}
                      </p>
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
                      <p className="text-danger m-0">
                        {mostrarMensajeErrorPass}
                      </p>
                    )}
                  </div>
                </Form.Group>
              </div>
              <Button
                variant=""
                type="submit"
                className="w-100 square-button_md mt-5 custom-button_md"
                onClick={enviarFormulario}
              >
                Editar Datos
              </Button>
            </Form>
          </div>
        </div>
        <div className="contenedor-img text-center">
          <img src="../../circulo.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MisDatos;
