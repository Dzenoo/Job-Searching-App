const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  salary: { type: Number, required: true },
  time: { type: String, required: true },
  level: { type: String, required: true },
  skills: { type: String, required: true },
  schedule: { type: String, required: true },
  jobDescription: { type: String, required: true },
  shortDescription: { type: String, required: true },
  requirements: { type: String, required: true },
  employer: { type: mongoose.Types.ObjectId, ref: "Employer" },
});

module.exports = mongoose.model("Job", JobSchema);
