import "../styles/Logement.scss";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import { userAtom } from "./../store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Accommodation() {
  const [logements, setLogements] = useState([]);
  const [user, setUser] = useAtom(userAtom);
  useEffect(() => {
    fetch("http://localhost:3000/api/logements")
      .then((response) => response.json())
      .then((data) => {
        setLogements(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteAccomodation = (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(id);

    fetch("http://localhost:3000/api/logements/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.ok && res.json())
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="logements">
        {logements.length != 0 ? (
          logements.map((logement) => (
            <Link
              key={logement.id ? logement.id : logement._id}
              to={`/accommodation/${logement.id ? logement.id : logement._id}`}
              className="logement-box"
            >
              <h3>{logement.title}</h3>
              <img src={logement.cover} alt="logement-cover" className="logement-cover" />
              {user && (
                <nav style={{ color: "#ff6060", position: "absolute", top: 0, zIndex: 2, right: 0, margin: "15px " }}>
                  {" "}
                  <Link to={"accommodation/update/" + logement._id} style={{ color: "#ff6060" }}>
                    <EditIcon />
                  </Link>
                  <DeleteIcon style={{ color: "#ff6060" }} onClick={(e) => deleteAccomodation(e, logement._id)} />
                </nav>
              )}
            </Link>
          ))
        ) : (
          <h2 style={{ color: "black" }}>Aucune donnée</h2>
        )}
      </div>
    </>
  );
}

export default Accommodation;
