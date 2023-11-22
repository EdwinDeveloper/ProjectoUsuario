const express = require('express');
const sequelized = require("../config/sequelize").sequelize;
const server = express()

const userCases = require("../useCases/user")

const PORT = 9876

async function Connection() {
    try {
      await sequelized.authenticate();
      console.log('Connection to mysql has been established successfully.');
  
      //await sequelized.close();
      //console.log('Connection has been closed.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

//testConnection()

server.post('/create', async (req, res) => {
  try {
    let user = await userCases.createUser()
    res.status(201).json({ success: true, message: "user created", user: user });
  } catch (error) {
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
});

server.listen( PORT, async ()=> {
  Connection()
    console.log("Server running on port : " + PORT)
} )