import { Routes, Route } from "react-router-dom";
import Contacto from "../pages/Contacto";
import RegisterPage from "../pages/Registro";
import HeroPage from "../pages/HeroPage";
import SobreNosotros from "../pages/SobreNosotros";
import IniciarSesion from "../pages/IniciarSesion";

import AdminAdministradores from "../pages/AdminAdministradores";

import Error404 from "../pages/Error404";

import AdminClientes from "../pages/AdminClientes";

import MisReservas from "../pages/MisReservas";



const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />

        <Route path="/adminClientes" element={<AdminClientes />} />


        <Route path="/adminAdmins" element={<AdminAdministradores />} />

        <Route path="/misReservas" element={<MisReservas />} />


        <Route path="/" element={<HeroPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
