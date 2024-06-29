import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../helpers/clienteAxios";
import "../css/MiReservas.css";

const MisReservas = () => {
  const [clases, setClases] = useState([]);
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    document.title = "Mis Reservas";
    getReservas();
    getProfesores();
    eliminarReserva();
  }, []);

  const getReservas = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await clienteAxios.get("/reservas", {
        headers: {
          auth: `Bearer ${token}`,
        },
      });
      console.log("Clases obtenidas:", response.data.clases);
      setClases(response.data.clases);
    } catch (error) {
      console.log("Error al obtener las reservas:", error);
    }
  };

  const eliminarReserva = async (idClase) => {
    try {
      console.log("clase", idClase);
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await clienteAxios.delete("/reservas/eliminar", {
        headers: {
          auth: `Bearer ${token}`,
        },
        data: { idClase },
      });

      console.log("Reserva eliminada:", response.data);

      setClases(clases.filter((clase) => clase._id !== idClase));
    } catch (error) {
      console.log("Error al eliminar la reserva:", error);
    }
  };

  const getProfesores = async () => {
    try {
      const response = await clienteAxios.get("/profesores");
      console.log("Profesores obtenidos:", response.data.profesores);
      setProfesores(response.data.profesores);
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
    }
  };

  const getProfesorNombre = (idProfesor) => {
    const profesor = profesores.find((prof) => prof._id === idProfesor);
    return profesor ? `${profesor.nombre} ${profesor.apellido}` : "S/N";
  };

  const confirmarEliminar = (idClase, nombreClase) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar la reserva de la clase ${nombreClase}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarReserva(idClase);
        Swal.fire("¡Eliminada!", "La reserva ha sido eliminada.", "success");
      }
    });
  };

  return (
    <div className="contenedor-md">
      <div className="contenedor-rc">
        <div className="contenedor-hijo-rc">
          <h1 className="titulo-izquierda">Mis Reservas</h1>
          <div className="tabla-reserva-clase">
            <Table striped bordered hover>
              <thead className="table-header">
                <tr>
                  <th>Categoria</th>
                  <th>Profesor</th>
                  <th>Dia</th>
                  <th>Hora</th>
                  <th className="eliminar-reserva">Eliminar Reserva</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {clases.length > 0 ? (
                  clases.map((clase) => (
                    <tr key={clase._id}>
                      <td>{clase.categoria}</td>
                      <td>{getProfesorNombre(clase.idProfesor)}</td>
                      <td>{clase.dia}</td>
                      <td>{clase.hora}</td>
                      <td className="eliminar-reserva-btn">
                        <Button
                          variant="danger"
                          onClick={() =>
                            confirmarEliminar(clase._id, clase.categoria)
                          }
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Sin Datos.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {clases.length === 0 && (
              <Alert variant="info" className="mt-3">
                No tienes reservas, <Link to="/principal">reserva aquí</Link>.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisReservas;
