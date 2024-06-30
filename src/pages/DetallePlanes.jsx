import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../helpers/clienteAxios";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "../css/DetallePlan.css";
import config from "../config/confi";

const DetallePlanes = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const getPlanDetalles = async () => {
    try {
      const response = await clienteAxios.get("planes/planesHabilitados");
      const allPlanes = response.data.planesHabilitados;
      const selectedPlan = allPlanes.find((p) => p._id === id);
      setPlan(selectedPlan);
    } catch (error) {
      console.error("Error al obtener los detalles del plan:", error);
    }
  };

  const getCategoriasPlan = async () => {
    try {
      const response = await clienteAxios.get(
        `/categorias/categoriasPorPlanId/${id}`
      );
      setCategorias(response.data.categoria);
    } catch (error) {
      console.error("error al obtener las categorias", error);
    }
  };

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setFormData({ ...formData, telefono: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        config.EMAILJS_SERVICE_ID,
        config.EMAILJS_TEMPLATE_ID,
        e.target,
        config.EMAILJS_USER_ID
      );

      await emailjs.send(
        config.EMAILJS_SERVICE_ID,
        config.EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        {
          to_name: formData.nombre,
          to_email: formData.email,
          message:
            "¡Gracias por contactarnos! Próximamente nos pondremos en contacto para informarle más sobre el plan.",
        },
        config.EMAILJS_USER_ID
      );

      Swal.fire({
        title: "Perfecto!",
        text: "Tu mensaje fue enviado con éxito!",
        icon: "success",
      }).then(() => {
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      });
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
  };

  useEffect(() => {
    document.title = "Detalle del Plan";
    getPlanDetalles();
    getCategoriasPlan();
  }, []);

  if (!plan) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="contenedor-md-plan">
      <div className="container mx-auto">
        <div className="row justify-content-center gap-5">
          <div className="col-12 d-flex flex-column">
            <h1 className="detallePlan-contentH1">{`${plan.nombre}`}</h1>
            <p className="detallePlan-contentP">{`${plan.descripcion}`}</p>
            <p className="detallePlan-contentPrecio">{`Precio: $${plan.precio}/mes`}</p>
            <div className="col-12 col-md-6 mb-4">
              <h2 className="detallePlan-contentH2">
                Clases disponibles con tu plan :
              </h2>
              <ul>
                {categorias.length > 0 ? (
                  categorias.map((categoria, index) => (
                    <li key={index} className="detallePlan-contentP">
                      {categoria.nombre}
                    </li>
                  ))
                ) : (
                  <li className="detallePlan-contentP">
                    No hay categorías disponibles
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <h5 className="detallePlan-contentH5">
              Si necesitas más info, escríbenos.
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleNameInput}
                    pattern="[A-Za-z\s]*"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleNameInput}
                    pattern="[A-Za-z\s]*"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handlePhoneInput}
                    pattern="\+?\d*"
                    required
                    minLength={10}
                    maxLength={15}
                  />
                </div>
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Escribe aquí tu mensaje..."
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  minLength={10}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-block mt-2 mb-4">
                ENVIAR MENSAJE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePlanes;
