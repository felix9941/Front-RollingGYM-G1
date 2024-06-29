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
import PrivateRoute from "../components/PrivateRoute";
import DetallePlanes from "../pages/DetallePlanes";
import PrincipalAdmin from "../pages/PrincipalAdmin";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route
          path="/principal"
          element={
            <PrivateRoute allowedRoles={["cliente", "administrador"]}>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route
          path="/misClases"
          element={
            <PrivateRoute allowedRoles={["cliente", "profesor"]}>
              <MisClases />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminClases"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminClases />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminPlanes"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminPlanes />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminProductos"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminProductos />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminProfesores"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminProfesores />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminClientes"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminClientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminCategorias"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminCategorias />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminAdmins"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <AdminAdministradores />
            </PrivateRoute>
          }
        />
        <Route
          path="/principalAdmin"
          element={
            <PrivateRoute allowedRoles={["administrador"]}>
              <PrincipalAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/misReservas"
          element={
            <PrivateRoute allowedRoles={["cliente"]}>
              <MisReservas />
            </PrivateRoute>
          }
        />
        <Route
          path="/misDatos"
          element={
            <PrivateRoute
              allowedRoles={["cliente", "profesor", "administrador"]}
            >
              <MisDatos />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservarClases"
          element={
            <PrivateRoute allowedRoles={["cliente", "administrador"]}>
              <ReservarClases />
            </PrivateRoute>
          }
        />

        <Route
          path="/detallePlan/:id"
          element={
            <PrivateRoute allowedRoles={["cliente"]}>
              <DetallePlanes />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<HeroPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
