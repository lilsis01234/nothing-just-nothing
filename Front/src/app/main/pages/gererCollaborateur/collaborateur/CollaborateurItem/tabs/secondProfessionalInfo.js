import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axios, { formToJSON } from "axios";


function SecondProfessionalInfo(props) {
  const { methods, formValues } = props;
  const { control, formState } = methods || {};
  const { errors } = formState || {};

  const [listePoste, setListePoste] = useState([]);
  const [listeDepartement, setListeDepartement] = useState([]);
  const [listeProjet, setListeProjet] = useState([]);
  const [listeEquipe, setListeEquipe] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/poste/all")
      .then((response) => {
        setListePoste(response.data);
      })
      .catch((error) => {
        console.error("Error fetching function data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/departement/all")
      .then((response) => {
        setListeDepartement(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departement data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/equipe/all")
      .then((response) => {
        setListeEquipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projet/all")
      .then((response) => {
        setListeProjet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data", error);
      });
  }, []);

  if (!methods) {
    return null;
  }

  return (
    <div>
      <Controller
        name="poste2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.poste}
            required
            value={field.value || null}
            helperText={errors?.poste2?.message}
            label="Deuxième poste"
            autoFocus
            id="poste2"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          >
             <MenuItem value={null}>Selectionner une option</MenuItem>
            {listePoste.map((poste2) => (
              <MenuItem key={poste2.id} value={poste2.id}>
                {poste2.titrePoste}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="departement2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.departement2}
            required
            value={field.value || null}
            helperText={errors?.departement2?.message}
            label="Deuxième Département"
            autoFocus
            id="departement2"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          >
            <MenuItem value={null}>Selectionner une option</MenuItem>
            {listeDepartement.map((departement2) => (
              <MenuItem key={departement2.id} value={departement2.id}>
                {departement2.nomDepartement}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="projet2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.projet2}
            required
            value={field.value || null}
            helperText={errors?.projet2?.message}
            label="Deuxième Projet"
            autoFocus
            id="projet2"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          >
            <MenuItem value={null}>Selectionner une option</MenuItem>
            {listeProjet.map((projet2) => (
              <MenuItem key={projet2.id} value={projet2.id}>
                {projet2.nomProjet}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="equipe2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.equipe2}
            required
            value={field.value || null}
            helperText={errors?.equipe2?.message}
            label="Deuxième équipe"
            autoFocus
            id="equipe2"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          >
            <MenuItem value={null}>Selectionner une option</MenuItem>
            {listeEquipe.map((equipe2) => (
              <MenuItem key={equipe2.id} value={equipe2.id}>
                {equipe2.nomEquipe}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </div>
  );
}

export default SecondProfessionalInfo;
