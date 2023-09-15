import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Avatar, Input, Select, Option, Alert } from '@material-tailwind/react';


const ModifCollab = ({ CollabToEdit, onCollabUpdated }) => {
    const [listePoste, setListePoste] = useState([])
    const [listeDepartement, setListeDepartement] = useState([])
    const [listeEquipe, setListeEquipe] = useState([])

    // const navigate = useNavigate();

    const [nom, setNom] = useState(CollabToEdit?.nom || '');
    const [image, setImage] = useState(CollabToEdit?.image || '');
    const [prenom, setPrenom] = useState(CollabToEdit?.prenom || '');
    const [lot, setLot] = useState(CollabToEdit?.lot || '');
    const [quartier, setQuartier] = useState(CollabToEdit?.quartier || '');
    const [ville, setVille] = useState(CollabToEdit?.ville || '');

    const [tel, setTel] = useState(CollabToEdit?.tel || '');
    const [telurgence, setTelUrgence] = useState(CollabToEdit?.telurgence || '');

    const [matricule, setMatricule] = useState(CollabToEdit?.matricule || '');
    const [dateNaissance, setdateNaissance] = useState(CollabToEdit?.dateNaissance || '');
    const [dateEmbauche, setdateEmbauche] = useState(CollabToEdit?.dateEmbauche || '');
    const [site, setSite] = useState(CollabToEdit?.site || '');
    // const [poste, setPoste] = useState(CollabToEdit?.poste || '');

    const [lieuNaissance, setLieuNaissance] = useState(CollabToEdit?.lieuNaissance || '')

    const [CIN, setCIN] = useState(CollabToEdit?.CIN || '');
    const [dateDelivrance, setDateDelivrance] = useState(CollabToEdit?.dateDelivrance || '');
    const [lieuDelivrance, setLieuDelivrance] = useState(CollabToEdit?.lieuDelivrance || '');

    const [statutmatrimoniale, setStatutMatrimoniale] = useState(CollabToEdit?.statutmatrimoniale || '');
    const [nbEnfant, setNbEnfant] = useState(CollabToEdit?.nbEnfant || 0);

    const [poste, setPoste] = useState(CollabToEdit?.poste1.titrePoste || '');
    const [poste2, setposte2] = useState(CollabToEdit?.postes?.titrePoste || '');

    const [departement, setDepartement] = useState(CollabToEdit?.departement1.nomDepartement || '');
    const [departement2, setdepartement2] = useState(CollabToEdit?.departements?.nomDepartement || '');

    const [entreprise, setEntreprise] = useState(CollabToEdit?.entreprise || '');
    const [categorie, setCategorie] = useState(CollabToEdit?.categorie || '');
    const [contrat, setContrat] = useState(CollabToEdit?.contrat || '');

    const [sexe, setSexe] = useState(CollabToEdit?.sexe || '');

    const [equipe, setEquipe] = useState(CollabToEdit?.equipe || '');
    const [equipe2, setEquipe2] = useState(CollabToEdit?.equipe2 || '');



    //Récupération de la liste des postes 
    useEffect(() => {
        axios.get('http://localhost:4000/api/poste/all')
            .then((res) => {
                setListePoste(res.data)

            })
            .catch(err => console.log(err))

    }, [])

    //Récupération de la liste des départements
    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all')
            .then((res) => {
                setListeDepartement(res.data)

            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:4000/api/equipe/all')
            .then((res) => {
                setListeEquipe(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const Site = [
        { id: 1, nom: 'Fivoarana' },
        { id: 2, nom: 'Ivohasina' },
        { id: 3, nom: 'Soazaraina' }
    ]

    const StatutMatrimoniale = [
        { id: 1, nom: 'Marié(e)' },
        { id: 2, nom: 'Célibataire' }
    ]


    useEffect(() => {
        if (CollabToEdit) {
            setNom(CollabToEdit.nom)
            setPrenom(CollabToEdit.prenom)
            setImage(CollabToEdit.image)
            setLot(CollabToEdit.lot)
            setQuartier(CollabToEdit.quartier)
            setVille(CollabToEdit.ville)
            setTel(CollabToEdit.tel)
            setMatricule(CollabToEdit.matricule)
            setdateNaissance(CollabToEdit.dateNaissance)
            setdateEmbauche(CollabToEdit.dateEmbauche)
            setSite(CollabToEdit.site)
            // setPoste(CollabToEdit.poste)
            setLieuNaissance(CollabToEdit.lieuNaissance)
            setPoste(CollabToEdit.poste.id)
            setposte2(CollabToEdit?.postes?.id)
            setDepartement(CollabToEdit.departement1.id)
            setdepartement2(CollabToEdit?.departements?.id)
            setSexe(CollabToEdit.sexe)
            setEntreprise(CollabToEdit.entreprise)
            setTelUrgence(CollabToEdit.telurgence)
            setCIN(CollabToEdit.CIN)
            setDateDelivrance(CollabToEdit.dateDelivrance)
            setLieuDelivrance(CollabToEdit.lieuDelivrance)
            setStatutMatrimoniale(CollabToEdit.statutmatrimoniale)
            setNbEnfant(CollabToEdit.nbEnfant)
            setCategorie(CollabToEdit.categorie)
            setContrat(CollabToEdit.contrat)
            setEquipe(CollabToEdit.equipe1?.id)
            setEquipe2(CollabToEdit.equipe2?.id)
        } else {
            setNom("")
            setPrenom("")
            setImage("")
            setLot("")
            setQuartier("")
            setVille("")
            setTel("")
            setMatricule("")
            setdateNaissance("")
            setLieuNaissance("")
            setdateEmbauche("")
            setSite("")
            // setPoste("")
            setPoste("")
            setposte2("")
            setDepartement("")
            setdepartement2("")
            setSexe("")
            setEntreprise("")
            setTelUrgence("")
            setCIN("")
            setDateDelivrance("")
            setLieuDelivrance("")
            setStatutMatrimoniale("")
            setNbEnfant(0)
            setCategorie("")
            setContrat("")
            setEquipe("")
            setEquipe2("")
        }
    }, [CollabToEdit])



    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            image,
            lot,
            quartier,
            ville,
            tel,
            telurgence,
            statutmatrimoniale,
            nbEnfant,
            site,
            poste,
            poste2,
            departement,
            departement2,
            equipe,
            equipe2,

        }



        axios.put(`http://localhost:4000/api/collaborateur/${CollabToEdit.id}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                onCollabUpdated();
                alert('Collaborateur modifier avec succès')
                window.location.reload();
            })
            .catch((error) => {
                console.error(error)
            })

    }

    const [selectImage, setSelectImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        setSelectImage(selectedFile);
    }






    return (
        <div>
            <form onSubmit={handleSubmit} className="collaborateurAddContent_Form font-['Poppins']">
                <div className="flex flex-col  ml-10 pl-10 ">
                    <div className="collaborateurAddContent_Form_Photo my-5">
                        <label >Photo:</label><br></br>

                        {!selectImage && image && (
                            <Avatar src={`http://localhost:4000/${image}`} />
                        )}
                        {selectImage && (
                            <Avatar src={URL.createObjectURL(selectImage)} className="w-32 h-32 rounded-full" />
                        )}
                        <input type='file' onChange={handleImageChange} className='justify-self-center' name="image"></input>
                    </div>
                    <div className="grid grid-cols-12 my-3 font-[Poppins]">
                        <div className="col-span-4  mr-5">
                            <Input label="Matricule" disabled onChange={(e) => { setMatricule(e.target.value) }} className='add-input' value={matricule} color="black" />
                        </div>
                        <div className="col-span-4  mr-5" >
                            <Input label="Nom" onChange={(e) => { setNom(e.target.value) }} className='add-input' disabled value={nom} color="black" />
                        </div>

                        <div className="col-span-4  mr-5">

                            <Input label="Prénom" onChange={(e) => { setPrenom(e.target.value) }} className='add-input' disabled value={prenom} color="black" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 my-3 font-[Poppins]">
                        <div className="col-span-4  mr-5">

                            <Input label="Date de naissance" onChange={(e) => { setdateNaissance(e.target.value) }} disabled value={dateNaissance} color="black" />
                        </div>
                        <div className="col-span-4  mr-5">

                            <Input label="Lieu de naissance" onChange={(e) => { setLieuNaissance(e.target.value) }} disabled value={lieuNaissance} color="black" />
                        </div>
                        <div className="col-span-4  mr-5">
                            <Input label="Sexe" onChange={(e) => setSexe(e.target.value)} disabled value={sexe} color="black" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 my-3">
                        <div className="col-span-4  mr-2">
                            <Input label="Lot" onChange={(e) => { setLot(e.target.value) }} value={lot} color="black" />
                        </div>
                        <div className="col-span-4  mr-2">
                            <Input label="Quartier" onChange={(e) => { setQuartier(e.target.value) }} value={quartier} color="black" />
                        </div>
                        <div className="col-span-4  mr-2">
                            <Input label="Ville" onChange={(e) => { setVille(e.target.value) }} value={ville} color="black" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 my-5">
                        <div className="col-span-4  mr-2">
                            <Input label="Téléphone" onChange={(e) => { setTel(e.target.value) }} value={tel} color="black" />
                        </div>
                        <div className="col-span-4  mr-2">
                            <Input label="Téléphone d'urgence" onChange={(e) => { setTelUrgence(e.target.value) }} value={telurgence} color="black" />
                        </div>

                    </div>
                    <div className="grid grid-cols-12 my-5">
                        <div className="col-span-4 mr-2"> <Input type="text" label="CIN" value={CIN} onChange={(e) => { setCIN(e.target.value) }} disabled size="lg" /></div>
                        <div className="col-span-4 mr-2"> <Input type="text" label="Date de délivrance" value={dateDelivrance} onChange={(e) => { setDateDelivrance(e.target.value) }} disabled size="lg" /></div>
                        <div className="col-span-4 mr-2"> <Input type="text" label="Lieu de délivrance" onChange={(e) => { setLieuDelivrance(e.target.value) }} value={lieuDelivrance} disabled size="lg" /></div>
                    </div>
                    <div className="grid grid-cols-12 my-5">
                        <div className="col-span-4 mr-2">
                            <Select label="Statut Matrimoniale" onChange={(e) => setStatutMatrimoniale(e)} defaultValue={statutmatrimoniale} >
                                {StatutMatrimoniale.map((statumatrimoniale) => (
                                    <Option key={statumatrimoniale.id} value={statumatrimoniale.id.toString()}>
                                        {statumatrimoniale.nom}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-span-4 mr-2"> <Input type="number" label="Nombre d'enfant" value={nbEnfant} onChange={(e) => { setNbEnfant(e.target.value) }} size="lg" /></div>
                    </div>


                    <div className="grid grid-cols-12 my-5">
                        <div className="col-span-4 mr-2">
                            <Input label="Date d'embauche" disabled onChange={(e) => { setdateEmbauche(e.target.value) }} value={dateEmbauche} color="black" />
                        </div>
                        <div className="col-span-4 mr-2 ">
                            <Select label="Site" onChange={(e) => setSite(e)} >
                                {Site.map((Site) => (
                                    <Option key={Site.id} value={Site.nom}> {Site.nom}</Option>
                                ))}
                            </Select>

                        </div>
                        <div className="col-span-4 mr-2 ">
                            <Input label="Entreprise" disabled onChange={(e) => { setEntreprise(e.target.value) }} value={entreprise} color="black" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 my-5">
                        <div className="col-span-4 mr-2">
                            <Select
                                label="Poste"
                                onChange={(e) => setPoste(e)}
                            >
                                {listePoste.map((poste) => (
                                    <Option key={poste.id} value={poste.id.toString()}>
                                        {poste.titrePoste}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-span-4 mr-2 ">
                            <Select
                                label="Departement"
                                onChange={(e) => setDepartement(e)}
                            >
                                {listeDepartement.map((departement) => (
                                    <Option key={departement.id} value={departement.id.toString()}>{departement.nomDepartement}</Option>
                                ))}

                            </Select>
                        </div>
                        <div className="col-span-4 mr-2 ">
                            <Select
                                label="Equipe"
                                onChange={(e) => setEquipe(e)}
                            >
                                {listeEquipe.map((equipe) => (
                                    <Option key={equipe.id} value={equipe.id.toString()}>{equipe.nomEquipe}</Option>
                                ))}

                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 my-5">
                        <div className="col-span-4 mr-2"> <Input type="text" label="Catégorie" onChange={(e) => { setCategorie(e.target.value) }} size="lg" value={categorie} disabled /></div>
                        <div className="col-span-4 mr-2"> <Input type="text" label="Contrat" onChange={(e) => { setContrat(e.target.value) }} size="lg" value={contrat} disabled /></div>
                    </div>
                    <div className="mr-2 ">
                        <Alert color="amber" className="text-xs">Les informations ci-dessous sont à compléter au cas où le collaborateur possède une deuxième poste.</Alert>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4 mr-2">
                                <Select
                                    value={poste2}
                                    label="Deuxième Poste"
                                    onChange={(e) => setposte2(e)}
                                >
                                    {listePoste.map((poste) => (
                                        <Option key={poste.id} value={poste.id.toString()}>
                                            {poste.titrePoste}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="col-span-4">
                                <Select
                                    value={departement2}
                                    label="Deuxième departement"
                                    onChange={(e) => setdepartement2(e)}
                                >
                                    {listeDepartement.map((departement) => (
                                        <Option key={departement.id} value={departement.id.toString()}>{departement.nomDepartement}</Option>
                                    ))}

                                </Select>
                            </div>
                            <div className="col-span-4 mr-2 ">
                            <Select
                                label="Equipe"
                                onChange={(e) => setEquipe(e)}
                            >
                                {listeEquipe.map((equipe) => (
                                    <Option key={equipe.id} value={equipe.id.toString()}>{equipe.nomEquipe}</Option>
                                ))}

                            </Select>
                        </div>

                        </div>
                    </div>
                    <button type='submit' className="collaborateurAddContent_Form_Button">Modifier</button>
                </div>
            </form>
        </div>
    )
}

export default ModifCollab
