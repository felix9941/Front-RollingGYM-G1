import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("role");

    navigate("/iniciarSesion");
  }, [navigate]);

  return null;
};

export default LogoutPage;
