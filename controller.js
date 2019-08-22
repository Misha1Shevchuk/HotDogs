const express = require('express');
const methodsDB = require('./methodsDB');
const jsonParser = express.json();

module.exports = {
    configure: (app) => {
        app.post('/', (req, res) => {
            res.sendStatus(200);
        });

        // Get list hotDogs
        app.post('/listHotDogs', (req, res) => {
            methodsDB.getHotDogs(res);
        });


        // When sent form newHotDog:
        app.post('/newHotDog', jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            else res.sendStatus(200);
            methodsDB.addHotDog(req.body);
        });

        // Remove HotDog
        app.post('/removeHotDog', jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            else res.sendStatus(200);
            methodsDB.removeHotDog(req.body);
        });

        // Change HotDog
        app.post('/changeHotDog', jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            else res.sendStatus(200);
            methodsDB.changeHotDog(req.body);
        });
    }
};