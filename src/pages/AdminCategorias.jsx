import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import DynamicTable from "../components/Tablas";
import styles from "../css/AdminPages.module.css";

const categoriasData = [
  {
    id: 1,
    name: "Boxeo",
    planes: ["FULL"],
    imagen: "/public/boxeo-reservación.png",
    estado: true,
  },
  {
    id: 2,
    name: "Aparatos",
    planes: ["FULL"],
    imagen: "/public/pesas-reservación.png",
    estado: true,
  },
  {
    id: 3,
    name: "Crossfit",
    planes: ["FULL"],
    imagen: "/public/Crossfit-reservación.png",
    estado: true,
  },
];

const planesData = ["FULL", "Musculacion", "Clases"];

const Admincategorias = () => {
  useEffect(() => {
    document.title = "Administrar Categorias";
  }, []);

  const [categorias, setcategorias] = useState(categoriasData);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    name: "",
    planes: [],
    imagen: "",
    estado: true,
  });

  const handleShowModal = (
    category = { id: null, name: "", planes: [], imagen: "", estado: true }
  ) => {
    setModalData(category);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleSaveCategory = () => {
    if (modalData.id === null) {
      // Add new category
      setcategorias([
        ...categorias,
        { ...modalData, id: categorias.length + 1 },
      ]);
    } else {
      // Edit existing category
      setcategorias(
        categorias.map((cat) => (cat.id === modalData.id ? modalData : cat))
      );
    }
    setShowModal(false);
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
    }).then((result) => {
      if (result.isConfirmed) {
        setcategorias(categorias.filter((cat) => cat.id !== category.id));
        Swal.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
      }
    });
  };

  const handleToggleestado = (category) => {
    setcategorias(
      categorias.map((cat) =>
        cat.id === category.id ? { ...cat, estado: !cat.estado } : cat
      )
    );
  };

  const columns = [
    { key: "id", header: "Cod." },
    { key: "name", header: "Nombre" },
    { key: "planes", header: "Planes al que pertenece", type: "text" },
    { key: "imagen", header: "Foto", type: "image" },
    { key: "estado", header: "Estado", type: "boolean" },
    { key: "edit", header: "Editar", type: "edit" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  return (
    <div className={styles.contenedorAdmins}>
      <div className={styles.encabezadoAdministrador}>
        <h1 className={styles.h1Admins}>Administración de categorías</h1>
        <Button variant="warning" onClick={() => handleShowModal()}>
          Nueva categoría
        </Button>
        <DynamicTable
          columns={columns}
          data={categorias}
          onToggle={handleToggleestado}
          onDelete={handleDeleteCategory}
          onEdit={handleShowModal}
        />

        <Modal show={showModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalData.id ? "Editar Categoría" : "Nueva Categoría"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Planes al que pertenece</Form.Label>
                {planesData.map((plan) => (
                  <Form.Check
                    key={plan}
                    type="checkbox"
                    label={plan}
                    checked={modalData.planes.includes(plan)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setModalData({
                          ...modalData,
                          planes: [...modalData.planes, plan],
                        });
                      } else {
                        setModalData({
                          ...modalData,
                          planes: modalData.planes.filter((p) => p !== plan),
                        });
                      }
                    }}
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="text"
                  value={modalData.imagen}
                  onChange={(e) =>
                    setModalData({ ...modalData, imagen: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Activo"
                  checked={modalData.estado}
                  onChange={(e) =>
                    setModalData({ ...modalData, estado: e.target.checked })
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
      </div>
    </div>
  );
};

export default Admincategorias;
