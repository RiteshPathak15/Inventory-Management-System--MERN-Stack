import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    avatar: {
      type: String, // Cloudinary URL
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcryptjs.hash(this.password, 10); // Add salt rounds for better security
  }
  next();
});

// Middleware to handle duplicate field errors gracefully
userSchema.post("save", function (error, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyValue.username) {
      next(new Error("Username already exists"));
    } else if (error.keyValue.email) {
      next(new Error("Email already registered"));
    }
  } else {
    next();
  }
});

// Validate password (compare bcryptjs password and plain password)
userSchema.methods.isPasswordCorrect = async function (password) {
  return bcryptjs.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
      role: this.role, // Include role in the token
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m", // Default to 15 minutes
    }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d", // Default to 7 days
    }
  );
};

export const User = mongoose.model("User", userSchema);
