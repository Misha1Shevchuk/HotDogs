const HotDog = require('../models/HotDogs');

class HotDogsDbController {

    async getAll() {
        return await HotDog.find();
    }

    async insert({ name, description }) {
        const hotDog = new HotDog({ name, description });
        return await hotDog.save();
    }

    async remove(_id) {
        return await HotDog.findOneAndDelete({ _id });
    }

    async updateOne({ _id, name, description }) {
        return await HotDog.findOneAndUpdate({ _id }, {$set: { name, description }});
    }
}

module.exports = HotDogsDbController;