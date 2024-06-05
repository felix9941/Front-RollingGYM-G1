import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2"; // para instalar la libreria poner npm install sweetalert2
import "../css/IniciarSesion.css";
import axios from "axios";
import clienteAxios, { config } from "../helpers/clienteAxios";

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    pass: "",
  });

  const cambioDatosUsuario = (ev) => {
    const { email, pass } = formData; //Desestructuramiento
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    /* Creo que error deberia estar en cambio de datos porque trabajaria con el onchange y se podria hacer una validacion en tiempo real */
    if (formData.email) {
      newErrors = { ...newErrors, email: email };
    }
    if (formData.pass) {
      newErrors = { ...newErrors, pass: pass };
    }
    setErrors(newErrors);
  };

  const mensajeError = (error) => {
    switch (error) {
      case "mailInvalido":
        return "Ingresar e-mail";
      case "passVacio":
        return "Ingresar contraseña";
      case "passNoCumple":
        return "La contraseña contener almenos 6 caracteres alfanumericos";
      default:
        break;
    }
  };

  const enviarFormulario = async (ev) => {
    ev.preventDefault();
    const { email, pass } = formData;
    let newErrors = {};
    const passExpReg =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_-])[A-Za-z\d!@#$%^&*()_]{6,}$/;
    const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailExpReg.test(email)) {
      newErrors = { ...newErrors, email: "mailInvalido" };
    }

    if (!pass) {
      newErrors = { ...newErrors, pass: "passVacio" };
    } else if (!passExpReg.test(pass)) {
      newErrors = { ...newErrors, pass: "passNoCumple" };
    } else {
      try {
        const iniciarSesion = await clienteAxios.post(
          "/clientes/login",
          {
            email,
            contrasenia: pass,
          },
          config
        );
        if (iniciarSesion.status === 200) {
          sessionStorage.setItem(
            "token",
            JSON.stringify(iniciarSesion.data.token)
          );
          sessionStorage.setItem(
            "role",
            JSON.stringify(iniciarSesion.data.role)
          );
          Swal.fire({
            icon: "success",
            title: "Inicio de sesion exitoso",
            text: "Bienvenido a Power Gym",
          });
        }
      } catch (error) {
        if (error.response.status === 401) {
          /* Si el status de la consulta da 401 es por la contrasena */
          setError("errorPassIncorrecto");
          alert(error.response.data.message);
          setIsLoading(false);
          return;
        } else {
          /* Si el status de la consulta es otro es porque ya hay otro error */
          alert("Error al iniciar sesion");
        }
      }
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    //toma un estado anterior y con newErrors actualiza de ser necesario lo que no conbine
  };

  const mostrarMensajeErrorMail = mensajeError(errors.email);
  const mostrarMensajeErrorPass = mensajeError(errors.pass);

  return (
    <div className="background_i d-flex justify-content-center align-items-center h-100">
      <div className="form-container_i centrado_vertical_i">
        {/* Muy importante el h-100 que es equivalente a poner height de 100% para centrar verticalmente
      "d-flex justify-content-center align-items-center h-100"*/}
        <div className="mt-5">
          <h2 className="text-center pb-4 pt-5 mt-5">Iniciar Sesion</h2>
          <Form className="ancho-input_i mx-auto">
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Control
                className={errors.email && "is-invalid"}
                type="email"
                placeholder="E-Mail"
                onChange={cambioDatosUsuario}
                name="email"
                value={formData.email}
              />
              <div className="error-message_i">
                {mostrarMensajeErrorMail && (
                  <p className="text-danger m-0">{mostrarMensajeErrorMail}</p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formBasicPass">
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
              <div className="error-message_i">
                {mostrarMensajeErrorPass && (
                  <p className="text-danger m-0">{mostrarMensajeErrorPass}</p>
                )}
              </div>
            </Form.Group>

            <Button
              variant=""
              type="submit"
              className="w-100 square-button_i mt-2 custom-button_i"
              onClick={enviarFormulario}
            >
              Iniciar Sesion
            </Button>
          </Form>
          <div className="text-center m-2 mt-4 ">
            <NavLink className="text-white" to="/registro">
              ¿No tiene una cuenta?
            </NavLink>
          </div>
          <div className="text-center m-2">
            <NavLink className="text-white" to="/error404">
              Reestablecer contraseña
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
