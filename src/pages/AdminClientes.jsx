import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../css/AdminPages.module.css";
import clienteAxios from "../helpers/clienteAxios";
import DynamicTable from "../components/Tablas";
import Swal from "sweetalert2";

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contrasenia: "ABCabc123#",
  });
  const [formData2, setFormData2] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [formData3, setFormData3] = useState({
    plan: "",
    expiracionCuota: "",
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    document.title = "Administrar Clientes";
    getClientes();
    getPlanes();
  }, []);

  useEffect(() => {
    setClientesFiltrados(clientes);
  }, [clientes]);

  const handleShowModal = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      contrasenia: "ABCabc123#",
    });
    setShowModal(true);
  };

  const handleShowModal2 = (cliente) => {
    setFormData2({
      _id: cliente._id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
    });
    setShowModal2(true);
  };

  const handleShowModal3 = (cliente) => {
    setFormData3({
      _id: cliente._id,
      plan: "",
      expiracionCuota: "",
      nombre: cliente.nombre,
      apellido: cliente.apellido,
    });
    setShowModal3(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleHideModal2 = () => {
    setShowModal2(false);
  };

  const handleHideModal3 = () => {
    setShowModal3(false);
  };

  const getPlanes = async () => {
    try {
      const response = await clienteAxios.get("/planes/planesHabilitados");
      setPlanes(response.data.planesHabilitados);
    } catch (error) {
      console.error("error al obtener los planes", error);
    }
  };

  const getClientes = async () => {
    try {
      const response = await clienteAxios.get("/clientes/");
      const today = Date.now();
      const updatedClientes = response.data.clientes.map((cliente) => {
        const expiracionCuota = cliente.expiracionCuota;
        const diferenciaMilisegundos = expiracionCuota - today;
        let vencimiento;
        const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`;

        if (diferenciaMilisegundos <= 0) {
          vencimiento = "Vencido";
        } else {
          const diferenciaDias = Math.ceil(
            diferenciaMilisegundos / (1000 * 60 * 60 * 24)
          );
          vencimiento = `Vence en ${diferenciaDias} días`;
        }

        return {
          ...cliente,
          vencimiento,
          nombreCompleto,
        };
      });

      setClientes(updatedClientes);
    } catch (error) {
      console.error("Error al obtener los clientes", error);
    }
  };

  const editF = async (ev) => {
    ev.preventDefault();
    setDisableButton(true);
    if (
      formData2.nombre === "" ||
      formData2.apellido === "" ||
      formData2.email === "" ||
      formData2.telefono === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
      });
      setDisableButton(false);
      return;
    }
    try {
      const response = await clienteAxios.put(
        `/clientes/editar/${formData2._id}`,
        formData2
      );
    } catch (error) {
      console.error("Error al editar el cliente", error);
      if (error.response.request.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
        setDisableButton(false);
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al editar el cliente",
        });
        setDisableButton(false);
        return;
      }
    }
    Swal.fire({
      icon: "success",
      title: "Edicion Exitosa",
      text: "Cliente editado con exito",
    });
    getClientes();
    setShowModal2(false);
    setFormData2({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
    });
    setDisableButton(false);
  };

  const deleteF = (cliente) => {
    Swal.fire({
      title: "Estás seguro?",
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
            `/clientes/${cliente._id}`
          );
        } catch (error) {
          console.error("error al eliminar el cliente", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al eliminar el cliente",
          });
        }
        Swal.fire("Eliminado!", "El cliente ha sido eliminado.", "success");
        getClientes();
      }
    });
  };

  const estadoF = async (cliente) => {
    try {
      const response = await clienteAxios.put(
        `/clientes/estado/${cliente._id}`,
        {}
      );
      getClientes();
    } catch (error) {
      console.error("error al deshabilitar/habilitar el cliente", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al editar el estado del cliente",
      });
    }
  };

  const accionF = async (ev) => {
    ev.preventDefault();
    setDisableButton(true);
    if (formData3.plan === "" || formData3.expiracionCuota === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
      });
      setDisableButton(false);
      return;
    }
    try {
      const response = await clienteAxios.put(
        `/clientes/pago/${formData3._id}`,
        formData3
      );
    } catch (error) {
      console.error("Error al pagar la cuota", error);
      if (error.response.request.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
        setDisableButton(false);
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al pagar la cuota",
        });
        setDisableButton(false);
        return;
      }
    }
    Swal.fire({
      icon: "success",
      title: "Edicion Exitosa",
      text: "Cuota pagada con exito",
    });
    getClientes();
    setShowModal3(false);
    setFormData3({
      plan: "",
      expiracionCuota: "",
      nombre: "",
      apellido: "",
    });
    setDisableButton(false);
  };

  const handleCrear = async (ev) => {
    ev.preventDefault();
    setDisableButton(true);
    if (
      formData.nombre === "" ||
      formData.apellido === "" ||
      formData.email === "" ||
      formData.telefono === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
      });
      setDisableButton(false);
      return;
    }
    try {
      const response = await clienteAxios.post("/clientes/register", formData);
    } catch (error) {
      console.error("Error al crear el cliente", error);
      if (error.response.request.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
        setDisableButton(false);
        return;
      } else if (error.response.request.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El email ya esta registrado",
        });
        setDisableButton(false);
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear el administrador",
        });
        setDisableButton(false);
        return;
      }
    }
    Swal.fire({
      icon: "success",
      title: "Registro Exitoso",
      text: "Cliente creado con exito, contraseña por defecto ABCabc123#",
    });
    getClientes();
    setShowModal(false);
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      contrasenia: "ABCabc123#",
    });
    setDisableButton(false);
  };

  const handleBusqueda = async () => {
    const filtro = clientes.filter((cliente) =>
      cliente.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase())
    );
    setClientesFiltrados(filtro);
  };

  const handleLimpiar = () => {
    setBusqueda("");
    setClientesFiltrados(clientes);
  };

  const columns = [
    { key: "nombreCompleto", header: "Nombre" },
    { key: "email", header: "Email" },
    { key: "telefono", header: "Telefono" },
    { key: "plan", header: "Plan" },
    { key: "vencimiento", header: "Vencimiento" },
    { key: "deleted", header: "Deshabilitar", type: "boolean" },
    { key: "edit", header: "Editar", type: "edit" },
    { key: "delete", header: "Eliminar", type: "delete" },
    { key: "Pagar Cuota", header: "Pagar Cuota", type: "accion" },
  ];

  return (
    <>
      <div className={styles.contenedorAdmins}>
        <div className={styles.encabezadoAdministrador}>
          <h1 className={styles.h1Admins}>Administracion de Clientes</h1>
          <Button onClick={handleShowModal} className={styles.buttonAdmins}>
            Nuevo Cliente
          </Button>
          <div className="d-flex">
            <div className="my-2 ms-0 me-2 w-25">
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del cliente"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="m-2">
              <Button className={styles.buttonAdmins} onClick={handleBusqueda}>
                Buscar Cliente
              </Button>
            </div>
            <div className="m-2">
              <Button className={styles.buttonAdmins} onClick={handleLimpiar}>
                Limpiar Busqueda
              </Button>
            </div>
          </div>
          {clientesFiltrados ? (
            <DynamicTable
              columns={columns}
              data={clientesFiltrados}
              onToggle={estadoF}
              onDelete={deleteF}
              onEdit={handleShowModal2}
              onAccion={handleShowModal3}
            />
          ) : (
            <h1 className={styles.h1Admins}>Cargando</h1>
          )}
          <Modal show={showModal} onHide={handleHideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.apellido}
                    onChange={(e) =>
                      setFormData({ ...formData, apellido: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    maxLength={70}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleHideModal}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCrear}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Crear
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showModal2} onHide={handleHideModal2}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData2.nombre}
                    onChange={(e) =>
                      setFormData2({ ...formData2, nombre: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData2.apellido}
                    onChange={(e) =>
                      setFormData2({ ...formData2, apellido: e.target.value })
                    }
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData2.email}
                    onChange={(e) =>
                      setFormData2({ ...formData2, email: e.target.value })
                    }
                    maxLength={70}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData2.telefono}
                    onChange={(e) =>
                      setFormData2({ ...formData2, telefono: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleHideModal2}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Cancelar
              </Button>
              <Button
                onClick={editF}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showModal3} onHide={handleHideModal3}>
            <Modal.Header closeButton>
              <Modal.Title>{`Cuota ${formData3.nombre} ${formData3.apellido}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Plan</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setFormData3({ ...formData3, plan: e.target.value })
                    }
                  >
                    <option value={""}>Seleccione el Plan</option>
                    {planes.map((plan) => (
                      <option key={plan.nombre} value={plan.nombre}>
                        {`${plan.nombre}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Fecha de Vencimiento</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData3.expiracionCuota}
                    onChange={(e) =>
                      setFormData3({
                        ...formData3,
                        expiracionCuota: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleHideModal3}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Cancelar
              </Button>
              <Button
                onClick={accionF}
                className={styles.buttonAdmins}
                disabled={disableButton}
              >
                Pagar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminClientes;
