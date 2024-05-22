import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import NavbarPage from "./components/NavbarPage";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <NavbarPage />
      <Router>
        <RoutesViews />
      </Router>
      <Footer />
    </>
  );
};

export default App;
