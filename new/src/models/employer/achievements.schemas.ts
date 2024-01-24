import mongoose from "mongoose";
// import validator from "validator";

const AchievementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Achievements name is required"],
      minlength: [3, "Achievements name minimum"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Achievements description is required"],
      minlength: [30, "Achievements description must be a minmimum 30"],
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    employer: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Employer",
        required: [true, "Employer id is required"],
      },
    ],
  },
  { timestamps: true }
);

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model("Achievement", AchievementSchema);

export default Achievement;
