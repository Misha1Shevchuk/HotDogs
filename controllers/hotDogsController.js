'use strict';

const HotDog = require('../models/HotDogs');

module.exports = {
    async getHotDogs(req, res) {
        const hotDogs = await HotDog.find();
        return res.json(hotDogs);
    },

    async addHotDog(req, res) {
        console.log(111);
        const hotDog = new HotDog({
            name: req.body.name,
            description: req.body.description
        });

        await hotDog.save();
        return res.send(200);
    },

    async removeHotDog(req, res) {
        await HotDog.findOneAndDelete({_id: req.query._id});
        return res.send(200)
    },

    async changeHotDog(req, res) {
        await HotDog.findOneAndUpdate({_id: req.body._id}, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        });
        res.send(200);
    },
};