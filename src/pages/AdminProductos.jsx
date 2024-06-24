import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaNuevo from "../components/ModalParaNuevo";
import styles from "../css/AdminPages.module.css";
import DynamicTable from "../components/Tablas";

const AdminProductos = () => {
  useEffect(() => {
    document.title = "Administrar Productos";
    fetchProductos();
  }, []);

  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (ev) => {
    let newErrors = {};
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors(newErrors);
  };

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
    setFormData({ ...formData, foto: ev.target.files[0] });
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/productos");
      const data = await response.json();
      setProductos(data.productos);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { nombre, foto } = formData;
    let newErrors = {};

    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;

    if (!nombreApellidoExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    } else {
      if (foto) {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("foto", foto);

        const cargarProducto = await fetch(
          "http://localhost:3002/api/productos",
          {
            method: "POST",
            body: formData,
          }
        );
        fetchProductos();
      }
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    console.log({ ...formData, ...newErrors });

    console.log(foto);
  };

  const handleToggleEstado = async (producto) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/productos/cambioEstadoProducto/${producto._id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        const updatedProducto = await response.json();
        setProductos((prevProductos) =>
          prevProductos.map((p) =>
            p._id === producto._id ? { ...p, ...updatedProducto } : p
          )
        );
        fetchProductos();
      } else {
        console.error("Error al cambiar el estado del producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProducto = async (producto) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/productos/${producto._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.filter((p) => p._id !== producto._id)
        );
      } else {
        console.error("Error al borrar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const errorMessage = (error) => {
    switch (error) {
      case "nombreInvalido":
        return "Ingresar nombre";
      case "fotoInvalido":
        return "Ingresar foto";
      default:
        return "";
    }
  };

  const columns = [
    { key: "_id", header: "Cod." },
    { key: "foto", header: "Foto", type: "image" },
    { key: "nombre", header: "Nombre" },
    { key: "deleted", header: "Estado", type: "boolean" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administración de Productos</h1>
          <Button onClick={handleShow} className={styles.buttonAdmins}>
            Nuevo Producto
          </Button>
          <DynamicTable
            columns={columns}
            data={productos}
            onToggle={handleToggleEstado}
            onDelete={handleDeleteProducto}
          />
        </div>
      </div>
      <ModalParaNuevo
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        errorMessage={errorMessage}
        tipo="producto"
      />
    </>
  );
};

export default AdminProductos;
