import mongoose from "mongoose";
import validator from "validator";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [30, "Title must be at most 30 characters long"],
    },
    date: {
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
      trim: true,
      minlength: [3, "Description must be at least 3 characters long"],
      maxlength: [30, "Description must be at most 30 characters long"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [3, "Location must be at least 3 characters long"],
      maxlength: [30, "Location must be at most 30 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [3, "Category must be at least 3 characters long"],
      maxlength: [30, "Category must be at most 30 characters long"],
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Employer",
      required: [true, "Company is required"],
    },
    seekers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Seeker",
        required: false,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
