import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import DynamicTable from "../components/Tablas";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios";

const Admincategorias = () => {
  useEffect(() => {
    document.title = "Administrar Categorias";
    getCategorias();
    getPlanes();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categorias2, setCategorias2] = useState([]);

  const [modalData, setModalData] = useState({
    nombre: "",
    idPlanes: [],
  });
  const [modalData2, setModalData2] = useState({
    nombre: "",
    idPlanes: [],
    foto: "",
  });

  const getCategorias = async () => {
    try {
      const response = await clienteAxios.get("/categorias/");
      setCategorias(response.data.categorias);
    } catch (error) {
      console.error("error al obtener las categorias", error);
    }
  };

  const getPlanes = async () => {
    try {
      const response = await clienteAxios.get("/planes/planesHabilitados");
      setPlanes(response.data.planesHabilitados);
    } catch (error) {
      console.error("error al obtener los planes", error);
    }
  };

  const handleShowModal = () => {
    setModalData({
      nombre: "",
      idPlanes: [],
      foto: "",
    });
    setShowModal(true);
  };

  const handleShowModal2 = (category) => {
    setModalData2({
      _id: category._id,
      nombre: category.nombre,
      idPlanes: category.idPlanes,
    });
    setShowModal2(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleHideModal2 = () => {
    setShowModal2(false);
  };

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
    setFormData({ ...formData, foto: ev.target.files[0] });
  };

  const handleFileChange2 = (ev) => {
    setFile2(ev.target.files[0]);
    setFormData2({ ...formData2, foto: ev.target.files[0] });
  };

  const handleSaveCategory = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("nombre", modalData.nombre);
    formData.append("foto", modalData.foto);
    modalData.idPlanes.forEach((plan) => formData.append("idPlanes", plan));
    if (
      modalData.nombre === "" ||
      modalData.idPlanes.length === 0 ||
      modalData.foto === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
      });
      return;
    }
    try {
      const response = await clienteAxios.post("/categorias/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("error al crear la categoria", error);
    }
    getCategorias();
    setShowModal(false);
  };

  const handleEditCategory = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("nombre", modalData2.nombre);
    formData.append("foto", modalData2.foto);
    modalData2.idPlanes.forEach((plan) => formData.append("idPlanes", plan));
    try {
      const response = await clienteAxios.put(
        `/categorias/${modalData2._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("error al editar la categoria", error);
    }
    getCategorias();
    setShowModal2(false);
  };

  const handleDeleteCategory = (category) => {
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
            `/categorias/${category._id}`
          );
        } catch (error) {
          console.error("error al eliminar la categoria", error);
        }
        Swal.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
        getCategorias();
      }
    });
  };

  const handleToggleestado = async (category) => {
    try {
      const response = await clienteAxios.put(
        `/categorias/cambioEstadoCategoria/${category._id}`,
        {}
      );
      getCategorias();
    } catch (error) {
      console.error("error al cambiar el estado de la categoria", error);
    }
  };

  useEffect(() => {
    planesCategorias();
  }, [categorias, planes]);

  const planesCategorias = () => {
    const updatedCategorias = categorias.map((categoria) => {
      const updatedIdPlanes = categoria.idPlanes.map((idPlan) => {
        const plan = planes.find((plan) => plan._id === idPlan);
        return plan ? plan.nombre : idPlan;
      });

      return { ...categoria, idPlanes: updatedIdPlanes };
    });

    setCategorias2(updatedCategorias);
  };

  const columns = [
    { key: "nombre", header: "Nombre" },
    { key: "idPlanes", header: "Planes al que pertenece", type: "text" },
    { key: "foto", header: "Foto", type: "image" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "edit", header: "Editar", type: "edit" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  return (
    <div className={styles.contenedorAdmins}>
      <div className={styles.encabezadoAdministrador}>
        <h1 className={styles.h1Admins}>Administración de categorías</h1>
        <Button
          className={styles.buttonAdmins}
          onClick={() => handleShowModal()}
        >
          Nueva categoría
        </Button>
        <DynamicTable
          columns={columns}
          data={categorias2}
          onToggle={handleToggleestado}
          onDelete={handleDeleteCategory}
          onEdit={handleShowModal2}
        />

        <Modal show={showModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Categoría</Modal.Title>
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
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Planes al que pertenece</Form.Label>
                {planes.map((plan) => (
                  <Form.Check
                    key={plan._id}
                    type="checkbox"
                    label={plan.nombre}
                    checked={modalData.idPlanes.includes(plan._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setModalData({
                          ...modalData,
                          idPlanes: [...modalData.idPlanes, plan._id],
                        });
                      } else {
                        setModalData({
                          ...modalData,
                          idPlanes: modalData.idPlanes.filter(
                            (p) => p !== plan._id
                          ),
                        });
                      }
                    }}
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setModalData({ ...modalData, foto: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleHideModal} className={styles.buttonAdmins}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveCategory}
              className={styles.buttonAdmins}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModal2} onHide={handleHideModal2}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Categoría</Modal.Title>
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
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Planes al que pertenece</Form.Label>
                {planes.map((plan) => (
                  <Form.Check
                    key={plan._id}
                    type="checkbox"
                    label={plan.nombre}
                    checked={modalData2.idPlanes.includes(plan._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setModalData2({
                          ...modalData2,
                          idPlanes: [...modalData2.idPlanes, plan._id],
                        });
                      } else {
                        setModalData2({
                          ...modalData2,
                          idPlanes: modalData2.idPlanes.filter(
                            (p) => p !== plan._id
                          ),
                        });
                      }
                    }}
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setModalData2({ ...modalData2, foto: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleHideModal2} className={styles.buttonAdmins}>
              Cancelar
            </Button>
            <Button
              onClick={handleEditCategory}
              className={styles.buttonAdmins}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Admincategorias;
