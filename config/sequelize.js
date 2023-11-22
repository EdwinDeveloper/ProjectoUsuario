const { Sequelize } = require('sequelize');
const User = require('../models/User');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Create a Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {
        timestamps: false
      }
    }
)

// Define the User model
const UserModel = User(sequelize, Sequelize.DataTypes);

// Synchronize the model with the database
// sequelize.sync()
//   .then(() => {
//     console.log('Models synchronized with the database.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing models with the database:', error);
//   });

module.exports = {
  sequelize,
  UserModel,
};