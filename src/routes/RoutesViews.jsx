import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";
import RegisterPage from "../pages/Registro";
import HeroPage from "../pages/HeroPage";
import SobreNosotros from "../pages/SobreNosotros";
import IniciarSesion from "../pages/IniciarSesion";
import HomePage from "../pages/HomePage";

import AdminAdministradores from "../pages/AdminAdministradores";

import Error404 from "../pages/Error404";

import AdminProductos from "../pages/AdminProductos";

import MisClases from "../pages/MisClases";

import AdminClases from "../pages/AdminClases";

import AdminPlanes from "../pages/AdminPlanes";

import AdminProfesores from "../pages/AdminProfesores";

import AdminClientes from "../pages/AdminClientes";
import AdminCategorias from "../pages/AdminCategorias";

import MisReservas from "../pages/MisReservas";
import MisDatos from "../pages/MisDatos";
import ReservarClases from "../pages/ReservarClases";
import LogoutPage from "../components/LogoutPage";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/principal" element={<HomePage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/misClases" element={<MisClases />} />
        <Route path="/adminClases" element={<AdminClases />} />
        <Route path="/adminPlanes" element={<AdminPlanes />} />
        <Route path="/adminProductos" element={<AdminProductos />} />
        <Route path="/adminProfesores" element={<AdminProfesores />} />
        <Route path="/adminClientes" element={<AdminClientes />} />
        <Route path="/adminCategorias" element={<AdminCategorias />} />
        <Route path="/adminAdmins" element={<AdminAdministradores />} />
        <Route path="/misReservas" element={<MisReservas />} />
        <Route path="/misDatos" element={<MisDatos />} />
        <Route path="/reservarClases" element={<ReservarClases />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<HeroPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
