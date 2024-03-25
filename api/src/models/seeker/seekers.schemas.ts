import mongoose from "mongoose";
import validator from "validator";
import { signToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/bcrypt";

const SeekerSchema = new mongoose.Schema(
  {
    biography: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/drfmmwlsl/image/upload/v1709471817/o1bj9hofkvj18dictpxa.png",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [3, "Password must be at least 3 characters long"],
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
      minlength: [3, "First Name must be at least 3 characters long"],
      maxlength: [30, "First Name must be at most 30 characters long"],
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [3, "Last Name must be at least 3 characters long"],
      maxlength: [30, "Last Name must be at most 30 characters long"],
    },
    portfolio: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    notifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Notification",
      },
    ],
    applications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Application",
        default: [],
      },
    ],
    skills: [
      {
        type: String,
        minlength: [1, "Skills must be at least 3 characters long"],
        maxlength: [30, "Skills must not exceed 16 characters"],
        default: [],
      },
    ],
    education: [
      {
        institution: {
          type: String,
          default: "",
        },
        graduationDate: {
          type: Date,
          default: null,
        },
        fieldOfStudy: {
          type: String,
          default: "",
        },
        degree: {
          type: String,
          default: "",
        },
      },
    ],
    savedJobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Employer",
        default: [],
      },
    ],
    directMessages: [
      {
        _id: false,
        employerId: { type: mongoose.Types.ObjectId, ref: "Employer" },
        messages: [
          { type: mongoose.Types.ObjectId, ref: "Message", default: [] },
        ],
      },
    ],
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
        default: [],
      },
    ],
    alerts: {
      title: {
        type: String,
        default: "",
      },
      type: {
        type: String,
        default: "",
      },
      level: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

SeekerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await hashPassword(this.password);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

SeekerSchema.statics.findByCredentials = async <T extends string>(
  email: T,
  password: T
) => {
  const seeker = await Seeker.findOne({ email });

  if (!seeker) {
    console.log("Not seeker founded");
    return;
  }

  const isMatchedPasswords = await comparePassword(password, seeker.password);

  if (!isMatchedPasswords) {
    console.log("Password is not true");
    return;
  }
  return seeker;
};

SeekerSchema.methods.generateAuthToken = async function () {
  const seeker = this;
  const seekerTokens = signToken({ seekerId: seeker._id, userType: "seeker" });
  return seekerTokens;
};

const Seeker = mongoose.models.Seeker || mongoose.model("Seeker", SeekerSchema);

export default Seeker;
