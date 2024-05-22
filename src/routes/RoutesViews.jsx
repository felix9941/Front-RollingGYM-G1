import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
