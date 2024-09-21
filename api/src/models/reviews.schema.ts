import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Employer",
      required: [true, "Company is required"],
    },
    job_position: {
      type: String,
      required: [true, "Job Position is required"],
      trim: true,
      minlength: [3, "Job Position must be at least 3 characters long"],
      maxlength: [30, "Job Position must be at most 30 characters long"],
    },
    type: {
      type: String,
      required: [true, "Review Type is required"],
      trim: true,
      enum: {
        values: ["Freelance", "Part-Time", "Full-Time", "Internship"],
        message: "{VALUE} is not supported",
      },
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
      enum: {
        values: ["Less than 1", "1-2", "2-4", "4-7", "7-10", "10 or greater"],
        message: "{VALUE} is not supported",
      },
    },
    negativeReview: {
      type: String,
      required: [true, "Negative Review is required"],
      trim: true,
      minlength: [3, "Negative Review must be at least 3 characters long"],
      maxlength: [300, "Negative Review must be at most 300 characters long"],
    },
    positiveReview: {
      type: String,
      required: [true, "Positive Review is required"],
      trim: true,
      minlength: [3, "Positive Review must be at least 3 characters long"],
      maxlength: [300, "Positive Review must be at most 300 characters long"],
    },
    technologies: {
      type: [
        {
          type: String,
          trim: true,
          minlength: [3, "Technology name must be at least 3 characters long"],
          maxlength: [30, "Technology name must be at most 30 characters long"],
          validate: {
            validator: function (value: string) {
              return value.trim().length > 0;
            },
            message: "Technology name cannot empty",
          },
        },
      ],
      required: true,
    },
    seeker: {
      type: mongoose.Types.ObjectId,
      ref: "Seeker",
      required: [true, "Seeker is required"],
    },
  },
  { timestamps: true }
);
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
