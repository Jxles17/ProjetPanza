import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccommodationDetail from "../pages/AccommodationDetail";
import Error404 from "../pages/Error404";
import AjouterLogement from "../pages/AjouterLogement";
import Waiting from "../pages/Waiting";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import "../styles/main.scss";
import ModifierLogement from "../pages/ModifierLogement";

const Root = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />
        <Route path="/accommodation/update/:id" element={<ModifierLogement />} />
        <Route path="/ajouter-logement" element={<AjouterLogement />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Root;
