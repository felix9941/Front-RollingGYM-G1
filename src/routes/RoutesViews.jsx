import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";
import RegisterPage from "../pages/Registro";
import HeroPage from "../pages/HeroPage";
import SobreNosotros from "../pages/SobreNosotros";
import IniciarSesion from "../pages/IniciarSesion";
import Error404 from "../pages/Error404";
import AdminClases from "../pages/AdminClases";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/adminClases" element={<AdminClases />} />
        <Route path="/" element={<HeroPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
