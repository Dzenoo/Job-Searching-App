import mongoose from "mongoose";
// import validator from "validator";

const EventSchema = new mongoose.Schema(
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

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
