import mongoose from "mongoose";
import validator from "validator";
import Review from "./reviews.schemas";
import Event from "./events.schemas";
import { signToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/bcrypt";

const EmployerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/drfmmwlsl/image/upload/v1706974632/lgtw5us7dsyjbjpbuwzw.png",
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
      trim: true,
      default: "",
    },
    size: {
      type: String,
      trim: true,
      required: [true, "Company size is required"],
      enum: {
        values: [
          "Less-than-17",
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
      trim: true,
      default: "",
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
      minlength: [3, "Number must be at least 3"],
      maxlength: [30, "Number must be at most 30"],
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
      minlength: [3, "Password must be at least 3 characters long"],
    },
    notifications: [
      {
        title: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    jobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Seeker",
        default: [],
      },
    ],
    directMessages: [
      {
        _id: false,
        seekerId: { type: mongoose.Types.ObjectId, ref: "Seeker" },
        messages: [
          { type: mongoose.Types.ObjectId, ref: "Message", default: [] },
        ],
      },
    ],
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: Event,
        default: [],
      },
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: Review,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

EmployerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await hashPassword(this.password);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

EmployerSchema.statics.findByCredentials = async <T extends string>(
  email: T,
  password: T
) => {
  const employer = await Employer.findOne({ email });

  if (!employer) {
    console.log("Not employer founded");
    return;
  }

  const isMatchedPasswords = await comparePassword(password, employer.password);

  if (!isMatchedPasswords) {
    console.log("Password is not true");
    return;
  }
  return employer;
};

EmployerSchema.methods.generateAuthToken = async function () {
  const employer = this;
  const employerTokens = signToken({
    employerId: employer._id,
    userType: "employer",
  });
  return employerTokens;
};

const Employer =
  mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);

export default Employer;
