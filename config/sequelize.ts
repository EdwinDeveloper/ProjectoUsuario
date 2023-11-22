const { Sequelize } = require('sequelize-typescript');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  port: 3306,
  models: [__dirname + '/models'],
  logging: false,
});

module.exports = sequelize;