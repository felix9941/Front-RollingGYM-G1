import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "../css/MisDatos.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const MisDatos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    pass: "",
    rpass: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    pass: "",
    rpass: "",
  });

  const cambioDatosUsuario = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const mensajeError = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      case "apellidoInvalido":
        return "Ingresar apellido";
      case "telefonoInvalido":
        return "Ingresar telefono. Ej: 3815896118";
      case "mailInvalido":
        return "Ingresar e-mail";
      case "passVacio":
        return "Ingresar contraseña";
      case "passNoCumple":
        return "Debe contener 8 caracteres, mayuscula, minuscula, numero y simbolo";
      case "passNoCoincide":
        return "La contraseña no coincide";
      default:
        break;
    }
  };

  const enviarFormulario = async (ev) => {
    ev.preventDefault();
    const { nombre, apellido, telefono, email, pass, rpass } = formData;
    let newErrors = {};
    const passExpReg =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_-])[A-Za-z\d!@#$%^&*()_]{8,}$/;
    const nombreApellidoExpReg = /^(?=.*[a-zA-Z\s])[A-Za-z]{3,}$/;
    const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoExpReg = /^\d{10}$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    }
    if (!nombreApellidoExpReg.test(apellido)) {
      newErrors = { ...newErrors, apellido: "apellidoInvalido" };
    }
    if (!telefonoExpReg.test(telefono)) {
      newErrors = { ...newErrors, telefono: "telefonoInvalido" };
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

    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Se actualizarán tus datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let idusuario = await obtenerIdUsuario();
            const role = sessionStorage.getItem("role");
            let url = "";
            switch (role) {
              case "administrador":
                url = "/administradores/editarDatosPropios/";
                break;
              case "profesor":
                url = "/profesores/editarDatosPropios/";
                break;
              case "cliente":
                url = "/clientes/editarDatosPropios/";
                break;
              default:
                throw new Error("Rol desconocido");
            }

            const response = await clienteAxios.put(url + idusuario, {
              nombre,
              apellido,
              email,
              telefono,
              contrasenia: pass,
            });
            Swal.fire("Hecho!", "Tus datos fueron actualizados.", "success");
            obtenerDatosUsuario();
          } catch (error) {
            console.error(`Error al editar el ${role}`, error);
            if (error.response && error.response.status === 400) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.errors[0].msg}`,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Error al editar el ${role}`,
              });
            }
          }
        }
      });
    } else {
      setErrors((prevState) => ({ ...prevState, ...newErrors }));
      console.log({ ...formData, ...newErrors });
    }
  };

  const mostrarMensajeErrorNombre = mensajeError(errors.nombre);
  const mostrarMensajeErrorApellido = mensajeError(errors.apellido);
  const mostrarMensajeErrortelefono = mensajeError(errors.telefono);
  const mostrarMensajeErrorMail = mensajeError(errors.email);
  const mostrarMensajeErrorPass = mensajeError(errors.pass);
  const mostrarMensajeErrorRpass = mensajeError(errors.rpass);

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

  const obtenerIdUsuario = async () => {
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
      const usuario = response.data.usuario;
      return usuario._id;
    } catch (error) {
      console.log("Error al obtener datos usuario", error);
      return null;
    }
  };

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
      const usuario = response.data.usuario;

      setFormData({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        pass: "",
        rpass: "",
      });
    } catch (error) {
      console.log("Error al obtener datos usuario", error);
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

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
                <Form.Group className="col-12" controlId="formBasictelefono">
                  <Form.Control
                    className={errors.telefono && "is-invalid"}
                    type="text"
                    placeholder="telefono"
                    onChange={cambioDatosUsuario}
                    name="telefono"
                    value={formData.telefono}
                  />
                  <div className="error-message_registro">
                    {mostrarMensajeErrortelefono && (
                      <p className="text-danger m-0">
                        {mostrarMensajeErrortelefono}
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
                <Form.Group className="col-12" controlId="formBasicRpass">
                  <Form.Control
                    className={
                      errors.rpass === "passVacio" ||
                      errors.rpass === "passNoCumple"
                        ? "is-invalid"
                        : ""
                    }
                    type="password"
                    placeholder="Contraseña"
                    onChange={cambioDatosUsuario}
                    name="rpass"
                    value={formData.rpass}
                  />
                  <div className="error-message_registro">
                    {mostrarMensajeErrorRpass && (
                      <p className="text-danger m-0">
                        {mostrarMensajeErrorRpass}
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
