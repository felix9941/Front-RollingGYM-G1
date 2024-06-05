import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "../css/ModalParaNuevo.css";

const ModalParaNuevo = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  errors,
  handleChange,
  errorMessage,
  tipo, //Tipos adminitos: administrados, cliente, profesor
}) => {
  let titleText = "";
  switch (tipo) {
    case "administrador":
      titleText = "Nuevo Administrador";
      break;
    case "cliente":
      titleText = "Nuevo Cliente";
      break;
    case "profesor":
      titleText = "Nuevo Profesor";
      break;
    default:
      titleText = "Nuevo Usuario";
      break;
  }

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{titleText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <Form.Group
              controlId="formBasicNombre"
              className=" col-md-6 col-sm-12"
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
          </div>
          <div className="row">
            <Form.Group
              controlId="formBasicCelular"
              className=" col-md-6 col-sm-12"
            >
              <Form.Control
                className={errors.celular && "is-invalid"}
                type="text"
                placeholder="Celular"
                onChange={handleChange}
                name="celular"
                value={formData.celular}
              />
              <div className="error-message_registro">
                {errorMessage(errors.celular)}
              </div>
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              className=" col-md-6 col-sm-12"
            >
              <Form.Control
                className={errors.email && "is-invalid"}
                type="text"
                placeholder="E-mail"
                onChange={handleChange}
                name="email"
                value={formData.email}
              />
              <div className="error-message_registro">
                {errorMessage(errors.email)}
              </div>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group
              controlId="formBasicPass"
              className=" col-md-6 col-sm-12"
            >
              <Form.Control
                className={errors.pass && "is-invalid"}
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                name="pass"
                value={formData.pass}
              />
              <div className="error-message_registro">
                {errorMessage(errors.pass)}
              </div>
            </Form.Group>
            <Form.Group
              controlId="formBasicRpass"
              className=" col-md-6 col-sm-12"
            >
              <Form.Control
                className={errors.rpass && "is-invalid"}
                type="password"
                placeholder="Repetir contraseña"
                onChange={handleChange}
                name="rpass"
                value={formData.rpass}
              />
              <div className="error-message_registro">
                {errorMessage(errors.rpass)}
              </div>
            </Form.Group>
          </div>
          {tipo === "profesor" && (
            <div className="row">
              <Form.Group
                controlId="formBasicImagen"
                className="col-md-6 col-sm-12"
              >
                <Form.Label>Cargar Foto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
