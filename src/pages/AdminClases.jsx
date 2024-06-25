import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios";
import DynamicTable from "../components/Tablas";
import Swal from "sweetalert2";

const AdminClases = () => {
  useEffect(() => {
    document.title = "Administrar Clases";
    getProfesores();
    getCategorias();
    getClases();
  }, []);

  const [profesores, setProfesores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clases, setClases] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    nombre: "",
    dia: "",
    hora: "",
    categoria: "",
    idProfesor: "",
    cupo: "",
    reservas: "",
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
            return { ...clase, nombreProfe: "Desconocido" }; // Puedes manejar errores de diferentes maneras
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
      console.log("Profesores obtenidos:", profesores);
    } catch (error) {
      console.error("error al obtener los profesores", error);
    }
  };

  const getCategorias = async () => {
    try {
      const response = await clienteAxios.get("/categorias/");
      setCategorias(response.data.categorias);
      console.log("Categorias obtenidas:", categorias);
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
          Swal.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
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

  const columns = [
    { key: "_id", header: "ID" },
    { key: "dia", header: "Dia" },
    { key: "hora", header: "Hora" },
    { key: "categoria", header: "Categoria" },
    { key: "nombreProfe", header: "Profesor" },
    { key: "cupo", header: "Cupo" },
    { key: "reservas", header: "Reservas" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Clases</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Nueva Clase
          </Button>
          <DynamicTable
            columns={columns}
            data={clases}
            onToggle={estadoF}
            onDelete={deleteF}
            onEdit={editF}
          />
        </div>
      </div>
    </>
  );
};

export default AdminClases;
