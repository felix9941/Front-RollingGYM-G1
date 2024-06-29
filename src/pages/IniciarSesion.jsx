import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "../css/IniciarSesion.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const IniciarSesion = () => {
  useEffect(() => {
    document.title = "Iniciar Sesión";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    pass: "",
  });

  const cambioDatosUsuario = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const mensajeError = (error) => {
    switch (error) {
      case "mailInvalido":
        return "Ingresar e-mail";
      case "passVacio":
        return "Ingresar contraseña";
      case "passNoCumple":
        return "Debe contener 8 caracteres, mayuscula, minuscula, numero y simbolo";
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
      if (emailExpReg.test(email)) {
        try {
          const collections = ["clientes", "profesores", "administradores"];
          let isAuthenticated = false;
          let iniciarSesion;

          for (let collection of collections) {
            try {
              iniciarSesion = await clienteAxios.post(
                `/${collection}/login`,
                { email, contrasenia: pass },
                config
              );

              if (iniciarSesion.status === 200) {
                sessionStorage.setItem(
                  "token",
                  JSON.stringify(iniciarSesion.data.token)
                );
                sessionStorage.setItem("role", iniciarSesion.data.role);
                localStorage.setItem("userRole", iniciarSesion.data.role);
                isAuthenticated = true;
                const role = iniciarSesion.data.role;
                switch (role) {
                  case "administrador":
                    window.location.href = "/principalAdmin";
                    break;
                  case "cliente":
                    window.location.href = "/principal";
                    break;
                  case "profesor":
                    window.location.href = "/misClases";
                    break;
                  default:
                    window.location.href = "/";
                }
                break;
              }
            } catch (error) {
              if (
                error.response &&
                error.response.status !== 401 &&
                error.response &&
                error.response.status !== 404
              ) {
                Swal.fire({
                  icon: "error",
                  title: "Error al iniciar sesión",
                  text: "Intente nuevamente",
                });
                return;
              }
            }
          }

          if (!isAuthenticated) {
            setErrors({ pass: "errorPassIncorrecto" });
            Swal.fire({
              icon: "error",
              title: "Email o contraseña incorrectos",
              text: "Verifique que los datos ingresados sean correctos",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Intente nuevamente",
          });
        }
      }
    }
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
  };

  const mostrarMensajeErrorMail = mensajeError(errors.email);
  const mostrarMensajeErrorPass = mensajeError(errors.pass);

  return (
    <div className="background_i d-flex justify-content-center align-items-center h-100">
      <div className="form-container_i centrado_vertical_i">
        <div className="mt-5">
          <h2 className="text-center pb-4 pt-5 mt-5">Iniciar Sesion</h2>
          <Form className="ancho-input_i mx-auto" onSubmit={enviarFormulario}>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Control
                className={errors.email && "is-invalid"}
                type="email"
                placeholder="E-Mail"
                onChange={cambioDatosUsuario}
                name="email"
                value={formData.email}
                maxLength={70}
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
                maxLength={50}
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
