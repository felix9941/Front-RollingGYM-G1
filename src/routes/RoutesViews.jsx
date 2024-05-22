import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";
import RegisterPage from "../pages/Registro";
import IniciarSesion from "../pages/IniciarSesion";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
