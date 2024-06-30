import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/ReservarClases.css";
import Swal from "sweetalert2";

const ReservarClases = () => {
  const [show, setShow] = useState(false);
  const [clases, setClases] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterDia, setFilterDia] = useState("");
  const [noClasesMessage, setNoClasesMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (clase) => {
    setSelectedClase(clase);
    setShow(true);
  };

  useEffect(() => {
    document.title = "Reservar Clase";
    getClases();
    getProfesores();
  }, []);

  const [searchParams] = useSearchParams();
  const nombreCat = searchParams.get("nombre");

  const getClases = async () => {
    try {
      const response = await clienteAxios.get(`/clases/${nombreCat}`);
      console.log("Clases obtenidas:", response.data.clases);
      setClases(response.data.clases);
    } catch (error) {
      console.error("Error al obtener las clases:", error);
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFilterChange = (e) => {
    const selectedDay = e.target.value;
    setFilterDia(selectedDay);

    const clasesParaDia = clases.filter((clase) => clase.dia === selectedDay);
    if (clasesParaDia.length === 0) {
      setNoClasesMessage(`No hay clases para ${selectedDay}`);
      if (selectedDay === "") {
        setNoClasesMessage("");
      }
    } else {
      setNoClasesMessage("");
    }
  };

  const handleReservar = async (clase) => {
    try {
      const response = await clienteAxios.post(
        `/reservas/${clase._id}`,
        {},
        config
      );
      const respuesta = await clienteAxios.put(`/clases/reserva/${clase._id}`);
    } catch (error) {
      console.error(error);
      if (error.response.status === 405) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al generar la reserva",
        });
      }
    }
    getClases();
    handleClose();
  };

  const filteredClase = filterDia
    ? clases.filter((clase) => clase.dia === filterDia)
    : clases;

  const offset = currentPage * 6;
  const currentItems = filteredClase.slice(offset, offset + 6);
  const pageCount = Math.ceil(filteredClase.length / 6);

  return (
    <div className="contenedor-md">
      <div className="contenedor-rc">
        <div className="contenedor-hijo-rc">
          <h1 className="titulo-izquierda">{`Reservar clase de ${nombreCat}`}</h1>
          <div className="titulo-izquierda d-flex">
            <div className="my-2 me-2">
              <select className="form-select" onChange={handleFilterChange}>
                <option value="">Todos los días</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
              </select>
              {noClasesMessage && (
                <p className="text-danger">{noClasesMessage}</p>
              )}
            </div>
          </div>
          <div className="tabla-reserva-clase">
            <Table bordered hover>
              <thead className="table-header">
                <tr>
                  <th>Día</th>
                  <th>Hora</th>
                  <th>Categoría</th>
                  <th>Profesor</th>
                  <th>Cupos</th>
                  <th className="reservar-ancho text-center">Reservar</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {currentItems.map((clase) => (
                  <tr key={clase._id}>
                    <td>{clase.dia}</td>
                    <td>{clase.hora}</td>
                    <td>{clase.categoria}</td>
                    <td>{getProfesorNombre(clase.idProfesor)}</td>
                    <td>{clase.cupo - clase.reservas}</td>
                    <td className="reservar-ancho text-center">
                      <Button
                        className="boton-tabla-reserva"
                        onClick={() => handleShow(clase)}
                        disabled={clase.cupo - clase.reservas < 1}
                      >
                        Reservar
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>{`Clase de ${selectedClase?.categoria}`}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {`¿Estás seguro de querer reservar esta clase de ${
                            selectedClase?.categoria
                          } con el profesor ${getProfesorNombre(
                            selectedClase?.idProfesor
                          )}?`}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            No
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleReservar(selectedClase)}
                          >
                            Sí!
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservarClases;
