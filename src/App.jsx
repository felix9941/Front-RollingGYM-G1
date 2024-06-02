import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import NavbarPage from "./components/NavbarPage";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const isHeroPage = location.pathname === "/";
  return (
    <>
      <NavbarPage />
      {/* <main> */}
      <Router>
        <RoutesViews />
      </Router>
      {/* </main> */}
      {!isHeroPage && <Footer />}
    </>
  );
};

export default App;
