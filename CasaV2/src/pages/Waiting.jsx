import "../styles/Error404.scss"
import { NavLink } from "react-router-dom"

function Waiting() {
  return (
    <div className="error404">
      <h1>Waiting</h1>
      <p>Oups! La page est en cours de construction</p>
      <NavLink to="/">Retourner sur la page d’accueil</NavLink>
    </div>
  )
}

export default Waiting
