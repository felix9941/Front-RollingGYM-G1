import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../css/AdminPrincipal.module.css";
import clienteAxios from "../helpers/clienteAxios";

const PrincipalAdmin = () => {
  const navigate = useNavigate();

  const [dia, setDia] = useState("");
  const [clases, setClases] = useState([]);
  const [clientes, setClientes] = useState([]);

  const today = new Date();
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  useEffect(() => {
    document.title = "Principal Administrador";
    getDayOfWeek(today);
    getClientes();
  }, []);

  useEffect(() => {
    if (dia !== "") {
      mostrarDia();
    }
  }, [dia]);

  const getClientes = async () => {
    try {
      const response = await clienteAxios.get("/clientes/");
      setClientes(response.data.clientes);
    } catch (error) {
      console.error("Error al obtener los clientes", error);
    }
  };

  const getDayOfWeek = (date) => {
    let dayIndex = new Date(date).getDay();
    if (dayIndex === 0) {
      dayIndex = 7;
    }
    setDia(dayIndex - 1);
  };

  const mostrarDia = async () => {
    try {
      const nuevasClases = [];
      for (let index = dia; index > 0; index--) {
        const response = await clienteAxios.get(
          `/clases/dia/${daysOfWeek[index]}`
        );
        nuevasClases.push(...response.data.clasesDia);
      }
      setClases(nuevasClases);
    } catch (error) {
      console.error("Error al obtener las clases del día", error);
    }
  };

  useEffect(() => {
    if (clases.length > 0) {
      reservasCero();
      limpiarReservas();
    }
  }, [clases]);

  const reservasCero = async () => {
    try {
      const promesas = clases.map((clase) =>
        clienteAxios.put(`/clases/cero/${clase._id}`, {})
      );
      const respuestas = await Promise.all(promesas);
    } catch (error) {
      console.error("Error al actualizar las clases", error);
    }
  };

  const limpiarReservas = async () => {
    try {
      const promesas = clientes.flatMap((cliente) =>
        clases.map((clase) => {
          const body = {
            reservas: cliente.idReservas,
            idClase: clase._id,
          };
          return clienteAxios.delete("/reservas/limpieza", { data: body });
        })
      );
      const respuestas = await Promise.all(promesas);
    } catch (error) {
      console.error("Error al limpiar reservas", error);
    }
  };

  const pages = [
    { name: "Home Page PowerGYM", route: "/principal" },
    { name: "Administrar Clientes", route: "/adminClientes" },
    { name: "Administrar Profesores", route: "/adminProfesores" },
    { name: "Administrar Clases", route: "/adminClases" },
    { name: "Administrar Planes", route: "/adminPlanes" },
    { name: "Administrar Productos", route: "/adminProductos" },
    { name: "Administrar Categorías", route: "/adminCategorias" },
    { name: "Administrar Administradores", route: "/adminAdmins" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.textPrincipalH1}>
          Bienvenido al Panel de Administración
        </h1>
        <h5 className={styles.textPrincipalH5}>
          Gestiona todos los aspectos de PowerGym desde aquí
        </h5>
      </div>
      <div className={styles.cardContainer}>
        {pages.map((page) => (
          <Card key={page.route} className={styles.card}>
            <Card.Body>
              <Card.Title>{page.name}</Card.Title>
              <Button
                className={styles.buttonAdmins}
                onClick={() => navigate(page.route)}
              >
                Gestionar
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrincipalAdmin;
