"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const sequelize = require('../config/sequelize.ts');
const server = express();
const PORT = 9876;
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Connection to mysql has been established successfully.');
            //await sequelize.close();
            //console.log('Connection has been closed.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
testConnection();
server.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json({ success: true, message: "user created" });
    }
    catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
server.listen(PORT, () => {
    console.log("Server running on port : " + PORT);
});
