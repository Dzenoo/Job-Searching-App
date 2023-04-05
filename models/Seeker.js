const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const SeekerSchema = new Schema({});

module.exports = mongoose.model("Seeker", SeekerSchema);
