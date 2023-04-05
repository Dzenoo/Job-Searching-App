const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const EmployerSchema = new Schema({});

module.exports = mongoose.model("Employer", EmployerSchema);
