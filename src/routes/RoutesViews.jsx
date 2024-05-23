import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";

import RegisterPage from "../pages/Registro";

import HeroPage from "../pages/HeroPage";
import SobreNosotros from "../pages/SobreNosotros";


const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/registro" element={<RegisterPage />} />

        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/" element={<HeroPage />} />

      </Routes>
    </>
  );
};

export default RoutesViews;
