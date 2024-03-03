import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Header.scss";
import logo from "../assets/casa-logo.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useAtom } from "jotai";
import { userAtom } from "./../store";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const location = useLocation();
  const [user, setUser] = useAtom(userAtom);

  const logOut = (e) => {
    e.preventDefault();
    setUser(null);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Casa - Accueil";
        break;

      case "/accommodation":
        document.title = "Casa - Logement";
        break;

      case "/about":
        document.title = "Casa - A Propos";
        break;

      case "/ajouter-logement":
        document.title = "Casa - Ajouter un logement";
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="header">
      <NavLink to="/">
        <img src={logo} alt="Logo Casa" />
      </NavLink>
      {user !== null ? (
        <nav>
          <NavLink to="/ajouter-logement" title="Ajouter un logement">
            <AddCircleIcon />
          </NavLink>

          <NavLink title="Se déconnecter" onClick={logOut}>
            <LogoutIcon />
          </NavLink>
        </nav>
      ) : (
        <nav>
          <NavLink to="/login">
            Login <LoginIcon />
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default Header;
