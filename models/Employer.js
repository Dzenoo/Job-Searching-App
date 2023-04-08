const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
  em_name: { type: String, required: true },
  em_email: { type: String, required: true },
  em_password: { type: String, required: true },
  em_phone: { type: Number, required: true },
  em_image: { type: String, required: true },
  em_rating: { type: Number, required: true },
  em_salary: { type: Number, required: true },
  em_employees: { type: Number, required: true },
  em_jobs: { type: Number, required: true },
  em_biography: { type: String },
});

module.exports = mongoose.model("Employer", EmployerSchema);
