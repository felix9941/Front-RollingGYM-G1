import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../css/AdminPages.module.css";
import ModalParaAlta from "../components/ModalParaAlta.jsx";
import clienteAxios from "../helpers/clienteAxios.js";

const AdminAdministradores = () => {
  useEffect(() => {
    document.title = "Administrar administradores";
    getAdmins();
  }, []);

  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    const response = await clienteAxios.get("/administradores");
    setAdmins(response.data.administradores);
  };

  const adminsColumns = [
    { key: "_id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    { key: "apellido", header: "Apellido" },
    { key: "email", header: "Email" },
    { key: "telefono", header: "Telefono" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "delete", header: "Borrar", type: "delete" },
  ];

  const handleEditar = () => {
    console.log("editar");
  };
  const handleBorrar = () => {
    console.log("borrar");
  };
  const handleEstado = () => {
    console.log("cambio de estado");
  };

  /* const passExpReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const nombreApellidoExpReg = /^(?=.*[a-zA-Z])[A-Za-z\s]{3,}$/;
    const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celularExpReg = /^\d{10}$/; */

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Administradores</h1>
          <Button className={styles.buttonAdmins}>Nuevo Administrador</Button>
          <DynamicTable
            columns={adminsColumns}
            data={admins}
            onToggle={handleEstado}
            onEdit={handleEditar}
            onDelete={handleBorrar}
          />
        </div>
      </div>
    </>
  );
};

export default AdminAdministradores;
