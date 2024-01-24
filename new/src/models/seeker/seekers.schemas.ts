import mongoose from "mongoose";
// import validator from "validator";

const SeekerSchema = new mongoose.Schema(
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
    directSeekers: {},
    achievements: {},
    events: {},
    reviews: {},
  },
  { timestamps: true }
);

const Seeker = mongoose.models.Seeker || mongoose.model("Seeker", SeekerSchema);

export default Seeker;
