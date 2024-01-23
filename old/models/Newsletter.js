const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
  email: { type: String, required: true },
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);
