import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import Button from "@mui/joy/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "./../store";
import { NavLink, useLocation } from "react-router-dom";

export default function Login() {
  const form = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationKO, setValidationKO] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (mail == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    //if (!emailError && !passwordError && !proprioError && !descriptionError && !equipementsError && !tagsError && !noteError) {
    if (mail != "" && password != "") {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      let loginIsOk = false;

      fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        body: JSON.stringify(formJson),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setValidationKO(null);
            loginIsOk = true;
          }
          return res.json();
        })
        .then((res) => {
          if (loginIsOk) {
            console.log(res);
            setUser(res);
            navigate("/");
          } else {
            setValidationKO(res.message);
          }
        })
        .catch((err) => console.err(err));
    } else {
      console.log("Erreur lors de l'ajout d'un logement");
    }
  };
  return (
    <Card sx={{ minWidth: 275 }} className="formCard">
      <CardContent>
        <h1>Se connecter</h1>
        <Box
          ref={form}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          autoComplete="off"
          onSubmit={submitForm}
        >
          <div>
            <TextField label="Email" name="email" type="email" value={mail} required error={emailError} onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              required
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {validationKO && <p style={{ color: "#ff6060" }}>Erreur : {validationKO}</p>}

          <div style={{ margin: "20px auto", width: "fit-content", textAlign: "center" }}>
            <Button type="submit">Enregistrer</Button>
            <br />
            <p>
              Vous n'avez pas de compte ? <NavLink to="/sign-up">S'enregisrer</NavLink>
            </p>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
