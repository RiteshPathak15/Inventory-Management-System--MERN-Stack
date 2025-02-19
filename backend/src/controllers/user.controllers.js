import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import dotenv from "dotenv";
import { sendMail } from "../mailer/mailer.js";
import crypto from "crypto";

dotenv.config();


// Register User
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const avatarFile = req.file;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already registered" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes from now

    const body = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Shanti Electric and Hardware Store</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                  text-align: center;
              }
              .container {
                  max-width: 500px;
                  background: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  margin: auto;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Welcome to Shanti Electric and Hardware Store!</h2>
              <p>Dear ${fullname},</p>
              <p>We are pleased to inform you that your employee account has been successfully created for the Shanti Electric and Hardware Store Inventory Management System.</p>
              <p>Your OTP for account verification is: <strong>${otp}</strong></p>
              <p>Please use this OTP to verify your account. The OTP is valid for 30 minutes.</p>
              <p>If you have any questions or require assistance, please contact the store administrator.</p>
              <p>Welcome aboard!</p>
              <div class="footer">&copy; ${new Date().getFullYear()} Shanti Electric and Hardware Store. All rights reserved.</div>
          </div>
      </body>
      </html>
    `;

    let avatarUrl = "";
    if (avatarFile) {
      const uploadResult = await uploadOnCloudinary(avatarFile.path);
      avatarUrl = uploadResult.url;
    }
    const newUser = new User({
      fullname,
      username,
      email,
      password,
      avatar: avatarUrl,
      otp, // Save OTP
      otpExpiry, // Save OTP expiry time
    });
    await newUser.save();
    
    await sendMail(email, body, "Welcome to Shanti Store");
    res.status(201).json({ message: "User registered successfully. Please check your email for the OTP." });
  } catch (error) {
    console.error("Error with registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Received email:", email);
    console.log("Received OTP:", otp);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate new tokens
    const accessToken = jwt.sign(
      {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );

    // Update user with the new refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      token: accessToken, // Sending the access token in response
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    // Clear refresh token from the database
    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: null }, // Keep null instead of deletion
      { new: true }
    );

    // Clear cookies
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true, // Set true in production
        sameSite: "Strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true, // Set true in production
        sameSite: "Strict",
      })
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and userId is available in req.user._id
    const user = await User.findById(userId).select("-password -refreshToken"); // Fetch user from database
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
};

// Update User Avatar
const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and userId is available in req.user._id
    const avatarFile = req.file;

    if (!avatarFile) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const uploadResult = await uploadOnCloudinary(avatarFile.path);
    const avatarUrl = uploadResult.url;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    ).select("-password -refreshToken");

    res.json({ message: "Avatar updated successfully", user });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Error updating avatar", error });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const employees = await User.find({ role: "employee" }).select(
      "fullname email username"
    );
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const userId = req.user._id;

    const updatedData = { fullname, email };
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password -refreshToken");

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Export controllers
export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserAvatar,
  getAllEmployees,
  updateUserProfile,
  verifyOtp,
};
