import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/ModalParaNuevo.css";

const ModalParaNuevo = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  errors,
  handleChange,
  errorMessage,
  tipo, //Tipos adminitos: clase, categoria, producto
}) => {
  let titleText = "";
  switch (tipo) {
    case "clase":
      titleText = "Nueva Clase";
      break;
    case "categoria":
      titleText = "Nueva Categoria";
      break;
    case "producto":
      titleText = "Nuevo Producto";
      break;
    default:
      break;
  }

  // e.preventDefault();
  // if (!file) {
  //   alert("Por favor, selecciona una imagen");
  //   return;
  // }

  const horas = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleCheckboxChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
          {tipo === "clase" && (
            <div className="row">
              <Form.Group
                controlId="formBasicApellido"
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
                className=" col-md-6 col-sm-12"
              >
                <Form.Select onChange={manejarCambioSeleccion}>
                  <option value="">Seleccione categoria</option>
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                  <option value="3">Categoría 3</option>
                </Form.Select>
              </Form.Group>
            </div>
          )}
          {tipo === "clase" && (
            <div className="row">
              <Form.Group
                controlId="exampleForm.SelectDia"
                className=" col-md-6 col-sm-12"
              >
                <Form.Select onChange={manejarCambioSeleccion}>
                  <option value="">Seleccione Dia</option>
                  <option value="1">Lunes</option>
                  <option value="2">Martes</option>
                  <option value="3">Miércoles</option>
                  <option value="4">Jueves</option>
                  <option value="5">Viernes</option>
                  <option value="6">Sábado</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                controlId="exampleForm.SelectHora"
                className=" col-md-6 col-sm-12"
              >
                <Form.Select onChange={manejarCambioSeleccion}>
                  <option value="">Seleccione hora</option>
                  {horas.map((hora, index) => (
                    <option key={index} value={index}>
                      {hora}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          )}

          {tipo === "categoria" && (
            <div className="row mb-3">
              <p className="">Plan al que pertenece</p>
              <Form className="row d-flex justify-content-center  ps-5">
                <Form.Check
                  type="checkbox"
                  label="Opción 1"
                  checked={options.option1}
                  onChange={() => handleCheckboxChange("option1")}
                  className="col-4"
                />
                <Form.Check
                  type="checkbox"
                  label="Opción 2"
                  checked={options.option2}
                  onChange={() => handleCheckboxChange("option2")}
                  className="col-4"
                />
                <Form.Check
                  type="checkbox"
                  label="Opción 3"
                  checked={options.option3}
                  onChange={() => handleCheckboxChange("option3")}
                  className="col-4"
                />
              </Form>
            </div>
          )}

          {tipo !== "clase" && (
            <div className="row">
              <Form.Group controlId="formBasicImagen" className="col-12">
                <Form.Label>Cargar Foto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </div>
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