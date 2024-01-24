import mongoose from "mongoose";
import validator from "validator";

const EmployerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
      default: "",
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
      minlength: [3, "Industry must be at least 3 characters long"],
      maxlength: [30, "Industry must be at most 30 characters long"],
    },
    company_description: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, "Description must be at least 3 characters long"],
      maxlength: [30, "Description must be at most 30 characters long"],
      default: "",
    },
    size: {
      type: String,
      trim: true,
      required: [true, "Company size is required"],
      enum: {
        values: [
          "Less than 17",
          "20-50",
          "50-100",
          "100-250",
          "250-500",
          "500-1000",
        ],
        message: "{VALUE} is not defined",
      },
    },
    website: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, "Website must be at least 3 characters long"],
      maxlength: [30, "Website must be at most 30 characters long"],
      default: "",
      validate: {
        validator: function (url: string) {
          return validator.isURL(url);
        },
        message: "Website url is not good provided",
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [3, "Address must be at least 3 characters long"],
      maxlength: [30, "Address must be at most 30 characters long"],
    },
    number: {
      type: Number,
      required: [true, "Number is required"],
      min: [3, "Number must be at least 3"],
      max: [30, "Number must be at most 30"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minlength: [3, "Email must be at least 3 characters long"],
      maxlength: [30, "Email must be at most 30 characters long"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          return validator.isEmail(email);
        },
        message: "Email is not a valid property",
      },
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name must be at most 30 characters long"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [3, "Password must be at least 3 characters long"],
      maxlength: [30, "Password must be at most 30 characters long"],
      validate: {
        validator: function (password: string) {
          return (
            validator.isStrongPassword(password, {
              minLength: 3,
            }) && password.includes(password)
          );
        },
        message: "Password is not strong and cannot be value password",
      },
    },
    jobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        default: [],
        required: false,
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Seeker",
        default: [],
        required: false,
      },
    ],
    directMessages: [
      {
        seekerId: { type: mongoose.Types.ObjectId, ref: "Seeker" },
        messages: [
          { type: mongoose.Types.ObjectId, ref: "Message", default: [] },
        ],
        default: [],
        required: false,
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
