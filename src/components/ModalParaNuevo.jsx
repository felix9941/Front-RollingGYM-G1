import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/ModalParaNuevo.css";

const ModalParaNuevo = ({
  show,
  handleClose,
  handleSubmit,
  handleFileChange,
  formData,
  errors,
  handleChange,
  errorMessage,
  tipo, //Tipos admitidos: clase, categoria, producto, plan
}) => {
  const titles = {
    clase: "Nueva Clase",
    categoria: "Nueva Categoria",
    producto: "Nuevo Producto",
    plan: "Editar Plan",
  };

  const titleText = titles[tipo] || "";

  const horas = [
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const [planes, setPlanes] = useState({
    full: false,
    aparatos: false,
    clases: false,
  });

  const handleCheckboxChange = (planElegido) => {
    setPlanes({
      ...planes,
      [planElegido]: !planes[planElegido],
    });
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const manejarCambioSeleccion = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{titleText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            {tipo === "clase" && <p className="">Prefesor que la dicta</p>}
            <Form.Group
              controlId="formBasicNombre"
              className={tipo === "clase" ? " col-md-6 col-sm-12" : "col-12"}
            >
              <Form.Control
                className={errors.nombre && "is-invalid"}
                type="text"
                placeholder="Nombre"
                onChange={handleChange}
                name="nombre"
                value={formData.nombre}
              />
              <div className="error-message_registro">
                {errorMessage(errors.nombre)}
              </div>
            </Form.Group>
            {tipo === "clase" && (
              <Form.Group
                controlId="formBasicApellido"
                className=" col-md-6 col-sm-12"
              >
                <Form.Control
                  className={errors.apellido && "is-invalid"}
                  type="text"
                  placeholder="Apellido"
                  onChange={handleChange}
                  name="apellido"
                  value={formData.apellido}
                />
                <div className="error-message_registro">
                  {errorMessage(errors.apellido)}
                </div>
              </Form.Group>
            )}
          </div>
          {tipo === "plan" && (
            <Form.Group controlId="formBasicPrecio" className="col-12">
              <Form.Control
                className={errors.precio && "is-invalid"}
                type="number"
                placeholder="Precio"
                onChange={handleChange}
                name="precio"
                value={formData.precio}
              />
              <div className="error-message_registro">
                {errorMessage(errors.precio)}
              </div>
            </Form.Group>
          )}
          {tipo === "clase" && (
            <div className="row">
              <Form.Group
                controlId="formBasicCapacidad"
                className=" col-md-6 col-sm-12"
              >
                <Form.Control
                  className={errors.capacidad && "is-invalid"}
                  type="number"
                  placeholder="Capacidad"
                  onChange={handleChange}
                  name="capacidad"
                  value={formData.capacidad}
                />
                <div className="error-message_registro">
                  {errorMessage(errors.capacidad)}
                </div>
              </Form.Group>

              <Form.Group
                controlId="exampleForm.SelectCustom"
                className="col-md-6 col-sm-12"
              >
                <Form.Select
                  onChange={handleChange}
                  name="categoria"
                  value={formData.categoria}
                  className={errors.categoria && "is-invalid"}
                >
                  <option value="">Seleccione categoría</option>
                  <option value="categoria1">Categoría 1</option>
                  <option value="categoria2">Categoría 2</option>
                  <option value="categoria3">Categoría 3</option>
                </Form.Select>
                <div className="error-message_registro">
                  {errorMessage(errors.categoria)}
                </div>
              </Form.Group>
            </div>
          )}
          {tipo === "clase" && (
            <div className="row">
              <Form.Group
                controlId="exampleForm.SelectDia"
                className="col-md-6 col-sm-12"
              >
                <Form.Control
                  as="select"
                  onChange={handleChange}
                  name="dia"
                  value={formData.dia}
                  className={errors.dia && "is-invalid"}
                >
                  <option value="">Seleccione Dia</option>
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miercoles">Miércoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                  <option value="sabado">Sábado</option>
                </Form.Control>
                <div className="error-message_registro">
                  {errorMessage(errors.dia)}
                </div>
              </Form.Group>
              <Form.Group
                controlId="exampleForm.SelectHora"
                className=" col-md-6 col-sm-12"
              >
                <Form.Control
                  as="select"
                  onChange={handleChange}
                  name="hora"
                  value={formData.hora}
                  className={errors.hora && "is-invalid"}
                >
                  <option value="">Seleccione hora</option>
                  {horas.map((hora, index) => (
                    <option key={index} value={hora}>
                      {hora}
                    </option>
                  ))}
                </Form.Control>
                <div className="error-message_registro">
                  {errorMessage(errors.hora)}
                </div>
              </Form.Group>
            </div>
          )}

          {tipo === "categoria" && (
            <div className="row mb-3">
              <p className="">Plan al que pertenece</p>
              <Form.Group
                controlId="formBasicCheckbox"
                className="row d-flex justify-content-center  ps-5"
              >
                <Form.Check
                  type="checkbox"
                  label="FULL"
                  checked={planes.full}
                  onChange={() => handleCheckboxChange("full")}
                  className="col-4"
                />
                <Form.Check
                  type="checkbox"
                  label="Aparatos"
                  checked={planes.aparatos}
                  onChange={() => handleCheckboxChange("aparatos")}
                  className="col-4"
                />
                <Form.Check
                  type="checkbox"
                  label="Clases"
                  checked={planes.clases}
                  onChange={() => handleCheckboxChange("clases")}
                  className="col-4"
                />
              </Form.Group>
            </div>
          )}

          {tipo !== "clase" && tipo !== "plan" && (
            <div className="row">
              <Form.Group controlId="formBasicImagen" className="col-12">
                <Form.Label>Cargar Foto</Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </div>
          )}

          {tipo === "plan" && (
            <Form.Group controlId="formBasicDescripcion" className="col-12">
              <Form.Control
                as="textarea"
                rows={4}
                className={errors.descripcion && "is-invalid"}
                placeholder="Descripción"
                onChange={handleChange}
                name="descripcion"
                value={formData.descripcion}
              />
              <div className="error-message_registro">
                {errorMessage(errors.descripcion)}
              </div>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=""
          type="submit"
          className="w-100 square-button_modal-nuevo mt-3 custom-button_modal-nuevo"
          onClick={handleSubmit}
        >
          Cargar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalParaNuevo;
