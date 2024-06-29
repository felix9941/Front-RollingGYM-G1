import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const PrivateRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  const role = sessionStorage.getItem("role") || "";

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No puede acceder a esta pagína",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/");
      });
    } else if (!allowedRoles.includes(role)) {
      if (role === "administrador") {
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "Aunque tenga el rol de administrador, no tiene permiso para acceder a esta página.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/adminAdmins");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "No tiene permiso",
          text: "No puede acceder ya que su rol no cuenta con los permisos necesarios.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/principal");
        });
      }
    }
  }, [token, role, allowedRoles, navigate]);

  if (!token || !allowedRoles.includes(role)) {
    return null;
  }

  return children;
};

export default PrivateRoute;
