import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios.js";
import DynamicTable from "../components/Tablas.jsx";
import Swal from "sweetalert2";

const AdminAdministradores = () => {
  useEffect(() => {
    document.title = "Administrar administradores";
    getAdmins();
  }, []);

  const [admins, setAdmins] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalData, setModalData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contrasenia: "",
  });
  const [modalData2, setModalData2] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contrasenia: "",
  });

  const getAdmins = async () => {
    const response = await clienteAxios.get("/administradores");
    setAdmins(response.data.administradores);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowModal2 = (admin) => {
    setModalData2({
      nombre: admin.nombre,
      apellido: admin.apellido,
      email: admin.email,
      telefono: admin.telefono,
      _id: admin._id,
    });
    setShowModal2(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setModalData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      contrasenia: "",
    });
  };

  const handleHideModal2 = () => {
    setShowModal2(false);
  };

  const handleCreateAdmin = async (ev) => {
    ev.preventDefault();
    setDisableButton(true);
    if (
      modalData.nombre === "" ||
      modalData.apellido === "" ||
      modalData.email === "" ||
      modalData.telefono === "" ||
      modalData.contrasenia === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
      });
      setDisableButton(false);
      return;
    }
    try {
      const response = await clienteAxios.post(
        "/administradores/register",
        modalData
      );
    } catch (error) {
      console.error("Error al crear el administrador", error);
      if (error.response.request.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
        setDisableButton(false);
        return;
      } else if (error.response.request.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El email ya esta registrado",
        });
        setDisableButton(false);
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear el administrador",
        });
        setDisableButton(false);
        return;
      }
    }
    getAdmins();
    setShowModal(false);
    setModalData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      contrasenia: "",
    });
    setDisableButton(false);
  };

  const handleEditAdmin = async (ev) => {
    ev.preventDefault();
    setDisableButton(true);
    if (
      modalData2.nombre === "" ||
      modalData2.apellido === "" ||
      modalData2.email === "" ||
      modalData2.telefono === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
      });
      setDisableButton(false);
      return;
    }
    try {
      const response = await clienteAxios.put(
        `/administradores/editar/${modalData2._id}`,
        modalData2
      );
    } catch (error) {
      console.error("error al editar el administrador", error);
      if (error.response.request.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
        setDisableButton(false);
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al editar el administrador",
        });
        setDisableButton(false);
        return;
      }
    }
    getAdmins();
    setShowModal2(false);
    setDisableButton(false);
  };

  const handleBorrar = (admin) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await clienteAxios.delete(
            `/administradores/${admin._id}`
          );
        } catch (error) {
          console.error("error al eliminar el administrador", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al eliminar el administrador",
          });
        }
        Swal.fire(
          "Eliminado!",
          "El administrador ha sido eliminado.",
          "success"
        );
        getAdmins();
      }
    });
  };
  const handleEstado = async (admin) => {
    try {
      const response = await clienteAxios.put(
        `/administradores/${admin._id}`,
        {}
      );
      getAdmins();
    } catch (error) {
      console.error("error al deshabilitar/habilitar el administrador", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al editar el estado del administrador",
      });
    }
  };

  const handleChangeTelefono = (e) => {
    const { value } = e.target;
    // Permitir solo números y limitar la longitud a 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setModalData({ ...modalData, telefono: value });
    }
  };

  const handleChangeTelefono2 = (e) => {
    const { value } = e.target;
    // Permitir solo números y limitar la longitud a 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setModalData2({ ...modalData2, telefono: value });
    }
  };

  const adminsColumns = [
    { key: "_id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    { key: "apellido", header: "Apellido" },
    { key: "email", header: "Email" },
    { key: "telefono", header: "Telefono" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "delete", header: "Borrar", type: "delete" },
    { key: "edit", header: "Editar", type: "edit" },
  ];

  /* const passExpReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;
    const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celularExpReg = /^\d{10}$/; */

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Administradores</h1>
          <Button className={styles.buttonAdmins} onClick={handleShowModal}>
            Nuevo Administrador
          </Button>
          <DynamicTable
            columns={adminsColumns}
            data={admins}
            onToggle={handleEstado}
            onEdit={handleShowModal2}
            onDelete={handleBorrar}
          />
          <Modal show={showModal} onHide={handleHideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Administrador</Modal.Title>
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
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData.apellido}
                    onChange={(e) =>
                      setModalData({ ...modalData, apellido: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={modalData.email}
                    onChange={(e) =>
                      setModalData({ ...modalData, email: e.target.value })
                    }
                    maxLength={70}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData.telefono}
                    onChange={handleChangeTelefono}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={modalData.contrasenia}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        contrasenia: e.target.value,
                      })
                    }
                    maxLength={100}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleHideModal}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAdmin}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Crear
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showModal2} onHide={handleHideModal2}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Administrador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData2.nombre}
                    onChange={(e) =>
                      setModalData2({ ...modalData2, nombre: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData2.apellido}
                    onChange={(e) =>
                      setModalData2({ ...modalData2, apellido: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={modalData2.email}
                    onChange={(e) =>
                      setModalData2({ ...modalData2, email: e.target.value })
                    }
                    maxLength={70}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData2.telefono}
                    onChange={handleChangeTelefono2}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleHideModal2}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditAdmin}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminAdministradores;
