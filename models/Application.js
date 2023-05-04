const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ApplicationSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  github: { type: String, required: true },
  linkedin: { type: String, required: true },
  employer: { type: mongoose.Types.ObjectId, ref: "Employer" },
  status: { type: String, default: "Pending" },
  // cv: { type: String },
  job: { type: mongoose.Types.ObjectId, ref: "Job" },
});

module.exports = mongoose.model("Application", ApplicationSchema);
