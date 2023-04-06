const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  salary: { type: Number, required: true },
  employees: { type: Number, required: true },
  jobs: { type: Number, required: true },
});

module.exports = mongoose.model("Employer", EmployerSchema);
