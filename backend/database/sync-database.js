const sequelize = require('../database/database');
const Collab = require('../Modele/CollabModel/Collab')
const Compte = require('../Modele/CompteModel/Compte')
const InfoSocialCollab = require('../Modele/CollabModel/InfoSocialCollab')
const ArchiveCollaborateur = require('../Modele/CollabModel/ArchiveCollab')
const RoleCollab = require('../Modele/RoleModel/Role');
const RoleHierarchique = require('../Modele/RoleModel/RoleHierarchique')
const PasswordResetRequest = require('../Modele/CompteModel/PasswordResetRequest');
const TestPoste = require('../Modele/Structure/TestPoste')
const TestDepartement = require('../Modele/Structure/TestDepartement')
const PosteDepartement = require('../Modele/Structure/PosteDepartement')
const Direction = require('../Modele/Structure/Direction')
const Projet = require('../Modele/Structure/Projet')
const Collaborateur = require('../Modele/CollabModel/Collaborateur')
const Eqquipe = require('../Modele/Structure/Equipe')
const association = require('../Modele/Structure/association')
const Formation = require('../Modele/formation/Formation');
const CommentaireFormation = require('../Modele/formation/CommentaireFormation');
const DiscussionFormation= require('../Modele/formation/DiscussionFormation');
const Module = require('../Modele/formation/Module');
const Seance = require('../Modele/formation/Seance');
const ParticipantsSeance = require('../Modele/formation/ParticipantsSeance');



//Synchronisation de la base de donnée 
async function syncDatabase(){
    try{
        await sequelize.sync({force : true}); 
        const { TestPoste, TestDepartement, PosteDepartement } = association;
        TestPoste.belongsToMany(TestDepartement, { through: PosteDepartement });
        TestDepartement.belongsToMany(TestPoste, { through: PosteDepartement });
        console.log('La base de donnée est synchronisée avec succès')
    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}


syncDatabase();