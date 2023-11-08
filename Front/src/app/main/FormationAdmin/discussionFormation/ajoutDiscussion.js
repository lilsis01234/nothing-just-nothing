import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../FormationUser/Formateur/AjoutFormation/AjoutFormation.css';

const AjoutDiscussion = () => {
    const navigate = useNavigate();
    const [sujet, setSujet] = useState('');
    const [contenu, setContenu] = useState('');
    const formateur=2;
    const formation =useParams();
    const formationId = formation.id;
    // console.log(formation.id)
    const collaborateur=2;
    const [modulechoosen,setModuleChoosen] = useState('');
    const [module, setModule] = useState([]);

    const GetModule = ()=>{
        axios.get(`http://localhost:4001/api/modules/modules/${formationId}`)
        .then((res)=>{
            // console.log(res.data)
            setModule(res.data)
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=>{
        GetModule()
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4001/api/discussions/nouveauDiscussion', {
            sujet,
            contenu,
            formateur,
            formationId,
            collaborateur,
            modulechoosen
        })
        .then((res) => {
            console.log(res);
            navigate(`/discussion/formation/${formationId}`); // Remplacez par le chemin vers lequel vous souhaitez rediriger après l'ajout.
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sujet</label>
                    <input type="text" value={sujet} onChange={(e) => setSujet(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Contenu</label>
                    <input type="text" value={contenu} onChange={(e) => setContenu(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Module</label>
                    <select value={modulechoosen} onChange={(e) => setModuleChoosen(e.target.value)}>
                    {module.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                    {mod.titreModule}
                    </option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AjoutDiscussion;
