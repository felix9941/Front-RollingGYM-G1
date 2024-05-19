import { Routes, Route } from "react-router-dom";
import Registro from "../pages/Registro";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
