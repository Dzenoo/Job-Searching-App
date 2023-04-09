const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const SeekerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Types.ObjectId, ref: "Application" }],
});

module.exports = mongoose.model("Seeker", SeekerSchema);
