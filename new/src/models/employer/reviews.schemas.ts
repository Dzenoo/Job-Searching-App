import mongoose from "mongoose";
// import validator from "validator";

const ReviewSchema = new mongoose.Schema(
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

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
