import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";
import RegisterPage from "../pages/Registro";
import HeroPage from "../pages/HeroPage";
import SobreNosotros from "../pages/SobreNosotros";
import IniciarSesion from "../pages/IniciarSesion";
import HomePage from "../pages/HomePage";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/principal" element={<HomePage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/" element={<HeroPage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
