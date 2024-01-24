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
    directMessages: [
      {
        seekerId: { type: mongoose.Types.ObjectId, ref: "Seeker" },
        messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
        default: [],
      },
    ],
    achievements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Achievement",
        default: [],
        required: false,
      },
    ],
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
        default: [],
        required: false,
      },
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
        default: [],
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Employer =
  mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);

export default Employer;
