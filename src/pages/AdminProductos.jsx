import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalParaNuevo from "../components/ModalParaNuevo";
import styles from "../css/AdminPages.module.css";
import DynamicTable from "../components/Tablas";
import clienteAxios from "../helpers/clienteAxios";
import Swal from "sweetalert2";

const AdminProductos = () => {
  useEffect(() => {
    document.title = "Administrar Productos";
    getProducts();
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

  const getProducts = async () => {
    try {
      const response = await clienteAxios.get("/productos");
      setProductos(response.data.productos);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { nombre, foto } = formData;
    let newErrors = {};

    const nombreExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;
    if (!foto) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar una foto del producto",
      });
      return;
    }

    if (!nombreExpReg.test(nombre)) {
      newErrors = { ...newErrors, nombre: "nombreInvalido" };
    } else {
      if (foto) {
        try {
          const formData = new FormData();
          formData.append("nombre", nombre);
          formData.append("foto", foto);

          const response = await clienteAxios.post("/productos", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
        getProducts();
        setShow(false);
      }
    }

    setErrors((prevState) => ({ ...prevState, ...newErrors }));
  };

  const handleToggleEstado = async (producto) => {
    try {
      const response = await clienteAxios.put(
        `/productos/cambioEstadoProducto/${producto._id}`,
        {}
      );

      if (response.status === 200) {
        const updatedProducto = response.data;
        setProductos((prevProductos) =>
          prevProductos.map((p) =>
            p._id === producto._id ? { ...p, ...updatedProducto } : p
          )
        );
        getProducts();
      } else {
        console.error("Error al cambiar el estado del producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProducto = async (producto) => {
    Swal.fire({
      title: `Estas seguro de eliminar ${producto.nombre}`,
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
            `/productos/${producto._id}`
          );
        } catch (error) {
          console.error("Error al borrar el producto", error);
        }
        Swal.fire("Eliminado!", "El producto ha sido eliminada.", "success");
        getProducts();
      }
    });
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
