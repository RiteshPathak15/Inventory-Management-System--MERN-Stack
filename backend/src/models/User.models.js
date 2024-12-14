import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    rewardpoints: {
      type: Number,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false, // Distinguishes between normal and premium users
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash the password before saving the user (middleware)
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10); // Add salt rounds for better security
  }
  next();
});

// Middleware to handle duplicate fields errors gracefully
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

// Validate password (compare the bcrypt password and plain password)
userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
      isPremium: this.isPremium, // Include the premium status
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

// Update Reward Points
userSchema.methods.updateRewardPoints = function (points) {
  this.rewardpoints += points;
  return this.save();
};

export const User = mongoose.model("User", userSchema);