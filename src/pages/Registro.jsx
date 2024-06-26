import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import fondo from "../../public/fondo_r.png";
import "../css/Registro.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Registro";
  }, []);

  const [isLoading, setIsLoading] = useState(false);

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
      case "celularInvalido":
        return "Ingresar celular. Ej: 3815896118";
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
    const { nombre, apellido, celular, email, pass, rpass } = formData;
    let newErrors = {};
    const passExpReg =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_-])[A-Za-z\d!@#$%^&*()_]{8,}$/;
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
        if (
          nombreApellidoExpReg.test(nombre) &&
          nombreApellidoExpReg.test(apellido) &&
          celularExpReg.test(celular) &&
          emailExpReg.test(email)
        ) {
          setIsLoading(true);

          try {
            const createUser = await clienteAxios.post(
              "/clientes/register",
              { nombre, apellido, telefono: celular, email, contrasenia: pass },
              config
            );

            if (createUser.status === 200) {
              setIsLoading(false);
              Swal.fire({
                icon: "success",
                title: "Envío Exitoso",
                text: "Su solicitud de registro se aprobara dentro de las proximas 48hs",
              });
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Registro Fallido",
              text: `${error.response.data.message}`,
            });
            setIsLoading(false);
          }
        }
      }
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
  };

  const mostrarMensajeErrorNombre = mensajeError(errors.nombre);
  const mostrarMensajeErrorApellido = mensajeError(errors.apellido);
  const mostrarMensajeErrorCelular = mensajeError(errors.celular);
  const mostrarMensajeErrorMail = mensajeError(errors.email);
  const mostrarMensajeErrorPass = mensajeError(errors.pass);
  const mostrarMensajeErrorRpass = mensajeError(errors.rpass);

  return (
    <>
      <div
        className="background-image-regis"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>
      <div className="bloque-estilo-regis"></div>
      <div className="contenedor-regis">
        <div className="contenedor-hijo-regis">
          <div className="formulario-regis">
            <h3 className="pb-4 text-center text-white">Registro</h3>
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
                      maxLength={50}
                    />
                    <div className="error-message_registro">
                      {mostrarMensajeErrorNombre && (
                        <p className="text-warning m-0">
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
                      maxLength={50}
                    />
                    <div className="error-message_registro">
                      {mostrarMensajeErrorApellido && (
                        <p className="text-warning m-0">
                          {mostrarMensajeErrorApellido}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group
                    className="col-md-6 col-sm-12"
                    controlId="formBasicCelular"
                  >
                    <Form.Control
                      className={errors.celular && "is-invalid"}
                      type="text"
                      placeholder="Celular"
                      onChange={cambioDatosUsuario}
                      name="celular"
                      value={formData.celular}
                      maxLength={10}
                    />
                    <div className="error-message_registro">
                      {mostrarMensajeErrorCelular && (
                        <p className="text-warning m-0">
                          {mostrarMensajeErrorCelular}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="col-md-6 col-sm-12"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      className={errors.email && "is-invalid"}
                      type="email"
                      placeholder="E-Mail"
                      onChange={cambioDatosUsuario}
                      name="email"
                      value={formData.email}
                      maxLength={70}
                    />
                    <div className="error-message_registro">
                      {mostrarMensajeErrorMail && (
                        <p className="text-warning m-0">
                          {mostrarMensajeErrorMail}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group
                    className="col-md-6 col-sm-12"
                    controlId="formBasicPass"
                  >
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
                      maxLength={50}
                    />
                    <div className="error-message_registro">
                      {mostrarMensajeErrorPass && (
                        <p className="text-warning m-0">
                          {mostrarMensajeErrorPass}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="col-md-6 col-sm-12"
                    controlId="formBasicRpass"
                  >
                    <Form.Control
                      className={
                        errors.rpass === "passVacio" ||
                        errors.rpass === "passNoCumple"
                          ? "is-invalid"
                          : ""
                      }
                      type="password"
                      placeholder="Repetir Contraseña"
                      onChange={cambioDatosUsuario}
                      name="rpass"
                      value={formData.rpass}
                      maxLength={50}
                    />
                    <div className="error-message_registro">
                      {mostrarMensajeErrorRpass && (
                        <p className="text-warning m-0">
                          {mostrarMensajeErrorRpass}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                </div>

                <Button
                  variant=""
                  type="submit"
                  className="w-100 square-button_registro mt-3 custom-button_registro"
                  onClick={enviarFormulario}
                  disabled={isLoading}
                >
                  Enviar Registro
                </Button>
                <div className="text-center m-2 mt-3 ">
                  <NavLink className="text-white" to="/iniciarSesion">
                    ¿Ya tiene una cuenta?
                  </NavLink>
                </div>
              </Form>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
