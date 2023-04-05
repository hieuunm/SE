const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    noPrimaryKey: true,
  },
  logging: false
});

db.sequelize = sequelize;
db.models = {};
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Product = require('./product')(sequelize, Sequelize.DataTypes);


module.exports = db;
