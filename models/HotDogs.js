const mongoose = require("mongoose");

const HotDogsSchema = mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model("HotDog", HotDogsSchema);