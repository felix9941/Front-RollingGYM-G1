import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";
import HeroPage from "../pages/HeroPage";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/" element={<HeroPage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
