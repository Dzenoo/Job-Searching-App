import mongoose from "mongoose";
import validator from "validator";
import Review from "./reviews.schema";
import { signToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/bcrypt";

const EmployerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/drfmmwlsl/image/upload/v1709471817/ufmtgu7n4kbbzspsod7a.png",
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
      enum: {
        values: [
          "technology",
          "healthcare",
          "finance",
          "education",
          "manufacturing",
          "retail",
          "hospitality",
          "automotive",
          "construction",
          "media",
          "marketing",
          "telecommunications",
          "government",
          "nonprofit",
          "other",
        ],
        message: "{VALUE} is not defined",
      },
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
      minlength: [5, "Address must be at least 5 characters long"],
      maxlength: [50, "Address must be at most 50 characters long"],
    },
    number: {
      type: Number,
      required: [true, "Number is required"],
      minlength: [5, "Number must be at least 5"],
      maxlength: [50, "Number must be at most 50"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [255, "Email must be at most 255 characters long"],
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
      minlength: [5, "Name must be at least 5 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (password: string) {
          return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
            password
          );
        },
        message:
          "Password must be at least 8 characters long and contain symbols and numbers",
      },
    },
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
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: Review,
        default: [],
      },
    ],
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verifiedToken: {
      type: String,
      default: "",
    },
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
    console.log("Employer not found");
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
