import mongoose from "mongoose";
// import validator from "validator";

const ApplicationSchema = new mongoose.Schema(
  {
    image: {},
    industry: {},
    company_description: {},
    location: {},
    size: {},
    website: {},
    address: {},
    number: {},
    email: {},
    name: {},
    jobs: {},
    followers: {},
    directMessages: {},
    achievements: {},
    events: {},
    reviews: {},
  },
  { timestamps: true }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;
