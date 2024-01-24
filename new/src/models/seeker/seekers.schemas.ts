import mongoose from "mongoose";
import validator from "validator";

const SeekerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
      default: "",
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
    first_name: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: [3, "First Name must be at least 3 characters long"],
      maxlength: [30, "First Name must be at most 30 characters long"],
      unique: true,
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [3, "Last Name must be at least 3 characters long"],
      maxlength: [30, "Last Name must be at most 30 characters long"],
    },
    cover_letter: {
      type: Buffer,
      default: undefined,
      required: false,
    },
    portfolio: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, "Portfolio must be at least 3 characters long"],
      maxlength: [30, "Portfolio must be at most 30 characters long"],
      default: "",
      validate: {
        validator: function (url: string) {
          return validator.isURL(url);
        },
        message: "Portfolio url is not good provided",
      },
    },
    linkedin: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, "Linkedin must be at least 3 characters long"],
      maxlength: [30, "Linkedin must be at most 30 characters long"],
      default: "",
      validate: {
        validator: function (url: string) {
          return validator.isURL(url);
        },
        message: "Linkedin url is not good provided",
      },
    },
    github: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, "Github must be at least 3 characters long"],
      maxlength: [30, "Github must be at most 30 characters long"],
      default: "",
      validate: {
        validator: function (url: string) {
          return validator.isURL(url);
        },
        message: "Github url is not good provided",
      },
    },
    resume: {
      type: Buffer,
      default: undefined,
      required: false,
    },
    applications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Application",
        required: false,
        default: [],
      },
    ],
    skills: [
      {
        type: String,
        required: false,
        minlength: [3, "Skills must be at least 3 characters long"],
        maxlength: [16, "Skills must not exceed 16 characters"],
        trim: true,
        default: [],
      },
    ],
    education: [
      {
        institution: {
          type: String,
          trim: true,
          default: "",
        },
        graduationDate: {
          trim: true,
          type: Date,
          default: null,
        },
        fieldOfStudy: {
          trim: true,
          type: String,
          default: "",
        },
        degree: {
          trim: true,
          type: String,
          default: "",
        },
        default: [],
        required: false,
      },
    ],
    savedJobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        default: [],
        required: false,
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Employer",
        default: [],
        required: false,
      },
    ],
    directMessages: [
      {
        employerId: { type: mongoose.Types.ObjectId, ref: "Employer" },
        messages: [
          { type: mongoose.Types.ObjectId, ref: "Message", default: [] },
        ],
        default: [],
        required: false,
      },
    ],
    alerts: {
      title: {
        type: String,
        required: false,
        default: "",
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [30, "Title must not exceed 30 characters"],
      },
      type: {
        type: String,
        required: false,
        default: "",
        enum: {
          values: ["Internship", "Full-Time", "Part-Time", "Freelance"],
          message: "{VALUE} is not supported for Type",
        },
      },
      level: {
        type: String,
        required: false,
        default: "",
        enum: {
          values: ["Junior", "Medior", "Senior", "Lead"],
          message: "{VALUE} is not supported for Level",
        },
      },
    },
  },
  { timestamps: true }
);

const Seeker = mongoose.models.Seeker || mongoose.model("Seeker", SeekerSchema);

export default Seeker;
