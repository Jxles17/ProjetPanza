import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Textarea from "@mui/joy/Textarea";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useRef, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "./../store";
import { useNavigate, useParams, Navigate } from "react-router-dom";

export default function ModifierLogement() {
  const form = useRef(null);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  !user && navigate("/"); // Si le user n'est pas défini alors on redirige vers la home

  const [nom, setNom] = useState("");
  const [lieu, setLieu] = useState("");
  const [proprio, setProprio] = useState("");
  const [description, setDescription] = useState("");
  const [equipements, setEquipements] = useState("");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");

  const [nomError, setNomError] = useState(false);
  const [lieuError, setLieuError] = useState(false);
  const [proprioError, setProprioError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [equipementsError, setEquipementsError] = useState(false);
  const [tagsError, setTagsError] = useState(false);
  const [noteError, setNoteError] = useState(false);

  const [messageForm, setMessageForm] = useState(null);

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [logement, setLogement] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/logements/" + id)
      .then((response) => response.json())
      .then((data) => {
        setLogement(data);
        setLoading(true);
        setNom(data.title);
        setDescription(data.description);
        setEquipements(data.equipments);
        setLieu(data.location);
        setNote(data.rating);
        setProprio(data.host.name);
        setTags(data.tags.toString());
      })
      .catch((err) => {
        console.log(err.message);
        fetch("../../data/logements.json")
          .then((response) => response.json())
          .then((data) => {
            const logementFind = data.find((loge) => loge.id === id);
            console.log(logementFind);
            setLogement(logementFind);
            setLoading(true);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
  }, []);

  if (!logement || !id) {
    return <Navigate to="/404" />;
  }

  const submitForm = (event) => {
    event.preventDefault();
    setNomError(false);
    setLieuError(false);
    setProprioError(false);
    setDescriptionError(false);
    setEquipementsError(false);
    setTagsError(false);
    setNoteError(false);

    if (nom == "") {
      setNomError(true);
    }
    if (lieu == "") {
      setLieuError(true);
    }
    if (proprio == "") {
      setProprioError(true);
    }
    if (description == "") {
      setDescriptionError(true);
    }
    if (equipements == "") {
      setEquipementsError(true);
    }
    if (tags == "") {
      setTagsError(true);
    }
    if (note == "") {
      setNoteError(true);
    }

    //if (!nomError && !lieuError && !proprioError && !descriptionError && !equipementsError && !tagsError && !noteError) {
    if (nom != "" && lieu != "" && proprio != "" && description != "" && equipements != "" && tags != "" && note != "") {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      fetch("http://localhost:3000/api/logements/" + logement.id, {
        method: "PUT",
        body: JSON.stringify(formJson),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then((res) => res.ok && res.json())
        .then((res) => {
          setNom("");
          setDescription("");
          setEquipements("");
          setLieu("");
          setNote("");
          setProprio("");
          setTags("");

          setMessageForm(res.message);
        })
        .catch((err) => console.error(err));

      // On reset tout
    } else {
      console.log("Erreur lors de l'ajout d'un logement");
    }
  };
  return (
    <Card sx={{ minWidth: 275 }} className="formCard">
      <CardContent>
        <h1>Modifier un logement</h1>
        <Box
          ref={form}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          autoComplete="off"
          onSubmit={submitForm}
        >
          {!messageForm ? (
            <>
              <div>
                <TextField label="Nom logement" name="title" value={nom} required error={nomError} onChange={(e) => setNom(e.target.value)} />
                <TextField label="Lieu" name="location" value={lieu} required error={lieuError} onChange={(e) => setLieu(e.target.value)} />
              </div>
              <div>
                <TextField
                  label="Nom propriétaire"
                  id="outlined-size-normal"
                  value={proprio}
                  required
                  error={proprioError}
                  onChange={(e) => setProprio(e.target.value)}
                  name="nameHost"
                />
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel>Note</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    value={note}
                    autoWidth
                    label="Note"
                    required
                    error={noteError}
                    onChange={(e) => setNote(e.target.value)}
                    name="rating"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth>
                  <FormLabel>Description *</FormLabel>
                  <Textarea
                    placeholder=""
                    value={description}
                    minRows={2}
                    required
                    error={descriptionError}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                  />
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth>
                  <FormLabel>Equipements *</FormLabel>
                  <Textarea
                    placeholder=""
                    value={equipements}
                    minRows={2}
                    required
                    error={equipementsError}
                    onChange={(e) => setEquipements(e.target.value)}
                    name="equipments"
                  />
                </FormControl>
              </div>
              <FormControl fullWidth>
                <FormLabel>Tags *</FormLabel>
                <Input placeholder="" value={tags} required error={tagsError} onChange={(e) => setTags(e.target.value)} name="tags" />
                <FormHelperText>Séparer les tags par une virgule</FormHelperText>
              </FormControl>
              <div style={{ margin: "20px auto", width: "fit-content" }}>
                <Button type="submit">Enregistrer</Button>
              </div>
            </>
          ) : (
            <h2>{messageForm}</h2>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
