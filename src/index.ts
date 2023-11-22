const express = require('express');
const sequelized = require("../config/sequelize.ts");
const server = express()

const PORT = 9876

async function testConnection() {
    try {
      await sequelized.authenticate();
      console.log('Connection to mysql has been established successfully.');
  
      //await sequelize.close();
      //console.log('Connection has been closed.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

testConnection()

server.post('/create', async (req: any, res: any) => {
  try {
    res.status(201).json({ success: true, message: "user created" });
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen( PORT, ()=> {
    console.log("Server running on port : " + PORT)
} )