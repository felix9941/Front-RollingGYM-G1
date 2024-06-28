import styles from "../css/AdminPages.module.css";
import clienteAxios, { config } from "../helpers/clienteAxios";
import DynamicTable from "../components/Tablas";
import { useEffect, useState } from "react";

const MisClases = () => {
  const [clases, setClases] = useState([]);
  const [idProfesor, setIdProfesor] = useState();
  const [profesor, setProfesor] = useState();
  const [filterDia, setFilterDia] = useState("");
  const [noClasesMessage, setNoClasesMessage] = useState("");

  useEffect(() => {
    document.title = "Administrar Clases";
    getClases();
  }, []);
  useEffect(() => {
    if (idProfesor) {
      getProfesor();
    }
  }, [idProfesor]);

  const getClases = async () => {
    try {
      const response = await clienteAxios.get("/clases/profesor", config);
      setClases(response.data.clases);
      setIdProfesor(response.data.idProfe);
    } catch (error) {
      console.error("Error al obtener las clases", error);
    }
  };

  const getProfesor = async () => {
    try {
      const response = await clienteAxios.get(
        `/profesores/${idProfesor}`,
        config
      );
      setProfesor(response.data.profesor);
    } catch (error) {
      console.error("Error al obtener el profesor:", error);
    }
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

  const columns = [
    { key: "dia", header: "Dia" },
    { key: "hora", header: "Hora" },
    { key: "categoria", header: "Categoria" },
    { key: "cupo", header: "Cupo" },
    { key: "reservas", header: "Reservas" },
  ];

  const editF = () => {};
  const deleteF = () => {};
  const estadoF = () => {};
  const filteredClase = filterDia
    ? clases.filter((clase) => clase.dia === filterDia)
    : clases;

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>
            {profesor ? `Clases ${profesor.nombre} ${profesor.apellido}` : ""}
          </h1>
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
          <DynamicTable
            columns={columns}
            data={filteredClase}
            onToggle={estadoF}
            onDelete={deleteF}
            onEdit={editF}
          />
        </div>
      </div>
    </>
  );
};

export default MisClases;
