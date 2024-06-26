import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios";
import DynamicTable from "../components/Tablas";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const AdminClases = () => {
  useEffect(() => {
    document.title = "Administrar Clases";
    getProfesores();
    getCategorias();
    getClases();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [profesores, setProfesores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clases, setClases] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalData, setModalData] = useState({
    dia: "",
    hora: "",
    categoria: "",
    idProfesor: "",
    cupo: "",
  });

  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleShowModal = () => {
    setModalData({
      dia: "",
      hora: "",
      categoria: "",
      idProfesor: "",
      cupo: "",
    });
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const getClases = async () => {
    try {
      const response = await clienteAxios.get("/clases/");
      const clasesConProfesores = await Promise.all(
        response.data.clases.map(async (clase) => {
          try {
            const profesorResponse = await clienteAxios.get(
              `/profesores/${clase.idProfesor}`
            );
            const profesor = profesorResponse.data.profesor;
            return {
              ...clase,
              nombreProfe: `${profesor.nombre} ${profesor.apellido}`,
            };
          } catch (error) {
            console.error(
              `Error al obtener el profesor con id ${clase.idProfesor}`,
              error
            );
            return { ...clase, nombreProfe: "Desconocido" };
          }
        })
      );
      setClases(clasesConProfesores);
    } catch (error) {
      console.error("Error al obtener las clases", error);
    }
  };

  useEffect(() => {
    getClases();
  }, []);

  const getProfesores = async () => {
    try {
      const response = await clienteAxios.get("/profesores/");
      setProfesores(response.data.profesores);
    } catch (error) {
      console.error("error al obtener los profesores", error);
    }
  };

  const getCategorias = async () => {
    try {
      const response = await clienteAxios.get("/categorias/");
      setCategorias(response.data.categorias);
    } catch (error) {
      console.error("error al obtener las categorias", error);
    }
  };

  const deleteF = async (clase) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await clienteAxios.delete(`/clases/${clase._id}`);
          Swal.fire("Eliminado!", "La clase ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la clase:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al eliminar la clase",
          });
        }
        getClases();
      }
    });
  };

  const editF = () => {};

  const estadoF = async (clase) => {
    try {
      const response = await clienteAxios.put(`/clases/${clase._id}`, {});
      getClases();
    } catch (error) {
      console.error("error al cambiar el estado de la categoria", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cambiar el estado de la clase",
      });
    }
  };

  const handleCrear = async () => {
    if (
      modalData.dia === "" ||
      modalData.hora === "" ||
      modalData.categoria === "" ||
      modalData.idProfesor === "" ||
      modalData.cupo === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    if (modalData.dia === "Seleccione el dia") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar un dia",
      });
      return;
    }
    if (modalData.idProfesor === "Seleccione el Profesor") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar un profesor",
      });
      return;
    }
    if (modalData.cupo <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El cupo debe ser mayor a 0",
      });
      return;
    }
    try {
      const response = await clienteAxios.post("/clases/", modalData);
      getClases();
    } catch (error) {
      console.error("Error al crear la clase", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.errors[0].msg,
        });
        return;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear la clase",
      });
    }
    handleHideModal();
  };

  const columns = [
    { key: "dia", header: "Dia" },
    { key: "hora", header: "Hora" },
    { key: "categoria", header: "Categoria" },
    { key: "nombreProfe", header: "Profesor" },
    { key: "cupo", header: "Cupo" },
    { key: "reservas", header: "Reservas" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const currentItems = clases.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(clases.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Clases</h1>
          <Button onClick={handleShowModal} className={styles.buttonAdmins}>
            Nueva Clase
          </Button>
          <DynamicTable
            columns={columns}
            data={currentItems}
            onToggle={estadoF}
            onDelete={deleteF}
            onEdit={editF}
          />
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          <Modal show={showModal} onHide={handleHideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nueva Clase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Dia</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setModalData({ ...modalData, dia: e.target.value })
                    }
                  >
                    <option>Seleccione el dia</option>
                    {dias.map((dia) => (
                      <option key={dia} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    value={modalData.hora}
                    onChange={(e) =>
                      setModalData({ ...modalData, hora: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setModalData({ ...modalData, categoria: e.target.value })
                    }
                  >
                    <option>Seleccione la categoria</option>
                    {categorias.map((cat) => (
                      <option key={cat._id} value={cat.nombre}>
                        {cat.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Profesor</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setModalData({ ...modalData, idProfesor: e.target.value })
                    }
                  >
                    <option>Seleccione el Profesor</option>
                    {profesores.map((profesor) => (
                      <option key={profesor._id} value={profesor._id}>
                        {profesor.nombre} {profesor.apellido}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cupo</Form.Label>
                  <Form.Control
                    type="number"
                    value={modalData.cupo}
                    onChange={(e) =>
                      setModalData({ ...modalData, cupo: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleHideModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleCrear}>
                Crear
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminClases;
