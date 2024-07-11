import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DynamicTable from "../components/Tablas.jsx";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios";
import Swal from "sweetalert2";

const AdminPlanes = () => {
  const [showModal, setShowModal] = useState(false);
  const [planes, setPlanes] = useState([]);
  const [modalData, setModalData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setModalData({ nombre: "", descripcion: "", precio: "" });
    setErrors({ nombre: "", descripcion: "", precio: "" });
    setShowModal(true);
  };

  const obtenerPlanes = async () => {
    try {
      const response = await clienteAxios.get("/planes");
      setPlanes(response.data.planes);
    } catch (error) {
      console.error("Error al obtener planes:", error);
    }
  };

  useEffect(() => {
    document.title = "Administrar Planes";
    obtenerPlanes();
  }, []);

  const handleToggleEstado = async (plan) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/planes/cambioEstadoPlan/${plan._id}`,
        { method: "PUT" }
      );

      if (response.ok) {
        obtenerPlanes();
      } else {
        console.error("Error al cambiar el estado del plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditPlan = (plan) => {
    setModalData(plan);
    setErrors({ nombre: "", descripcion: "", precio: "" });
    setShowModal(true);
  };

  const handleSavePlan = async () => {
    let validationErrors = {};
    if (!modalData.nombre) validationErrors.nombre = "El nombre es requerido";
    if (!modalData.descripcion)
      validationErrors.descripcion = "La descripción es requerida";
    if (!modalData.precio) validationErrors.precio = "El precio es requerido";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const method = modalData._id ? "put" : "post";
      const url = modalData._id
        ? `http://localhost:3002/api/planes/${modalData._id}`
        : "http://localhost:3002/api/planes";

      const response = await clienteAxios[method](url, modalData);

      if (response.status === 200 || response.status === 201) {
        obtenerPlanes();
        handleCloseModal();
      } else {
        console.error("Error al guardar el plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const isValid =
      modalData.nombre && modalData.descripcion && modalData.precio;
    setIsFormValid(isValid);
  }, [modalData]);

  const columns = [
    { key: "nombre", header: "Nombre" },
    { key: "descripcion", header: "Descripcion" },
    { key: "precio", header: "Precio" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "edit", header: "Editar", type: "edit" },
  ];

  return (
    <div className={styles.contenedorAdmins}>
      <div className={styles.encabezadoAdministrador}>
        <h1 className={styles.h1Admins}>Administración de Planes</h1>

        <DynamicTable
          columns={columns}
          data={planes}
          onToggle={handleToggleEstado}
          onEdit={handleEditPlan}
        />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalData._id ? "Editar Plan" : "Nuevo Plan"}
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
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={modalData.descripcion}
                  onChange={(e) =>
                    setModalData({ ...modalData, descripcion: e.target.value })
                  }
                  isInvalid={!!errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descripcion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={modalData.precio}
                  onChange={(e) =>
                    setModalData({ ...modalData, precio: e.target.value })
                  }
                  isInvalid={!!errors.precio}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.precio}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal} className={styles.buttonAdmins}>
              Cancelar
            </Button>
            <Button
              onClick={handleSavePlan}
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

export default AdminPlanes;
