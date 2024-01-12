const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/CollabModel/Collab');
const Module = require('../../Modele/formation/Module');
const Role2 = require('../../Modele/RoleModel/RoleHierarchique');
const Sequelize = require('sequelize');
const DemandeFormation = require('../../Modele/formation/demandeFormation');


//Toutes les formations dont tout le monde peut assister
router.get('/all_formations', async(req,res) => {
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['id','nom', 'prenom','image'],
            },
          ],
          attributes: ['id', 'theme', 'description', 'formateur'],
            where:
            {
              formateur:{ [Sequelize.Op.not]: null },
            },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})

//Toutes les demandes publiques approuvées
router.get('/publiques_demandes', async(req,res) => {
  DemandeFormation.findAll({
      include: [
          {
            model: Collaborateur,
            as: 'Auteur',
            attributes: ['id','nom', 'prenom','image'],
          },
        ],
        attributes: ['id', 'theme', 'description', 'auteur'],
          where:
          {
            formateur:{ [Sequelize.Op.not]: null },
          },
  })
  .then((formation) => {
      res.status(200).json(formation)
      console.log(formation)
  }) 
})

router.get('/all/Coatch',async(req,res)=>{
  const coatch = "coatch";
  try {
      // Find IDs of coatch role in RoleHierarchique
      const idCoatch = await RoleHierarchique.findAll({
          attributes: ['id'],
          where: {
              roleHierarchique: {
                  [Sequelize.Op.like]: `%${coatch}%`, // Use `%` for wildcard matching
              },
          },
          raw: true, // Make sure to get raw data (array of objects)
      });

      // Extract the IDs from the array of objects
      const coatchIds = idCoatch.map(entry => entry.id);
    
      Formation.findAll({
        include: [
          {
            model: Collaborateur,
            as: 'Auteur',
            attributes: ['nom', 'prenom','image'],
          },
        ],
        attributes: ['id', 'theme', 'description', 'auteur'],
          where:
          {
            approbation:1,
            destinataireDemande:coatchIds
          },
      })
      .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
      }) 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/all/admin', async(req,res)=>{
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Auteur',
              attributes: ['nom', 'prenom','image'],
            },
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['id','nom', 'prenom','image'],
            },
          ],
          attributes: ['id', 'theme', 'description', 'auteur','formateur','formateurExt','destinataireDemande','approbation'],
            where:
            {
              approbation:1,
              destinataireDemande:{ [Sequelize.Op.not]: null }
            },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})

//Les modules et séances d'une formation
router.get('/all_informations/:idformation', async(req,res)=>{
    const formationId = req.params.idformation;
        try {
            const modules = await Module.findAll({
                where:
                    {
                        formation: formationId,
                    },
            });
          
            const formation = await Formation.findByPk(formationId, {
              include: [
                  {
                      model: Collaborateur,
                      as: 'Auteur',
                      attributes: ['nom', 'prenom','image'],
                  },
                  {
                      model: Role2,
                      as: 'RoleHierarchique',
                      attributes: ['roleHierarchique'],
                  },
                  {
                      model: Collaborateur,
                      as: 'Formateur',
                      attributes: ['nom', 'prenom'],
                  },
              ],
            });
            
            if (!formation) {
                return res.status(404).json({ error: 'Formation introuvable' });
            }

            res.status(200).json({formation,modules});
        
        } 
        catch (error) {
            console.error('Erreur lors de la récupération des informations de la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de la formation' });
        }
    });


//Les formations organisées par une personne
router.get('/formations/:idPersonne',async(req,res)=>{
    const idPersonne = req.params.idPersonne;
    Formation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Auteur',
          attributes: ['nom', 'prenom','image'],
        },
        {
          model: Role2,
          attributes: ['roleHierarchique'],
        },
        {
          model: Collaborateur,
          as: 'Formateur',
          attributes: ['nom', 'prenom'],
        },
        ],
        where: {
            formateur: idPersonne,
        }
    })
    .then((formation) => {
        res.status(200).json(formation.map((formation) => {
          return {
            id: formation.id,
            theme: formation.theme,
            description: formation.description,
            auteur: formation.Auteur ? `${formation.Auteur.nom} ${formation.Auteur.prenom}` : null,
            formateur: formation.Formateur ? `${formation.Formateur.titreRole}` : null,
          };
        }))
        console.log(formation)
    }) 
})

//Ajout de formation par un formateur interne de l'entreprise
router.post('/addFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            auteur:req.body.auteur,
            formateurExt:req.body.formateurExt,
            approbation:1
        }))
        const formation = await newFormation.save();
        res.status(201).json(formation);
    }
    catch(err){
        console.error(err)
    }
})

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const formAediter = await Formation.findByPk(id);

    if (!formAediter) {
      return res.status(404).json({ error: 'Formation introuvable' });
    }

    const editedFormation = await formAediter.update({
      theme: req.body.theme,
      description: req.body.description
    });

    res.status(201).json(editedFormation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

module.exports = router;
