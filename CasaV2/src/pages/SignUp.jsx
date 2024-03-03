import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import Button from "@mui/joy/Button";
import { useRef } from "react";
import Link from "@mui/joy/Link";

export default function SignUp() {
  const form = useRef(null);

  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);

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
      console.log(formJson);

      fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        body: JSON.stringify(formJson),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => setValidation(true));

      console.log("Nouveau compte enregistré");

      // On redirige
    } else {
      console.log("Erreur lors de l'ajout d'un logement");
    }
  };
  return (
    <Card sx={{ minWidth: 275 }} className="formCard">
      <CardContent>
        <h1>Créer un compte</h1>
        <Box
          ref={form}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          autoComplete="off"
          onSubmit={submitForm}
        >
          {!validation ? (
            <>
              <div>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={mail}
                  required
                  error={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                />
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

              <div style={{ margin: "20px auto", width: "fit-content" }}>
                <Button type="submit">Enregistrer</Button>
              </div>
            </>
          ) : (
            <div style={{ margin: "20px auto", width: "fit-content", textAlign: "center" }}>
              <p>Le compte a été créé</p>
              <Link href="/login">
                <Button>Se connecter</Button>
              </Link>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
