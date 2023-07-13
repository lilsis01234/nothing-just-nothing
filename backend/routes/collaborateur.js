const Collaborateur = require('../Modele/Collaborateur');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');
const CompteCollab = require('../Modele/CompteCollab');

const router = require('express').Router();
const bcrypt = require('bcrypt');

//Ajouter des collaborateurs
router.post('/add', async (req, res) => {
    try {
        const newCollab = await Collaborateur.create({
            matricule : req.body.matricule,
            nom : req.body.nom,
            prenom : req.body.prenom,
            dateNaissance : req.body.dateNaissance,
            lot : req.body.lot,
            quartier : req.body.quartier,
            ville : req.body.ville,
            tel : req.body.tel,
            dateEmbauche : req.body.dateEmbauche,
            site : req.body.site,
            image : req.body.image,
            poste: req.body.poste,
        })
        const savedCollab = await newCollab.save();

        //Hachage du mot de passe
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);

        const newCompte = await CompteCollab.create({
            email : req.body.email,
            password : hashedPassword,
            collaborateur : savedCollab.id
        })
        const savedCompte = await newCompte.save();

        res.status(201).json(savedCompte);
    }
    catch (err) {
        console.error('Erreur lors de la création d\'un collaborateur: ', err);
        res.status(201).json({message : 'Erreur lors de la création d\'un collaborateur'});
    }
})

//Afficher la liste des postes 
router.get('/all_collaborateurs', async(req,res) => {
    Collaborateur.findAll({
        include : {model : Poste, attributes : ['titrePoste', 'departement'], 
             include : {model : Departement, attributes : ['nomDepartement']}   
            }
    })
    .then((collaborateur) => {
        res.status(200).json(
            collaborateur.map((collaborateur) => {
                return {
                    id : collaborateur.id,
                    matricule : collaborateur.matricule,
                    nom : collaborateur.nom,
                    prenom : collaborateur.prenom,
                    dateNaissance: collaborateur.dateNaissance,
                    lot : collaborateur.lot,
                    quartier : collaborateur.quartier,
                    ville : collaborateur.ville,
                    tel : collaborateur.tel,
                    dateEmbauche : collaborateur.dateEmbauche,
                    site : collaborateur.site,
                    image : collaborateur.image,
                    titrePoste : collaborateur.Poste.titrePoste,
                    departement : collaborateur.Poste.Departement.nomDepartement,
                }
            })
        )
    }) 
})

//Afficher seulement un collaborateur
router.get('/:id', async(req, res) => {
    const {id} = req.params; 
    try {
        const collaborateur = await Collaborateur.findByPk(id);
        if (!collaborateur) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        res.json({collaborateur});
    }
    catch (err) {
        console.error('Erreur lors de la récupération du collaborateur', err);
        res.status(500).json({error : 'Erreur lors de la récupération du collaborateur'})
    }
})

//Mettre à jour un collaborateur existant 
router.put('/edit/:id', async(req, res) => {
    const  {id} = req.params;
    try {
        const updateCollab = await Collaborateur.findByPk(id);
        if (!updateCollab) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        const updatedCollab = await updateCollab.update({
            lot : req.body.lot,
            quartier : req.body.quartier,
            ville : req.body.ville,
            tel : req.body.tel,
            site : req.body.site,
            image : req.body.image,
            poste: req.body.poste,
        })

        res.status(201).json(updatedCollab)
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du collaborateur', error);
        res.status(500).json({error : 'Erreur lors de la mise à jour du collaborateur'});
    }
})


//Supprimer un collaborateur 
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteCollaborateur = await Collaborateur.findByPk(id);
        if (!deleteCollaborateur) {
            return res.status(404).json({error : 'Collaborateur introuvable'});
        }
        await deleteCollaborateur.destroy();
        res.sendStatus(204);
    }
    catch (error){
        console.error('Erreur lors de la suppression du poste :', error)
        res.status(500).json({message : 'Erreur lors de la suppression du poste'})
    }
})

module.exports = router;