import { NavLink } from "react-router-dom"
import "../styles/Footer.scss"
import logo from "../assets/casa-logo-dark.png"

function Footer() {
  return (
    <div className="footer">
      <nav>
        <NavLink to="/">
          <img src={logo} alt="Logo Casa" />
        </NavLink>
      </nav>
      <span>© 2020 Casa. All rights reserved</span>
    </div>
  )
}

export default Footer
