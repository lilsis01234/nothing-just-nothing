const {Sequelize} = require('sequelize');

//Initalisation de la base de donnée
const sequelize = new Sequelize('mysql://127.0.0.1:3306/intranetTest', { 
  username : 'root', 
  password :''
})




module.exports = sequelize;