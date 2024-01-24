import mongoose from "mongoose";
// import validator from "validator";

const EmployerSchema = new mongoose.Schema(
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

const Employer =
  mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);

export default Employer;
