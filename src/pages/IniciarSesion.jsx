import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "../css/IniciarSesion.css";
import clienteAxios, { config } from "../helpers/clienteAxios";
import * as yup from "yup";
import { Formik } from "formik";

const IniciarSesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Iniciar Sesión";
  }, []);

  const yupSchemaLogin = yup.object().shape({
    email: yup
      .string()
      .required("Completa el campo vacío")
      .email("El email no es válido"),
    pass: yup
      .string()
      .required("Completa el campo vacío")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_-])[A-Za-z\d!@#$%^&*()_]{8,}$/,
        "Debe contener 8 caracteres, mayúscula, minúscula, número y símbolo"
      ),
  });

  const handleSubmitForm = async (values, actions) => {
    try {
      const collections = ["clientes", "profesores", "administradores"];
      let isAuthenticated = false;

      for (let collection of collections) {
        try {
          const iniciarSesion = await clienteAxios.post(
            `/${collection}/login`,
            { email: values.email, contrasenia: values.pass },
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
                Swal.fire({
                  title: "Administrador Logueado con Éxito",
                  text: "Bienvenido a PowerGYM",
                  icon: "success",
                }).then(() => {
                  setTimeout(() => {
                    navigate("/principalAdmin");
                    window.location.reload();
                  }, 2000);
                });
                break;
              case "cliente":
                Swal.fire({
                  title: "Cliente Logueado con Éxito",
                  text: "Bienvenido a PowerGYM",
                  icon: "success",
                }).then(() => {
                  setTimeout(() => {
                    navigate("/principal");
                    window.location.reload();
                  }, 2000);
                });
                break;
              case "profesor":
                Swal.fire({
                  title: "Profesor Logueado con Éxito",
                  text: "Bienvenido a PowerGYM",
                  icon: "success",
                }).then(() => {
                  setTimeout(() => {
                    navigate("/misClases");
                    window.location.reload();
                  }, 2000);
                });
                break;
              default:
                navigate("/");
            }
          }
        } catch (error) {
          if (
            error.response &&
            error.response.status !== 401 &&
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
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="background_i d-flex justify-content-center align-items-center h-100">
      <div className="form-container_i centrado_vertical_i">
        <div className="mt-5">
          <h2 className="text-center pb-4 pt-5 mt-5">Iniciar Sesion</h2>
          <Formik
            initialValues={{ email: "", pass: "" }}
            validationSchema={yupSchemaLogin}
            onSubmit={handleSubmitForm}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className="ancho-input_i mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Control
                    className={
                      errors.email && touched.email ? "is-invalid" : ""
                    }
                    type="email"
                    placeholder="E-Mail"
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    maxLength={70}
                  />
                  <div className="error-message_i">
                    {errors.email && touched.email && (
                      <p className="text-danger m-0">{errors.email}</p>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="" controlId="formBasicPass">
                  <Form.Control
                    className={errors.pass && touched.pass ? "is-invalid" : ""}
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    name="pass"
                    value={values.pass}
                    maxLength={50}
                  />
                  <div className="error-message_i">
                    {errors.pass && touched.pass && (
                      <p className="text-danger m-0">{errors.pass}</p>
                    )}
                  </div>
                </Form.Group>

                <Button
                  variant=""
                  type="submit"
                  className="w-100 square-button_i mt-2 custom-button_i"
                  disabled={isSubmitting}
                >
                  Iniciar Sesion
                </Button>
              </Form>
            )}
          </Formik>
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
