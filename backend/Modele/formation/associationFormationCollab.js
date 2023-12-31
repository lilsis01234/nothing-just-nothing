const Formation2 = require('./Formation')
const Collab2 = require('../CollabModel/Collab')
const FormationCollab = require('./FormationCollab')

Formation2.belongsToMany(Collab2, {through : FormationCollab, foreignKey: "formation", otherKey:'collaborateur'})
Collab2.belongsToMany(Formation2, {through : FormationCollab, foreignKey:"collaborateur", otherKey:'formation'})

module.exports = {
    Formation2,
    Collab2,
    FormationCollab
}