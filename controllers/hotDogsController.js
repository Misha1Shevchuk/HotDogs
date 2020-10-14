'use strict';

const HotDogsDbController = require('../databaseControllers/hotDogsDbController');

module.exports = {
    async getHotDogs(req, res) {
        try {
            const dbController = new HotDogsDbController();
            const hotDogs = await dbController.getAll();
            res.json(hotDogs);
        } catch (error) {
            res.json({ error });
        }
    },

    async addHotDog(req, res) {
        try {
            const { name, description } = req.body;
            const dbController = new HotDogsDbController();
            await dbController.insert({ name, description });
            res.sendStatus(200);
        } catch (error) {
            res.json({ error });
        }
    },

    async removeHotDog(req, res) {
        try {
            const recordId = req.query._id;
            const dbController = new HotDogsDbController();
            await dbController.remove(recordId);
            res.sendStatus(200)
        } catch (error) {
            res.json({ error })
        }
    },

    async changeHotDog(req, res) {
        try {
            const { _id, name, description } = req.body;
            const dbController = new HotDogsDbController();
            await dbController.updateOne({ _id, name, description });
            res.sendStatus(200);
        } catch (error) {
            res.json({ error })
        }
    }
};