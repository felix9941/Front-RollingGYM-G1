import { BrowserRouter as Router, useLocation } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import NavbarPage from "./components/NavbarPage";
import Footer from "./components/Footer";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const isHeroPage = location.pathname === "/";
  const isErrorPage = location.pathname === "/error404";

  return (
    <>
      {!isErrorPage && <NavbarPage />}
      <RoutesViews />
      {!isHeroPage && !isErrorPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
