import mongoose from "mongoose";
import validator from "validator";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [30, "Title must not exceed 30 characters"],
      required: [true, "Title is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      enum: {
        values: ["Remote", "On-Site", "Hybrid"],
        message: "{VALUE} is not supported for Position",
      },
    },
    location: {
      type: String,
      minlength: [3, "Location must be at least 3 characters long"],
      maxlength: [30, "Location must not exceed 30 characters"],
      required: [true, "Location is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      minlength: [30, "Overview must be at least 30 characters long"],
      maxlength: [300, "Overview must not exceed 300 characters"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["Internship", "Full-Time", "Part-Time", "Freelance"],
        message: "{VALUE} is not supported for Type",
      },
    },
    skills: [
      {
        type: String,
        required: [true, "Skills is required"],
        minlength: [1, "Skills must be at least 1 characters long"],
        maxlength: [25, "Skills must not exceed 25 characters"],
        trim: true,
      },
    ],
    level: {
      type: String,
      required: [true, "Level is required"],
      enum: {
        values: ["Junior", "Medior", "Senior", "Lead"],
        message: "{VALUE} is not supported for Level",
      },
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Employer",
      required: [true, "Employer Id is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [100, "Salary must be a non-negative number"],
      trim: true,
    },
    expiration_date: {
      type: Date,
      required: [true, "Expiration date is required"],
      validate: {
        validator: function (val: string) {
          return validator.isDate(val);
        },
        message: "Expiration date must be a valid date",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [30, "Description must be at least 30 characters long"],
      maxlength: [2500, "Description must not exceed 2500 characters"],
    },
    applications: [
      { type: mongoose.Types.ObjectId, ref: "Application", default: [] },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
