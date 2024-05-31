import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../css/ReservarClases.css";

const ReservarClases = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="contenedor-rc">
      <div className="contenedor-hijo-rc">
        <h1 className="titulo-izquierda">Reservar Clases</h1>
        <div className="titulo-izquierda d-flex">
          <div className="my-2 me-2">Dia</div>
          <div className="m-2">Todos los dias</div>
          <div className="m-2">Buscar</div>
        </div>
        <div className="tabla-reserva-clase">
          {" "}
          <Table bordered hover>
            <thead className="table-header">
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Profesor</th>
                <th className="reservar-ancho text-center">Reservar</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>Jueves</td>
                <td>10:00</td>
                <td>Mariano Ocampos</td>
                <td className="reservar-ancho text-center">
                  <Button className="boton-tabla-reserva" onClick={handleShow}>
                    Reservar
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Clase de ...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Estas seguro de querer reservar esta clase?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Si!
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
              <tr>
                <td>Jueves</td>
                <td>10:00</td>
                <td>Mariano Ocampos</td>
                <td className="reservar-ancho text-center">
                  <Button className="boton-tabla-reserva" onClick={handleShow}>
                    Reservar
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Clase de ...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Estas seguro de querer reservar esta clase?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Si!
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReservarClases;
