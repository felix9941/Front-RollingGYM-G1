import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../css/AdminPrincipal.module.css";

const PrincipalAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Principal Administrador";
  }, []);

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
