import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    cover_letter: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Rejected", "Pending", "Accepted"],
        message: "{VALUE} is not valid",
      },
    },
    resume: {
      type: String,
      required: [true, "Resume is required"],
    },
    seeker: { type: mongoose.Types.ObjectId, ref: "Seeker" },
    job: { type: mongoose.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true },
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;
