const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cv: { type: String, required: true },
  country: { type: String, required: true },
  job: { type: mongoose.Types.ObjectId, ref: "Job" },
});

module.exports = mongoose.model("Application", ApplicationSchema);
