import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DynamicTable from "../components/Tablas.jsx";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios";

const AdminProfesores = () => {
  const [showModal, setShowModal] = useState(false);
  const [profesores, setProfesores] = useState([]);
  const [modalData, setModalData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({});
  const isFormValid =
    modalData.nombre &&
    modalData.apellido &&
    modalData.email &&
    modalData.telefono;

  useEffect(() => {
    document.title = "Administrar Profesores";
    getProfesores();
  }, []);

  const handleCloseModal = () => setShowModal(false);

  const handleEditShow = (profesor) => {
    setModalData(profesor);
    setErrors({ nombre: "", apellido: "", email: "", telefono: "" });
    setShowModal(true);
  };

  const handleSaveProfesor = async () => {
    let validationErrors = {};
    if (!modalData.nombre) validationErrors.nombre = "El nombre es requerido";
    if (!modalData.apellido)
      validationErrors.apellido = "El apellido es requerido";
    if (!modalData.email) validationErrors.email = "El email es requerido";
    if (!modalData.telefono)
      validationErrors.telefono = "El telefono es requerido";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const method = modalData._id ? "PUT" : "POST";
      const url = modalData._id
        ? `http://localhost:3002/api/profesores/${modalData._id}`
        : "http://localhost:3002/api/profesores";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalData),
      });

      if (response.ok) {
        getProfesores();
        handleCloseModal();
      } else {
        console.error("Error al guardar el profesor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProfesores = async () => {
    try {
      const response = await clienteAxios.get("/profesores");
      setProfesores(response.data.profesores);
    } catch (error) {
      console.error("Error al buscar profesores:", error);
    }
  };

  const handleToggleEstado = async (profesor) => {
    try {
      const response = await clienteAxios.put(
        `/profesores/estadoProfesor/${profesor._id}`
      );

      if (response.status === 200) {
        const updatedProfesor = response.data;
        setProfesores((prevProfesores) =>
          prevProfesores.map((p) =>
            p._id === profesor._id
              ? { ...p, deleted: updatedProfesor.deleted }
              : p
          )
        );
      } else {
        console.error("Error al cambiar el estado del profesor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProfesor = async (profesor) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/profesores/${profesor._id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProfesores((prevProfesores) =>
          prevProfesores.filter((p) => p._id !== profesor._id)
        );
      } else {
        console.error("Error al borrar el profesor", response.ok, profesor._id);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { key: "_id", header: "Cod." },
    { key: "nombre", header: "Nombre" },
    { key: "apellido", header: "Apellido" },
    { key: "email", header: "E-mail" },
    { key: "telefono", header: "Celular", type: "number" },
    { key: "foto", header: "Foto", type: "image" },
    { key: "deleted", header: "Estado", type: "boolean" },
    { key: "edit", header: "Editar", type: "edit" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  return (
    <div className={styles.contenedorAdmins}>
      <div className={styles.encabezadoAdministrador}>
        <h1 className={styles.h1Admins}>Administración de Profesores</h1>

        <DynamicTable
          columns={columns}
          data={profesores}
          onToggle={handleToggleEstado}
          onDelete={handleDeleteProfesor}
          onEdit={handleEditShow}
        />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalData._id ? "Editar Profesor" : "Nuevo Profesor"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={modalData.nombre}
                  onChange={(e) =>
                    setModalData({ ...modalData, nombre: e.target.value })
                  }
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  value={modalData.apellido}
                  onChange={(e) =>
                    setModalData({ ...modalData, apellido: e.target.value })
                  }
                  isInvalid={!!errors.apellido}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.apellido}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="mail"
                  value={modalData.email}
                  onChange={(e) =>
                    setModalData({ ...modalData, email: e.target.value })
                  }
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="number"
                  value={modalData.telefono}
                  onChange={(e) =>
                    setModalData({ ...modalData, telefono: e.target.value })
                  }
                  isInvalid={!!errors.telefono}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefono}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal} className={styles.buttonAdmins}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProfesor}
              className={styles.buttonAdmins}
              disabled={!isFormValid}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminProfesores;
